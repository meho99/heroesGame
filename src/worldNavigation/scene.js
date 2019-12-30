import * as THREE from 'three'
import { makeInitialScene, addModel } from '../threeConfig'
import grassTexture from '../worldElements/textures/all.png'

export const { scene, camera, cameraControls } = makeInitialScene()

const map1 = {
    size: {
        x: 500,
        z: 700
    },
    elements: [
        {
            name: 'TREE2',
            position: { x: -50, z: -30 }
        },
        {
            name: 'TREE2',
            position: { x: 70, z: 230 }
        },
        {
            name: 'TREE2',
            position: { x: 80, z: -150 }
        },
        {
            name: 'TREE2',
            position: { x: 210, z: 110 }
        },
        {
            name: 'TREE1',
            position: { x: 120, z: 10 }
        },
        {
            name: 'TREE1',
            position: { x: 220, z: 210 }
        },
        {
            name: 'TREE1',
            position: { x: -40, z: 260 }
        },
        {
            name: 'TREE1',
            position: { x: -70, z: 260 }
        },
        {
            name: 'TREE1',
            position: { x: -100, z: 260 }
        },
        {
            name: 'TREE1',
            position: { x: -130, z: 260 }
        },
        {
            name: 'TREE1',
            position: { x: -20, z: 310 }
        },
        {
            name: 'TREE1',
            position: { x: -50, z: 310 }
        },
        {
            name: 'TREE1',
            position: { x: -80, z: 310 }
        },
        {
            name: 'TREE1',
            position: { x: -110, z: 310 }
        },
        {
            name: 'TREE1',
            position: { x: -140, z: 310 }
        },
        {
            name: 'Tree3',
            position: { x: 110, z: -250 }
        },
        {
            name: 'Tree3',
            position: { x: 155, z: -200 }
        },
        {
            name: 'Tree3',
            position: { x: 220, z: -210 }
        },
        {
            name: 'Tree3',
            position: { x: 210, z: -140 }
        },
        {
            name: 'Tree3',
            position: { x: 70, z: -300 }
        },
        {
            name: 'Tree3',
            position: { x: 180, z: -320 }
        },
        {
            name: 'BATTLEROCK',
            position: { x: 20, z: -120 }
        },
        {
            name: 'BATTLEROCK',
            position: { x: 220, z: -20 }
        },
        {
            name: 'BATTLEROCK',
            position: { x: -200, z: 200 }
        }

    ]
}

const texture = new THREE.TextureLoader().load(grassTexture);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 1)


const boardGeometry = new THREE.PlaneGeometry(map1.size.x, map1.size.z)
const boardMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
const board = new THREE.Mesh(boardGeometry, boardMaterial)
boardGeometry.rotateX(-Math.PI / 2)
scene.add(board)

for (const element of map1.elements) {
    scene.add(addModel(element.name, element.position))
}

