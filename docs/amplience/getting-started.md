# Getting Started

## BigCommerce Configuration

Main BigCommerce configuration is set through an environment variable. You can set it locally in a `.env.local` file:

```
AUTH_SECRET=<random string>
BIGCOMMERCE_STORE_HASH=<store hash>
BIGCOMMERCE_ACCESS_TOKEN=<access token>
BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN=<customer impersonation token>
BIGCOMMERCE_CHANNEL_ID=1
CLIENT_LOGGER=false
ENABLE_ADMIN_ROUTE=true
```

You can follow the guide on the `dc-integration-middleware` project to generate your credentials: https://github.com/amplience/dc-integration-middleware/blob/main/docs/vendor/commerce/bigcommerce-cors.md

In the following section, you will see how you can generate the Customer Impersonation Token for Catalyst front-end.

#### Customer Impersonation Token

## Amplience Configuration

### Environment file

Main Amplience configuration is set through an environment variable. You can set it locally in a `.env.local` file:

```
AMPLIENCE_HUBNAME=<dc hubname>
AMPLIENCE_FLEXIBLE_SLOT_KEY=<slot key for homepage>
```

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
