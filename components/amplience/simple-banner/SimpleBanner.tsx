'use client';

import {useEffect, useRef, useState} from 'react';
import DefaultAdaptiveImageRef from '../adaptive-image/DefaultAdaptiveImage';
import DefaultAdaptiveImageSkeleton from '../adaptive-image/DefaultAdaptiveImageSkeleton';
import clsx from 'clsx';
import {
  ImageScaleMode,
  type AmplienceImage,
  ImageScaleFit,
  type ImageTransformations,
} from '../image/Image.types';

type SimpleBannerProps = {
  image: {
    img: {
      image: ImageTransformations & {
        image: AmplienceImage;
      };
    };
    disablePoiAspectRatio: boolean;
    imageAltText: string;
    di: string;
  };
  bannerText: {
    header: string;
    subheader?: string;
    description: string;
  };
  opacity?: number;
  ctaSettings: {
    linkUrl: string;
    buttonText: string;
  };
  textPositioning: {
    textPositionHorizontal: 'left' | 'center' | 'right';
    textPositionVertical: 'top' | 'middle' | 'bottom';
  };
};

const SimpleBanner = ({
  image,
  bannerText,
  ctaSettings,
  opacity = 0.9,
  textPositioning = {
    textPositionHorizontal: 'center',
    textPositionVertical: 'middle',
  },
}: SimpleBannerProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const imageRef = useRef<any>();

  /**
   * Method called with the image is loaded
   */
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  /**
   * Checking that the image is loaded
   */
  useEffect(() => {
    if (imageRef?.current?.complete && imageLoading) {
      setImageLoading(false);
    }
  }, [imageRef?.current?.complete, imageLoading]);

  const {img} = image || {};

  const transformations: ImageTransformations = {
    ...img?.image,
    upscale: false,
    strip: true,
    quality: 80,
    scaleMode: !image?.disablePoiAspectRatio
      ? ImageScaleMode.ASPECT_RATIO
      : undefined,
    scaleFit:
      !image?.disablePoiAspectRatio &&
      img?.image?.poi &&
      img?.image?.poi.x != -1 &&
      img?.image?.poi.y != -1
        ? ImageScaleFit.POINT_OF_INTEREST
        : undefined,
  };

  // Checks if there is any text provided
  const isOverlayVisible =
    bannerText?.header ||
    bannerText?.subheader ||
    bannerText?.description ||
    ctaSettings?.buttonText;

  const {textPositionHorizontal, textPositionVertical} = textPositioning;
  const placements = {
    'left-top': 'md:left-0 md:top-0',
    'left-middle': 'md:left-0 md:top-1/2 md:-translate-y-1/2',
    'left-bottom': 'md:left-0 md:bottom-0',
    'center-top': 'md:top-0 md:left-1/2 md:-translate-x-1/2',
    'center-middle':
      'md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2',
    'center-bottom': 'md:bottom-0 md:left-1/2 md:-translate-x-1/2',
    'right-top': 'md:right-0 md:top-0',
    'right-middle': 'md:right-0 md:top-1/2 md:-translate-y-1/2',
    'right-bottom': 'md:right-0 md:bottom-0',
  };

  return (
    <div className="relative">
      {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
      <div
        className="bg-[#ccc]"
        style={{
          display: `${imageLoading ? 'none' : 'block'}`,
        }}
      >
        <DefaultAdaptiveImageRef
          ref={imageRef}
          onLoad={() => handleImageLoaded()}
          image={img?.image.image}
          imageAltText={image?.imageAltText}
          transformations={transformations}
          diParams={image?.di}
        />
      </div>
      {isOverlayVisible && (
        <div
          style={{
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            textAlign: textPositionHorizontal,
          }}
          className={clsx(
            'py-6 px-10 text-center max-w-[500px] md:absolute',
            placements[`${textPositionHorizontal}-${textPositionVertical}`],
          )}
        >
          <h1 className="mt-0">{bannerText?.header}</h1>
          <h2>{bannerText?.subheader}</h2>
          <p style={{marginBottom: '20px'}}>{bannerText?.description}</p>
          {ctaSettings && ctaSettings.buttonText && (
            <a
              className="mt-4 font-bold font text-xs no-underline hover:no-underline bg-[#333] hover:bg-[#eee] text-[#eee] hover:text-[#333] py-2.5 px-3.5 rounded"
              href={ctaSettings?.linkUrl}
            >
              {ctaSettings?.buttonText}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleBanner;
