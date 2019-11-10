import {
    setCurrentScene,
    animateUpdate,
    setGroupToClick
} from '../threeConfig'

import { scene, camera, cameraControls } from './scene'

import { boardUpdate, boardGroup } from './board'
import { battleInit } from './battleControl'

const render = () => {
    boardUpdate()
}

export const battleStart = (player, enemy) => {
    scene.add(boardGroup)
    setCurrentScene(scene, camera, cameraControls)
    setGroupToClick(boardGroup)
    animateUpdate(render)
    battleInit(player, enemy)
}