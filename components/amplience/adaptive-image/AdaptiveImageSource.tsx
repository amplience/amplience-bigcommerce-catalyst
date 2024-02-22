import {
  useContext,
  useMemo,
  type SourceHTMLAttributes,
  type DetailedHTMLProps,
} from 'react';
import {AdaptiveImageContext} from './AdaptiveImage';
import {type ImageTransformations} from '../image/Image.types';
import {getImageURL} from '../image/Image.utils';

type AdaptiveImageSourceProps = DetailedHTMLProps<
  SourceHTMLAttributes<HTMLSourceElement>,
  HTMLSourceElement
> & {
  transformations?: ImageTransformations;
};

const AdaptiveImageSource = ({
  transformations,
  ...other
}: AdaptiveImageSourceProps) => {
  const {
    image,
    transformations: rootTransformations,
    diParams,
  } = useContext(AdaptiveImageContext) || {};

  const [imageUrl, imageUrl2x] = useMemo(() => {
    const params = {
      ...rootTransformations,
      ...transformations,
    };

    if (!image) {
      return [undefined, undefined];
    } else {
      return [
        getImageURL(image, params, false, diParams),
        getImageURL(
          image,
          {
            ...params,
            width: params.width ? params.width * 2 : undefined,
            height: params.height ? params.height * 2 : undefined,
          },
          false,
          diParams,
        ),
      ];
    }
  }, [image, rootTransformations, transformations, diParams]);
  return imageUrl ? (
    <source
      srcSet={`${imageUrl} 1x, ${imageUrl2x} 2x`}
      src={imageUrl}
      {...other}
    />
  ) : null;
};

export default AdaptiveImageSource;
