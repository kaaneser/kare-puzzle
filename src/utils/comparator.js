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

exports.isEqual = (original, linkedList) => {
    let currentNode1 = original.head;
    let currentNode2 = linkedList.head;

    while (currentNode1 !== null && currentNode2 !== null) {
        if (currentNode1.data.pieceNum !== currentNode2.data.pieceNum) {
          return false;
        }
        currentNode1 = currentNode1.next;
        currentNode2 = currentNode2.next;
    }

    if (currentNode1 === null && currentNode2 === null) {
        return true;
    }

    return false;
}