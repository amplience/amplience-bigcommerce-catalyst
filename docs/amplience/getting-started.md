# Getting Started

## BigCommerce Configuration

Main BigCommerce configuration is set through an environment variable. You can set it locally in a `.env.local` file:

| Environment variable                     | Description                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| AUTH_SECRET                              | Random string                                                                                                   |
| BIGCOMMERCE_STORE_HASH                   | Store Hash, that you can find in the API path or admin URL: https://api.bigcommerce.com/stores/[store_hash]/v3/ |
| BIGCOMMERCE_ACCESS_TOKEN                 | Access Token, that you can get when creating a new set of credentials                                           |
| BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN | Customer Impersonation Token, to be generated using the access token from the API credentials                   |
| BIGCOMMERCE_CHANNEL_ID                   | Channell ID, default to 1                                                                                       |
| CLIENT_LOGGER                            | Client Logger, default to false                                                                                 |
| ENABLE_ADMIN_ROUTE                       | Enable Admin Route, default to true                                                                             |

You can follow the guide on the `dc-integration-middleware` project to generate your credentials: https://github.com/amplience/dc-integration-middleware/blob/main/docs/vendor/commerce/bigcommerce-cors.md

> Note: you will need the `Manage Storefront API Tokens` and the `Manage Storefront API Customer Impersonation Tokens` permissions when you create your set of credentials.

In the following section, you will see how you can generate the Customer Impersonation Token for Catalyst front-end.

### Customer Impersonation Token

You can generate the customer impersonation token by running:

```bash
curl --request POST \
  --url 'https://api.bigcommerce.com/stores/[store_hash]/v3/storefront/api-token-customer-impersonation' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Token: <access_token>' \
  --data '{"channel_id":1,"expires_at":1885635176}'
```

See https://developer.bigcommerce.com/docs/rest-authentication/tokens/customer-impersonation-token#create-a-token for more information.

## Amplience Configuration

### Environment file

Main Amplience configuration is set through an environment variable. You can set it locally in a `.env.local` file:

| Environment variable        | Description              |
| --------------------------- | ------------------------ |
| AMPLIENCE_HUBNAME           | Dynamic Content Hub Name |
| AMPLIENCE_FLEXIBLE_SLOT_KEY | Slot key for homepage    |

Slot key is usually `homepage` in the case of Demostore automation.

### eComm Toolkit extension

In the following section, you will see how you can generate the API Token (for the eComm Toolkit extension configuration).

#### API Token

You can generate the API Token for eComm Toolkit by running:

```bash
curl --request POST \
  --url 'https://api.bigcommerce.com/stores/[store_hash]/v3/storefront/api-token' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Token: [access_token]' \
  --data '{"allowed_cors_origins":["https://ecomm-toolkit.extensions.content.amplience.net", "https://localhost:3000"],"channel_id":1,"expires_at":1885635176}'
```

See https://developer.bigcommerce.com/docs/rest-authentication/tokens#create-a-token for more information.

You will also need your default store Site ID, which is different than the Store Hash.
You can go in your store and get the ID from the URL: `https://[site_id].mybigcommerce.com`

From there you can update the Installation Parameters of the eComm Toolkit extension with the following:

```json
{
  "vendor": "bigcommerce-cors",
  "codec_params": {
    "site_id": "<site_id>",
    "api_token": "<api_token>"
  }
}
```

### Content Types visualisation URL

You wil need to update / add new visualisation URLs:

- Shopify Hydrogen Development
- Shopify Hydrogen Production

Here is the list of Content Types to update:

- Blog
- Card
- Card List
- Curated Product Grid
- Dynamic Product Grid
- Flexible Slot
- Homepage (Site Pages hierarchy root node)
- Image
- Rich Text
- Simple Banner
- Text

The URL to use is the following:

- `https://localhost:3000/amplience/visualization?contentId={{content.sys.id}}&stagingEnvironment={{vse.domain}}&locale={{locales}}`

You can use the provided `update-content-types` script to automatically update these Content Types with both development (https://localhost:3000) and Production visualisations. You can specify the base domain for the Production visualisation using the `--prodUrl` parameter.

You can execute the script by running:

```bash
npm run update-content-types
```

Here are the options:

```
Update Content Types

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --hubId         amplience hub id                           [string] [required]
  --prodUrl       production url                                        [string]
  --clientId      amplience client id                        [string] [required]
  --clientSecret  amplience client secret                    [string] [required]
```

You can change the default URLs / ports in the `./config/amplience/default.js` file.
Default visualisations are stored in the `defaultVisualizations` property:

```js
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
```

You can also change visualisation URLs for a specific Content Type:

```js
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
```

### Preview URL

## Installing and running the project

You can install the project by running:

```bash
nvm use
npm ci
```

You can then get started immediately by running:

```bash
npm run dev
```
