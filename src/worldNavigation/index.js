import * as THREE from 'three'

import treeModel from '../worldElements/models/Tree.1.4.obj'
import treeModelMtl from '../worldElements/models/Tree.1.4.mtl'

import {
    scene,
    animateStart,
    camera,
    enableMouseEventsOnScene,
    disableMouseEventsOnScene,
    loadModel,
    animateStop
} from '../threeConfig'

let model = new THREE.Object3D()
loadModel(treeModel, treeModelMtl, model)
scene.add(model)
model.scale.set(5, 5, 5)

const speed = 3
let distance = 0
let range = 100
const playerY = 20
let clickedPosition = new THREE.Vector3(0, playerY, 0)
let directionVect = new THREE.Vector3(0, 0, 0)

let showCircle = true

var boardGeometry = new THREE.PlaneGeometry(500, 500);
var boardMaterial = new THREE.MeshBasicMaterial({ color: 0xc0fa36, side: THREE.DoubleSide });
var board = new THREE.Mesh(boardGeometry, boardMaterial);
boardGeometry.rotateX(-Math.PI / 2)
scene.add(board);

var cubeContainer = new THREE.Object3D()


var cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfab0cd })
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeContainer.position.set(0, playerY, 0)
cube.userData.clickable = true
cubeContainer.add(cube)
scene.add(cubeContainer)

var circleGeometry = new THREE.CircleGeometry(range, 320);
circleGeometry.rotateX(-Math.PI / 2)
var circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.set(cubeContainer.position.x, 0.1, cubeContainer.position.z)
circle.userData.moveHere = true
scene.add(circle)

const moveCube = ({ element, clickPosition }) => {

    if (element.userData.moveHere) {

        cube.rotation.y = Math.atan2(
            cubeContainer.position.clone().x - clickedPosition.x,
            cubeContainer.position.clone().z - clickedPosition.z
        );

        clickedPosition = clickPosition
        clickedPosition.setY(playerY)
        directionVect = clickedPosition.clone().sub(cubeContainer.position.clone()).normalize()
    }

}

enableMouseEventsOnScene(undefined, moveCube)


const update = () => {
    circle.position.set(cubeContainer.position.x, 0.1, cubeContainer.position.z)
    let cubePositionOnBoard = cubeContainer.position.clone()
    distance = cubePositionOnBoard.distanceTo(clickedPosition)

    if (distance > speed) {
        if (showCircle) {
            range -= distance
            var newCircleGeometry = new THREE.CircleGeometry(range, 320);
            newCircleGeometry.rotateX(-Math.PI / 2)
            circleGeometry.dispose()
            circle.geometry = newCircleGeometry
            showCircle = !showCircle
            scene.remove(circle)
            disableMouseEventsOnScene()
        }
        cubeContainer.translateOnAxis(directionVect, speed)

        //camera.position.x = cubeContainer.position.x
        // camera.position.z = cubeContainer.position.z + 400
        //  camera.position.y = cubeContainer.position.y + 400
        //camera.lookAt(cubeContainer.position)
    } else {
        if (!showCircle) {
            showCircle = !showCircle
            if (range > speed + cube.geometry.parameters.width) scene.add(circle)
            else {
                console.log('koniec paliwa')
            }

            enableMouseEventsOnScene(undefined, moveCube)
        }
    }


}
animateStart(update)