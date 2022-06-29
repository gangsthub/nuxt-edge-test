<template>
  <div id="globe"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  lat: Number,
  lon: Number,
});

const marker = {
  lat: props.lat,
  lng: props.lon,
  maxR: Math.random() * 20 + 3,
  propagationSpeed: (Math.random() - 0.5) * 20 + 1,
  repeatPeriod: Math.random() * 2000 + 200,
};

const colorInterpolator = (t) => `rgba(0,255,255,${1 - t})`;

onMounted(async () => {
  const {
    WebGLRenderer,
    Scene,
    AmbientLight,
    DirectionalLight,
    PerspectiveCamera,
    Group,
  } = await import('three');
  const { TrackballControls } = await import(
    'three/examples/jsm/controls/TrackballControls.js'
  );
  const ThreeGlobe = await import('three-globe').then((m) => m.default);

  // Shamefully taken from https://github.com/vasturiano/three-globe/blob/master/example/basic/index.html
  const Globe = new ThreeGlobe({
    animateIn: true,
  })
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .ringsData([marker])
    .ringColor(() => colorInterpolator)
    .ringMaxRadius('maxR')
    .ringPropagationSpeed('propagationSpeed')
    .ringRepeatPeriod('repeatPeriod');

  const enclosingGroup = new Group();
  enclosingGroup.add(Globe);
  enclosingGroup.rotation.y = -Globe.getCoords(props.lat, props.lon).y - 0.1;

  // Setup renderer
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('globe').appendChild(renderer.domElement);

  // Setup scene
  const scene = new Scene();
  scene.add(enclosingGroup);
  scene.add(new AmbientLight(0xbbbbbb));
  scene.add(new DirectionalLight(0xffffff, 1));

  // Setup camera
  const camera = new PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.z = 400;
  camera.position.y = 100;

  // Add camera controls
  const tbControls = new TrackballControls(camera, renderer.domElement);
  tbControls.minDistance = 101;
  tbControls.rotateSpeed = 5;
  tbControls.zoomSpeed = 0.8;

  // Kick-off renderer
  (function animate() {
    // IIFE
    // Frame cycle
    tbControls.update();
    enclosingGroup.rotation.y -= 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();
});
</script>
