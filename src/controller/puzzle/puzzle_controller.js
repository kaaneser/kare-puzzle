const PuzzleModel = require('../../model/puzzle_model');
const LinkedList = require('../../model/linked_list');
const Comparator = require('../../utils/comparator');
const PiecePrep = require('../../utils/piece_prep');

var original = new LinkedList();
var linkedList = new LinkedList();

exports.createPuzzle = async (req, res) => {
    if (linkedList.size !== null) {
        linkedList = new LinkedList();
        original = new LinkedList();
    }

    elements = PiecePrep.piecePrep();
    elements.forEach((val, i) => {
        linkedList.add(new PuzzleModel(i+1, val));
        original.add(new PuzzleModel(i+1, val));
    });

    res.render('index', { linkedList, user: req.body.user, isShuffled: req.body.isShuffled });
}

exports.shufflePuzzle = (req, res) => {
    var isShuffled = false;

    while (!isShuffled) {
        linkedList.shuffle();
        isShuffled = Comparator.checkForGame(original, linkedList);
    }

    res.render('index', {linkedList, user: req.query.user, isShuffled});
}

exports.switchPieces = (req, res) => {
    nodeOne = req.query.nodeOne;
    nodeTwo = req.query.nodeTwo;

    linkedList.swapNodes(nodeOne, nodeTwo);
    Comparator.checkForGame(original, linkedList);

    if (linkedList === original) {
        console.log("Oyun bitti");
    }

    res.status(200).send(
        {
            linkedList
        }
    );
}

exports.switchedState = (req, res) => {
    res.render('index', {linkedList: linkedList, isShuffled: true});
}