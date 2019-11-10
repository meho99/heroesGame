import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader'
import MTLLoader from 'three-mtl-loader'

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