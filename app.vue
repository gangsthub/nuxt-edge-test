<template>
  <div>
    <h1>
      Hello<span v-if="location">, {{ location.city }}</span
      >!
    </h1>
    <pre v-if="location"><code>
      {
        latitude: {{location.lat}},
        longitude: {{location.lon}},
      }
    </code></pre>
    <ClientOnly>
      <h2>
        Language: <output>{{ lang }}</output>
      </h2>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Location
const location = useLocation();

// Language
const lang = useLang();
</script>
