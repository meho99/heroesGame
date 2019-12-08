export const actions = {
    changeOwner: ({
        addWindow,
        removeBuilding,
        id,
        player,
        scene,
        circle,
        additional: { gold },
        container,
        UpdatePlayerDetails
    }) => {
        addWindow('collect')
        removeBuilding(id)
        player.addGold(gold)
        scene.remove(circle)
        scene.remove(container)
        UpdatePlayerDetails(player.name, player.gold)
    }
}