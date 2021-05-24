import '../css/style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// 1.
const scene = new THREE.Scene();
// 2.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// 3.
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

// torus
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// mouse controls
const controls = new OrbitControls(camera, renderer.domElement);

// stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// space backround
const spaceTexture = new THREE.TextureLoader().load('../assets/img/space.jpg');
scene.background = spaceTexture;

// avatar
const yangaTexture = new THREE.TextureLoader().load('../assets/img/avataaars.png');
const yanga = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: yangaTexture})
);

scene.add(yanga);

// sun
const sunTexture = new THREE.TextureLoader().load('../assets/img/sun2.png');
const normalTexture = new THREE.TextureLoader().load('../assets/img/normal.jpeg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
  })
);

scene.add(sun);

// reposition sun
sun.position.z = 20;
sun.position.setX(10);

// move camera
function moveCamera() {
  // get scroll position
  const t = document.body.getBoundingClientRect().top;

  sun.rotation.x += 0.01;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.01;

  yanga.rotation.x = 0.01;
  yanga.rotation.y = 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

// animation
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  sun.rotation.x += 0.01;
  sun.rotation.y += 0.005;
  sun.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();