import * as THREE from 'three'

import {
    onFieldTypes,
    fieldWidth,
    startFieldX,
    startFieldY,
    fieldColors
} from './constants'

const emptyFieldGeometry = new THREE.PlaneGeometry(fieldWidth, fieldWidth)
emptyFieldGeometry.rotateX(-Math.PI / 2)

const emptyField = (position, color) => {
    const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide })
    const field = new THREE.Mesh(emptyFieldGeometry, material)
    field.position.set(startFieldX + fieldWidth * position.x, 0.1, startFieldY + fieldWidth * position.y)
    return field
}

const availableWalkRingGeometry = new THREE.RingGeometry(fieldWidth / 6, fieldWidth / 2)
availableWalkRingGeometry.rotateX(-Math.PI / 2)

const availableWalkField = (position, color, userData) => {

    const ringMaterial = new THREE.MeshBasicMaterial({ color: color })
    const ring = new THREE.Mesh(availableWalkRingGeometry, ringMaterial)
    ring.position.set(startFieldX + fieldWidth * position.x, 0.2, startFieldY + fieldWidth * position.y)
    ring.userData = userData

    return ring
}

export const makeBoardField = (type, id, position) => {
    let field
    switch (type) {
        case onFieldTypes.EMPTY:
            field = emptyField(position, fieldColors.WHITE)
            break
        case onFieldTypes.ALLY:
            field = emptyField(position, fieldColors.YELLOW)
            break
        case onFieldTypes.ENEMY:
            field = emptyField(position, fieldColors.GREEN)
            break
        case onFieldTypes.AVAILABLE_WALK:
            field = availableWalkField(position, fieldColors.GREEN, { type, id, position })
            break
        case onFieldTypes.SHOW_WALK_DISTANCE:
            field = availableWalkField(position, fieldColors.YELLOW)
            break
    }
    field.userData = { type, id, position }
    return field
}