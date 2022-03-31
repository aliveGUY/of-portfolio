import * as THREE from 'three';
import { PointLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);


//----------------------Lights----------------------------------------
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);

//----------------------Import 3d model-------------------------------
const loader = new GLTFLoader();

loader.load( 'src/3d/meshes/test.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

//background
const roomTexture = new THREE.TextureLoader().load('src/img/background.jpg');
scene.background = roomTexture;


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

animate();
