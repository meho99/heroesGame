import * as THREE from 'three'

import {
    animateUpdate,
    enableMouseEventsOnScene,
    disableMouseEventsOnScene,
    listenersName,
    setGroupToClick,
    setCurrentScene,
} from '../threeConfig'

import { scene, camera, cameraControls } from './scene'

import {
    allPlayers,
    findPlayerIndexByCurrentRound
} from '../characters/Player/allPlayers'

import { allBirds, findBirdIndexById } from '../characters/Enemies/Bird/allBirds'
import { allStaticEnemies, findStaticEnemyIndexById } from '../characters/Enemies/Static/allStaticEnemies'

let currentRound = 1

let distance = 0
let clickedPosition = new THREE.Vector3(0, 20, 0)
let directionVect = new THREE.Vector3(0, 0, 0)

let currentPlayer = {}

const movePlayer = ({ element, clickPosition }) => {
    if (element) {
        [clickedPosition, directionVect] = allPlayers[findPlayerIndexByCurrentRound(currentRound)].getPlayerMoveVectors(element, clickPosition, clickedPosition) || [clickedPosition, directionVect]
    }
}

const getClickedElement = ({ element }) => {
    if (element) {
        if (element.userData && element.userData.type === 'bird') {
            allBirds[findBirdIndexById(element.userData.id)].addWindow('army')
        }

        if (element.userData && element.userData.type === 'staticEnemy') {
            allStaticEnemies[findStaticEnemyIndexById(element.userData.id)].addWindow('army')
        }
    }
}
enableMouseEventsOnScene(listenersName.RIGHTCLICK, getClickedElement)

enableMouseEventsOnScene(listenersName.DBCLICK, movePlayer)


const update = () => {
    currentPlayer.updateCirclePosition()
    let cubePositionOnBoard = currentPlayer.getPlayerContainer().position.clone()
    distance = cubePositionOnBoard.distanceTo(clickedPosition)

    if (distance > currentPlayer.speed) {
        if (currentPlayer.showCircle) {
            currentPlayer.decreasePlayerRange(distance)

            currentPlayer.updateCircleSize()
            currentPlayer.showCircle = false
            scene.remove(currentPlayer.getPlayerCircle())
            disableMouseEventsOnScene(listenersName.DBCLICK)
        }

        currentPlayer.moveCameraToPlayer()
        currentPlayer.getPlayerContainer().translateOnAxis(directionVect, currentPlayer.speed)

    } else {
        if (!currentPlayer.showCircle) {
            if (currentPlayer.currentRange > currentPlayer.speed + currentPlayer.getPlayerModel().geometry.parameters.width) {
                scene.add(currentPlayer.getPlayerCircle())
                currentPlayer.showCircle = true
            }

            enableMouseEventsOnScene(listenersName.DBCLICK, movePlayer)
        }
    }

    for (const bird of allBirds) {
        bird.moveBird(currentPlayer.getPlayerContainer(), currentPlayer)
    }
    for (const staticEnemy of allStaticEnemies) {
        staticEnemy.shouldAttack(currentPlayer.getPlayerContainer(), currentPlayer)
    }
}

const goToNextRound = () => {
    currentPlayer.endPlayerRound(scene)

    directionVect = new THREE.Vector3(0, 0, 0)
    currentRound += 1

    currentPlayer = allPlayers[findPlayerIndexByCurrentRound(currentRound)]
    currentPlayer.startPlayerRound(scene)

    clickedPosition = new THREE.Vector3(currentPlayer.getPlayerContainer().position.x, currentPlayer.FlightHeight, currentPlayer.getPlayerContainer().position.z)
}

export const worldNavigationStart = () => {
    setCurrentScene(scene, camera, cameraControls)
    setGroupToClick(scene)

    for (const bird of allBirds) {
        scene.add(bird.getBirdContainer())
        scene.add(bird.getBirdCircle())
    }

    for (const StaticEnemy of allStaticEnemies) {
        scene.add(StaticEnemy.getStaticEnemyContainer())
        scene.add(StaticEnemy.getStaticEnemyCircle())
    }

    for (const player of allPlayers) {

        player.makePlayerRangeCircle()
        scene.add(player.getPlayerContainer())

        if (allPlayers[findPlayerIndexByCurrentRound(currentRound)].round === player.round) {
            currentPlayer = player
            player.startPlayerRound(scene)
            clickedPosition = new THREE.Vector3(player.getPlayerContainer().position.x, player.FlightHeight, player.getPlayerContainer().position.z)
        }
    }
    animateUpdate(update)

    enableMouseEventsOnScene(listenersName.DBCLICK, movePlayer)
    enableMouseEventsOnScene(listenersName.KEYDOWN, ({ e }) => {
        if (e.keyCode === 13) {
            goToNextRound()
        }
    })
}

export const worldNavigationRestart = () => {
    setGroupToClick(scene)
    setCurrentScene(scene, camera, cameraControls)
    animateUpdate(update)
    enableMouseEventsOnScene(listenersName.DBCLICK, movePlayer)
    enableMouseEventsOnScene(listenersName.KEYDOWN, ({ e }) => {
        if (e.keyCode === 13) {
            goToNextRound()
        }
    })
}
