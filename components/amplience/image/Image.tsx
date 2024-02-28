import { AmplienceContentItem } from '~/amplience-client';

import { AmplienceImage } from './image.types';
import { buildSrcUrl } from './image.utils';

type ImageProps = {
  image?: AmplienceImage;
  query: string;
  format?: string;
  imageAltText?: string;
  di?: string;
  seoText?: string;
  display?: string;
} & AmplienceContentItem;

interface SourceProps {
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  highDensityWidth?: number;
  poiAspect?: string;
}

const Image = ({
  display = '',
  image,
  imageAltText,
  seoText = '',
  di = '',
  query,
  format,
}: ImageProps) => {
  if (!image) {
    return <></>;
  }

  const source = ({ minWidth, maxWidth, width, highDensityWidth, poiAspect }: SourceProps) => {
    let mediaQuery;

    if (minWidth) {
      mediaQuery = `(min-width: ${minWidth}px)`;
    }

    if (maxWidth) {
      mediaQuery = `(max-width: ${maxWidth}px)`;
    }

    const buildSrcProps = { width, poiAspect, image, seoText, display, di, query };

    return (
      <source
        media={mediaQuery}
        srcSet={`${buildSrcUrl(buildSrcProps)} 1x, ${buildSrcUrl({
          ...buildSrcProps,
          width: highDensityWidth,
        })}`}
        type={format ? `image/${format}` : undefined}
      />
    );
  };

  const imageTag =
    display === 'Static' ? (
      <picture>
        <img
          alt={imageAltText}
          loading="lazy"
          src={`https://${image.endpoint}.a.bigcontent.io/v1/static/${image.name}`}
          title={seoText}
          width="100%"
        />
      </picture>
    ) : (
      <picture>
        {/* High density widths selected to be below max avif image size at aspect ratio. (2.5mil pixels) */}
        {source({
          minWidth: 1280,
          width: 1500,
          highDensityWidth: 2234,
          poiAspect: '2:1',
        })}
        {source({
          minWidth: 1024,
          width: 1280,
          highDensityWidth: 2234,
          poiAspect: '2:1',
        })}
        {source({
          minWidth: 768,
          width: 1024,
          highDensityWidth: 1920,
          poiAspect: '1.5:1',
        })}
        {source({
          maxWidth: 768,
          width: 768,
          highDensityWidth: 1536,
          poiAspect: '1:1',
        })}

        <img
          alt={imageAltText}
          loading="lazy"
          src={buildSrcUrl({ image, seoText, display, di, query })}
          title={seoText}
          width="100%"
        />
      </picture>
    );

  return <div className="relative w-auto">{imageTag}</div>;
};

export default Image;
