export const contentTypesPatch = {
  defaultVisualizations: [
    {
      label: 'Shopify Hydrogen Production',
      templatedUri:
        '{{prodUrl}}/{{locales}}/visualization?content={{content.sys.id}}&vse={{vse.domain}}&hub={{hub.name}}',
      default: false,
    },
    {
      label: 'Shopify Hydrogen Development',
      templatedUri:
        'http://localhost:3000/{{locales}}/visualization?content={{content.sys.id}}&vse={{vse.domain}}&hub={{hub.name}}',
      default: false,
    },
  ],
  contentTypes: [
    {
      contentTypeUri: 'https://demostore.amplience.com/content/card',
    },
    {
      contentTypeUri: 'https://demostore.amplience.com/content/card-list',
    },
    {
      contentTypeUri: 'https://demostore.amplience.com/content/blog',
    },
    {
      contentTypeUri:
        'https://demostore.amplience.com/content/curated-product-grid',
    },
    {
      contentTypeUri: 'https://demostore.amplience.com/content/product-grid',
    },
    {
      contentTypeUri: 'https://demostore.amplience.com/slots/flexible',
    },
    {
      contentTypeUri: 'https://demostore.amplience.com/content/image',
    },
    {
      contentTypeUri: 'https://demostore.amplience.com/content/rich-text',
    },
    {
      contentTypeUri: 'https://demostore.amplience.com/content/simple-banner',
    },
    {
      contentTypeUri: 'https://demostore.amplience.com/content/text',
    },
    {
      contentTypeUri: 'https://demostore.amplience.com/site/pages',
      visualizations: [
        {
          label: 'Shopify Hydrogen Production',
          templatedUri: '{{prodUrl}}?vse={{vse.domain}}',
          default: false,
        },
        {
          label: 'Shopify Hydrogen Development',
          templatedUri: 'http://localhost:3000?vse={{vse.domain}}',
          default: false,
        },
      ],
    },
  ],
  applications: [
    {
      name: 'Shopify Hydrogen Production',
      templatedUri: '{{prodUrl}}?vse={{vse.domain}}',
    },
    {
      name: 'Shopify Hydrogen Development',
      templatedUri: 'http://localhost:3000?vse={{vse.domain}}',
    },
  ],
};
