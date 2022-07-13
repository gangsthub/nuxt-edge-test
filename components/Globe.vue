<script setup lang="ts">
const props = defineProps({
  lat: Number,
  lon: Number,
});

const marker = {
  lat: props.lat,
  lng: props.lon,
};

const ring = {
  ...marker,
  maxR: 4,
  propagationSpeed: 5,
  repeatPeriod: 1500,
};

const pike = {
  ...marker,
  size: 0.3,
  color: 'rgb(218, 165, 32)',
};

process.client &&
  onMounted(async () => {
    const {
      WebGLRenderer,
      Scene,
      AmbientLight,
      DirectionalLight,
      PerspectiveCamera,
      Group,
    } = await import('three');
    const { OrbitControls } = await import(
      'three/examples/jsm/controls/OrbitControls.js'
    );
    const ThreeGlobe = await import('three-globe').then((m) => m.default);

    // Shamefully taken from https://github.com/vasturiano/three-globe/blob/master/example/basic/index.html
    const Globe = new ThreeGlobe({
      animateIn: true,
    })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .ringsData([ring])
      .ringColor(() => (t) => `rgba(218, 165, 32, ${1 - t})`)
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod')
      .pointsData([pike])
      .pointAltitude('size')
      .pointColor('color');

    const enclosingGroup = new Group();
    enclosingGroup.add(Globe);

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
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.autoRotate = true;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = Globe.getGlobeRadius() * 2;
    controls.maxDistance = Globe.getGlobeRadius() * 6;

    // handle resize
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Kick-off renderer
    (function animate() {
      // IIFE
      // Frame cycle
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();
  });
</script>

<template>
  <div id="globe"></div>
</template>
