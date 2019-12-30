import { onFieldTypes, emptyFieldData, playersColors, boardWidth, boardHeight } from './constants'
import { battleEnd } from './'
import { randomNumber } from '../commonFunctions'
import { enableMouseEventsOnScene, listenersName, changeCursor } from '../threeConfig'
import { obstaclesInit } from './obstacles'
import { WARRIOR_ABILITIES } from '../characters/warriors'

let players = {}

export let currentRound = 0

export let boardData = []

export let allWarriors = []

export let warriorsAvailableToAttack = []
export let avilableShoot = false

let walkBlock = false

export const nextRound = (warriorId) => {
    avilableShoot = false
    walkBlock = false
    if (warriorId) {
        currentRound = allWarriors.findIndex(warrior => warrior.id === warriorId) + 1
    } else {
        currentRound += 1

    }
    checkWarriorAbilities()
    showWarriorRange(getCurrentWarrior(), onFieldTypes.AVAILABLE_WALK)
    // for (let i = 0; i < 3; i++) {
    //     const warriorIndex = ((currentRound - 1 + i) % allWarriors.length)
    //     console.log(allWarriors[warriorIndex])
    // }
}

const makeEmptyBoard = () => {
    boardData = []
    for (let y = 0; y < boardHeight; y++) {
        boardData[y] = []
        for (let x = 0; x < boardWidth; x++) {
            boardData[y][x] = { ...emptyFieldData, position: { x, y } }
        }
    }
}

const createFieldData = (type, position, id) => ({
    type,
    position,
    id
})

const checkWarriorAbilities = () => {
    if (getCurrentWarrior().abilities.includes(WARRIOR_ABILITIES.ATTACKER)) {
        checkIfCanAttack()
    }
    if (getCurrentWarrior().abilities.includes(WARRIOR_ABILITIES.SHOOTER)) {
        checkIfCanShoot()
    }
}

const setWarriorsStartPosition = (player, side) => {
    let range
    if (side === onFieldTypes.ALLY) {
        range = { min: 0, max: 2 }
    } else {
        range = { min: boardWidth - 2, max: boardWidth }
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
                randomYPosition = randomNumber(0, boardHeight)
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
            if ((x >= 0 && x < boardWidth) && (y >= 0 && y < boardHeight) && boardData[y][x].type === onFieldTypes.EMPTY) {
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

    checkWarriorAbilities()
    walkBlock = true

    if (warriorsAvailableToAttack.length === 0) {
        nextRound()
    }
}

const getOpponentFieldType = () => {
    const { x, y } = getCurrentWarrior().position
    return boardData[y][x].type === onFieldTypes.ENEMY ? onFieldTypes.ALLY : onFieldTypes.ENEMY
}

const checkIfCanAttack = () => {
    warriorsAvailableToAttack = []
    const { x, y } = getCurrentWarrior().position
    const opponentFieldType = getOpponentFieldType()

    const checkIfEnemyStandsHere = (y, x) => boardData[y][x].type === opponentFieldType
    const nearFields = [[0, 1], [0, -1], [1, 1], [1, -1], [1, 0], [-1, 1], [-1, -1], [-1, 0]]

    for (const field of nearFields) {
        let fieldY = y + field[0]
        let fieldX = x + field[1]
        if (fieldX >= 0 && fieldX < boardWidth && fieldY >= 0 && fieldY < boardHeight) {
            if (checkIfEnemyStandsHere(fieldY, fieldX)) {
                warriorsAvailableToAttack.push(boardData[fieldY][fieldX].id)
            }
        }
    }
}

const checkIfCanShoot = () => {
    avilableShoot = true
    const { x, y } = getCurrentWarrior().position
    const opponentFieldType = getOpponentFieldType()

    const checkIfEnemyStandsHere = (y, x) => boardData[y][x].type === opponentFieldType
    const nearFields = [[0, 1], [0, -1], [1, 1], [1, -1], [1, 0], [-1, 1], [-1, -1], [-1, 0]]

    for (const field of nearFields) {
        let fieldY = y + field[0]
        let fieldX = x + field[1]
        if (fieldX >= 0 && fieldX < boardWidth && fieldY >= 0 && fieldY < boardHeight) {
            if (checkIfEnemyStandsHere(fieldY, fieldX)) {
                avilableShoot = false
            }
        }
    }
}

const mouseMoveOnBoard = ({ element }) => {
    clearBoard([onFieldTypes.SHOW_WALK_DISTANCE])
    changeCursor('basic')
    if (element && element.userData) {
        if ((element.userData.type === onFieldTypes.ALLY || element.userData.type === onFieldTypes.ENEMY) && element.userData.id !== getCurrentWarrior().id) {

            const opponentFieldType = getOpponentFieldType()

            if (element.userData.type === opponentFieldType) {
                if (avilableShoot) changeCursor('bow')
            }
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
    const damage = randomNumber(getCurrentWarrior().damage.min, getCurrentWarrior().damage.max)
    const attackPower = attacker.quantity * damage
    players[type].army.defendAttack(id, attackPower, getCurrentWarrior().quantity)
    if (findWarriorById(id).quantity <= 0) {
        players[type].army.killUnit(id)
    }
    if (deleteDeadWarriors()) {// restart round when warrior killed someone
        nextRound(attacker.id)
    }
    else nextRound()
}

const shootWarrior = (id, type) => {
    const attacker = { ...getCurrentWarrior() }
    const damage = randomNumber(getCurrentWarrior().shootDamage.min, getCurrentWarrior().shootDamage.max)
    const shootPower = attacker.quantity * damage
    players[type].army.defendAttack(id, shootPower, getCurrentWarrior().quantity)
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

    const opponentFieldType = getOpponentFieldType()

    if (element && element.userData) {
        if (warriorsAvailableToAttack.includes(element.userData.id))
            attackWarrior(element.userData.id, element.userData.type)
        else if (avilableShoot && element.userData.type === opponentFieldType)
            shootWarrior(element.userData.id, element.userData.type)
        else if (element.userData.type === onFieldTypes.AVAILABLE_WALK)
            moveCurrentPlayerToPosition(element.userData.position)
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


    allWarriors.sort((a, b) =>
        b.initiative > a.initiative ? 1 : (a.initiative > b.initiative ? -1 : 0)
    )

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