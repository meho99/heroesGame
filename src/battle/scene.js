import * as THREE from 'three'
import { makeInitialScene } from '../threeConfig'
import grassTexture from '../worldElements/textures/grass.jpg'

export const { scene, camera, cameraControls } = makeInitialScene({ controlsConfig: { update: () => { } } })

const texture = new THREE.TextureLoader().load(grassTexture)
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(5, 5)

export const sceneInit = () => {
    cameraControls.enableZoom = true
    cameraControls.enableRotate = true
    cameraControls.enablePan = false
    camera.position.set(0, 250, 0)
    cameraControls.target.set(0, 0, 0)

    setTimeout(() => { // to change ?
        camera.position.set(0, 250, 0)
        cameraControls.target.set(0, 0, 0)
    }, 500)

    cameraControls.minDistance = 100
    cameraControls.maxDistance = 300

    let boardGeometry = new THREE.PlaneGeometry(600, 600)
    boardGeometry.rotateX(-Math.PI / 2)
    let boardMaterial = new THREE.MeshBasicMaterial({ map: texture })

    let board = new THREE.Mesh(boardGeometry, boardMaterial)
    board.position.set(0, 0, 0)
    scene.add(board)
}
