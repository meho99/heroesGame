const battleStatusContainer = document.createElement('ul')
battleStatusContainer.id='battle_status_container'

let messagesList = []

const MAX_NUMBER_OF_MESSAGES = 10

const clearMessages = () => {
  battleStatusContainer.innerHTML=null
}

export const showBattleStatusContainer = () => {
  clearMessages()
  messagesList = []
  document.body.appendChild(battleStatusContainer)
}

export const hideBattleStatusContainer = () => {
  document.body.removeChild(battleStatusContainer)
}

export const addMessage = (messageData) => {
  clearMessages()
  messagesList.push(messageData)
  if(messagesList.length > MAX_NUMBER_OF_MESSAGES) {
    messagesList.shift()
  }
  console.log({ messagesList })
  for (const currentMessage of messagesList) {
    const message = document.createElement('li')
    message.classList.add('battle_status_message')
    message.classList.add(currentMessage.class)
    message.innerHTML = currentMessage.message
    battleStatusContainer.appendChild(message)
  }
}
