let allPlayers = []

const addPlayer = (player) => {
    player.updatePlayerRound(allPlayers.length + 1)
    allPlayers.push(player)
}
const removePlayer = (id) => {
    allPlayers = allPlayers.filter(player => player.id !== id)
}
const findPlayerIndexByCurrentRound = (round) => {
    const playerRound = ((round - 1) % allPlayers.length) + 1
    console.log(allPlayers)
    return allPlayers.findIndex(player => player.round === playerRound)
}

export {
    allPlayers,
    removePlayer,
    addPlayer,
    findPlayerIndexByCurrentRound
}