import { actions as staticGoldActions, informationsWindows as staticGoldInformationsWindows } from './staticGold'
import { actions as stableActions, informationsWindows as stableInformationsWindows } from './stable'
import { actions as goldMineActions, informationsWindows as goldMineInformationsWindows } from './goldMine'
import { BUILDING_TYPES } from './types'

export const buildingActions = {
    [BUILDING_TYPES.STATIC_GOLD]: staticGoldActions,
    [BUILDING_TYPES.STABLE]: stableActions,
    [BUILDING_TYPES.GOLD_MINE]: goldMineActions
}

export const buildingsWindows = {
    [BUILDING_TYPES.STATIC_GOLD]: staticGoldInformationsWindows,
    [BUILDING_TYPES.STABLE]: stableInformationsWindows,
    [BUILDING_TYPES.GOLD_MINE]: goldMineInformationsWindows
}