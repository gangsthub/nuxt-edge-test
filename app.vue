<script setup lang="ts">
import { VercelApiResponse } from './types';

// Location
let location = ref();
const message = ref('Application running (server-side) from:');
try {
  const { data: info } = await useAsyncData(() =>
    globalThis.$fetch<VercelApiResponse>('/api/vercelLocation', {
      headers: useRequestHeaders(['x-forwarded-for', 'x-vercel-ip-city']),
    })
  );

  if (info.value.ip === '-') {
    throw new Error("Can't connect with Vercel Network");
  }

  location.value = unref(info);
  message.value = `Hello from Vercel Edge`;
} catch (_e) {
  try {
    location = useLocation();
  } catch (error) {
    console.log(_e, error);
  }
}

// Language
const lang = useLang();
</script>

<template>
  <article>
    <header v-if="location">
      <div class="disclaimer">
        <p>{{ message }}</p>
        <h1>{{ location.city }}</h1>
      </div>
      <div class="info">
        <span>🌎</span>
        <span
          >Lat: <code>{{ location.lat }}</code></span
        >
        <span
          >Long: <code>{{ location.lon }}</code></span
        >
      </div>
    </header>

    <h2>
      Browser language: <output>{{ lang }}</output>
    </h2>
  </article>
  <ClientOnly>
    <Globe v-if="location" :lat="location.lat" :lon="location.lon" />
  </ClientOnly>
</template>

<style scoped>
article,
.disclaimer,
h2 {
  position: absolute;
}
article {
  mix-blend-mode: plus-lighter;
  color: rgba(255 255 255 / 0.8);
  padding: 1em;
  width: 100vw;
  height: 100%;
  pointer-events: none;
}

header {
  text-align: right;
}

.disclaimer,
h2 {
  left: 50%;
  transform: translateX(-50%);
}

h1,
output {
  color: goldenrod;
}

.disclaimer {
  text-align: center;
  top: 7vh;
}
.disclaimer p {
  margin: 0;
}
h1 {
  font-size: 5vh;
  margin-top: 0;
}
.info {
  display: inline-flex;
  align-items: center;
  gap: 1em;
}
h2 {
  bottom: 2.5em;
  font-size: 2vh;
  font-weight: normal;
}
</style>
