import { createWindow } from '../../threeConfig'

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
    }) => {
        if (!changeOwnerBlock) {
            addWindow('collect')
            changeInformationWindows('info', informationWindows['visited'].element)
            player.increasePlayerRange(value)
            setChangeOwnerBlock(true)
            changeCircleColor(0x000000)
        }
    }
}
export const informationsWindows = ({ additional, removeWindow }) => {
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
        `Jednorazowo dodaje ${additional.value} punktów ruchu.`,
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
            removeWindow('visited')
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
        visited: {
            active: false,
            element: visitedElement
        }
    }
}
