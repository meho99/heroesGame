import { idGenerator } from '../commonFunctions'
import { newWarrior } from './warriors'
import { createWindow } from '../threeConfig'

export class Army {
    constructor() {
        this.warriors = {}

        this.informationWindow = {
            active: false,
            element: null
        }
    }

    addWarriors = (type, number) => {

        const prevWarriors = this.warriors[type] ? this.warriors[type] : { ...newWarrior(type, idGenerator()), quantity: 0 }

        this.warriors[type] = { ...prevWarriors, quantity: prevWarriors.quantity + number, currentHealth: prevWarriors.currentHealth + number * prevWarriors.maxHealth }
    }

    checkIfWarriorBelongsToArmy = (id) =>
        Object.keys(this.warriors).some(warriorsGroup =>
            this.warriors[warriorsGroup].id === id
        )
    
    defendAttack = (id, attackPower, quantity) => {
        const warrior = this.warriors[Object.keys(this.warriors).find(warriorsGroup => this.warriors[warriorsGroup].id === id)]
        const defendersQuantity = warrior.quantity < quantity ? warrior.quantity : quantity
        let lostHealthPoints = attackPower - defendersQuantity * warrior.defend
        lostHealthPoints = lostHealthPoints > quantity ? lostHealthPoints : quantity
        warrior.currentHealth -= lostHealthPoints
        warrior.quantity = warrior.currentHealth <= 0 ? 0 : parseInt(warrior.currentHealth/warrior.maxHealth) + 1
    }

    killUnit = (id) => {
        delete this.warriors[Object.keys(this.warriors).find(warriorsGroup => this.warriors[warriorsGroup].id === id)]
    }
            
    addWindow = (id, playerName, color) => {
        const warrior = this.warriors[Object.keys(this.warriors).find(warriorsGroup => this.warriors[warriorsGroup].id === id)]

        const unitInfoElement = createWindow(
            warrior.name,
            `ilość: ${warrior.quantity} </br>
            gracz: ${playerName}</br>
            punkty życia: ${warrior.currentHealth}</br>
            siła: ${warrior.force} </br>
            zasięg: ${warrior.range}
            `,
            `OK`,
            () => {
                this.removeWindow()
            },
            {
                headerStyles: { color }
            }
        )

        if (!this.informationWindow.active) {
            document.body.appendChild(unitInfoElement)
            this.informationWindow.active = true
            this.informationWindow.element = unitInfoElement
        }
    }

    removeWindow = () => {
        this.informationWindow.element.parentNode.removeChild(this.informationWindow.element)
        this.informationWindow.active = false
    }
}
