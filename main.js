import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'

//import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(25);
camera.position.setY(9);
camera.position.setX(-6);
//----------------------Lights----------------------------------------
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);

//-----------------------Helpers--------------------------------------
//const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

//----------------------Import 3d model-------------------------------
const loader = new GLTFLoader();
var model;
let mixer;
loader.load( 'src/3d/meshes/test.gltf', function ( gltf ) {
  model = gltf.scene;
	scene.add( model );
  model.rotation.x = 0.3

  mixer = new THREE.AnimationMixer(model);
  const clips = gltf.animations;
  const desk = mixer.clipAction(clips[0]);
  desk.play()
  const cup = mixer.clipAction(clips[1]);
  cup.play();

});






//background
const roomTexture = new THREE.TextureLoader().load('src/img/background.jpg');
scene.background = roomTexture;

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  model.rotation.y += 0.007;
  
				var delta = clock.getDelta();

				if ( mixer ) {

					mixer.update( delta );

				}

  //controls.update();

  renderer.render(scene,camera);
}

animate();
