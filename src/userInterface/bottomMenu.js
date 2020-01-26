import './interface.css'
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
var active = false
recruiting.addEventListener("click", () => {
    if (active == false) {
        active = true
        var recrutingInterfaceContainer = document.createElement("div")
        recrutingInterfaceContainer.id = "recruting_interface_container"
        recrutingInterface = document.createElement("div")
        recrutingInterface.id = "recruting_interface"
        document.body.appendChild(recrutingInterfaceContainer)
        recrutingInterfaceContainer.appendChild(recrutingInterface)

        var border = document.createElement("div")
        border.id = "border"
        recrutingInterface.appendChild(border)

        var recruit = document.createElement("div")
        recruit.id = "recruit"
        recrutingInterface.appendChild(recruit)
        recruit.addEventListener("click", () => {
        })
        var closingButton = document.createElement("div")
        closingButton.id = "closing_button"
        recrutingInterface.appendChild(closingButton)
        closingButton.addEventListener("click", () => {
            recrutingInterface.remove()
            active = false
        })
    }
    else {
        console.log("234")
        recrutingInterface.remove()
        active = false
    }
});
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
export const UpdatePlayerDetails = (name, gold, recruits) => {
    document.getElementById('bottomMenu_gold').innerHTML = `Złoto: ${gold}`
    document.getElementById('bottomMenu_curretPlayer').innerHTML = name
    document.getElementById('bottomMenu_recruits').innerHTML = `rukruci: ${recruits}`
}