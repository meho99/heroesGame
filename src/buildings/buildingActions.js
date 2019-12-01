import { BUILDING_TYPES } from './buildingTypes'

export const buildingActions = {
    [BUILDING_TYPES.STATIC_GOLD]: {
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
    ,

    [BUILDING_TYPES.STABLE]: {
        changeOwner: ({
            changeOwnerBlock,
            additional: { value },
            setChangeOwnerBlock,
            player,
        }) => {
            if (!changeOwnerBlock) {
                player.increasePlayerRange(value)
                setChangeOwnerBlock(true)
            }
        }
    }
}