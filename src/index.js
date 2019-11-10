import { animateStart, listenersStart } from './threeConfig'

import { worldNavigationStart, worldNavigationRestart } from './worldNavigation'
import { battleStart } from './battle'

import { Player } from './characters/Player'
import { addPlayer, allPlayers } from './characters/Player/allPlayers'

import { Bird } from './characters/Enemies/Bird'
import { addBird, allBirds } from './characters/Enemies/Bird/allBirds'



animateStart()
listenersStart()

addPlayer(new Player(100, 'testCube1', { x: -100, z: 100 }))
addPlayer(new Player(80, 'testCube1', { x: 80, z: 10 }))
addPlayer(new Player(70, 'testCube1', { x: 120, z: -120 }))

addBird(new Bird(50, 'testBird', { x: 100, z: 150 }))
addBird(new Bird(100, 'testBird', { x: -100, z: -150 }))

allPlayers[0].army.addWarriors('AMATEUR', 3) // add basic army to test battle
allPlayers[0].army.addWarriors('AMATEUR', 1)
allPlayers[0].army.addWarriors('GOBLIN', 2)

allBirds[0].army.addWarriors('AMATEUR', 2)

console.log(allBirds[0], allPlayers[0])

worldNavigationStart()

//battleStart(allPlayers[0], allBirds[0])

// setTimeout(() => {
//     worldNavigationStart()
// }, 2000)
