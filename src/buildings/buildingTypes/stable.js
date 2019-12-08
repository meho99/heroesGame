export const actions = {
    changeOwner: ({
        changeOwnerBlock,
        additional: { value },
        setChangeOwnerBlock,
        player,
    }) => {
        if (!changeOwnerBlock) {
            player.increasePlayerRange(value)
            setChangeOwnerBlock(true)
        }
    }
}
