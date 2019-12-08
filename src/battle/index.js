import {
    setCurrentScene,
    animateUpdate,
    clearScene,
    setGroupToClick
} from '../threeConfig'
import { worldNavigationRestart } from '../worldNavigation'

import { scene, camera, cameraControls, sceneInit } from './scene'
import { battleInit } from './battleControl'
import { boardUpdate, boardGroup } from './board'
import { obstaclesGroup } from './obstacles'
import { HideBottomMenu } from '../userInterface/bottomMenu'

const render = () => {
    boardUpdate()
}

export const battleStart = (player, enemy) => {
    scene.add(boardGroup)
    scene.add(obstaclesGroup)
    sceneInit()
    setCurrentScene(scene, camera, cameraControls)
    setGroupToClick(boardGroup)
    animateUpdate(render)
    battleInit(player, enemy)
    HideBottomMenu()
}

export const battleEnd = (killed) => {
    clearScene(obstaclesGroup)
    worldNavigationRestart(killed)
}