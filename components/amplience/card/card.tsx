/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { DefaultContentBody } from 'dc-delivery-sdk-js';
import React, { useEffect, useRef, useState } from 'react';

import DefaultAdaptiveImageRef from '../adaptive-image/default-adaptive-image';
import DefaultAdaptiveImageSkeleton from '../adaptive-image/default-adaptive-image-skeleton';
import {
  AmplienceImage,
  ImageScaleFit,
  ImageScaleMode,
  ImageTransformations,
} from '../image/image.types';
import LinkWithQuery from '../link-with-query/link-with-query';

export interface CardProps {
  className?: string;
  image?: {
    img: {
      image: ImageTransformations & {
        image: AmplienceImage;
      };
    };
    disablePoiAspectRatio: boolean;
    imageAltText: string;
    di: string;
  };
  cardName?: string;
  description?: string;
  links?: Array<{ label: string; type: string; value: string } & DefaultContentBody>;
}

const Card = ({ image, cardName, description, links, ...other }: CardProps) => {
  const imageRef = useRef<any>();
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    if (imageRef.current?.complete && imageLoading) {
      setImageLoading(false);
    }
  }, [imageRef.current?.complete, imageLoading]);

  const { img } = image || {};

  const transformations: ImageTransformations = {
    ...img?.image,
    upscale: false,
    strip: true,
    quality: 80,
    scaleMode: !image?.disablePoiAspectRatio ? ImageScaleMode.ASPECT_RATIO : undefined,
    scaleFit:
      !image?.disablePoiAspectRatio &&
      img?.image.poi &&
      img.image.poi.x !== -1 &&
      img.image.poi.y !== -1
        ? ImageScaleFit.POINT_OF_INTEREST
        : undefined,
  };

  return (
    <div {...other}>
      <div
        style={{
          border: 'none',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
        }}
      >
        <div>
          {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
          <div style={{ display: imageLoading ? 'none' : 'block' }}>
            <DefaultAdaptiveImageRef
              diParams={image?.di}
              image={img?.image.image}
              imageAltText={image?.imageAltText}
              onLoad={() => handleImageLoaded()}
              ref={imageRef}
              transformations={transformations}
            />
          </div>
          {Boolean(cardName) && (
            <h2
              className="mb-4 mt-4 text-xl font-bold lg:text-2xl"
              style={{ marginTop: 15, marginBottom: 15 }}
            >
              {cardName}
            </h2>
          )}
          {Boolean(description) && <p className="mb-4">{description}</p>}
        </div>
        <div
          style={{
            justifyContent: 'center',
            paddingBottom: 20,
          }}
        >
          {links?.map((link, index) => {
            if (link.label) {
              return (
                <LinkWithQuery href={link.value} key={index}>
                  <button
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      color: '#fff',
                      backgroundColor: '#000',
                      borderRadius: 3,
                    }}
                  >
                    <h4
                      style={{
                        color: '#fff',
                      }}
                    >
                      {link.label}
                    </h4>
                  </button>
                </LinkWithQuery>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
