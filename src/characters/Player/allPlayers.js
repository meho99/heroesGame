const allPlayers = []

const addPlayer = (player) => {
    player.updatePlayerRound(allPlayers.length + 1)
    player.updatePlayerPosition({ x: allPlayers.length* 100, y: 20, z: 0 }) // testowe pozycje graczy
    allPlayers.push(player)
}
const findPlayerIndexByCurrentRound = (round) => {
    const playerRound = ((round - 1) % allPlayers.length) + 1
    return allPlayers.findIndex(player => player.round === playerRound)
}

export {
    allPlayers,
    addPlayer,
    findPlayerIndexByCurrentRound
}