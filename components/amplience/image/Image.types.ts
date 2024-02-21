export type AmplienceImage = {
  defaultHost: string;
  name: string;
  endpoint: string;
};

export enum ImageFormat {
  WEBP = 'webp',
  JPEG = 'jpeg',
  PNG = 'png',
  GIF = 'gif',
  AVIF = 'avif',
  DEFAULT = 'default',
}

export enum ImageScaleMode {
  ASPECT_RATIO = 'aspect',
  CROP = 'c',
  STRETCH = 's',

  TOP_LEFT = 'tl',
  TOP_CENTER = 'tc',
  TOP_RIGHT = 'tr',

  MIDDLE_LEFT = 'ml',
  MIDDLE_CENTER = 'mc',
  MIDDLE_RIGHT = 'mr',

  BOTTOM_LEFT = 'bl',
  BOTTOM_CENTER = 'bc',
  BOTTOM_RIGHT = 'br',
}

export enum ImageScaleFit {
  CENTER = 'center',
  POINT_OF_INTEREST = 'poi',
}

export type ImageTransformations = {
  format?: ImageFormat;
  seoFileName?: string;

  width?: number;
  height?: number;

  quality?: number;

  poi?: {x: number; y: number};
  scaleMode?: ImageScaleMode;
  scaleFit?: ImageScaleFit;
  aspectRatio?: string;
  upscale?: boolean;

  fliph?: boolean;
  flipv?: boolean;

  rot?: number;
  hue?: number;
  sat?: number;
  bri?: number;
  crop?: number[];

  strip?: boolean;

  templates?: string[];
};
