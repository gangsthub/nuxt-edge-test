<script setup lang="ts">
const props = defineProps({
  lat: Number,
  lon: Number,
});

const marker = {
  lat: props.lat,
  lng: props.lon,
  maxR: 4,
  propagationSpeed: 5,
  repeatPeriod: 1500,
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
      .ringColor(() => (t) => `rgba(218,165,32,${1 - t})`)
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod');

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

    // handle resize
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

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
      enclosingGroup.rotation.y -= 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();
  });
</script>

<template>
  <div id="globe"></div>
</template>
