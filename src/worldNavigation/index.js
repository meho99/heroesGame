import * as THREE from 'three'

import {
    animateUpdate,
    enableMouseEventsOnScene,
    disableMouseEventsOnScene,
    listenersName,
    animateStop
} from '../threeConfig'

import { scene } from './scene'

import {
    allPlayers,
    findPlayerIndexByCurrentRound
} from '../characters/Player/allPlayers'

import { allBirds } from '../characters/Enemies/Bird/allBirds';

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
        console.log(element.userData)
    }
}
enableMouseEventsOnScene(listenersName.CLICK, getClickedElement)

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
        bird.moveBird(currentPlayer.getPlayerContainer(), currentPlayer.getPlayerModel())
    }
}
var boardGeometry = new THREE.PlaneGeometry(10000, 10000);
var boardMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
var board = new THREE.Mesh(boardGeometry, boardMaterial);
boardGeometry.rotateX(-Math.PI / 2)
scene.add(board);

const goToNextRound = () => {
    currentPlayer.endPlayerRound(scene)

    directionVect = new THREE.Vector3(0, 0, 0)
    currentRound += 1

    currentPlayer = allPlayers[findPlayerIndexByCurrentRound(currentRound)]
    currentPlayer.startPlayerRound(scene)

    clickedPosition = new THREE.Vector3(currentPlayer.getPlayerContainer().position.x, currentPlayer.FlightHeight, currentPlayer.getPlayerContainer().position.z)
}

export const worldNavigationStart = () => {

    for (const bird of allBirds) {
        scene.add(bird.getBirdContainer())
        scene.add(bird.getBirdCircle())
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
}

export const worldNavigationRestart = () => {

    animateUpdate(update)
    enableMouseEventsOnScene(listenersName.DBCLICK, movePlayer)

}

enableMouseEventsOnScene(listenersName.KEYDOWN, ({ e }) => {
    if (e.keyCode === 13) {
        goToNextRound()
    }
})
