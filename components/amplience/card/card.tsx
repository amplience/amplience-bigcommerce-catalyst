'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Link } from '~/components/link';
import { AmplienceImage } from '../image/image.types';
import { ImageScaleMode, ImageScaleFit, ImageTransformations } from '../image/image.types';
import DefaultAdaptiveImageRef from '../adaptive-image/default-adaptive-image';
import DefaultAdaptiveImageSkeleton from '../adaptive-image/default-adaptive-image-skeleton';

export interface CardProps {
  classes?: any;
  className?: string;
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
  cardName?: string;
  description?: string;
  links?: any[];
}

const Card = ({ image, cardName, description, links }: CardProps) => {
  const imageRef = useRef<any>();
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    if (imageRef?.current?.complete && imageLoading) {
      setImageLoading(false);
    }
  }, [imageRef?.current?.complete, imageLoading]);
  const { img } = image || {};

  const transformations: ImageTransformations = {
    ...img?.image,
    upscale: false,
    strip: true,
    quality: 80,
    scaleMode: !image?.disablePoiAspectRatio ? ImageScaleMode.ASPECT_RATIO : undefined,
    scaleFit:
      !image?.disablePoiAspectRatio &&
      img?.image?.poi &&
      img?.image?.poi.x != -1 &&
      img?.image?.poi.y != -1
        ? ImageScaleFit.POINT_OF_INTEREST
        : undefined,
  };

  return (
    <div>
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
          <div style={{ display: `${imageLoading ? 'none' : 'block'}` }}>
            <DefaultAdaptiveImageRef
              ref={imageRef}
              onLoad={() => handleImageLoaded()}
              image={img?.image.image}
              imageAltText={image?.imageAltText}
              transformations={transformations}
              diParams={image?.di}
            />
          </div>
          {cardName && <h2 style={{ marginTop: 15, marginBottom: 15 }}>{cardName}</h2>}
          {description && <p>{description}</p>}
        </div>
        <div
          style={{
            justifyContent: 'center',
            paddingBottom: 20,
          }}
        >
          {links &&
            links.map((link: any, i: number) => {
              if (link.label) {
                return (
                  <Link href={link.value}>
                    <button
                      style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        color: '#fff',
                        backgroundColor: '#000',
                        borderRadius: 3,
                      }}
                      key={i}
                    >
                      <h4
                        style={{
                          color: '#fff',
                        }}
                      >
                        {link.label}
                      </h4>
                    </button>
                  </Link>
                );
              } else {
                return null;
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Card;
