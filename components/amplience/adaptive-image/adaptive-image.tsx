/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createContext, forwardRef, LegacyRef, type MutableRefObject, type ReactNode } from 'react';

import { type AmplienceImage, type ImageTransformations } from '../image/image.types';
import { getImageURL } from '../image/image.utils';

interface ContextState {
  image: AmplienceImage;
  transformations?: ImageTransformations;
  diParams?: string;
  srcset?: {
    [factor: string]: ImageTransformations;
  };
}

export const AdaptiveImageContext = createContext<ContextState | null>(null);

export interface AdaptiveImageProps {
  image: AmplienceImage;
  transformations?: ImageTransformations;
  imageRef?: LegacyRef<HTMLImageElement>;
  children?: ReactNode[];
  imageAltText?: string;
  diParams?: string;
  onLoad: () => void;
}

const AdaptiveImage = ({
  image,
  imageAltText = '',
  transformations,
  diParams = '',
  children,
  imageRef,
  ...other
}: AdaptiveImageProps) => {
  if (!image) {
    return null;
  }

  const defaultImageUrl = getImageURL(image, transformations, false, diParams);

  return (
    <AdaptiveImageContext.Provider
      value={{
        image,
        transformations,
        diParams,
      }}
    >
      <picture>
        {children}
        <img alt={imageAltText} ref={imageRef} src={defaultImageUrl} {...other} width="100%" />
      </picture>
    </AdaptiveImageContext.Provider>
  );
};

const AdaptiveImageRef = forwardRef((props: AdaptiveImageProps, ref) => (
  <AdaptiveImage {...props} imageRef={ref as MutableRefObject<HTMLImageElement>}>
    {props.children}
  </AdaptiveImage>
));

export default AdaptiveImageRef;
