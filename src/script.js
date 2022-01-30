import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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

// Object
// TIP: Geometries are often optimized if we store vertices in typed Arrays. In JS this looks like a float32Array.
const BufferGeometry = new THREE.BufferGeometry();
const positionsArray = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
])
// Now we can create a Buffer Attribute using our typed Array
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
BufferGeometry.setAttribute('position', positionsAttribute)
const mesh = new THREE.Mesh(
    BufferGeometry,
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
    wireframe: true })
)
scene.add(mesh)

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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    mesh.rotation.y = elapsedTime;
    mesh.position.y = Math.sin(elapsedTime)
    // Render
    renderer.render(scene, camera)
    // When using damping or similar, its a good idea to update the controls every tick
    controls.update()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
