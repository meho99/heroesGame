export const WARRIOR_ABILITIES = {
    SHOOTER: 'shooter',
    ATTACKER: 'attacker'
}

const warriorTypes = {
    AMATEUR: {
        range: 4,
        name: 'Amateur',
        maxHealth: 12,
        currentHealth: 0,
        defend: 2,
        force: 5,
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
        force: 3,
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
        force: 2,
        shootDamage: 3,
        abilities: [
            WARRIOR_ABILITIES.ATTACKER,
            WARRIOR_ABILITIES.SHOOTER
        ]
    }
}

export const newWarrior = (type, id) => {
    return { ...warriorTypes[type], id }
}