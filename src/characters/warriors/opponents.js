import {
    WARRIOR_NAMES,
    WARRIOR_ABILITIES,
    WARRIOR_TYPES,
    RACE_NAMES
} from './consts'

export const warriorsOpponents = {
    [WARRIOR_TYPES.BIRD]: {
        range: 7,
        name: WARRIOR_NAMES.BIRD,
        type: WARRIOR_TYPES.BIRD,
        race: RACE_NAMES.OPPONENTS,
        maxHealth: 5,
        currentHealth: 0,
        initiative: 7,
        defend: 1,
        cost: 5,
        damage: {
            min: 2,
            max: 4
        },
        abilities: [
            WARRIOR_ABILITIES.ATTACKER
        ]
    },
    [WARRIOR_TYPES.GOBLIN]: {
        range: 6,
        cost: 5,
        name: WARRIOR_NAMES.GOBLIN,
        type: WARRIOR_TYPES.GOBLIN,
        race: RACE_NAMES.OPPONENTS,
        maxHealth: 5,
        initiative: 4,
        currentHealth: 0,
        defend: 1,
        damage: {
            min: 3,
            max: 6
        },
        abilities: [
            WARRIOR_ABILITIES.ATTACKER
        ]
    }
}