import './interface.css'

const bottomMenu = document.createElement("div")
bottomMenu.id = 'bottomMenu'

const createBottomMenuParagraph = (text, id) => {
    const Paragraph = document.createElement("p")
    bottomMenu.appendChild(Paragraph)
    Paragraph.innerHTML = text
    Paragraph.id = id
    return Paragraph
}
createBottomMenuParagraph("player name", "bottomMenu_curretPlayer")
const gold = createBottomMenuParagraph("gold: 5787", "bottomMenu_gold")
const recruits = createBottomMenuParagraph("rekruci: 0", "bottomMenu_recruits")
const recruiting = document.createElement("button")
bottomMenu.appendChild(recruiting)
recruiting.innerHTML = "trenuj"
recruiting.className = "blueButton"

let recrutingInterface

const recrutingInterfaceContainer = document.createElement("div")
recrutingInterfaceContainer.id = "recruting_interface_container"
recrutingInterface = document.createElement("div")
recrutingInterface.id = "recruting_interface"
recrutingInterfaceContainer.appendChild(recrutingInterface)

const border = document.createElement("div")
border.id = "border"
recrutingInterface.appendChild(border)

const recruit = document.createElement("div")
recruit.className = "blueButton"
recruit.innerHTML = 'AMATEUR' //TODO
recrutingInterface.appendChild(recruit)

const closingButton = document.createElement("button")
closingButton.id = "closing_button"
recrutingInterface.appendChild(closingButton)
closingButton.innerHTML="X"

closingButton.addEventListener("click", () => {
    ShowHideRecrutingMenu()
})

const UpdateRecrutingInterface = (player) => {
    recruit.addEventListener("click", () => {

        if (player.gold >= 10 && player.recruits >= 1) {  //TODO    
            player.army.addWarriors('AMATEUR', 1) //TODO
            player.spendGold(10) //TODO
            player.removeRecruits(1)
            const goldInterfaceUpdate = String(player.gold)
            const recruitsInterfaceUpdate = String(player.recruits)
            gold.innerHTML = "Złoto: " + goldInterfaceUpdate
            recruits.innerHTML = "rekruci: " + recruitsInterfaceUpdate
        }
        else {
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

const bottomMenu_rangeContainer = document.createElement("div")
bottomMenu.appendChild(bottomMenu_rangeContainer)
bottomMenu_rangeContainer.id = "bottomMenu_rangeContainer"

const bottomMenu_range = document.createElement("div")
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