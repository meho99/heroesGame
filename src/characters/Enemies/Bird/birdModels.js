import * as THREE from 'three'

export const birdModels = [
    {
        id: 0,
        name: 'testBird',
        geometry: new THREE.BoxGeometry(8, 8, 8),
        material: new THREE.MeshBasicMaterial({ color: 0x002233 })
    }
]