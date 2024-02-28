import { type DetailedHTMLProps, type SourceHTMLAttributes, useContext, useMemo } from 'react';

import { type ImageTransformations } from '../image/image.types';
import { getImageURL } from '../image/image.utils';

import { AdaptiveImageContext } from './adaptive-image';

type AdaptiveImageSourceProps = DetailedHTMLProps<
  SourceHTMLAttributes<HTMLSourceElement>,
  HTMLSourceElement
> & {
  transformations?: ImageTransformations;
};

const AdaptiveImageSource = ({ transformations, ...other }: AdaptiveImageSourceProps) => {
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
    }

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
  }, [image, rootTransformations, transformations, diParams]);

  return imageUrl ? (
    <source srcSet={`${imageUrl} 1x, ${imageUrl2x} 2x`} src={imageUrl} {...other} />
  ) : null;
};

export default AdaptiveImageSource;
