let allStaticEnemies = []

const addStaticEnemy = (staticEnemy) => {
    allStaticEnemies.push(staticEnemy)
}
const removeStaticEnenmy = (id) => {
    allStaticEnemies = allStaticEnemies.filter(enemy => enemy.id !== id)
}

const findStaticEnemyIndexById = (id) => {
    return allStaticEnemies.findIndex(staticEnemy => staticEnemy.id === id)
}

export {
    allStaticEnemies,
    removeStaticEnenmy,
    addStaticEnemy,
    findStaticEnemyIndexById,
}