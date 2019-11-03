import * as THREE from 'three'

import {
    scene,
    animateStart,
    camera,
    enableMouseEventsOnScene,
    disableMouseEventsOnScene,
    animateStop
} from '../threeConfig'


import {
    allPlayers,
    findPlayerIndexByCurrentRound
} from '../characters/Player/allPlayers'

let currentRound = 1

let distance = 0
let clickedPosition = new THREE.Vector3(0, 20, 0)
let directionVect = new THREE.Vector3(0, 0, 0)

let currentPlayer = {}

const movePlayer = ({ element, clickPosition }) => {
    [clickedPosition, directionVect] = allPlayers[findPlayerIndexByCurrentRound(currentRound)].getPlayerMoveVectors(element, clickPosition, clickedPosition) || [clickedPosition, directionVect]
}

enableMouseEventsOnScene(undefined, movePlayer)


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
            disableMouseEventsOnScene()
        }
        currentPlayer.getPlayerContainer().translateOnAxis(directionVect, currentPlayer.speed)

    } else {
        if (!currentPlayer.showCircle) {
            if (currentPlayer.currentRange > currentPlayer.speed + currentPlayer.getPlayerModel().geometry.parameters.width) {
                scene.add(currentPlayer.getPlayerCircle())
                currentPlayer.showCircle = true
            }
            else {
                currentPlayer.endPlayerRound()
                goToNextRound()
            }

            enableMouseEventsOnScene(undefined, movePlayer)
        }
    }
}

const goToNextRound = () => {

    directionVect = new THREE.Vector3(0, 0, 0)
    currentRound += 1

    currentPlayer = allPlayers[findPlayerIndexByCurrentRound(currentRound)]
    currentPlayer.showCircle = true

    clickedPosition = new THREE.Vector3(currentPlayer.getPlayerContainer().position.x, currentPlayer.FlightHeight, currentPlayer.getPlayerContainer().position.z)

    scene.add(currentPlayer.getPlayerCircle())
}

export const worldNavigationStart = () => {

    for (const player of allPlayers) {

        player.makePlayerRangeCircle()
        scene.add(player.getPlayerContainer())

        if (allPlayers[findPlayerIndexByCurrentRound(currentRound)].round === player.round) {
            currentPlayer = player
            player.showCircle = true
            scene.add(player.getPlayerCircle())
        }
    }
    animateStart(update)
}
