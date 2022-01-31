import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()

// Lights

const light = new THREE.DirectionalLight('0xaabb55', 1)
light.position.set(0,2,2)
scene.add(light)
//
// Texture Loading
//
// Can be done using JS new IMAGE and image.onload(), but this internal helper is cleaner.
// texture loader.load( first arg is path, second is onload cb, loading cb. on errrCB)
///
// A better alternative is to use the texture loading manager in three js

const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {console.log("Starting load...")}
loadingManager.onProgress = () => {console.log("Progress load...")}
loadingManager.onLoad = () => {console.log("Finished Loading")}
loadingManager.onError = () => {console.log("Error loading!")}
// Actually Loading all the textures here.
// These are async... promised based? They are assigned before the finsih loading.
const textureLoader = new THREE.TextureLoader(loadingManager);
const color = textureLoader.load('../Bricks/Bricks01_COL_VAR1_3K.jpg')
const normal = textureLoader.load('../Bricks/Bricks01_NRM_3K.jpg')
const ambientOcc = textureLoader.load('../Bricks/Bricks01_AO_3K.jpg')
const rough = textureLoader.load('../Bricks/Bricks01_GLOSS_3K.jpg')
const disp = textureLoader.load('../Bricks/Bricks01_DISP_3K.jpg')

//
// UV Unwrapping Next!
//

// Mesh
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1,150,150,150),
    new THREE.MeshStandardMaterial({
        displacementMap: disp,
        aoMap :ambientOcc,
        aoMapIntensity: 2,
        normalMap: normal,
        map: color,
        roughnessMap: rough,
    wireframe: false })
)
scene.add(mesh)
// debugger
const gui = new dat.GUI()
// add option to add control to gui. 1st param is target to manipulate. 2nd is string name of property to change.
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01);
gui.add(mesh.material, 'displacementScale').min(-1).max(1).step(0.001)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true,
})
renderer.setSize(sizes.width, sizes.height)
// set pixel ratio per device instance; consider including this in your tick
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate!!!
const clock = new THREE.Clock()

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Update on window resizing
window.addEventListener('resize', () => {
    // reassign global vals to new dimensions
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // upate renderer sizes
    renderer.setSize(sizes.width, sizes.height)
    // update camera aspect ratio:
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix()
})

window.addEventListener('dblclick', ()=>{
    const fullscreen = document.fullscreenElement || webkitFullScreenElement;
    if(!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

// Opportunity for Optimizations:
// Remember youre mipmapping. Change the filter .min or .mag or .max. With smaller textures you can forego mipmapping to alleviate strain on gpu.
// Also... you can use smaller resolution textures if your intent is to have a blurr in high fidelity. Like a soft edge alpha map!


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    light.position.x = Math.cos(elapsedTime)
    light.position.y = Math.sin(elapsedTime)

    // mesh.rotation.y = elapsedTime;
    // mesh.material.displacementScale = Math.sin(elapsedTime) * 0.1
    // Render
    renderer.render(scene, camera)
    // When using damping or similar, its a good idea to update the controls every tick
    controls.update()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
