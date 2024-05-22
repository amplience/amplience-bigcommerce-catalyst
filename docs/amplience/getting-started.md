# Getting Started

Main Amplience configuration is set through an environment variable. You can set it locally in a `.env.local` file:

```
AMPLIENCE_HUBNAME=<dc hubname>
AMPLIENCE_FLEXIBLE_SLOT_KEY=<slot key for homepage>
```

Slot key is usually `homepage` in the case of Demostore automation.

If this installation of Catalyst was created using the catalyst-storefront CLI, you should already be connected to a store and can get started immediately by running:

```
npm run dev
```

If you want to connect to another store or channel, you can run the setup process again by running:

```
npx create-catalyst-storefront@latest init
```

Learn more about Catalyst at catalyst.dev.
