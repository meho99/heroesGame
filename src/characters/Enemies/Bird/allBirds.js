let allBirds = []

const addBird = (bird) => {
    allBirds.push(bird)
}
const removeBird = (id) => {
    allBirds = allBirds.filter(enemy => enemy.id !== id)
}
const findBirdIndexById = (id) => {
    return allBirds.findIndex(bird => bird.id === id)
}

export {
    allBirds,
    removeBird,
    addBird,
    findBirdIndexById
}