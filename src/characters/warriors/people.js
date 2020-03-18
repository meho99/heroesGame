import {
    WARRIOR_NAMES,
    WARRIOR_ABILITIES,
    WARRIOR_TYPES,
    RACE_NAMES
} from './consts'

export const warriorsPeople = {
    [WARRIOR_TYPES.PEASANT]: {
        range: 6,
        name: WARRIOR_NAMES.PEASANT,
        type: WARRIOR_TYPES.PEASANT,
        race: RACE_NAMES.PEOPLE,
        maxHealth: 10,
        currentHealth: 0,
        initiative: 5,
        defend: 2,
        cost: 10,
        damage: {
            min: 3,
            max: 6
        },
        abilities: [
            WARRIOR_ABILITIES.ATTACKER
        ]
    },
    [WARRIOR_TYPES.ARCHER]: {
        range: 4,
        cost: 15,
        name: WARRIOR_NAMES.ARCHER,
        type: WARRIOR_TYPES.ARCHER,
        race: RACE_NAMES.PEOPLE,
        maxHealth: 4,
        initiative: 7,
        currentHealth: 0,
        defend: 1,
        damage: {
            min: 2,
            max: 4
        },
        shootDamage: {
            min: 2,
            max: 5
        },
        abilities: [
            WARRIOR_ABILITIES.ATTACKER,
            WARRIOR_ABILITIES.SHOOTER
        ]
    },
    [WARRIOR_TYPES.SERGEANT]: {
        range: 5,
        name: WARRIOR_NAMES.SERGEANT,
        type: WARRIOR_TYPES.SERGEANT,
        race: RACE_NAMES.PEOPLE,
        maxHealth: 12,
        initiative: 6,
        defend: 2,
        currentHealth: 0,
        damage: {
            min: 3,
            max: 8
        },
        abilities: [
            WARRIOR_ABILITIES.ATTACKER
        ]
    }
}