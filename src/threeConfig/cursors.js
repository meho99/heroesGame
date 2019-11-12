
import swordImg from './assets/swords.png'

const cursors = {
    sword: swordImg
}

export const changeCursor = (name) => {
    if (name === 'basic')
        document.body.style.cursor = 'auto'
    else
        document.body.style.cursor = `url('${cursors[name]}'), auto`

}
