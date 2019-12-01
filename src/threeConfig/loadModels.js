import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader'
import MTLLoader from 'three-mtl-loader'

import { models } from './models'

OBJLoader(THREE)

const myTHREE = THREE

export const loadModel = async (objFile, mtlFile, place) => {
    const loader = new myTHREE.OBJLoader()
    const mtlLoader = new MTLLoader()

    await mtlLoader.load(mtlFile, async (materials) => {
        materials.preload()
        loader.setMaterials(materials)
        await loader.load(objFile, (object) => {
            place.add(object)
        })
    })
}

export const addModel = (name, { x, z }) => {
    const container = new THREE.Object3D()
    loadModel(models[name].obj, models[name].mtl, container)
    container.scale.set(models[name].scale, models[name].scale, models[name].scale)
    if(models[name].positionCorrections){
        container.position.set(x+models[name].positionCorrections.x, 0+models[name].positionCorrections.y, z+models[name].positionCorrections.z)
    }
    else{
        container.position.set(x, 0, z)
    }
    return container
}
