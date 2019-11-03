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




const speed = 0.5
const birdSpeed = 1
let distance = 0
let range = 500
const playerY = 20
let clickedPosition = new THREE.Vector3(0, playerY, 0)
let directionVect = new THREE.Vector3(0, 0, 0)
let directionVect2 = new THREE.Vector3(0, 0, 0)
const birdRange = 100
const birdStartPosition = new THREE.Vector3(
    100,
    5,
    100,
)

let showCircle = true

var boardGeometry = new THREE.PlaneGeometry(1000, 1000);
var boardMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
var board = new THREE.Mesh(boardGeometry, boardMaterial);
boardGeometry.rotateX(-Math.PI / 2)
scene.add(board);


var cubeContainer = new THREE.Object3D()


var cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 })
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeContainer.position.set(0, playerY, 0)
cube.userData.clickable = true
cubeContainer.add(cube)
scene.add(cubeContainer)



var BirdContainer = new THREE.Object3D()

var cube2Geometry = new THREE.BoxGeometry(10, 5, 10)
var cube2Material = new THREE.MeshBasicMaterial({ color: 0x666666 })
var cube2 = new THREE.Mesh(cube2Geometry, cube2Material)
BirdContainer.position.set(birdStartPosition.x, playerY, birdStartPosition.y)
cube2.userData.clickable = true
BirdContainer.add(cube2)
scene.add(BirdContainer)

var circle2Geometry = new THREE.CircleGeometry(birdRange, 50);
circle2Geometry.rotateX(-Math.PI / 2)
var circle2Material = new THREE.MeshBasicMaterial({ color: 0xaaff66, transparent: true, opacity: 0.2 });
var circle2 = new THREE.Mesh(circle2Geometry, circle2Material);
circle2.position.set(BirdContainer.position.x, 10, BirdContainer.position.z)
circle2.userData.moveHere = true
scene.add(circle2)

BirdContainer.position.setX(BirdContainer.position.x + birdRange)




var circleGeometry = new THREE.CircleGeometry(range, 50);
circleGeometry.rotateX(-Math.PI / 2)
var circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.2 });
var circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.set(cubeContainer.position.x, 10, cubeContainer.position.z)
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



const moveBird = (target) => {
    cube2.rotation.y = Math.atan2(
        BirdContainer.position.clone().x - target.position.x,
        BirdContainer.position.clone().z - target.position.z
    );
    let targetPosition = target.position.clone()
    targetPosition.y = playerY
    directionVect2 = targetPosition.sub(BirdContainer.position.clone()).normalize()

}





const update = () => {
    circle.position.set(cubeContainer.position.x, 10, cubeContainer.position.z)
    let cubePositionOnBoard = cubeContainer.position.clone()
    distance = cubePositionOnBoard.distanceTo(clickedPosition)
    BirdContainer.translateOnAxis(directionVect2, birdSpeed)
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

    if (circle2.position.clone().distanceTo(cubeContainer.position.clone()) < birdRange) {
        moveBird(cubeContainer)
    }

    else if (BirdContainer.position.clone().distanceTo(circle2.position.clone()) >= birdRange - cube2.geometry.parameters.width) {
        moveBird(circle2)
    }

    if (BirdContainer.position.clone().distanceTo(cubeContainer.position.clone()) <= cube2.geometry.parameters.width/2 + cube.geometry.parameters.width) {
        console.log("złpany")
    }
}
animateStart(update)