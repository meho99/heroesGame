const warriorTypes = {
    AMATEUR: {
        range: 4,
        maxHealth: 10,
        currentHealth: 10,
        force: 5
    },
    GOBLIN: {
        range: 5,
        maxHealth: 6,
        currentHealth: 6,
        force: 3
    }
}
export const newWarrior = (type, id) => {
    return { ...warriorTypes[type], id }
}