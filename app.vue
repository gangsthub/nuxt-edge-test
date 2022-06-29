<script setup lang="ts">
// Location
const location = useLocation();

// Language
const lang = useLang();
</script>

<template>
  <article>
    <header v-if="location">
      <h1>{{ location.city }}</h1>
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

    <ClientOnly>
      <h2>
        Browser language: <output>{{ lang }}</output>
      </h2>
    </ClientOnly>
  </article>
  <ClientOnly>
    <Globe v-if="location" :lat="location.lat" :lon="location.lon" />
  </ClientOnly>
</template>

<style scoped>
article,
h1,
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

h1,
h2 {
  left: 50%;
  transform: translateX(-50%);
}

h1,
output {
  color: goldenrod;
}

h1 {
  top: 7vh;
  font-size: 5vh;
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
