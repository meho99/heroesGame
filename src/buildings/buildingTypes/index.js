import { actions as staticGoldActions, informationsWindows as staticGoldInformationsWindows } from './staticGold'
import { actions as stableActions, informationsWindows as stableInformationsWindows } from './stable'
import { BUILDING_TYPES } from './types'

export const buildingActions = {
    [BUILDING_TYPES.STATIC_GOLD]: staticGoldActions,
    [BUILDING_TYPES.STABLE]: stableActions
}

export const buildingsWindows = {
    [BUILDING_TYPES.STATIC_GOLD]: staticGoldInformationsWindows,
    [BUILDING_TYPES.STABLE]: stableInformationsWindows
}