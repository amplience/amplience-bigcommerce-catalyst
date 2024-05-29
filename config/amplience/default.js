module.exports = {
  defaultVisualizations: [
    {
      label: 'BigCommerce Catalyst Production',
      templatedUri:
        '{{prodUrl}}/amplience/visualization?contentId={{content.sys.id}}&stagingEnvironment={{vse.domain}}&locale={{locales}}',
      default: false,
    },
    {
      label: 'BigCommerce Catalyst Development',
      templatedUri:
        'https://localhost:3000/amplience/visualization?contentId={{content.sys.id}}&stagingEnvironment={{vse.domain}}&locale={{locales}}',
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
      contentTypeUri: 'https://demostore.amplience.com/content/curated-product-grid',
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
          label: 'BigCommerce Catalyst Production',
          templatedUri: '{{prodUrl}}?vse={{vse.domain}}',
          default: false,
        },
        {
          label: 'BigCommerce Catalyst Development',
          templatedUri: 'https://localhost:3000?vse={{vse.domain}}',
          default: false,
        },
      ],
    },
  ],
};
