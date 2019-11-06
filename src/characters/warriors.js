const warriorTypes = {
    AMATEUR: {
        range: 4,
        maxHealth: 10,
        currentHealth: 10,
        force: 5
    }
}
export const newWarrior = (type, id) => {
    return { ...warriorTypes[type], id }
}