import * as THREE from 'three'
import { makeInitialScene, addModel } from '../threeConfig'
import grassTexture from '../worldElements/textures/grass.jpg'

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

const texture = new THREE.TextureLoader().load(grassTexture);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(30, 30);


const boardGeometry = new THREE.PlaneGeometry(map1.size.x, map1.size.z)
const boardMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
const board = new THREE.Mesh(boardGeometry, boardMaterial)
boardGeometry.rotateX(-Math.PI / 2)
scene.add(board)

for (const element of map1.elements) {
    scene.add(addModel(element.name, element.position))
}

