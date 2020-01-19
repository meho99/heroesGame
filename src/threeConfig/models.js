import treeModel from '../worldElements/models/Tree.1.4.obj'
import treeModelMtl from '../worldElements/models/Tree.1.4.mtl'
import treeModel2Mtl from '../worldElements/models/Tree1.222.mtl'
import treeModel2 from '../worldElements/models/Tree1.222.obj'

import crystalModelMtl from '../worldElements/models/Crystal.mtl'
import crystalModel from '../worldElements/models/Crystal.obj'

import wiatrakMtl from '../worldElements/models/wiatrak.mtl'
import wiatrak from '../worldElements/models/wiatrak.obj'

import tree1Mtl from '../worldElements/models/Tree1.1.mtl'
import tree1 from '../worldElements/models/Tree1.1.obj'

import rock1Mtl from '../worldElements/models/rock1.mtl'
import rock1 from '../worldElements/models/rock1.obj'

import bushMtl from '../worldElements/models/Bush3.1.mtl'
import bush from '../worldElements/models/Bush3.1.obj'

import peasant from '../worldElements/models/peasant.obj'
import peasantMtl from '../worldElements/models/peasant.mtl'

export const obstacles = {
    BATTLEROCK: {
        obj: rock1,
        mtl: rock1Mtl,
        scale: 4,
        positionCorrections: { x: -2, y: 0, z: 0 }
    },
    TREE121: {
        obj: treeModel2,
        mtl: treeModel2Mtl,
        scale: 6
    },
}

export const enemies = {
    BIRD: {
        obj: peasant,
        mtl: peasantMtl,
        scale: 3,
        rotationCorrections: Math.PI / 2
    },
    PEASANT: {
        obj: peasant,
        mtl: peasantMtl,
        scale: 5
    }
}

export const models = {
    TREE1: {
        obj: treeModel,
        mtl: treeModelMtl,
        scale: 5
    },
    TREE2: {
        obj: treeModel2,
        mtl: treeModel2Mtl,
        scale: 10
    },
    building: {
        obj: wiatrak,
        mtl: wiatrakMtl,
        scale: 30,
        positionCorrections: { x: -1, y: -3, z: 3.5 }
    },
    Tree3: {
        obj: tree1,
        mtl: tree1Mtl,
        scale: 5,
        positionCorrections: { x: -1, y: -3, z: 3.5 }
    },
    Crystal: {
        obj: crystalModel,
        mtl: crystalModelMtl,
        scale: 30
    },

    ...obstacles,
    ...enemies

}

export const obstacleModels = Object.keys(obstacles)

