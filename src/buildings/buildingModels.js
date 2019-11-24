import * as THREE from 'three'
import { addModel } from '../threeConfig'

export const models = [
    {
        id: 0,
        name: 'testBuilding',
        model: addModel("building", { x: 0, z: 0 }),
        positionCorrections: { x: -3, y: -3, z: 7.5 }
    }
]

