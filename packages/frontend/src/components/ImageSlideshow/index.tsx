import { Slideshow, SlideshowContainer, Image, ImageContainer } from './style';
import mediaQueries from '~/styles/breakpoints';

function ImageSlideshow({
	images,
	imageWidths,
}: {
	imageWidths: Bot['slideshowImageWidths'];
	images: Bot['slideshowImages'];
}) {
	return (
		<>
			<style>
				{`
					:root {
						--width-one-item: ${imageWidths.small}px;
						--n-images: ${images.length};
					}
					
					${mediaQueries.smallMin} {
						:root {
							--width-one-item: ${imageWidths.medium}px;
						}
					}
					
					${mediaQueries.dashboardMaxWidthMin} {
						:root {
							--width-one-item: ${imageWidths.large}px;
						}
					}
				`.replace(/\s/g, '')}
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
