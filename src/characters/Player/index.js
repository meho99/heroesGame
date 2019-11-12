import * as THREE from 'three'

import { playersModels } from './playersModels'
import { removePlayer } from './allPlayers'
import { idGenerator } from '../../commonFunctions'
import { Army } from '../Army'

import { cameraControls } from '../../worldNavigation/scene'

export class Player {
    constructor(name, range, modelName, startPosition) {

        this.range = range
        this.currentRange = range
        this.showCircle = false
        this.modelName = modelName
        this.FlightHeight = 10
        this.speed = 2
        this.round = 0
        this.name = name
        this.type = 'player'

        this.army = new Army()

        this.id = idGenerator()

        this.findPlayerModel(startPosition)
    }
    findPlayerModel = ({ x, z }) => {
        this.modelDetails = playersModels.find(model => model.name = this.modelName)

        this.playerContainer = new THREE.Object3D()
        this.playerModel = new THREE.Mesh(this.modelDetails.geometry, this.modelDetails.material)

        this.playerContainer.add(this.playerModel)
        this.playerContainer.position.set(x, this.FlightHeight, z)
    }

    makePlayerRangeCircle = () => {
        const circleGeometry = new THREE.CircleGeometry(this.currentRange, 320);
        circleGeometry.rotateX(-Math.PI / 2)
        const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.2 })

        this.circle = new THREE.Mesh(circleGeometry, circleMaterial)
        this.circle.userData.moveHere = this.round

        this.updateCirclePosition()
    }

    deletePlayer = () => {
        removePlayer(this.id)
    }

    updatePlayerRound = (round) => {
        this.round = round
    }
    updatePlayerPosition = ({ x, y = this.FlightHeight, z }) => {
        this.playerContainer.position.set(x, y, z)
    }
    updateCirclePosition = () => {
        this.circle.position.set(this.playerContainer.position.x, 0.3, this.playerContainer.position.z)
    }
    decreasePlayerRange = (value) => {
        this.currentRange -= value
    }
    updateCircleSize = () => {
        let newCircleGeometry = new THREE.CircleGeometry(this.currentRange, 320);
        newCircleGeometry.rotateX(-Math.PI / 2)
        this.circle.geometry.dispose()
        this.circle.geometry = newCircleGeometry
    }

    endPlayerRound = (scene) => {
        this.showCircle = false
        scene.remove(this.circle)
    }
    startPlayerRound = (scene) => {
        this.showCircle = true
        this.currentRange = this.range
        if (scene) scene.add(this.circle)
        this.updateCircleSize()
        this.moveCameraToPlayer()
    }

    moveCameraToPlayer = () => {
        cameraControls.target.copy(this.playerContainer.position)
    }

    getPlayerMoveVectors = (element, clickPosition, previousClickedPosition) => {
        let clickedPosition = previousClickedPosition
        if (element && element.userData.moveHere === this.round) {

            this.getPlayerModel().rotation.y = Math.atan2(
                this.getContainer().position.clone().x - clickedPosition.x,
                this.getContainer().position.clone().z - clickedPosition.z
            )

            clickedPosition = clickPosition
            clickedPosition.setY(this.FlightHeight)
            let directionVect = clickedPosition.clone().sub(this.getContainer().position.clone()).normalize()

            return [
                clickedPosition,
                directionVect
            ]
        }
    }

    getContainer = () => {
        return this.playerContainer
    }
    getPlayerModel = () => {
        return this.playerModel
    }
    getPlayerCircle = () => {
        return this.circle
    }
}