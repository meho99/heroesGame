import { fieldWidth, boardSize, onFieldTypes, startFieldX, startFieldY } from './constants'
import { boardData } from './battleControl'
import { scene } from './scene'
import { addModel} from '../threeConfig'
import { obstacleModels } from '../threeConfig/models'
import { randomNumber } from '../commonFunctions'

const obstaclesQuantitiy = 5

console.log(obstacleModels)


export const obstaclesInit = () => {
    for(let i=0; i< obstaclesQuantitiy; i++){

        let randomXPosition = randomNumber(0, boardData.length)
        let randomYPosition = randomNumber(0, boardData.length)

        const obstacle = obstacleModels[randomNumber(0, obstacleModels.length)]

        let isSet = false

        while (!isSet) {
            if (boardData[randomYPosition][randomXPosition].type === onFieldTypes.EMPTY) {
                boardData[randomYPosition][randomXPosition] = {
                    type: onFieldTypes.OBSTACLE,
                    position: { x: randomXPosition, y: randomYPosition },
                    id: null
                }
                console.log(obstacle)
                scene.add(addModel(obstacle, { x: startFieldX + fieldWidth * randomXPosition, z: startFieldY + fieldWidth * randomYPosition }))
                console.log(addModel(obstacle, { x: randomXPosition, y: randomYPosition }))

                isSet = true

            } else {
                randomXPosition = randomNumber(0, boardData.length)
                randomYPosition = randomNumber(0, boardData.length)
            }
        }
    }
}