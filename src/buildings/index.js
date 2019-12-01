import * as THREE from 'three'

import { models } from './buildingModels'
import { createWindow } from '../threeConfig'
import { idGenerator } from '../commonFunctions'
import { removeBuilding } from './allbuildings'
import { UpdatePlayerDetails } from '../userInterface/bottomMenu'
import { buildingActions } from './buildingActions'

export class Building {
    constructor(type, range, modelName, startPosition, additional) {

        this.range = range
        this.id = idGenerator()
        this.modelName = modelName
        this.FlightHeight = 0
        this.additional = additional
        this.type = "building"
        this.findModel(startPosition)
        this.makeRangeCircle()
        this.makeInformationWindows()
        this.type = type
        this.changeOwnerBlock = false // po nowej rundzie sie odnowi !!
    }

    findModel = ({ x, z }) => {
        this.modelDetails = models.find(model => model.name = this.modelName)
        this.container = new THREE.Object3D()
        this.container.add(this.modelDetails.model())
        //console.log(this.container.geometry.parameters.width)
        this.container.position.set(x + this.modelDetails.positionCorrections.x, this.FlightHeight + this.modelDetails.positionCorrections.y, z + this.modelDetails.positionCorrections.z)
    }

    makeRangeCircle = () => {
        var circleGeometry = new THREE.CircleGeometry(this.range, 50)
        circleGeometry.rotateX(-Math.PI / 2)

        var circleMaterial = new THREE.MeshBasicMaterial({ color: 0xaaff66, transparent: true, opacity: 0.2 })

        this.circle = new THREE.Mesh(circleGeometry, circleMaterial)

        this.circle.userData = {
            id: this.id,
            type: 'building'
        }
        this.updateCirclePosition()
        this.container.position.set(this.container.position.x + this.modelDetails.positionCorrections.x, this.FlightHeight + this.modelDetails.positionCorrections.y, this.container.position.z + this.modelDetails.positionCorrections.z)

    }

    setChangeOwnerBlock = (value) => {
        this.changeOwnerBlock = value
    }

    makeInformationWindows = () => {
        const collectInfoElemnt = createWindow(
            'Złoto',
            `Zebrałeś ${this.additional.gold} sztuk złota`,
            `OK`,
            () => {
                this.removeWindow('collect')
            }
        )

        const infoElment = createWindow(
            'Złoto',
            `${this.additional.gold} sztuk`,
            `OK`,
            () => {
                this.removeWindow('info')
            }
        )

        this.informationWindows = {
            collect: {
                active: false,
                element: collectInfoElemnt
            },
            info: {
                active: false,
                element: infoElment
            }
        }
    }

    changeOwner = (playerContainer, player, scene) => {
        const playerPosition = new THREE.Vector3(playerContainer.position.x, this.FlightHeight, playerContainer.position.z)
        if (this.circle.position.clone().distanceTo(playerPosition) < this.range) {
            buildingActions[this.type].changeOwner({ ...this, player, UpdatePlayerDetails, removeBuilding, scene })
        }
    }

    updateCirclePosition = () => {
        this.circle.position.set(this.container.position.x, 0.1, this.container.position.z)
    }

    addWindow = (name) => {
        console.log(this)
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
        return this.container
    }
    getModel = () => {
        return this.model
    }
    getCircle = () => {
        return this.circle
    }
}