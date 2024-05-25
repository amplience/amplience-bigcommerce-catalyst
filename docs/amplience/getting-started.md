# Getting Started

## BigCommerce Configuration

Main BigCommerce configuration is set through an environment variable. You can set it locally in a `.env.local` file:

| Environment variable                     | Description                                                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| AUTH_SECRET                              | <random string>                                                                                                   |
| BIGCOMMERCE_STORE_HASH                   | <store hash>, that you can find in the API path or admin URL: https://api.bigcommerce.com/stores/>store hash>/v3/ |
| BIGCOMMERCE_ACCESS_TOKEN                 | <access token>, that you can get when creating a new set of credentials                                           |
| BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN | <customer impersonation token>, to be generated using the access token from the API credentials                   |
| BIGCOMMERCE_CHANNEL_ID                   | Channell ID, default to 1                                                                                         |
| CLIENT_LOGGER                            | Client Logger, default to false                                                                                   |
| ENABLE_ADMIN_ROUTE                       | Enable Admin Route, default to true                                                                               |

You can follow the guide on the `dc-integration-middleware` project to generate your credentials: https://github.com/amplience/dc-integration-middleware/blob/main/docs/vendor/commerce/bigcommerce-cors.md

> Note: you will need the `Manage Storefront API Tokens` and the `Manage Storefront API Customer Impersonation Tokens` permissions when you create your set of credentials.

In the following section, you will see how you can generate the Customer Impersonation Token for Catalyst front-end.

### Customer Impersonation Token

You can generate the customer impersonation token by running:

```
curl --request POST \
  --url 'https://api.bigcommerce.com/stores/<store hash>/v3/storefront/api-token-customer-impersonation' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Token: <access token>' \
  --data '{"channel_id":1,"expires_at":1885635176}'
```

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

```
curl --request POST \
  --url 'https://api.bigcommerce.com/stores/<store hash>/v3/storefront/api-token' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Token: <access token>' \
  --data '{"allowed_cors_origins":["https://ecomm-toolkit.extensions.content.amplience.net", "https://localhost:3000"],"channel_id":1,"expires_at":1885635176}'
```

You will also need your default store Site ID, which is different than the Store Hash.
You can go in your store and get the ID from the URL: `https://<site id>.mybigcommerce.com`

From there you can update the Installation Parameters of the eComm Toolkit extension with the following:

```
{
  "vendor": "bigcommerce-cors",
  "codec_params": {
    "site_id": "<site id>",
    "api_token": "<api token>"
  }
}
```

### Content Types visualisation URL

You wil need to update / add a new visualisation URL to the following Content Types:
- Blog
- Card
- Card List
- Image
- Text
- Simple Banner
- Flexible Slot

The URL to use is the following: 

### Preview URL

## Installing and running the project

You can install the project by running:

```
nvm use
npm ci
```

You can then get started immediately by running:

```
npm run dev
```
