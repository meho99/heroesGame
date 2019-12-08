import { actions as staticGoldActions } from './staticGold'
import { actions as stableActions } from './stable'
import { BUILDING_TYPES } from './types'

export const buildingActions = {
    [BUILDING_TYPES.STATIC_GOLD]: staticGoldActions,
    [BUILDING_TYPES.STABLE]: stableActions
}