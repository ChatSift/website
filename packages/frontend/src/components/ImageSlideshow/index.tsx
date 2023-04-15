import * as Styles from './style';
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
			<Styles.SlideshowContainer>
				<Styles.Slideshow nImages={images.length}>
					{images.map((image, index) => (
						<Styles.ImageContainer key={index}>
							<Styles.Image src={image.url} alt={image.alt} />
						</Styles.ImageContainer>
					))}
					{images.map((image, index) => (
						<Styles.ImageContainer key={index}>
							<Styles.Image src={image.url} alt={image.alt} />
						</Styles.ImageContainer>
					))}
				</Styles.Slideshow>
			</Styles.SlideshowContainer>
		</>
	);
}

export default ImageSlideshow;
