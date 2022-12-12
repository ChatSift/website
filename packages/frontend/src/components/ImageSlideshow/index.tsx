import { Slideshow, SlideshowContainer, Image, ImageContainer } from './style';

function ImageSlideshow({
	images,
	imageWidth,
}: {
	imageWidth: Bot['slideshowImageWidth'];
	images: Bot['slideshowImages'];
}) {
	return (
		<>
			<style>
				{`
					:root {
						--width-one-item: ${imageWidth}px;
						--n-images: ${images.length};
					}
				`}
			</style>
			<SlideshowContainer>
				<Slideshow nImages={images.length}>
					{images.map((image, index) => (
						<ImageContainer key={index}>
							<Image src={image.url} alt={image.alt} />
						</ImageContainer>
					))}
					{images.map((image, index) => (
						<ImageContainer key={index}>
							<Image src={image.url} alt={image.alt} />
						</ImageContainer>
					))}
				</Slideshow>
			</SlideshowContainer>
		</>
	);
}

export default ImageSlideshow;
