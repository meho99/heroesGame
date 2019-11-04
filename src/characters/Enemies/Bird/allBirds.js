const allBirds = []

const addBird = (bird) => {
    allBirds.push(bird)
}
const findBirdIndexById = (id) => {
    return allBirds.findIndex(bird => bird.id === id)
}

export {
    allBirds,
    addBird,
    findBirdIndexById
}