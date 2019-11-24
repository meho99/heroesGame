import * as THREE from 'three'
import OrbitControls from 'threejs-orbit-controls'

export { 
    loadModel,
    addModel
} from './loadModels'

export {
    enableMouseEventsOnScene,
    disableMouseEventsOnScene,
    listenersStart,
    listenersName,
    setGroupToClick
} from './mouseEventsOnScene'

export { createWindow } from './informationWindows'

export { changeCursor } from './cursors'

// ----- scene sizes -----
export const sceneWidth = window.innerWidth * 8 / 10
export const sceneHeight = window.innerHeight

// ----- DOM Element -----
export const container = document.getElementById('mainBoard')

// ----- renderer -----
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sceneWidth, sceneHeight)

container.appendChild(renderer.domElement)

// ----- raycaster -----
export const raycaster = new THREE.Raycaster()

export let currentScene
export let currentCamera
export let currentCameraControls

export const makeInitialScene = (light, camera, controls) => {
    // ----- scene -----
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x00ffff)

    scene.fog = new THREE.Fog(0x00ffff, 850, 1050)

    // ----- lights -----
    if (!light) {
        const defaultLight = new THREE.DirectionalLight(0xffffff, 1.2)
        scene.add(defaultLight)
    } else {
        scene.add(light)
    }

    // ----- camera -----
    let defaultCamera
    if (!camera) {
        defaultCamera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 1, 1000)
        defaultCamera.position.set(100, 250, 100)
        defaultCamera.lookAt(0, 0, 0)
        scene.add(defaultCamera)
    } else {
        scene.add(camera)
    }

    // ----- camera control -----
    let defaultControls
    if (!controls) {
        defaultControls = new OrbitControls(camera || defaultCamera, renderer.domElement)
        defaultControls.enabled = true
        defaultControls.enableDamping = true
        defaultControls.rotateSpeed = 0.2
        defaultControls.maxDistance = 300
        defaultControls.minDistance = 200
        defaultControls.maxPolarAngle = Math.PI / 3
        defaultControls.mouseButtons = {
            NONE: THREE.MOUSE.ROTATE,
            LEFT: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        }
        currentCameraControls = defaultControls
    } else {
        currentCameraControls = controls
    }

    return {
        scene,
        camera: camera ? camera : defaultCamera,
        cameraControls: defaultControls
    }
}

export const setCurrentScene = (scene, camera, cameraControls) => {
    currentScene = scene
    currentCamera = camera
    currentCameraControls = cameraControls
}

// ----- world rendering -----

let frameId
const renderScene = (scene, camera) => {
    renderer.render(scene, camera)
}

let renderFunction = () => { }

const animate = () => {

    if (currentCamera.position.y < 0) currentCamera.position.y = 0
    currentCameraControls.update()
    renderFunction()
    renderScene(currentScene, currentCamera)
    window.requestAnimationFrame(animate)
}

export const animateUpdate = (render) => {
    renderFunction = render
}

export const clearScene = (scene) => {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

export const animateStart = () => {
    if (!frameId) {
        frameId = window.requestAnimationFrame(animate)
    }
}
export const animateStop = () => {
    cancelAnimationFrame(frameId)
}
