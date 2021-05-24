import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { MOUSE } from 'three';

// 1.
const scene = new THREE.Scene();
// 2.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// 3.
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// torus
// const geometry = new THREE.CylinderGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// mouse controls
const controls = new OrbitControls(camera, renderer.domElement);

// stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.15);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);

  star.translateZ(10);
  
  scene.add(star);
}



// space backround
// const spaceTexture = new THREE.TextureLoader().load('night.jpg');
// scene.background = spaceTexture;

// avatar
// const yangaTexture = new THREE.TextureLoader().load('avataaars.png');
// const yanga = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 3, 3),
//   new THREE.MeshStandardMaterial({map: yangaTexture})
// );

// scene.add(yanga);

// sun
const sunTexture = new THREE.TextureLoader().load('sun2.png');
const normalTexture = new THREE.TextureLoader().load('normal.jpeg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
  })
);

scene.add(sun);

// earth
const earthTexture = new THREE.TextureLoader().load('earth.jpg');
//const normalTexture = new THREE.TextureLoader().load('normal.jpeg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 22, 22),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    //normalMap: normalTexture
  })
);

scene.add(earth);

// moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
//const normalTexture = new THREE.TextureLoader().load('normal.jpeg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 22, 22),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    //normalMap: normalTexture
  })
);

scene.add(moon);

// reposition sun
sun.position.z = -40;
sun.position.setX(10);

// reposition earth
earth.position.z = -80;
earth.position.setX(40);

// reposition moon
moon.position.z = -80;
moon.position.setX(-40);

// move camera
function moveCamera() {
  // get scroll position
  const t = document.body.getBoundingClientRect().top;

  sun.rotation.x += 0.01;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.01;

  earth.rotation.x += 0.01;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.01;

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.01;

  // yanga.rotation.x = 0.01;
  // yanga.rotation.y = 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

let stars = [];
for(let i = 0; i < 500; i++) {
  const geometry = new THREE.SphereGeometry(0.15);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(-500));
  
  star.position.set(x,y,z);

  stars.push(star);
  scene.add(star);
}

//Array(500).fill().forEach(addStar);
function moveStars(){
  for(let i = 0; i < stars.length; i++) {
    let direction = stars[i].getWorldDirection();
    stars[i].position.add(direction.multiplyScalar(0.1));

    if(stars[i].position.z > 50){
      stars[i].position.z -=500;
    }
  }
}

function moveMoon() {
  let direction = moon.getWorldDirection();
  moon.position.add(direction.multiplyScalar(0.09));

  if(moon.position.z > 50){
    moon.position.z -=500;
  }

  if(moon.position.x > 50){
    moon.position.x -=100;
  }

  if(moon.position.y > 50){
    moon.position.y -=100;
  }

  direction = earth.getWorldDirection();
  earth.position.add(direction.multiplyScalar(0.09));

  if(earth.position.z > 50){
    earth.position.z -=100;
  }

  if(earth.position.x > 50){
    earth.position.x -=100;
  }

  if(earth.position.y > 50){
    earth.position.y -=100;
  }

  // direction = sun.getWorldDirection();
  // sun.position.add(direction.multiplyScalar(0.1));

  // if(sun.position.z > 50){
  //   sun.position.z -=500;
  // }
}

// animation
function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  sun.rotation.x += 0.01;
  sun.rotation.y += 0.005;
  sun.rotation.z += 0.01;

  earth.rotation.x += 0.01;
  earth.rotation.y += 0.005;
  earth.rotation.z += 0.01;

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.01;

  moveStars();
  moveMoon();

  controls.update();

  renderer.render(scene, camera);
}

animate();