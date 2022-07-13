# Nuxt in the edge

This Nuxt app was used as a demo at the Vue.js Roadtrip Barcelona 2022 conference.

- 🌎 Demo: https://nuxt-edge-test.graficos-net.workers.dev/
- 📺 Slides: https://slides.com/paul_melero/nuxt-on-the-edge
- 👀 Recording from Vue.js RoadTrip Barcelona 2022: https://youtu.be/MZbDrmgpqcc?t=19206

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
```

Locally preview production build:

```bash
# If you're targeting Cloudflare Workers:
npm run miniflare
```

Deploy to Clouflare Workers:

```bash
npm run build && npm run publish
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
