export const fieldWidth = 12

export const boardSize = 20

export const startFieldX = - boardSize / 2 * fieldWidth
export const startFieldY = - boardSize / 2 * fieldWidth

export const fieldColors = {
    WHITE: 0xfffff,
    YELLOW: 0xffff00,
    GREEN: 0x00ff00
}

export const onFieldTypes = {
    EMPTY: 'empty',
    ENEMY: 'enemy',
    ALLY: 'ally',
    OBSTACLE: 'obstacle',
    AVAILABLE_WALK: 'availableWalk',
    SHOW_WALK_DISTANCE: 'showWalkDistance',
    AVAILABLE_SHOOT: 'availableShoot'
}

export const emptyFieldData = {
    type: onFieldTypes.EMPTY,
    id: 0
}