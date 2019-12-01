import './bottomMenu.css'
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
export const UpdatePlayerDetails = (name, gold) => {
    document.getElementById('bottomMenu_gold').innerHTML = `Złoto: ${gold}`
    document.getElementById('bottomMenu_curretPlayer').innerHTML = name

}