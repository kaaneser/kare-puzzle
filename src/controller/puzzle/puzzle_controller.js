const PuzzleModel = require('../../model/puzzle_model');
const LinkedList = require('../../model/linked_list');
const Comparator = require('../../utils/compare_linked_lists');

/*

    TODO:
    Shuffle -> İki linklist karşılaştır, en az birinin aynı konumda olması lazım.
    Switch -> Doğru yerdeyse kilitlememiz lazım.

*/

var original = new LinkedList();
var linkedList = new LinkedList();

exports.createPuzzle = (req, res) => {
    if (linkedList.size !== null) {
        linkedList = new LinkedList();
        original = new LinkedList();
    }

    // Şimdilik 3 piece düşünelim:
    elements = [
        {pieceNum: 1, picUrl: "asd"},
        {pieceNum: 2, picUrl: "qwe"},
        {pieceNum: 3, picUrl: "zxc"},
        {pieceNum: 4, picUrl: "tyu"},
        {pieceNum: 5, picUrl: "ghj"},
        {pieceNum: 6, picUrl: "vbn"}
    ];

    elements.forEach(el => {
        linkedList.add(new PuzzleModel(el.pieceNum, el.picUrl));
        original.add(new PuzzleModel(el.pieceNum, el.picUrl));
    });

    res.status(200).send(
        {
            "Original": original,
            "Game": linkedList
        }
    );
}

exports.shufflePuzzle = (req, res) => {
    var isShuffled = false;

    while (!isShuffled) {
        linkedList.shuffle();
        isShuffled = Comparator.checkForGame(original, linkedList);
    }

    res.status(200).send({
        "Original": original,
        "Game": linkedList
    });
}

exports.switchPieces = (req, res) => {
    linkedList.swapNodes(1, 3);

    res.status(200).send(linkedList); 
}