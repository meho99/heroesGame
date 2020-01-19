import * as THREE from 'three'
import { addModel } from '../../../threeConfig'
import { enemies as modelsDetails } from '../../../threeConfig/models'
export const birdModels = [
    {
        id: 0,
        name: 'BIRD',
        positionCorrections: modelsDetails['BIRD'].positionCorrections,
        rotationCorrections: modelsDetails['BIRD'].rotationCorrections,
        geometry: new THREE.BoxGeometry(3, 3, 3),
        material: new THREE.MeshBasicMaterial({ color: 0x002233 }),
        model: () => addModel("BIRD", { x: 0, z: 0 })
    }
]
