import { idGenerator } from '../commonFunctions'

import { newWarrior } from './warriors'

export class Army {
    constructor() {
        this.warriors = {}
    }

    addWarriors = (type, number) => {

        const prevWarriors = this.warriors[type] ? this.warriors[type] : { ...newWarrior(type, idGenerator()), quantity: 0 }

        this.warriors[type] = { ...prevWarriors, quantity: prevWarriors.quantity + number, currentHealth: (prevWarriors.quantity + number) * prevWarriors.maxHealth }
    }

    checkIfWarriorBelongsToArmy = (id) =>
        this.warriors.find(warriorsGroup =>
            warriorsGroup.id === id
        )
}
