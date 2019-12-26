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
import { allBuildings, findBuildingIndexById } from '../buildings/allbuildings'
import { ShowBottomMenu } from '../userInterface/bottomMenu'

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

        if (element.userData && element.userData.type === 'building') {
            allBuildings[findBuildingIndexById(element.userData.id)].addWindow('info')
        }
    }
}

const update = () => {
    currentPlayer.updateCirclePosition()
    let cubePositionOnBoard = currentPlayer.getContainer().position.clone()
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
        currentPlayer.getContainer().translateOnAxis(directionVect, currentPlayer.speed)

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
        bird.moveBird(currentPlayer.getContainer(), currentPlayer)
    }
    for (const staticEnemy of allStaticEnemies) {
        staticEnemy.shouldAttack(currentPlayer.getContainer(), currentPlayer)
    }

    for (const building of allBuildings) {
        building.changeOwner(currentPlayer.getContainer(), currentPlayer, scene)
    }
}

const goToNextRound = () => {
    if (currentPlayer) currentPlayer.endPlayerRound(scene)

    if (currentPlayer) currentRound += 1

    directionVect = new THREE.Vector3(0, 0, 0)

    currentPlayer = allPlayers[findPlayerIndexByCurrentRound(currentRound)]
    currentPlayer.startPlayerRound(scene)

    for (const building of allBuildings) {
        if(building.ownerId===currentPlayer.id){
            building.dailyAction()
        }
    }

    clickedPosition = new THREE.Vector3(currentPlayer.getContainer().position.x, currentPlayer.FlightHeight, currentPlayer.getContainer().position.z)
}

export const worldNavigationStart = () => {

    ShowBottomMenu()

    setCurrentScene(scene, camera, cameraControls)
    setGroupToClick(scene)

    for (const bird of allBirds) {
        scene.add(bird.getContainer())
        scene.add(bird.getCircle())
    }

    for (const building of allBuildings) {
        scene.add(building.getContainer())
        scene.add(building.getCircle())
    }

    for (const StaticEnemy of allStaticEnemies) {
        scene.add(StaticEnemy.getContainer())
        scene.add(StaticEnemy.getCircle())
    }

    for (const player of allPlayers) {

        player.makePlayerRangeCircle()
        scene.add(player.getContainer())

        if (allPlayers[findPlayerIndexByCurrentRound(currentRound)].round === player.round) {
            currentPlayer = player
            player.startPlayerRound(scene)
            clickedPosition = new THREE.Vector3(player.getContainer().position.x, player.FlightHeight, player.getContainer().position.z)
        }
    }
    animateUpdate(update)

    enableMouseEventsOnScene(listenersName.DBCLICK, movePlayer)
    enableMouseEventsOnScene(listenersName.KEYDOWN, ({ e }) => {
        if (e.keyCode === 13) {
            goToNextRound()
        }
    })
    enableMouseEventsOnScene(listenersName.RIGHTCLICK, getClickedElement)
    enableMouseEventsOnScene(listenersName.DBCLICK, movePlayer)
}

export const worldNavigationRestart = (killedPlayer) => {

    ShowBottomMenu()
    if (killedPlayer && killedPlayer.type === 'player' || killedPlayer.type === 'enemy' ) {
        killedPlayer.deletePlayer()

        scene.remove(killedPlayer.getContainer())
        if (killedPlayer.getCircle) {
            scene.remove(killedPlayer.getCircle())
            clickedPosition = new THREE.Vector3(currentPlayer.getContainer().position.x, currentPlayer.FlightHeight, currentPlayer.getContainer().position.z)
        }
        if (killedPlayer.type === 'player') {
            goToNextRound()
        }
    }
    setGroupToClick(scene)
    setCurrentScene(scene, camera, cameraControls)
    animateUpdate(update)
    enableMouseEventsOnScene(listenersName.DBCLICK, movePlayer)
    enableMouseEventsOnScene(listenersName.KEYDOWN, ({ e }) => {
        if (e.keyCode === 13) {
            goToNextRound()
        }
    })
    enableMouseEventsOnScene(listenersName.RIGHTCLICK, getClickedElement)
    enableMouseEventsOnScene(listenersName.DBCLICK, movePlayer)
}
