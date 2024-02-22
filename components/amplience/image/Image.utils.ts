/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable complexity */
import { AmplienceContentItem } from '~/amplience-client';

import { AmplienceImage, ImageFormat, ImageTransformations } from './image.types';

const avifMaxPixels = 2500000;

function limitSize(
  width: number,
  height: number,
  maxPixels: number,
): { width: number; height: number } | undefined {
  const pixels = width * height;

  if (pixels <= maxPixels) {
    return undefined;
  }

  const heightFromWidth = height / width;

  const newWidth = Math.floor(Math.sqrt(maxPixels / heightFromWidth));
  const newHeight = Math.floor(newWidth * heightFromWidth);

  return {
    width: newWidth,
    height: newHeight,
  };
}

function constrainMaxSize(
  transformations: ImageTransformations,
  maxPixels: number,
): ImageTransformations {
  const aspect = transformations.aspectRatio;

  if (transformations.width == null && transformations.height == null) {
    return transformations;
  }

  // Both dimensions can be controlled.
  if (transformations.width != null && transformations.height != null) {
    const newSize = limitSize(transformations.width, transformations.height, maxPixels);

    return newSize == null
      ? transformations
      : {
          ...transformations,
          width: newSize.width,
          height: newSize.height,
        };
  }

  // Can only control scale if we know the aspect.
  if (aspect == null) {
    return transformations;
  }

  const aspectSplit = aspect.split(':');
  const widthFromHeight = Number(aspectSplit[0]) / Number(aspectSplit[1]);
  const heightFromWidth = 1 / widthFromHeight;

  if (Number.isNaN(widthFromHeight)) {
    return transformations;
  }

  if (transformations.width != null) {
    // Scale the width to be within the maxPixels.
    const newSize = limitSize(
      transformations.width,
      transformations.width * heightFromWidth,
      maxPixels,
    );

    return newSize == null
      ? transformations
      : {
          ...transformations,
          width: newSize.width,
        };
  } else if (transformations.height != null) {
    // Height must be defined instead.
    const newSize = limitSize(
      transformations.height * widthFromHeight,
      transformations.height,
      maxPixels,
    );

    return newSize == null
      ? transformations
      : {
          ...transformations,
          height: newSize.height,
        };
  }

  // Not really possible to get here, but typescript doesn't know that.
  return transformations;
}

export function getImageURL(
  image: string | AmplienceImage,
  transformations: ImageTransformations = {},
  removeAllParams = false,
  diParams = '',
): string {
  const modifiedTransformations = constrainMaxSize(transformations, avifMaxPixels);

  const {
    seoFileName,
    format = ImageFormat.DEFAULT,
    width,
    height,
    poi,
    scaleMode,
    scaleFit,
    aspectRatio,
    upscale = false,
    fliph,
    flipv,
    rot,
    hue,
    sat,
    bri,
    crop,
    templates,
    strip,
    quality,
  } = modifiedTransformations;

  let url =
    typeof image === 'string'
      ? image
      : `https://${image.defaultHost}/i/${encodeURIComponent(
          image.endpoint,
        )}/${encodeURIComponent(image.name)}`;

  if (seoFileName) {
    url += `/${encodeURIComponent(seoFileName)}`;
  }

  // Remove all existing URL parameters
  if (removeAllParams && url.indexOf('?') > -1) {
    url = url.split('?')[0] as string;
  }

  const query: string[] = [];

  // Get parameters from Transformations
  const params: any = {
    w: width,
    h: height,
    sm: scaleMode,
    scaleFit,
    aspect: aspectRatio,
    upscale,
    fliph,
    flipv,
    rotate: rot,
    hue: hue ? (hue * 100) / 180 : null,
    sat,
    bri,
    strip,
    qlt: quality,
  };

  // Re-add existing parameters from URL
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  let match;

  while ((match = regex.exec(url))) {
    if (params[match[1]!] === undefined || params[match[1]!] == null) params[match[1]!] = match[2];
  }

  // Add all parameters to query
  for (const param of Object.keys(params)) {
    const value = params[param];

    if (value !== undefined && value !== null && value !== 0) {
      query.push(`${param}=${value}`);
    }
  }

  if (poi && poi.x !== -1 && poi.y !== -1) {
    query.push(`poi=${poi.x},${poi.y},0.01,0.01`);
  }

  if (crop && crop.length === 4 && crop.filter((x) => x !== 0).length > 0) {
    query.push(`crop=${crop[0]},${crop[1]},${crop[2]},${crop[3]}`);
  }

  if (templates) {
    for (const template of templates) {
      query.push(`$${template}$`);
    }
  }

  // Add format and quality
  query.push(`fmt=${format}`);
  query.push('qlt=default');

  // Set max sizes
  if (params.h == null && params.w == null) {
    query.push('maxH=1500');
    query.push('maxW=1500');
  }

  // Rebuild URL
  if (url.indexOf('?') > -1) {
    url = url.split('?')[0] as string;
  }

  url += `?${query.join('&')}`;

  // Add the additional DI Params
  if (diParams) {
    // check to add an ampersand first
    if (diParams.charAt(0) !== '&') {
      diParams = `&${diParams}`;
    }

    url += diParams;
  }

  return url;
}

export const buildSrcUrl = ({
  width,
  poiAspect,
  image,
  seoText,
  display,
  query,
  di,
}: {
  width?: number;
  poiAspect?: string;
  image: AmplienceContentItem;
  seoText: string;
  display: string;
  query: string;
  di: string;
}) => {
  let baseUrl = `https://${image.defaultHost}/i/${
    image.endpoint
  }/${encodeURIComponent(image.name)}`;
  const transformations: ImageTransformations = {};

  if (seoText) {
    baseUrl += `/${encodeURIComponent(seoText)}`;
  }

  transformations.width = width;
  transformations.upscale = false;
  transformations.strip = true;

  let queryString = '';

  if (display === 'Point of Interest' && poiAspect) {
    transformations.aspectRatio = poiAspect;
    queryString += `&{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.x},{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.y},{$root.layer0.metadata.pointOfInterest.w},{$root.layer0.metadata.pointOfInterest.h}&scaleFit=poi&sm=aspect`;
  }

  if (query) {
    queryString += `&${query}`;
  }

  return getImageURL(`${baseUrl}?${queryString}`, transformations, false, di);
};
