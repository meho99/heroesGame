import * as THREE from 'three'
import { makeInitialScene } from '../threeConfig'

export const { scene, camera, cameraControls } = makeInitialScene()

let boardGeometry = new THREE.PlaneGeometry(10000, 10000)
boardGeometry.rotateX(-Math.PI / 2)
let boardMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })

let board = new THREE.Mesh(boardGeometry, boardMaterial)
board.position.set(0, 0, 0)
scene.add(board)