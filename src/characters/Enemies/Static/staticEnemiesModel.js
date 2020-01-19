import * as THREE from 'three'
import { addModel } from '../../../threeConfig'
import { enemies as modelsDetails } from '../../../threeConfig/models'

export const staticEnemyModels = [
    {
        id: 0,
        name: 'PEASANT',
        positionCorrections: modelsDetails['PEASANT'].positionCorrections,
        rotationCorrections: modelsDetails['PEASANT'].rotationCorrections,
        geometry: new THREE.BoxGeometry(3, 3, 3),
        material: new THREE.MeshBasicMaterial({ color: 0xf2ab5c }),
        model: () => addModel("PEASANT", { x: 0, z: 0 })
    }
]