import './battleInterfaces.css'

import {
  addMessage,
  showBattleStatusContainer,
  hideBattleStatusContainer
} from './battleStatus'

const showBattleInterfaces = (ma) => {
  showBattleStatusContainer()
  // for(let i = 0; i< 20; i++) {
  //   addMessage()
  // }
}

export {
  addMessage,
  showBattleStatusContainer,
  hideBattleStatusContainer,
  showBattleInterfaces
}
