import { createWindow } from '../../threeConfig'
import { findPlayerById } from '../../characters/Player/allPlayers'
import { makeArmyInfo } from '../../commonFunctions'
import { battleStart } from '../../battle'

const createInfoElement = (removeWindow, gold, ownerName, armyInfo) => createWindow(
    'Kopalnia kryształów',
    `dostarcza ${gold} kryształów dziennie </br> właściciel: ${ownerName ? ownerName : 'brak'} </br>
    Bronione przez:</br>${armyInfo} `,
    `OK`,
    () => {
        removeWindow('info')
    }
)
export const actions = {
    changeOwner: ({
        changeOwnerBlock,
        setChangeOwnerBlock,
        changeCircleColor,
        addWindow,
        changeInformationWindows,
        additional: { gold },
        player, // player, that is now owner of this building
        removeWindow,
        changeOwnerId,
        army,
        UpdatePlayerDetails
    }) => {

        if (army.isArmyEmpty()) {
            if (!changeOwnerBlock) {
                let armyInfo = makeArmyInfo(army.warriors)
                addWindow('collect')
                player.addGold(gold)
                changeInformationWindows('info', createInfoElement(removeWindow, gold, player.name, armyInfo))
                UpdatePlayerDetails(player)
                setChangeOwnerBlock(true)
                changeCircleColor(0x000000)
                changeOwnerId(player.id)
            }
        }
        else {
            battleStart(player, { army })
            addWindow('fight')
        }
    },
    dailyAction: ({
        ownerId,
        additional: { gold },
        UpdatePlayerDetails
    }) => {
        const player = findPlayerById(ownerId)
        player.addGold(gold)
        UpdatePlayerDetails(player)
    }
}
export const informationsWindows = ({ additional, removeWindow, army }) => {
    let armyInfo = makeArmyInfo(army.warriors)

    const fightElement = createWindow(
        'walka',
        `${armyInfo}`,
        'OK',
        () => {
            removeWindow('fight')
        }
    )
    const collectInfoElemnt = createWindow(
        'Kopalnia kryształów',
        `Zdobyłeś Kopalnie kryształów (dostarcza ${additional.gold} kryształów dziennie)`,
        `OK`,
        () => {
            removeWindow('collect')
        }
    )

    const infoElment = createInfoElement(removeWindow, additional.gold, null, armyInfo)

    return {
        collect: {
            active: false,
            element: collectInfoElemnt
        },
        fight: {
            active: false,
            element: fightElement
        },
        info: {
            active: false,
            element: infoElment
        }
    }
}