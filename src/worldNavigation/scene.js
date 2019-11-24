import * as THREE from 'three'
import { makeInitialScene, addModel } from '../threeConfig'

export const { scene, camera, cameraControls } = makeInitialScene()

const map1 = {
    size: {
        x: 5000,
        z: 5000
    },
    elements: [
        {
            name: 'Crystal',
            position: { x: 50, z: 70 }
        },

        {
            name: 'TREE2',
            position: { x: 10, z: 10 }
        },
        {
            name: 'TREE1',
            position: { x: 20, z: 10 }
        },
        {
            name: 'TREE1',
            position: { x: 30, z: 10 }
        },
        {
            name: 'TREE1',
            position: { x: 40, z: 10 }
        },
        {
            name: 'TREE1',
            position: { x: 40, z: 10 }
        }
    ]
}

var boardGeometry = new THREE.PlaneGeometry(map1.size.x, map1.size.z)
var boardMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
var board = new THREE.Mesh(boardGeometry, boardMaterial)
boardGeometry.rotateX(-Math.PI / 2)
scene.add(board)

for (const element of map1.elements) {
    scene.add(addModel(element.name, element.position))
}

