import * as THREE from 'three'
import {
    container,
    raycaster,
    camera,
    scene,
    sceneWidth,
    sceneHeight
} from './index'

let clickBlock = true

const getObjectAfterClick = (e) => {
    let vector = new THREE.Vector3()
    e.preventDefault();

    let mouse = new THREE.Vector2()

    mouse.x = (e.clientX / Number(sceneWidth)) * 2 - 1
    mouse.y = - (e.clientY / sceneHeight) * 2 + 1

    vector.set(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);

    raycaster.set(camera.position, vector.sub(camera.position).normalize())

    var intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length > 0) {
        return intersects[0].object
    }
    else return null
}

const clickFunction = (e, afterClickFuntion) => {
    if (!clickBlock) {
        afterClickFuntion(getObjectAfterClick(e))
    }
}

const enableMouseEventsOnScene = (config = { mouseDown: true }, afterClickFuntion) => {
    clickBlock = false
    config.mouseDown && container.addEventListener("mousedown", (e) => { clickFunction(e, afterClickFuntion) }, true)
}

const disableMouseEventsOnScene = (config = { mouseDown: true }) => {
    if (config.mouseDown) clickBlock = true
}

export {
    enableMouseEventsOnScene,
    disableMouseEventsOnScene
}