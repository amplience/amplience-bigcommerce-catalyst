import { AmplienceContentItem, fetchContent } from '..';

export const getContentByKey = async (key: string): Promise<AmplienceContentItem | undefined> => {
  const contentItem = (await fetchContent([{ key }]))[0];

  return contentItem;
};
