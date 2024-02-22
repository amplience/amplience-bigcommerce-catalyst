/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export interface AmplienceContentItem {
  [key: string]: unknown;
}

interface AmplienceClientOptions {
  hubName?: string;
  stagingEnvironment?: string;
  locale?: string;
}

class AmplienceClient {
  url: string;
  hubName: string;
  stagingEnvironment: string;
  params: { depth: string; format: string; locale: string };
  constructor({ hubName, stagingEnvironment, locale }: AmplienceClientOptions) {
    const hub = hubName || process.env.AMPLIENCE_HUBNAME || '';
    const host = stagingEnvironment || `${hub}.cdn.content.amplience.net`;

    this.url = `https://${host}/content`;
    this.hubName = hub;
    this.stagingEnvironment = stagingEnvironment || '';
    this.params = { depth: 'all', format: 'inlined', locale: locale || 'en-US' };
  }

  async getContentItemById(id: string) {
    const path = `id/${id}`;
    const qs = new URLSearchParams(this.params).toString();
    const response = await fetch(`${this.url}/${path}?${qs}`);
    const json: { content: AmplienceContentItem } = await response.json();

    return json.content;
  }

  async getContentItemByKey(id: string) {
    const path = `key/${id}`;
    const qs = new URLSearchParams(this.params).toString();
    const response = await fetch(`${this.url}/${path}?${qs}`);
    const json: { content: AmplienceContentItem } = await response.json();

    return json.content;
  }
}

export const createAmplienceClient = ({
  hubName,
  stagingEnvironment,
  locale,
}: AmplienceClientOptions) => {
  return new AmplienceClient({ hubName, stagingEnvironment, locale });
};
