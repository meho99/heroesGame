const warriorTypes = {
    AMATEUR: {
        range: 4,
        name: 'Amateur',
        maxHealth: 12,
        currentHealth: 0,
        defend: 2,
        force: 5
    },
    GOBLIN: {
        range: 6,
        name: 'Goblin',
        maxHealth: 8,
        defend: 1,
        currentHealth: 0,
        force: 3
    }
}
export const newWarrior = (type, id) => {
    return { ...warriorTypes[type], id }
}