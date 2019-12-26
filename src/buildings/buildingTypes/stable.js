import { createWindow } from '../../threeConfig'
import { makeArmyInfo } from '../../commonFunctions'
import { battleStart } from '../../battle'

export const actions = {
    changeOwner: ({
        changeOwnerBlock,
        addWindow,
        changeCircleColor,
        changeInformationWindows,
        informationWindows,
        additional: { value },
        setChangeOwnerBlock,
        player,
        army
    }) => {
        if (army.isArmyEmpty()) {
            if (!changeOwnerBlock) {
                addWindow('collect')
                changeInformationWindows('info', informationWindows['visited'].element)
                player.increasePlayerRange(value)
                setChangeOwnerBlock(true)
                changeCircleColor(0x000000)
            }
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
        'Stajnia',
        `Odwiedziłeś stajnie. Twój ruch zwiększył sie o ${additional.value} punktów ruchu.`,
        `OK`,
        () => {
            removeWindow('collect')
        }
    )

    const infoElment = createWindow(
        'Stajnia',
        `Jednorazowo dodaje ${additional.value} punktów ruchu </br>.
        Bronione przez:</br>${armyInfo}`,
        `OK`,
        () => {
            removeWindow('info')
        }
    )

    const visitedElement = createWindow(
        'Stajnia',
        `ten budynek został już odwiedzony.`,
        `OK`,
        () => {
            removeWindow('info') // becaouse we change it later to info element
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
        },
        fight: {
            active: false,
            element: fightElement
        },
        visited: {
            active: false,
            element: visitedElement
        }
    }
}
