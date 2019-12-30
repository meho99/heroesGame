export const fieldWidth = 12
export const fieldSpace = 1

export const boardWidth = 16
export const boardHeight = 11

export const startFieldX = - (boardWidth - 1) / 2 * fieldWidth
export const startFieldY = - (boardHeight - 1) / 2 * fieldWidth

export const minObstacles = 5
export const maxObstacles = 8

export const fieldColors = {
    WHITE: 0xfffff,
    YELLOW: 0xffff00,
    GREY: 0xfFf2f2,
    GREEN: 0x7EB655
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

export const playersColors = {
    [onFieldTypes.ENEMY]: 'red',
    [onFieldTypes.ALLY]: 'blue'
}

export const emptyFieldData = {
    type: onFieldTypes.EMPTY,
    id: 0
}