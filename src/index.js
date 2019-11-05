import { worldNavigationStart, worldNavigationRestart } from './worldNavigation'

import { listenersStart } from './threeConfig'

import { Player } from './characters/Player'
import { addPlayer } from './characters/Player/allPlayers'

import { Bird } from './characters/Enemies/Bird'
import { addBird } from './characters/Enemies/Bird/allBirds'

import { scene as worldNavigationScene, camera as worldNavigationCamera } from './worldNavigation/scene'
import { setCurrentScene, animateStart, makeInitialScene, animateUpdate, enableMouseEventsOnScene } from './threeConfig'

setCurrentScene(worldNavigationScene, worldNavigationCamera)
animateStart()
listenersStart()

addPlayer(new Player(200, 'testCube1', { x: -150, z: 150 }))
addPlayer(new Player(120, 'testCube1', { x: 80, z: 10 }))
addPlayer(new Player(120, 'testCube1', { x: 160, z: -160 }))

addBird(new Bird(50, 'testBird', { x: 150, z: 150 }))
addBird(new Bird(150, 'testBird', { x: -150, z: -150 }))


worldNavigationStart()

// setTimeout(() => {
//     const { scene, camera } = makeInitialScene()
//     setCurrentScene(scene, camera)
//     const render = () => {
//         console.log('dziala')
//     }
//     animateUpdate(render)
// }, 2000)