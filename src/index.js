import * as THREE from 'three'

import {
    scene,
    animateStart,
    enableMouseEventsOnScene,
    disableMouseEventsOnScene,
    animateStop
} from './threeConfig'



var geometry = new THREE.BoxGeometry(10, 10, 10)
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
var cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 0, 0)
cube.userData.clickable = true
scene.add(cube)

var geometry = new THREE.BoxGeometry(100, 1, 100);
var material = new THREE.MeshBasicMaterial({ color: 0xffff22 });
var cube2 = new THREE.Mesh(geometry, material)
cube2.userData.clickable = false
cube2.position.set(0, 0, 0)
scene.add(cube2);

const testFunc = (element) => {
    console.log('clicked elemenmt', element)
}
enableMouseEventsOnScene(undefined, testFunc)

setTimeout(() => {
    console.log('minelo')
    disableMouseEventsOnScene()
}, 2000)

animateStart()