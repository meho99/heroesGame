import * as THREE from 'three'
import { makeInitialScene } from '../threeConfig'

export const { scene, camera, cameraControls } = makeInitialScene()

var boardGeometry = new THREE.PlaneGeometry(10000, 10090)
var boardMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
var board = new THREE.Mesh(boardGeometry, boardMaterial)
boardGeometry.rotateX(-Math.PI / 2)
scene.add(board)