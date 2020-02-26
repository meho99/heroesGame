import './interface.css'
import { addWarriorToArmy, } from '../index'
import { Player } from '../characters/Player/index'
var bottomMenu = document.createElement("div")
bottomMenu.id = 'bottomMenu'

var currentPlayer = document.createElement("p")
bottomMenu.appendChild(currentPlayer)
currentPlayer.innerHTML = "player name"
currentPlayer.id = "bottomMenu_curretPlayer"

var gold = document.createElement("p")
bottomMenu.appendChild(gold)
gold.innerHTML = "gold: 5787"
gold.id = "bottomMenu_gold"

var recruits = document.createElement("p")
bottomMenu.appendChild(recruits)
recruits.innerHTML = "rekruci: 0"
recruits.id = "bottomMenu_recruits"

var recruiting = document.createElement("button")
bottomMenu.appendChild(recruiting)
recruiting.innerHTML = "trenuj"
recruiting.id = "bottomMenu_recruiting"

var recrutingInterface

var recrutingInterfaceContainer = document.createElement("div")
recrutingInterfaceContainer.id = "recruting_interface_container"
recrutingInterface = document.createElement("div")
recrutingInterface.id = "recruting_interface"
recrutingInterfaceContainer.appendChild(recrutingInterface)

var border = document.createElement("div")
border.id = "border"
recrutingInterface.appendChild(border)

var recruit = document.createElement("div")
recruit.id = "recruit"
recruit.innerHTML = 'AMATEUR'
recrutingInterface.appendChild(recruit)

var closingButton = document.createElement("div")
closingButton.id = "closing_button"
recrutingInterface.appendChild(closingButton)

closingButton.addEventListener("click", () => {
    ShowHideRecrutingMenu()
})

const UpdateRecrutingInterface = (player) => {
    // zmiana kontentu (mozliwi ludzie do zarekrutowania) np recruit.innerHTML = player.recruits
    recruit.addEventListener("click", () => {

        if (player.gold >= 10 && player.recruits >= 1) {  //do zmiany sztywne wartości 
            player.army.addWarriors('AMATEUR', 1)
            player.spendGold(10)
            player.removeRecruits(1)
            var goldInterfaceUpdate = String(player.gold)
            var recruitsInterfaceUpdate = String(player.recruits)
            gold.innerHTML = "Złoto: " + goldInterfaceUpdate
            recruits.innerHTML = "rekruci: " + recruitsInterfaceUpdate
        }
        else {
            console.log("nie")
            alert("Nie posiadasz wystarczająco dużo złota lub rekrutów")
        }
    })
}

let active = true

export const ShowHideRecrutingMenu = () => {
    if (active) {
        document.body.appendChild(recrutingInterfaceContainer)
    }
    else {
        document.body.removeChild(recrutingInterfaceContainer)
    }
    active = !active
}

recruiting.addEventListener("click", () => {
    ShowHideRecrutingMenu()
})

var bottomMenu_rangeContainer = document.createElement("div")
bottomMenu.appendChild(bottomMenu_rangeContainer)
bottomMenu_rangeContainer.id = "bottomMenu_rangeContainer"

var bottomMenu_range = document.createElement("div")
bottomMenu_rangeContainer.appendChild(bottomMenu_range)
bottomMenu_range.id = "bottomMenu_range"

export const updatePlayerRange = (percenct) => {
    bottomMenu_range.style.width = percenct
}
export const ShowBottomMenu = () => {
    document.body.appendChild(bottomMenu)
}
export const HideBottomMenu = () => {
    document.body.removeChild(bottomMenu)
}
export const UpdatePlayerDetails = (player) => {
    const { name, gold, recruits } = player

    UpdateRecrutingInterface(player)

    document.getElementById('bottomMenu_gold').innerHTML = `Złoto: ${gold}`
    document.getElementById('bottomMenu_curretPlayer').innerHTML = name
    document.getElementById('bottomMenu_recruits').innerHTML = `rukruci: ${recruits}`
}