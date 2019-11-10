import * as THREE from 'three'

import { staticEnemyModels } from './staticEnemiesModel'
import { createWindow } from '../../../threeConfig'
import { idGenerator } from '../../../commonFunctions'
import { battleStart } from '../../../battle'

import { Army } from '../../Army'

export class StaticEnemy {
    constructor(range, modelName, startPosition) {

        this.range = range
        this.id = idGenerator()
        this.modelName = modelName
        this.FlightHeight = 1
        this.speed = 0.6
        this.directionVect = new THREE.Vector3(0, 0, 0)

        this.army = new Army()

        this.findStaticEnemyModel(startPosition)
        this.makeStaticEnemyRangeCircle()
        this.makeInformationWindows()
    }

    findStaticEnemyModel = ({ x, z }) => {
        this.modelDetails = staticEnemyModels.find(model => model.name = this.modelName)

        this.staticEnemyContainer = new THREE.Object3D()
        this.staticEnemyModel = new THREE.Mesh(this.modelDetails.geometry, this.modelDetails.material)

        this.staticEnemyContainer.add(this.staticEnemyModel)
        this.staticEnemyContainer.position.set(x, this.FlightHeight, z)
    }

    makeStaticEnemyRangeCircle = () => {
        var circleGeometry = new THREE.CircleGeometry(this.range, 50)
        circleGeometry.rotateX(-Math.PI / 2)

        var circleMaterial = new THREE.MeshBasicMaterial({ color: 0xaaff66, transparent: true, opacity: 0.2 })

        this.circle = new THREE.Mesh(circleGeometry, circleMaterial)

        this.circle.userData = {
            id: this.id,
            type: 'staticEnemy'
        }
        this.updateCirclePosition()

    }

    makeInformationWindows = () => {
        const fightInfoElement = createWindow(
            'Fight',
            `You have been attacked by group of enemies`,
            `FIGHT`,
            () => {
                this.removeWindow('fight')
            }
        )

        const armyInfoElement = createWindow(
            'staticEnemy',
            `dangerousity level: ${'jakis level'} </br>
            Tutaj bedzie mniej wiecej wypisana armia czy cos`,
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


    updateCirclePosition = () => {
        this.circle.position.set(this.staticEnemyContainer.position.x, 0.1, this.staticEnemyContainer.position.z)
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

    shouldAttack = (playerContainer, player) => {
        const playerPosition = new THREE.Vector3(playerContainer.position.x, this.FlightHeight, playerContainer.position.z)
        if (this.circle.position.clone().distanceTo(playerPosition) < this.range) {
            battleStart(player, this)
            this.addWindow('fight')
        }
    }

    getStaticEnemyContainer = () => {
        return this.staticEnemyContainer
    }
    getStaticEnemyModel = () => {
        return this.staticEnemyModel
    }
    getStaticEnemyCircle = () => {
        return this.circle
    }
}