import * as THREE from 'three'

export const staticEnemyModels = [
    {
        id: 0,
        name: 'testStaticEnemy',
        geometry: new THREE.BoxGeometry(3, 3, 3),
        material: new THREE.MeshBasicMaterial({ color: 0xf2ab5c })
    }
]