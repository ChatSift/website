import { useEffect, useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import { Slideshow, SlideshowContainer, gap, Image, ImageContainer, slideshowInterval, ProgressBar } from './style';

function ImageSlideshow({ images }: { images: Bot['slideshowImages'] }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const internalImages = useMemo(
		() =>
			[...(Array.from({ length: images.length }) as unknown[])].map(
				(_, index) => images.length - 1 - ((currentIndex + index) % images.length),
			),
		[currentIndex, images],
	);

	useEffect(() => {
		const interval = setInterval(
			() => setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length),
			slideshowInterval,
		);

		return () => clearInterval(interval);
	}, [images.length]);

	const animatedProps = useSpring({
		from: {
			transform: `translateX(calc(0% - ${0}px))`,
			opacity: 1,
		},
		to: {
			transform: `translateX(calc(-100% - ${gap}px))`,
			opacity: 0,
		},
		reset: true,
	});

	const progress = useSpring({
		from: {
			progress: '0%',
		},
		to: {
			progress: '100%',
		},
		config: {
			duration: slideshowInterval,
		},
		reset: true,
	});

	return (
		<SlideshowContainer>
			<Slideshow nImages={images.length}>
				{images.map((image, index) => (
					<ImageContainer
						key={index}
						style={{
							transform: animatedProps.transform,
							order: internalImages[index]!,
						}}
					>
						<Image src={image.url} alt={image.alt} />
						{internalImages[index] === 1 && <ProgressBar style={{ width: progress.progress }} />}
					</ImageContainer>
				))}
			</Slideshow>
		</SlideshowContainer>
	);
}

export default ImageSlideshow;
