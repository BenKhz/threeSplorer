import * as THREE from 'three';
// custom mesh build using GLTF Loader
import utils from './meshUtils';

// Create a basic Scene
const scene = new THREE.Scene();
// Create a camera with FOV, aspect,ratio .. etc...
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(2,5,7)
// Create a Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor('#cccccc')
renderer.setSize( window.innerWidth, window.innerHeight );
// Add renderer canvas to the DOM
document.body.appendChild( renderer.domElement );

// Creating directional light
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// Using custom loader for gltf Geometry
utils('./Assets/Grass_Attempt.gltf', (err, result) => {
	(err) ? console.log(err) : scene.add(result);
})
// Vanilla Primitive Geometry
var floorMat = new THREE.MeshLambertMaterial({ color: 0x524f48 });
var floorGeo = new THREE.PlaneGeometry(40, 30, 10, 10)
var floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = 4.5;
scene.add(floor)

// Window resize event listener.
window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	camera.aspect = (window.innerWidth / window.innerHeight);
	camera.updateProjectionMatrix();
})
// Animation Loop Here
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();