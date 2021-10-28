import * as THREE from 'three';
// Loading external GLTF
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const customLoader = (path, cb) => {
	var loader = new GLTFLoader();
	loader.load(path,
		(gltf) => { // Loaded success function
			var myMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
			gltf.scene.children.forEach(child => { child.material = myMaterial })
			cb(null, gltf.scene)
		},
		(e) => { // Loading Progress function
		console.log("Loading")
		},
		(error) => { // Loading error function
			console.error(error);
			cb(error);
		});
}

export default customLoader;