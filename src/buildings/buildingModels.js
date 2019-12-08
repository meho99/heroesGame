import { addModel } from '../threeConfig'
import { models as modelsDetails } from '../threeConfig/models'

export const models = [
    {
        id: 0,
        name: 'testBuilding',
        positionCorrections: modelsDetails['building'].positionCorrections,
        model: () => addModel("building", { x: 0, z: 0 })
    }
]

