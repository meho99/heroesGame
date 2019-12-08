import { onFieldTypes, emptyFieldData, boardSize, playersColors } from './constants'
import { battleEnd } from './'
import { randomNumber } from '../commonFunctions'
import { enableMouseEventsOnScene, listenersName, changeCursor } from '../threeConfig'
import { obstaclesInit } from './obstacles'

let players = {}

export let currentRound = 0

export let boardData = []

export let allWarriors = []

export let warriorsAvailableToAttack = []

let walkBlock = false

export const nextRound = (warriorId) => {
    walkBlock = false
    if (warriorId) {
        currentRound = allWarriors.findIndex(warrior => warrior.id === warriorId) + 1
    } else {
        currentRound += 1

    }
    checkIfCanAttack()
    showWarriorRange(getCurrentWarrior(), onFieldTypes.AVAILABLE_WALK)
}

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
        group.position = 'pending'
        let randomXPosition = randomNumber(range.min, range.max)
        let randomYPosition = randomNumber(0, boardData.length)

        while (group.position === 'pending') {
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

    if (!(walkBlock && type === onFieldTypes.AVAILABLE_WALK)) {
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
    checkIfCanAttack()

    walkBlock = true

    if (warriorsAvailableToAttack.length === 0) {
        nextRound()
    }
}

const checkIfCanAttack = () => {
    warriorsAvailableToAttack = []
    const { x, y } = getCurrentWarrior().position
    const opponentFieldType = boardData[y][x].type === onFieldTypes.ENEMY ? onFieldTypes.ALLY : onFieldTypes.ENEMY

    const checkIfEnemyStandsHere = (y, x) => boardData[y][x].type === opponentFieldType
    const nearFields = [[0, 1], [0, -1], [1, 1], [1, -1], [1, 0], [-1, 1], [-1, -1], [-1, 0]]

    for (const field of nearFields) {
        let fieldY = y + field[0]
        let fieldX = x + field[1]
        if (fieldX >= 0 && fieldX < boardData.length && fieldY >= 0 && fieldY < boardData.length) {
            if (checkIfEnemyStandsHere(fieldY, fieldX)) {
                warriorsAvailableToAttack.push(boardData[fieldY][fieldX].id)
            }
        }
    }
}

const mouseMoveOnBoard = ({ element }) => {
    clearBoard([onFieldTypes.SHOW_WALK_DISTANCE])
    changeCursor('basic')
    if (element && element.userData) {
        if ((element.userData.type === onFieldTypes.ALLY || element.userData.type === onFieldTypes.ENEMY) && element.userData.id !== getCurrentWarrior().id) {
            if (warriorsAvailableToAttack.includes(element.userData.id)) changeCursor('sword')

            showWarriorRange(findWarriorById(element.userData.id), onFieldTypes.SHOW_WALK_DISTANCE, [onFieldTypes.SHOW_WALK_DISTANCE, onFieldTypes.AVAILABLE_WALK])

        } else {
            showWarriorRange(getCurrentWarrior(), onFieldTypes.AVAILABLE_WALK)
        }
    }
}

const deleteDeadWarriors = () => {
    let isKilled = false
    allWarriors = allWarriors.filter(warrior => {
        if (warrior.quantity <= 0) {
            isKilled = true
            boardData[warrior.position.y][warrior.position.x] = { ...emptyFieldData, position: warrior.position }
            return false
        }
        else return true
    })
    if (Object.keys(players[onFieldTypes.ENEMY].army.warriors).length === 0) {
        battleEnd(players[onFieldTypes.ENEMY])
    } else if (Object.keys(players[onFieldTypes.ALLY].army.warriors).length === 0) {
        battleEnd(players[onFieldTypes.ALLY])
    }
    return isKilled
}

const attackWarrior = (id, type) => {
    const attacker = { ...getCurrentWarrior() }
    const attackPower = attacker.quantity * getCurrentWarrior().force
    players[type].army.defendAttack(id, attackPower, getCurrentWarrior().quantity)
    if (findWarriorById(id).quantity <= 0) {
        players[type].army.killUnit(id)
    }
    if (deleteDeadWarriors()) {// restart round when warrior killed someone
        nextRound(attacker.id)
    }
    else nextRound()
}

const clickOnBoard = ({ element }) => {

    clearBoard([onFieldTypes.SHOW_WALK_DISTANCE])
    if (element && element.userData) {
        if (element.userData.type === onFieldTypes.AVAILABLE_WALK)
            moveCurrentPlayerToPosition(element.userData.position)
        if (warriorsAvailableToAttack.includes(element.userData.id)) {
            attackWarrior(element.userData.id, element.userData.type)
        }
    }
}

const showInfo = ({ element }) => {
    if (element && element.userData) {
        for (const player of Object.values(players)) {
            if (player.army.checkIfWarriorBelongsToArmy(element.userData.id)) {
                const color = player.type === 'player' ? playersColors[onFieldTypes.ALLY] : playersColors[onFieldTypes.ENEMY]
                player.army.addWindow(element.userData.id, player.name, color)
            }
        }
    }
}

export const battleInit = (player, enemy) => {
    players[onFieldTypes.ALLY] = player
    players[onFieldTypes.ENEMY] = enemy

    makeEmptyBoard()

    allWarriors = []
    setWarriorsStartPosition(players[onFieldTypes.ALLY], onFieldTypes.ALLY)
    setWarriorsStartPosition(players[onFieldTypes.ENEMY], onFieldTypes.ENEMY)


    allWarriors.sort(() => Math.random() - 0.5)

    nextRound()

    enableMouseEventsOnScene(listenersName.KEYDOWN, ({ e }) => {
        if (e.keyCode === 13) {
            nextRound()
        }
    })
    enableMouseEventsOnScene(listenersName.CLICK, clickOnBoard)
    enableMouseEventsOnScene(listenersName.RIGHTCLICK, showInfo)
    enableMouseEventsOnScene(listenersName.MOUSEMOVE, mouseMoveOnBoard)
    obstaclesInit()
}