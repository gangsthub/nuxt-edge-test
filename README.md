# Nuxt in the edge

This Nuxt app was used as a demo at the Vue.js Roadtrip Barcelona 2022 conference.

- 🌎 Demo: https://nuxt-edge-test.graficos-net.workers.dev/
- 📺 Slides: https://slides.com/paul_melero/nuxt-on-the-edge
- 👀 Recording from Vue.js RoadTrip Barcelona 2022: https://youtu.be/MZbDrmgpqcc?t=19267

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
# until Nuxt+Nitro gets more stable, you might need to set manually NITRO_PRESET to your target preset
```

Locally preview production build:

```bash
# If you're targeting Cloudflare Workers:
NITRO_PRESET=cloudflare npm run build && npm run miniflare
# If you're targeting Vercel:
npm i -g vercel
NITRO_PRESET=vercel-edge yarn build && vercel
```

Deploy to Clouflare Workers:

```bash
NITRO_PRESET=cloudflare npm run build && npm run publish
```

Deploy to Vercel:

```bash
# if you haven't installed vercel CLI yet, do so:
npm i -g vercel
# and then:
NITRO_PRESET=vercel-edge yarn build && vercel
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
