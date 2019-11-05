import * as THREE from 'three'

export const birdModels = [
    {
        id: 0,
        name: 'testBird',
        geometry: new THREE.BoxGeometry(3, 3, 3),
        material: new THREE.MeshBasicMaterial({ color: 0x002233 })
    }
]