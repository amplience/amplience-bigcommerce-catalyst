# Visualisation (Real time)

One of the advantages of using Amplience is that it is the only headless CMS for commerce that ensures that you can see what you are editing.

## Setting up a specific visualisation route

Visualisation page can be found here:`app/amplience/visualization/page.tsx`. This route is added to the Visualisations in your Amplience Content Type.

Import:

```js
import { createAmplienceClient } from '~/amplience-client';
import RealtimeVisualization from '~/components/amplience/realtime-visualization/realtime-visualization';
```

This route is added to the Visualisations in your Amplience Content Type: `http://localhost:3000/amplience/visualization?contentId={{content.sys.id}}&stagingEnvironment={{vse.domain}}&locale={{locales}}`

## Real Time Visualisation

Real time visualisation uses the Amplience [Real Time visualisation SDK](https://github.com/amplience/dc-visualization-sdk) in order to load content and change props in your component in real time as you are editing.

Location: `components/amplience/realtime-visualization/realtime-visualization.tsx`
