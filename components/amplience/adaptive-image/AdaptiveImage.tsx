import {
  type MutableRefObject,
  type ReactNode,
  createContext,
  forwardRef,
} from 'react';
import {
  type AmplienceImage,
  type ImageTransformations,
} from '../image/Image.types';
import {getImageURL} from '../image/Image.utils';

type ContextState = {
  image: AmplienceImage;
  transformations?: ImageTransformations;
  diParams?: string;
  srcset?: {
    [factor: string]: ImageTransformations;
  };
};

export const AdaptiveImageContext = createContext<ContextState | null>(null);

export type AdaptiveImageProps = {
  image: AmplienceImage;
  transformations?: ImageTransformations;
  imageRef?: any;
  children?: ReactNode[];
  imageAltText?: string;
  diParams?: string;
  onLoad: () => void;
};

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
        <img
          alt={imageAltText}
          ref={imageRef}
          src={defaultImageUrl}
          {...other}
          width="100%"
        />
      </picture>
    </AdaptiveImageContext.Provider>
  );
};

const AdaptiveImageRef = forwardRef((props: AdaptiveImageProps, ref) => (
  <AdaptiveImage
    {...props}
    imageRef={ref as MutableRefObject<HTMLImageElement>}
  >
    {props.children}
  </AdaptiveImage>
));

export default AdaptiveImageRef;
