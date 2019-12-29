import * as THREE from 'three'
import {
    fieldWidth,
    onFieldTypes,
    startFieldX,
    startFieldY,
    boardHeight,
    boardWidth,
    minObstacles,
    maxObstacles
} from './constants'
import { boardData } from './battleControl'
import { addModel } from '../threeConfig'
import { obstacleModels } from '../threeConfig/models'
import { randomNumber } from '../commonFunctions'

export const obstaclesGroup = new THREE.Group()

const obstaclesQuantitiy = randomNumber(minObstacles, maxObstacles)

export const obstaclesInit = () => {
    for (let i = 0; i < obstaclesQuantitiy; i++) {

        let randomXPosition = randomNumber(0, boardWidth)
        let randomYPosition = randomNumber(0, boardHeight)

        const obstacle = obstacleModels[randomNumber(0, obstacleModels.length)]

        let isSet = false

        while (!isSet) {
            if (boardData[randomYPosition][randomXPosition].type === onFieldTypes.EMPTY) {
                boardData[randomYPosition][randomXPosition] = {
                    type: onFieldTypes.OBSTACLE,
                    position: { x: randomXPosition, y: randomYPosition },
                    id: null
                }
                obstaclesGroup.add(addModel(obstacle, { x: startFieldX + fieldWidth * randomXPosition, z: startFieldY + fieldWidth * randomYPosition }))

                isSet = true

            } else {
                randomXPosition = randomNumber(0, boardData.length)
                randomYPosition = randomNumber(0, boardData.length)
            }
        }
    }
}