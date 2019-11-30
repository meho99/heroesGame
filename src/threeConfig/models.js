import treeModel from '../worldElements/models/Tree.1.4.obj'
import treeModelMtl from '../worldElements/models/Tree.1.4.mtl'
import treeModel2Mtl from '../worldElements/models/Oak_Tree.mtl'
import treeModel2 from '../worldElements/models/Oak_Tree.obj'

import crystalModelMtl from '../worldElements/models/Crystal.mtl'
import crystalModel from '../worldElements/models/Crystal.obj'

import wiatrakMtl from '../worldElements/models/wiatrak.mtl'
import wiatrak from '../worldElements/models/wiatrak.obj'

export const obstacles = {
    TESTOBSTACLE1: {
        obj: crystalModel,
        mtl: crystalModelMtl,
        scale: 10
    },
    TESTOBSTACLE2: {
        obj: wiatrak,
        mtl: wiatrakMtl,
        scale: 20,
        positionCorrections: { x: -2, y: -3, z: 5.5 }
    }
}

export const models = {
    TREE1: {
        obj: treeModel,
        mtl: treeModelMtl,
        scale: 5
    }
    ,
    TREE2: {
        obj: treeModel2,
        mtl: treeModel2Mtl,
        scale: 10
    }
    ,

    building: {
        obj: wiatrak,
        mtl: wiatrakMtl,
        scale: 30,
        positionCorrections: { x: -1, y: -3, z: 3.5 }
    }
    ,
    Crystal: {
        obj: crystalModel,
        mtl: crystalModelMtl,
        scale: 30
    },
    ...obstacles
}

export const obstacleModels = Object.keys(obstacles)

