import { idGenerator } from '../commonFunctions'

import { newWarrior } from './warriors'

export class Army {
    constructor() {
        this.warriors = {}
    }

    addWarriors = (type, number) => {
        const newWarriors = []

        for (let i = 0; i < number; i++) {
            newWarriors.push(newWarrior(type, idGenerator()))
        }

        const prevWarriors = this.warriors[type] ? this.warriors[type] : { id: idGenerator(), units: [] }

        this.warriors[type] = { ...prevWarriors, units: [...prevWarriors.units.concat(newWarriors)] }
    }

    checkIfWarriorBelongsToArmy = (id) => {
        this.warriors.find(warriorsGroup =>
            warriorsGroup.find(warrior =>
                warrior.id === id
            )
        )
    }
}
