import { sceneWidth, sceneHeight } from './'

export const createWindow = (header, text, button, onClickAction, styleOverrides = {}) => {
    const { containerStyles, headerStyles, textStyles, buttonStyles } = styleOverrides

    const width = 400
    const minHeight = 250

    const windowContainer = document.createElement('div')
    windowContainer.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        return false
    })
    const windowContainerStyles = {
        position: 'absolute',
        backgroundColor: 'black',
        width: width + 'px',
        minHeight: minHeight + 'px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
    }
    setMultipleStyles({ ...windowContainerStyles, ...containerStyles }, windowContainer)

    const windowHeader = document.createElement('h3')
    const windowHeaderStyles = {
        fontSize: '30px',
        color: 'white',
        marginBottom: '20px'
    }
    setMultipleStyles({ ...windowHeaderStyles, ...headerStyles }, windowHeader)
    windowHeader.innerHTML = header
    windowContainer.appendChild(windowHeader)

    const windowText = document.createElement('div')
    const windowTextStyles = {
        color: 'white',
        fontSize: '20px',
        marginBottom: '20px'
    }
    setMultipleStyles({ ...windowTextStyles, ...textStyles }, windowText)
    windowText.innerHTML = text
    windowContainer.appendChild(windowText)

    const windowButton = document.createElement('button')
    const windowButtonStyles = {
        backgroundColor: 'white',
        color: 'black',
        width: '30%',
        border: 'none'
    }
    setMultipleStyles({ ...windowButtonStyles, ...buttonStyles }, windowButton)
    windowButton.innerHTML = button
    windowButton.onclick = onClickAction
    windowContainer.appendChild(windowButton)

    windowContainer.style.top = `${sceneHeight / 2 - minHeight / 2}px`
    windowContainer.style.left = `${sceneWidth / 2 - width / 2}px`


    return windowContainer
}

const setMultipleStyles = (styles, element) => {
    for (let i in styles)
        element.style[i] = styles[i]
}