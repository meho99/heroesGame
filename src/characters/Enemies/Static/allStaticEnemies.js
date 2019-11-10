const allStaticEnemies = []

const addStaticEnemy = (staticEnemy) => {
    allStaticEnemies.push(staticEnemy)
}
const findStaticEnemyIndexById = (id) => {
    return allStaticEnemies.findIndex(staticEnemy => staticEnemy.id === id)
}

export {
    allStaticEnemies,
    addStaticEnemy,
    findStaticEnemyIndexById,
}