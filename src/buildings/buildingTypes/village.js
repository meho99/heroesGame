import { createWindow } from '../../threeConfig'
import { findPlayerById } from '../../characters/Player/allPlayers'
import { makeArmyInfo } from '../../commonFunctions'
import { battleStart } from '../../battle'

const createInfoElement = (removeWindow, recruits, ownerName, armyInfo) => createWindow(
    'Wioska',
    `dostarcza ${recruits} rekrutów dziennie </br> właściciel: ${ownerName ? ownerName : 'brak'} </br>
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
        additional: { recruits },
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
                player.addRecruits(recruits)
                changeInformationWindows('info', createInfoElement(removeWindow, recruits, player.name, armyInfo))
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
        additional: { recruits },
        UpdatePlayerDetails
    }) => {
        const player = findPlayerById(ownerId)
        player.addRecruits(recruits)
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
        'Wioska',
        `Zdobyłeś wioske (dostarcza ${additional.recruits} rekrutów dziennie)`,
        `OK`,
        () => {
            removeWindow('collect')
        }
    )

    const infoElment = createInfoElement(removeWindow, additional.recruits, null, armyInfo)

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