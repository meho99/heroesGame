import { createWindow } from '../../threeConfig'

export const actions = {
    changeOwner: ({
        addWindow,
        removeBuilding,
        id,
        player,
        scene,
        circle,
        additional: { gold },
        container,
        UpdatePlayerDetails
    }) => {
        addWindow('collect')
        removeBuilding(id)
        player.addGold(gold)
        scene.remove(circle)
        scene.remove(container)
        UpdatePlayerDetails(player.name, player.gold)
    }
}
export const informationsWindows = ({ additional, removeWindow }) => {
    const collectInfoElemnt = createWindow(
        'Złoto',
        `Zebrałeś ${additional.gold} sztuk złota`,
        `OK`,
        () => {
            removeWindow('collect')
        }
    )

    const infoElment = createWindow(
        'Złoto',
        `${additional.gold} sztuk`,
        `OK`,
        () => {
            removeWindow('info')
        }
    )

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

