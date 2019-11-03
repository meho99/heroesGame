import { worldNavigationStart } from './worldNavigation'

import { Player } from './characters/Player'
import { allPlayers, addPlayer, findPlayerIndexByCurrentRound } from './characters/Player/allPlayers'

addPlayer(new Player(100, 'testCube1'))
addPlayer(new Player(60, 'testCube1'))
addPlayer(new Player(60, 'testCube1'))

worldNavigationStart(allPlayers)
