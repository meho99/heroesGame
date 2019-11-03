import * as THREE from 'three'
import { playersModels } from './playersModels'

export class Player {
    constructor(range, modelName) {

        this.range = range
        this.modelName = modelName
        this.speed = 3
        this.round = 0

        this.findPlayerModel()
    }
    findPlayerModel = () => {
        this.modelDetails = playersModels.find(model => model.name = this.modelName)

        this.playerContainer = new THREE.Object3D()
        this.playerModel = new THREE.Mesh(this.modelDetails.geometry, this.modelDetails.material)

        this.playerContainer.add(this.playerModel)
        this.playerContainer.position.setY(20)
    }

    makePlayerRangeCircle = () => {
        const circleGeometry = new THREE.CircleGeometry(this.range, 320);
        circleGeometry.rotateX(-Math.PI / 2)
        const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })

        this.circle = new THREE.Mesh(circleGeometry, circleMaterial)
        this.circle.userData.moveHere = this.round

        this.updateCirclePosition()
    }

    updatePlayerRound = (round) => {
        this.round = round
    }
    updatePlayerPosition = ({ x, y, z }) => {
        this.playerContainer.position.set(x, y, z)
    }
    updateCirclePosition = () => {
        this.circle.position.set(this.playerContainer.position.x, 0.1, this.playerContainer.position.z)
    }
    updateCircleSize = () => {
        let newCircleGeometry = new THREE.CircleGeometry(this.range, 320);
        newCircleGeometry.rotateX(-Math.PI / 2)
        this.circle.geometry.dispose()
        this.circle.geometry = newCircleGeometry
    }

    getPlayerContainer = () => {
        return this.playerContainer
    }
    getPlayerModel = () => {
        return this.playerModel
    }
    getPlayerCircle = () => {
        return this.circle
    }
}