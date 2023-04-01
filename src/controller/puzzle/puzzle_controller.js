const PuzzleModel = require('../../model/puzzle_model');
const LinkedList = require('../../model/linked_list');
const Comparator = require('../../utils/comparator');
const PiecePrep = require('../../utils/piece_prep');

var original = new LinkedList();
var linkedList = new LinkedList();

exports.createPuzzle = (req, res) => {
    if (linkedList.size !== null) {
        linkedList = new LinkedList();
        original = new LinkedList();
    }

    elements = PiecePrep.piecePrep();
    elements.forEach((val, i) => {
        linkedList.add(new PuzzleModel(i, val));
        original.add(new PuzzleModel(i, val));
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
    Comparator.checkForGame(original, linkedList);

    res.status(200).send({
        "Original": original,
        "Game": linkedList
    });
}