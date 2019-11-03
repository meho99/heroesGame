import * as THREE from 'three'
import { birdModels } from './birdModels'

export class Bird {
    constructor(range, modelName, startPosition) {

        this.range = range
        this.modelName = modelName
        this.FlightHeight = 20
        this.speed = 1
        this.directionVect = new THREE.Vector3(0, 0, 0)

        this.findBirdModel(startPosition)
        this.makeBirdRangeCircle()
    }
    findBirdModel = ({x, z}) => {
        this.modelDetails = birdModels.find(model => model.name = this.modelName)

        this.birdContainer = new THREE.Object3D()
        this.birdModel = new THREE.Mesh(this.modelDetails.geometry, this.modelDetails.material)

        this.birdContainer.add(this.birdModel)

        this.birdContainer.position.set(x, this.FlightHeight, z)
    }

    makeBirdRangeCircle = () => {
        var circleGeometry = new THREE.CircleGeometry(this.range, 50)
        circleGeometry.rotateX(-Math.PI / 2)

        var circleMaterial = new THREE.MeshBasicMaterial({ color: 0xaaff66, transparent: true, opacity: 0.2 })

        this.circle = new THREE.Mesh(circleGeometry, circleMaterial)
        this.updateCirclePosition()
        this.birdContainer.position.setX(this.birdContainer.position.x + this.range)
    }

    updatBirdPosition = ({ x, y, z }) => {
        this.birdContainer.position.set(x, y, z)
    }
    updateCirclePosition = () => {
        this.circle.position.set(this.birdContainer.position.x, 0.1, this.birdContainer.position.z)
    }

    getBirdDirectionVector = (target) => {
        this.birdModel.rotation.y = Math.atan2(
            this.birdContainer.position.clone().x - target.position.x,
            this.birdContainer.position.clone().z - target.position.z
        )
        let targetPosition = target.position.clone()
        targetPosition.y = this.FlightHeight
        return targetPosition.sub(this.birdContainer.position.clone()).normalize()
    }

    moveBird = (playerContainer, playerModel) => {

        if (this.circle.position.clone().distanceTo(playerContainer.position.clone()) < this.range) {
            this.directionVect = this.getBirdDirectionVector(playerContainer)
        }
        else if (this.birdContainer.position.clone().distanceTo(this.circle.position.clone()) >= this.range - this.birdModel.geometry.parameters.width) {
            this.directionVect = this.getBirdDirectionVector(this.circle)
        }
        if (this.birdContainer.position.clone().distanceTo(playerContainer.position.clone()) <= this.birdModel.geometry.parameters.width / 2 + playerModel.geometry.parameters.width) {
            console.log("złpany")
        }
        this.birdContainer.translateOnAxis(this.directionVect, this.speed)
    }

    getBirdContainer = () => {
        return this.birdContainer
    }
    getBirdModel = () => {
        return this.birdModel
    }
    getBirdCircle = () => {
        return this.circle
    }
}