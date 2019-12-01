let allPlayers = []

const addPlayer = (player) => {
    player.updatePlayerRound(allPlayers.length + 1)
    allPlayers.push(player)
}
const removePlayer = (id) => {
    allPlayers = allPlayers.filter(player => player.id !== id)
    updatePlayersRounds()
}
const updatePlayersRounds = () => {
    for (let i = 0; i < allPlayers.length; i++) {
        allPlayers[i].updatePlayerRound(i + 1)
    }
}
const findPlayerIndexByCurrentRound = (round) => {
    const playerRound = ((round - 1) % allPlayers.length) + 1
    return allPlayers.findIndex(player => player.round === playerRound)
}

const findPlayerById = (id) => allPlayers.find(player => player.id === id)

export {
    allPlayers,
    removePlayer,
    addPlayer,
    findPlayerById,
    findPlayerIndexByCurrentRound
}