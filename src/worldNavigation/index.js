import * as THREE from 'three'

import {
    scene,
    animateStart,
    enableMouseEventsOnScene,
    disableMouseEventsOnScene,
    animateStop
} from '../threeConfig'


import {
    allPlayers,
    findPlayerIndexByCurrentRound
} from '../characters/Player/allPlayers'

import {
    Bird
} from '../characters/Enemies/Bird'

let currentRound = 1

let distance = 0
let clickedPosition = new THREE.Vector3(0, 20, 0)
let directionVect = new THREE.Vector3(0, 0, 0)

let currentPlayer = {}

let bird

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

            enableMouseEventsOnScene(undefined, movePlayer)
        }
    }

    bird.moveBird(currentPlayer.getPlayerContainer(), currentPlayer.getPlayerModel())
}
var boardGeometry = new THREE.PlaneGeometry(1000, 1000);
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

    bird = new Bird(100, 'testBird', { x: 100, z: 100 })
    bird.getBirdContainer().position.setX(bird.getBirdContainer().position.x + bird.range)
    scene.add(bird.getBirdContainer())
    scene.add(bird.getBirdCircle())

    for (const player of allPlayers) {

        player.makePlayerRangeCircle()
        scene.add(player.getPlayerContainer())

        if (allPlayers[findPlayerIndexByCurrentRound(currentRound)].round === player.round) {
            currentPlayer = player
            player.startPlayerRound(scene)
            clickedPosition = new THREE.Vector3(player.getPlayerContainer().position.x, player.FlightHeight, player.getPlayerContainer().position.z)
        }
    }
    animateStart(update)
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13)
        goToNextRound()
})