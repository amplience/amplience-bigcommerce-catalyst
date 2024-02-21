export interface ContentItemRequest {
  id?: string;
  key?: string;
}
export interface AmplienceContentItem {
  [key: string]: Record<string, unknown>;
}

export interface ContentContext {
  hubName: string;
  stagingHost?: string;
}
export interface ContentParams {
  depth?: string;
  format?: string;
  locale?: string;
}

const DEFAULT_PARAMS = { depth: 'all', format: 'inlined', locale: 'en-US' };
const HUB_NAME = process.env.AMPLIENCE_HUBNAME ?? '';

export const fetchContent = async (
  items: ContentItemRequest[],
  params: ContentParams = DEFAULT_PARAMS,
): Promise<AmplienceContentItem[]> => {
  const host = `${HUB_NAME}.cdn.content.amplience.net`;
  const url = `https://${host}/content`;
  const qs = new URLSearchParams({ ...DEFAULT_PARAMS, ...params }).toString();

  return Promise.all(
    items.map(async (item) => {
      const path = item.id ? `id/${item.id}` : `key/${item.key ?? ''}`;
      const response = await fetch(`${url}/${path}?${qs}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json: { content: AmplienceContentItem } = await response.json();

      return json.content;
    }),
  );
};
