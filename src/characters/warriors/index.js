import { warriorsPeople } from "./people"
import { warriorsOpponents } from "./opponents"

export const warriors = {
    ...warriorsPeople,
    ...warriorsOpponents
}

export const newWarrior = (type, id) => {
    return { ...warriors[type], id }
}