export const idGenerator = () => Math.floor(new Date().valueOf() * Math.random())

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min

export const makeArmyInfo = (warriors) => {
    let armyInfo = ``
    for (const name in warriors) {
        if (name && warriors[name]) {
            armyInfo += `- ${warriors[name].quantity}x ${warriors[name].name} </br>`
        }
    }
    return armyInfo
}