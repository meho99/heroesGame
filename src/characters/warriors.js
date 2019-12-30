export const WARRIOR_ABILITIES = {
    SHOOTER: 'shooter',
    ATTACKER: 'attacker'
}

const warriorTypes = {
    AMATEUR: {
        range: 3,
        name: 'Amateur',
        maxHealth: 12,
        currentHealth: 0,
        defend: 2,
        damage: {
            min: 3,
            max: 6
        },
        abilities: [
            WARRIOR_ABILITIES.ATTACKER
        ]
    },
    GOBLIN: {
        range: 6,
        name: 'Goblin',
        maxHealth: 8,
        defend: 1,
        currentHealth: 0,
        damage: {
            min: 2,
            max: 4
        },
        abilities: [
            WARRIOR_ABILITIES.ATTACKER
        ]
    },
    ARCHER: {
        range: 4,
        name: 'archer',
        maxHealth: 10,
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
    }
}

export const newWarrior = (type, id) => {
    return { ...warriorTypes[type], id }
}