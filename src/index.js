import { worldNavigationStart } from './worldNavigation'

import { listenersStart } from './threeConfig'

import { Player } from './characters/Player'
import { addPlayer } from './characters/Player/allPlayers'

import { Bird } from './characters/Enemies/Bird'
import { addBird } from './characters/Enemies/Bird/allBirds'

addPlayer(new Player(200, 'testCube1', {x: 0,  z: 10}))
addPlayer(new Player(120, 'testCube1', {x: 80,  z: 10}))
addPlayer(new Player(120, 'testCube1', {x: 160, z: 10}))

addBird(new Bird(50, 'testBird', {x: 150, z: 150}))
addBird(new Bird(150, 'testBird', {x: -150, z: -150}))

listenersStart()
worldNavigationStart()
