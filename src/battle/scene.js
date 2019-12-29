import * as THREE from 'three'
import { makeInitialScene } from '../threeConfig'
import grassTexture from '../worldElements/textures/grass.jpg'

export const { scene, camera, cameraControls } = makeInitialScene()

const texture = new THREE.TextureLoader().load(grassTexture)
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(5, 5)

export const sceneInit = () => {
    let boardGeometry = new THREE.PlaneGeometry(600, 600)
    boardGeometry.rotateX(-Math.PI / 2)
    let boardMaterial = new THREE.MeshBasicMaterial({ map: texture })

    let board = new THREE.Mesh(boardGeometry, boardMaterial)
    board.position.set(0, 0, 0)
    scene.add(board)
}
