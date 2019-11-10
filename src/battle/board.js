import * as THREE from 'three'

import { scene } from './scene'

import { makeBoardField } from './field'

import { clearScene } from '../threeConfig'

import { boardData } from './battleControl'

export let boardGroup = new THREE.Group()



export const boardUpdate = () => {

    clearScene(boardGroup)

    for (const fieldGroup of boardData) {
        for (const { type, id, position } of fieldGroup) {
            const field = makeBoardField(type, id, position)
            if (field)
                boardGroup.add(field)
        }
    }
}