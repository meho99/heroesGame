import * as THREE from 'three'
import OrbitControls from 'threejs-orbit-controls'
import { enableMouseEventsOnScene, disableMouseEventsOnScene, listenersStart, listenersName } from './mouseEventsOnScene'
import { loadModel } from './loadModels'

// ----- scene sizes -----
const sceneWidth = window.innerWidth * 8 / 10
const sceneHeight = window.innerHeight

// ----- DOM Element -----
const container = document.getElementById('mainBoard')

// ----- renderer -----
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sceneWidth, sceneHeight)

container.appendChild(renderer.domElement)

// ----- raycaster -----
const raycaster = new THREE.Raycaster()

// ----- scene -----
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x282c34)

// ----- lights -----
const light = new THREE.DirectionalLight(0xffffff, 0.8)
scene.add(light)

// ----- camera -----
const camera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 1, 1000)
camera.position.set(100, 100, 100)
camera.lookAt(0, 0, 0)
scene.add(camera)

// ----- camera control -----
const controls = new OrbitControls(camera, renderer.domElement)
controls.enabled = true
controls.maxDistance = 800
controls.minDistance = 0

// ----- osie -----
//const axesHelper = new THREE.AxesHelper(500)
//scene.add(axesHelper)

// ----- world rendering -----

let frameId

const renderScene = () => {
    renderer.render(scene, camera)
}

const animate = (renderFunction) => {

    if (camera.position.y < 0) camera.position.y = 0
    controls.update()
    renderFunction()
    renderScene()
    window.requestAnimationFrame(() => { animate(renderFunction) })
}

const animateStart = (renderFunction = () => { }) => {

    const customAnimate = () => { animate(renderFunction) }

    if (!frameId) {
        frameId = window.requestAnimationFrame(customAnimate)
    }
}

const clearScene = () => {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

const animateStop = () => {
    cancelAnimationFrame(frameId)
    clearScene()
}

export {
    camera,
    sceneWidth,
    sceneHeight,
    container,
    scene,
    raycaster,
    animateStart,
    animateStop,
    enableMouseEventsOnScene,
    listenersStart,
    listenersName,
    loadModel,
    disableMouseEventsOnScene
}
