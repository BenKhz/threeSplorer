import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//grab viewport width and height
const viewport = {
	width: window.innerWidth /2,
	height: window.innerHeight/2
}

// create Scene
const scene = new THREE.Scene()

// create a camera ( FOV, aspect ratio, clipping near, clipping far)
const camera = new THREE.PerspectiveCamera(55, viewport.width / viewport.height, 0.1, 1000 )
scene.add(camera)
camera.position.z = 2;

// create a renderer
const renderer = new THREE.WebGLRenderer({alpha: true})
renderer.setSize(viewport.width, viewport.height);

// Create an mesh. A mesh is defined by (geometry, materials.)
const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(0.5 ,0.2, 0.3),
	new THREE.MeshBasicMaterial({ color: 0x884411 })
	);
scene.add(mesh)

// or use Groups to group multiple meshes together
const group = new THREE.Group();
const sphere = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({color: 0x34df33}));
const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({color: 0x3f00dd}));
group.add(sphere, sphere2)
sphere.position.set(-0.5, 1, 0);
sphere2.position.set(0.5, -1, 0);
scene.add(group)

// Create an AXES helper.
const axes = new THREE.AxesHelper(2);
scene.add(axes)
// Canvas DOM element reference.
const canvas = document.getElementById('threejs');
canvas.appendChild(renderer.domElement)

////////
// Primitive animation below
////////
const animate = () => {
	var interval = setInterval(() => {

		// group.rotateZ(Math.PI / 180)
		renderer.render(scene,camera)
		console.log("rendered")
	}, 50)
}
// animate()
// ------------------
// Ideally we want to use an internal clock and requestAnimationFrame
const controls = new OrbitControls( camera, renderer.domElement );
controls.maxAzimuthAngle = Math.PI* 0.5;
controls.minAzimuthAngle = -Math.PI * 0.5;
const clock = new THREE.Clock();
const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	group.rotation.y = (Math.PI / 180)*elapsedTime
	controls.update()
	// We can write animation logic here.
	// However, complex animations would benefit from using a tweening library like gsap that uses its own internal tick. We would still need to setup our own tick to render our scene though.
	renderer.render(scene, camera)
	window.requestAnimationFrame(tick)
}
tick()