import { animateStart, listenersStart } from './threeConfig'

import { worldNavigationStart, worldNavigationRestart } from './worldNavigation'
import { battleStart } from './battle'

import { Player } from './characters/Player'
import { addPlayer, allPlayers } from './characters/Player/allPlayers'

import { Bird } from './characters/Enemies/Bird'
import { addBird, allBirds } from './characters/Enemies/Bird/allBirds'

import { StaticEnemy } from './characters/Enemies/Static'
import { addStaticEnemy, allStaticEnemies } from './characters/Enemies/Static/allStaticEnemies'



animateStart()
listenersStart()

addPlayer(new Player('Player 1', 100, 'testCube1', { x: -100, z: 100 }))
addPlayer(new Player('Player 2', 80, 'testCube1', { x: 80, z: 10 }))
addPlayer(new Player('Player 3', 70, 'testCube1', { x: 120, z: -120 }))

addBird(new Bird(50, 'testBird', { x: 100, z: 150 }))
addBird(new Bird(100, 'testBird', { x: -100, z: -150 }))

addStaticEnemy(new StaticEnemy(10, 'testStaticEnemy', { x: 150, z: 50 }))
addStaticEnemy(new StaticEnemy(10, 'testStaticEnemy', { x: -150, z: -50 }))

allPlayers[0].army.addWarriors('AMATEUR', 3) // add basic army to test battle
allPlayers[0].army.addWarriors('AMATEUR', 1)
allPlayers[0].army.addWarriors('GOBLIN', 2)

allBirds[0].army.addWarriors('AMATEUR', 2)

console.log(allBirds[0], allPlayers[0])
allStaticEnemies[0].army.addWarriors('AMATEUR', 2)
allStaticEnemies[1].army.addWarriors('GOBLIN', 2)

worldNavigationStart()

//battleStart(allPlayers[0], allBirds[0])

// setTimeout(() => {
//     worldNavigationStart()
// }, 2000)
