import {
    setCurrentScene,
    animateUpdate,
    setGroupToClick
} from '../threeConfig'

import { scene, camera, cameraControls } from './scene'

import { boardUpdate, boardGroup } from './board'
import { battleInit } from './battleControl'
import { HideBottomMenu } from '../userInterface/bottomMenu'

const render = () => {
    boardUpdate()
}

export const battleStart = (player, enemy) => {
    scene.add(boardGroup)
    setCurrentScene(scene, camera, cameraControls)
    setGroupToClick(boardGroup)
    animateUpdate(render)
    battleInit(player, enemy)
    HideBottomMenu()
}