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
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
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
