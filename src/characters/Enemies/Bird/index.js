import * as THREE from 'three'

import { birdModels } from './birdModels'
import { removeBird } from './allBirds'
import { createWindow } from '../../../threeConfig'
import { idGenerator, makeArmyInfo } from '../../../commonFunctions'
import { battleStart } from '../../../battle'

import { Army } from '../../Army'

export class Bird {
    constructor(range, modelName, startPosition) {

        this.range = range
        this.id = idGenerator()
        this.modelName = modelName
        this.FlightHeight = 10
        this.speed = 0.6
        this.directionVect = new THREE.Vector3(0, 0, 0)
        this.type = 'enemy'
        this.name = modelName
        this.army = new Army()
        this.findBirdModel(startPosition)
        this.makeBirdRangeCircle()
        this.makeInformationWindows()
    }

    findBirdModel = ({ x, z }) => {
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

        this.circle.userData = {
            id: this.id,
            type: 'bird'
        }
        this.updateCirclePosition()
        this.birdContainer.position.setX(this.birdContainer.position.x + this.range)
    }

    updateWarriors = (type, number) => {
        if (type && number)
            this.army.addWarriors(type, number)
        this.makeInformationWindows()
    }

    deletePlayer = () => {
        removeBird(this.id)
    }

    makeInformationWindows = () => {
        const fightInfoElement = createWindow(
            'Fight',
            `You have been attacked by group of birds`,
            `FIGHT`,
            () => {
                this.removeWindow('fight')
            }
        )

        const armyInfoElement = createWindow(
            'Bird',
            `dangerousity level: ${'jakis level'} </br>
            ${makeArmyInfo(this.army.warriors)}`,
            `OK`,
            () => {
                this.removeWindow('army')
            }
        )

        this.informationWindows = {
            fight: {
                active: false,
                element: fightInfoElement
            },
            army: {
                active: false,
                element: armyInfoElement
            }
        }
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

    moveBird = (playerContainer, player) => {
        const playerModel = player.getPlayerModel()
        if (this.circle.position.clone().distanceTo(playerContainer.position.clone()) < this.range) {
            this.directionVect = this.getBirdDirectionVector(playerContainer)
        }
        else if (this.birdContainer.position.clone().distanceTo(this.circle.position.clone()) >= this.range - this.birdModel.geometry.parameters.width) {
            this.directionVect = this.getBirdDirectionVector(this.circle)
        }
        if (this.birdContainer.position.clone().distanceTo(playerContainer.position.clone()) <= this.birdModel.geometry.parameters.width / 2 + playerModel.geometry.parameters.width) {
            battleStart(player, this)
            this.addWindow('fight')

        }
        this.birdContainer.translateOnAxis(this.directionVect, this.speed)
    }

    addWindow = (name) => {
        if (!this.informationWindows[name].active) {
            document.body.appendChild(this.informationWindows[name].element)
            this.informationWindows[name].active = true
        }
    }

    removeWindow = (name) => {
        this.informationWindows[name].element.parentNode.removeChild(this.informationWindows[name].element)
        this.informationWindows[name].active = false
    }

    getContainer = () => {
        return this.birdContainer
    }
    getModel = () => {
        return this.birdModel
    }
    getCircle = () => {
        return this.circle
    }
}