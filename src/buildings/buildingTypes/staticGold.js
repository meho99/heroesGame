import { createWindow } from '../../threeConfig'
import { battleStart } from '../../battle'
import { makeArmyInfo } from '../../commonFunctions'

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
        UpdatePlayerDetails,
        army
    }) => {

        if (army.isArmyEmpty()) {
            addWindow('collect')
            removeBuilding(id)
            player.addGold(gold)
            scene.remove(circle)
            scene.remove(container)
            UpdatePlayerDetails(player.name, player.gold, player.recruits)
        }
        else {
            battleStart(player, { army })
            addWindow('fight')
        }
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
        'Kryształy',
        `Zebrałeś ${additional.gold} kryształów`,
        `OK`,
        () => {
            removeWindow('collect')
        }
    )
    const infoElment = createWindow(
        'Kryształy',
        `${additional.gold} kryształów </br></br>
        Bronione przez:</br>${armyInfo} `,
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