import { onFieldTypes, emptyFieldData, boardSize, playersColors } from './constants'
import { randomNumber } from '../commonFunctions'
import { enableMouseEventsOnScene, listenersName } from '../threeConfig'

let players = []

export let currentRound = 0

export const nextRound = () => {
    currentRound += 1
    showWarriorRange(getCurrentWarrior(), onFieldTypes.AVAILABLE_WALK)
}

export let boardData = []

const makeEmptyBoard = () => {
    boardData = []
    for (let y = 0; y < boardSize; y++) {
        boardData[y] = []
        for (let x = 0; x < boardSize; x++) {
            boardData[y][x] = { ...emptyFieldData, position: { x, y } }
        }
    }
}

const createFieldData = (type, position, id) => ({
    type,
    position,
    id
})

export let allWarriors = []

const setWarriorsStartPosition = (player, side) => {
    let range
    if (side === onFieldTypes.ALLY) {
        range = { min: 0, max: 2 }
    } else {
        range = { min: boardSize - 2, max: boardSize }
    }
    const allWarriorsGroups = []
    for (const group of Object.keys(player.army.warriors)) {
        allWarriorsGroups.push(player.army.warriors[group])
    }
    for (const group of allWarriorsGroups) {
        allWarriors.push(group)
        let randomXPosition = randomNumber(range.min, range.max)
        let randomYPosition = randomNumber(0, boardSize)

        while (boardData[randomYPosition][randomXPosition].type === onFieldTypes.EMPTY) {
            if (boardData[randomYPosition][randomXPosition].type === onFieldTypes.EMPTY) {
                boardData[randomYPosition][randomXPosition] = createFieldData(side, { x: randomXPosition, y: randomYPosition }, group.id)
                group.position = { x: randomXPosition, y: randomYPosition }

            } else {
                randomXPosition = randomNumber(range.min, range.max)
                randomYPosition = randomNumber(0, boardSize)
            }
        }
    }
}

const clearBoard = (types) => {
    for (const fieldGroup of boardData) {
        for (const field of fieldGroup) {
            if (types.findIndex(type => type === field.type) !== -1) {
                boardData[field.position.y][field.position.x] = { ...emptyFieldData, position: field.position }
            }
        }
    }
}

const showWarriorRange = (warrior, type, clear = [onFieldTypes.AVAILABLE_WALK, onFieldTypes.AVAILABLE_SHOOT, onFieldTypes.SHOW_WALK_DISTANCE]) => {
    clearBoard(clear)
    let positionsTab = [{ x: warrior.position.x, y: warrior.position.y }]

    const pushPosition = (x, y, tab) => {
        if ((x >= 0 && x < boardSize) && (y >= 0 && y < boardSize) && boardData[y][x].type === onFieldTypes.EMPTY) {
            tab.push({ x, y })
            boardData[y][x].type = type
        }
    }

    const showAround = () => {
        const tempPositionsTab = []
        for (const { x, y } of positionsTab) {
            pushPosition(x, y - 1, tempPositionsTab)
            pushPosition(x, y + 1, tempPositionsTab)
            pushPosition(x + 1, y, tempPositionsTab)
            pushPosition(x - 1, y, tempPositionsTab)
        }
        positionsTab = tempPositionsTab
    }
    for (let i = 0; i < warrior.range; i++) {
        showAround()
    }
}

export const getCurrentWarrior = () => {
    const warriorIndex = ((currentRound - 1) % allWarriors.length)
    return allWarriors[warriorIndex]
}

export const findWarriorById = (id) => {
    return allWarriors.find(warrior => warrior.id === id)
}

const moveCurrentPlayerToPosition = (position) => {
    const warrior = getCurrentWarrior()
    boardData[position.y][position.x] = createFieldData(boardData[warrior.position.y][warrior.position.x].type, position, warrior.id)

    boardData[warrior.position.y][warrior.position.x] = { ...emptyFieldData, position: warrior.position }
    warrior.position = position
    clearBoard([onFieldTypes.AVAILABLE_WALK])
}

const clickOnBoard = ({ element }) => {

    clearBoard([onFieldTypes.SHOW_WALK_DISTANCE])
    if (element && element.userData) {
        if ((element.userData.type === onFieldTypes.ALLY || element.userData.type === onFieldTypes.ENEMY) && element.userData.id !== getCurrentWarrior().id)
            showWarriorRange(findWarriorById(element.userData.id), onFieldTypes.SHOW_WALK_DISTANCE, [onFieldTypes.SHOW_WALK_DISTANCE])
        else if (element.userData.type === onFieldTypes.AVAILABLE_WALK)
            moveCurrentPlayerToPosition(element.userData.position)
    }
}

const showInfo = ({ element }) => {
    if (element && element.userData) {
        for (const player of players) {
            if (player.army.checkIfWarriorBelongsToArmy(element.userData.id)) {
                const color = player.type === 'player' ? playersColors[onFieldTypes.ALLY] : playersColors[onFieldTypes.ENEMY]
                player.army.addWindow(element.userData.id, player.name, color)
            }
        }
    }
}

export const battleInit = (player, enemy) => {
    players[0] = player
    players[1] = enemy

    makeEmptyBoard()

    allWarriors = []
    setWarriorsStartPosition(players[0], onFieldTypes.ALLY)
    setWarriorsStartPosition(players[1], onFieldTypes.ENEMY)


    allWarriors.sort(() => Math.random() - 0.5)

    nextRound()

    enableMouseEventsOnScene(listenersName.KEYDOWN, ({ e }) => {
        if (e.keyCode === 13) {
            nextRound()
        }
    })
    enableMouseEventsOnScene(listenersName.CLICK, clickOnBoard)
    enableMouseEventsOnScene(listenersName.RIGHTCLICK, showInfo)
}