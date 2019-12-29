import * as THREE from 'three'
import { SpriteText2D, textAlign } from 'three-text2d'
import { textsGroup } from './board'
import { findWarriorById } from './battleControl'


import {
    onFieldTypes,
    fieldWidth,
    startFieldX,
    startFieldY,
    playersColors,
    fieldSpace,
    fieldColors
} from './constants'

const textInit = (text, color, x, y, z) => {
    var sprite = new SpriteText2D(text, { align: textAlign.center, font: '50px Arial', fillStyle: color, antialias: true })
    sprite.scale.set(0.08, 0.08, 0.08)
    sprite.position.set(startFieldX + fieldWidth * x, y, startFieldY + fieldWidth * z)
    return sprite;
}

const emptyFieldGeometry = new THREE.PlaneGeometry(fieldWidth - fieldSpace, fieldWidth - fieldSpace)
emptyFieldGeometry.rotateX(-Math.PI / 2)

const emptyField = (position, color, userData, opacity = 0.4) => {
    const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity })
    const field = new THREE.Mesh(emptyFieldGeometry, material)
    field.position.set(startFieldX + fieldWidth * position.x, 0.1, startFieldY + fieldWidth * position.y)
    if (userData) {
        field.userData = userData
    }
    return field
}

const availableWalkRingGeometry = new THREE.RingGeometry(fieldWidth / 6, fieldWidth / 2)
availableWalkRingGeometry.rotateX(-Math.PI / 2)

export const makeBoardField = (type, id, position) => {
    let field
    switch (type) {
        case onFieldTypes.EMPTY:
            field = emptyField(position, fieldColors.GREY, null, 0.2)
            break
        case onFieldTypes.OBSTACLE:
            field = new THREE.Object3D()
            break
        case onFieldTypes.ALLY:
            textsGroup.add(textInit(`${findWarriorById(id).quantity} x ${findWarriorById(id).name}`, playersColors[onFieldTypes.ALLY], position.x, 20, position.y))
            field = emptyField(position, playersColors[onFieldTypes.ALLY])
            break
        case onFieldTypes.ENEMY:
            textsGroup.add(textInit(`${findWarriorById(id).quantity} x ${findWarriorById(id).name}`, playersColors[onFieldTypes.ENEMY], position.x, 20, position.y))
            field = emptyField(position, playersColors[onFieldTypes.ENEMY])
            break
        case onFieldTypes.AVAILABLE_WALK:
            field = emptyField(position, fieldColors.GREEN, { type, id, position }, 0.6)
            break
        case onFieldTypes.SHOW_WALK_DISTANCE:
            field = emptyField(position, fieldColors.YELLOW)
            break
    }
    field.userData = { type, id, position }
    return field
}