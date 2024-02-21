import { AmplienceContentItem, fetchContent } from '..';

export const getContentById = async (id: string): Promise<AmplienceContentItem | undefined> => {
  const contentItem = (await fetchContent([{ id }]))[0];

  return contentItem;
};
