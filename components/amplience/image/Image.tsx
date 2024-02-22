/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AmplienceContentItem } from '~/amplience-client';

import { buildSrcUrl } from './image.utils';

type ImageProps = {
  image: any;
  query?: any;
  format?: string;
  imageAltText?: string;
  di?: string;
  seoText?: string;
  display?: string;
} & AmplienceContentItem;

const Image = ({ display = '', image, imageAltText, seoText = '', di = '', query }: ImageProps) => {
  if (!image) {
    return null;
  }

  const source = ({
    minWidth,
    maxWidth,
    width,
    highDensityWidth,
    format,
    poiAspect,
    seoText,
    display,
  }: any) => {
    return (
      <source
        media={
          minWidth
            ? `(min-width: ${minWidth}px)`
            : maxWidth
              ? `(max-width: ${maxWidth}px)`
              : undefined
        }
        srcSet={`${buildSrcUrl({
          width,
          poiAspect,
          image,
          seoText,
          display,
          di,
          query,
        })} 1x, ${buildSrcUrl({
          width: highDensityWidth,
          poiAspect,
          image,
          seoText,
          display,
          di,
          query,
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
          minWidth: '1280',
          width: '1500',
          highDensityWidth: '2234',
          poiAspect: '2:1',
        })}
        {source({
          minWidth: '1024',
          width: '1280',
          highDensityWidth: '2234',
          poiAspect: '2:1',
        })}
        {source({
          minWidth: '768',
          width: '1024',
          highDensityWidth: '1920',
          poiAspect: '1.5:1',
        })}
        {source({
          maxWidth: '768',
          width: '768',
          highDensityWidth: '1536',
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
