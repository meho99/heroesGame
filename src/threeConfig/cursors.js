
import swordImg from './assets/swords.png'
import bowImg from './assets/bow.png'

const cursors = {
    sword: swordImg,
    bow: bowImg
}

export const changeCursor = (name) => {
    if (name === 'basic')
        document.body.style.cursor = 'auto'
    else
        document.body.style.cursor = `url('${cursors[name]}'), auto`

}
