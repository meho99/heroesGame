import { worldNavigationStart } from './worldNavigation'

import { Player } from './characters/Player'
import { allPlayers, addPlayer, findPlayerIndexByCurrentRound } from './characters/Player/allPlayers'

addPlayer(new Player(200, 'testCube1', {x: 0,  z: 10}))
addPlayer(new Player(120, 'testCube1', {x: 80,  z: 10}))
addPlayer(new Player(120, 'testCube1', {x: 160, z: 10}))

worldNavigationStart(allPlayers)
