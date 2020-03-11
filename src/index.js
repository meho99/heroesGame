import { animateStart, listenersStart } from './threeConfig'

import { worldNavigationStart, worldNavigationRestart } from './worldNavigation'
import { battleStart } from './battle'

import { Player } from './characters/Player'
import { addPlayer, allPlayers } from './characters/Player/allPlayers'

import { Bird } from './characters/Enemies/Bird'
import { addBird, allBirds } from './characters/Enemies/Bird/allBirds'

import { StaticEnemy } from './characters/Enemies/Static'
import { addStaticEnemy, allStaticEnemies } from './characters/Enemies/Static/allStaticEnemies'

import { Building } from './buildings'
import { addBuilding, allBuildings } from './buildings/allbuildings'
import { BUILDING_TYPES } from './buildings/buildingTypes/types'



animateStart()
listenersStart()

addPlayer(new Player('Player 1', 100, 'testCube1', { x: -100, z: 100 }))
addPlayer(new Player('Player 3', 70, 'testCube1', { x: 120, z: -120 }))

addBird(new Bird(50, 'BIRD', { x: 100, z: 150 }))
addBird(new Bird(100, 'BIRD', { x: -100, z: -150 }))

addStaticEnemy(new StaticEnemy(10, 'PEASANT', { x: 150, z: 50 }))
addStaticEnemy(new StaticEnemy(10, 'PEASANT', { x: -150, z: -50 }))

addBuilding(new Building(BUILDING_TYPES.STATIC_GOLD, 10, 'testBuilding', { x: -250, z: 0 }, { gold: 10 }))
addBuilding(new Building(BUILDING_TYPES.STABLE, 15, 'testBuilding', { x: -150, z: 50 }, { value: 30 }))
addBuilding(new Building(BUILDING_TYPES.GOLD_MINE, 15, 'testBuilding', { x: -50, z: -230 }, { gold: 30 }))
addBuilding(new Building(BUILDING_TYPES.VILLAGE, 15, 'testBuilding', { x: 10, z: 10 }, { recruits: 1 }))

export const addWarriorToArmy = (type, player) => {
    allPlayers[player].army.addWarriors(type, 1)
}



allPlayers[0].army.addWarriors('AMATEUR', 3) // add basic army to test battle
allPlayers[0].army.addWarriors('AMATEUR', 1)
allPlayers[0].army.addWarriors('GOBLIN', 2)
allPlayers[0].army.addWarriors('ARCHER', 2)

allBirds[0].updateWarriors('AMATEUR', 5)

allStaticEnemies[0].updateWarriors('AMATEUR', 2)
allStaticEnemies[1].updateWarriors('GOBLIN', 2)

allBuildings[0].updateWarriors('GOBLIN', 1)
allBuildings[0].updateWarriors('AMATEUR', 1)
allBuildings[1].updateWarriors('AMATEUR', 1)
allBuildings[2].updateWarriors('AMATEUR', 1)
allBuildings[3].updateWarriors('GOBLIN', 6)
worldNavigationStart()

//battleStart(allPlayers[0], allBirds[0])

// setTimeout(() => {
//     worldNavigationStart()
// }, 2000)
