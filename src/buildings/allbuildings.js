let allBuildings = []

const addBuilding = (building) => {
    allBuildings.push(building)
}
const findBuildingIndexById = (id) => {
    return allBuildings.findIndex(building => building.id === id)
}
const removeBuilding = (id) => {
    allBuildings = allBuildings.filter(building => building.id !== id)
}

export {
    allBuildings,
    addBuilding,
    findBuildingIndexById,
    removeBuilding

}

