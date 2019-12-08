import * as THREE from 'three'
import {
    container,
    raycaster,
    currentCamera as camera,
    currentScene as scene,
    sceneWidth,
    sceneHeight
} from './index'


const listenersName = {
    CLICK: 'click',
    DBCLICK: 'dblclick',
    KEYDOWN: 'keydown',
    RIGHTCLICK: 'mousedown',
    MOUSEMOVE: 'mousemove'
}

const blocks = Object.keys(listenersName).reduce((obj, item) => {
    obj[listenersName[item]] = true
    return obj
}, {})

const actualFunctions = Object.keys(listenersName).reduce((obj, item) => {
    obj[listenersName[item]] = () => { }
    return obj
}, {})

let groupToClick

const setGroupToClick = (group) => {
    groupToClick = group
}

const getData = (e, block) => {
    let vector = new THREE.Vector3()
    e.preventDefault();

    let mouse = new THREE.Vector2()

    mouse.x = (e.clientX / Number(sceneWidth)) * 2 - 1
    mouse.y = - (e.clientY / sceneHeight) * 2 + 1

    vector.set(mouse.x, mouse.y, 0.5)
    vector.unproject(camera)

    raycaster.set(camera.position, vector.sub(camera.position).normalize())
    var intersects = raycaster.intersectObjects(groupToClick.children)

    const returnOrCheckNext = (object) => (!object.userData || !object.userData.block || object.userData.block !== block)

    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
            if (returnOrCheckNext(intersects[i].object)) {
                return { element: intersects[i].object, clickPosition: intersects[i].point, e }
            }
        }

    }
    else return { e }
}

const listenerFunc = (e, name, block) => {
    !blocks[name] && actualFunctions[name](getData(e, block))
}

const enableMouseEventsOnScene = (name, func) => {
    actualFunctions[name] = func
    blocks[name] = false
}

const disableMouseEventsOnScene = (name) => {
    blocks[name] = true
}

const listenersStart = () => {
    container.addEventListener([listenersName.CLICK], (e) => { listenerFunc(e, [listenersName.CLICK]) })
    container.addEventListener([listenersName.DBCLICK], (e) => { listenerFunc(e, [listenersName.DBCLICK]) })

    document.addEventListener([listenersName.KEYDOWN], (e) => { listenerFunc(e, [listenersName.KEYDOWN]) })
    container.addEventListener(listenersName.MOUSEMOVE, (e) => { listenerFunc(e, listenersName.MOUSEMOVE) })
    document.addEventListener(listenersName.RIGHTCLICK, (e) => {
        if (e.which === 3) {
            e.preventDefault()
            listenerFunc(e, [listenersName.RIGHTCLICK], 'right')
        }
    })
}


export {
    enableMouseEventsOnScene,
    disableMouseEventsOnScene,
    setGroupToClick,
    listenersStart,
    listenersName
}