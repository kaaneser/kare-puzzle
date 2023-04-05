exports.checkForGame = (original, linkedList) => {
    let nodeOne = original.head;
    let nodeTwo = linkedList.head;
    let isReady = false;

    while (nodeOne) {
        if (nodeOne.data.pieceNum === nodeTwo.data.pieceNum) {
            nodeTwo.data.isLocked = true;
            isReady = true;
        } else {
            nodeTwo.data.isLocked = false;
        }

        nodeOne = nodeOne.next;
        nodeTwo = nodeTwo.next;
    }

    return isReady;
}