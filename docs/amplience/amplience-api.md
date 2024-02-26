# Amplience API

In order for any area of the application to be able to request content from Amplience we have put all API methods into series of services found in `/app/amplience-client/`.

You can use the methods in the `AmplienceClient` to get content by id or by key.

Getting content by id:

```js
  async getContentItemById(id: string) {
    const path = `id/${id}`;
    const qs = new URLSearchParams(this.params).toString();
    const response = await fetch(`${this.url}/${path}?${qs}`);
    const json: { content: AmplienceContentItem } = await response.json();

    return json.content;
  }
```

Getting content by key:

```js
  async getContentItemByKey(id: string) {
    const path = `key/${id}`;
    const qs = new URLSearchParams(this.params).toString();
    const response = await fetch(`${this.url}/${path}?${qs}`);
    const json: { content: AmplienceContentItem } = await response.json();

    return json.content;
  }
```

You can instantiate an `AmplienceContent` class using your account details and then get content. For instance in the visualisation page:

```js
const amplienceClient = createAmplienceClient({ hubName, locale, stagingEnvironment });

const content = await amplienceClient.getContentItemById(contentId);
```
