# How to port Amplience into an existing Catalyst app

This guide is aimed at existing Catalyst apps and the steps needed to fetch and visualize Amplience content.

## Add Amplience environment variables

Update `.env.local` to include the Amplience hub you want to use:

```env
AMPLIENCE_HUBNAME=yourhubnamehere
```

## Implement the Amplience client

To fetch any content from Amplience the first thing you will need is a client to make the requests.

Install Amplience client dependencies:

```bash
npm install @haverstack/axios-fetch-adapter dc-delivery-sdk-js
```

Copy the directory `amplience-client` and its contents to the root of your catalyst app e.g.

```bash
cp -R '/path/to/amplience-catalyst-app/amplience-client' '/path/to/existing-catalyst-app'
```

## Fetching Amplience content on a page

With the client installed you can use it to fetch Amplience content on any page. Simply import the client:

```js
import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
```

Create an Amplience client and pass any options. In this example we are using the `clientOptionsMapper` to map `searchParams` given to us by the page props:

```js
const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));
```

Now you can use the client to fetch content:

```js
const simpleBanner = (
  await amplienceClient.getContentItemByKey('docs/story/simplebanner/banner1')
).toJSON();
```

## Add Amplience wrapper and components

This project uses an Amplience wrapper component and various other components to support rendering Amplience content. If you would like to use these:

Next install Amplience component depedencies:

```bash
npm install markdown-to-jsx
```

Copy the Amplience components directory `./components/amplience`:

```bash
cp -R '/path/to/amplience-catalyst-app/components/amplience' '/path/to/existing-catalyst-app/compontents'
```

You will also need to copy a single `util` file:

```bash
mkdir -p /path/to/existing-catalyst-app/utils/ && cp /path/to/amplience-catalyst-app/utils/localized-string.ts $_
```

Now you can render Amplience content by simply passing Amplience content to the `AmplenceContent` component:

```js
<AmplienceContent content={simpleBanner} />
```

## Using a Visualization page

If you would like to Visualize Amplience content then you will need to provide a Visualization page route. To do this:

Install Visualization dependencies:

```bash
npm install dc-visualization-sdk
```

Copy the Visualization page directory `./app/visualization` to your existing app:

```bash
mkdir -p /path/to/existing-catalyst-app/app/[locale]/(default)/amplience/visualization && cp -R /path/to/amplience-catalyst-app/app/amplience/visualization $_
```

And copy the Amplience visualization context:

```bash
mkdir -p /path/to/existing-catalyst-app/app/contexts/amplience && cp -R /path/to/amplience-catalyst-app/app/contexts/amplience/realtime-visualization-context.tsx $_
```
