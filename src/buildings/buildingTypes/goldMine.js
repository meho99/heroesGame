import { createWindow } from '../../threeConfig'
import { findPlayerById } from '../../characters/Player/allPlayers'

const createInfoElement = (removeWindow, gold, ownerName) => createWindow(
    'Kopalnia kryształów',
    `dostarcza ${gold} kryształów dziennie </br> właściciel: ${ownerName ? ownerName : 'brak'} `,
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
        UpdatePlayerDetails
    }) => {
        if (!changeOwnerBlock) {
            addWindow('collect')
            player.addGold(gold)
            changeInformationWindows('info', createInfoElement(removeWindow, gold, player.name))
            UpdatePlayerDetails(player.name, player.gold)
            setChangeOwnerBlock(true)
            changeCircleColor(0x000000)
            changeOwnerId(player.id)
        }
    },
    dailyAction: ({
        ownerId,
        additional: { gold },
        UpdatePlayerDetails
    }) => {
        const player = findPlayerById(ownerId)
        player.addGold(gold)
        UpdatePlayerDetails(player.name, player.gold)
    }
}
export const informationsWindows = ({ additional, removeWindow }) => {
    const collectInfoElemnt = createWindow(
        'Kopalnia kryształów',
        `Zdobyłeś Kopalnie kryształów (dostarcza ${additional.gold} kryształów dziennie)`,
        `OK`,
        () => {
            removeWindow('collect')
        }
    )

    const infoElment = createInfoElement(removeWindow, additional.gold)

    return {
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