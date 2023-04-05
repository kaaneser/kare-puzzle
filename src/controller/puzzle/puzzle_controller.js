const PuzzleModel = require('../../model/puzzle_model');
const LinkedList = require('../../model/linked_list');
const Comparator = require('../../utils/comparator');
const PiecePrep = require('../../utils/piece_prep');
const ImageSlicer = require('../../utils/image_slicer');

var original = new LinkedList();
var linkedList = new LinkedList();

exports.createPuzzle = (req, res) => {
    if (linkedList.size !== null) {
        linkedList = new LinkedList();
        original = new LinkedList();
    }

    ImageSlicer.SliceImage();
    elements = PiecePrep.piecePrep();
    elements.forEach((val, i) => {
        linkedList.add(new PuzzleModel(i+1, val));
        original.add(new PuzzleModel(i+1, val));
    });

    res.render('index', { linkedList, user: req.body.user });
}

exports.shufflePuzzle = (req, res) => {
    var isShuffled = false;

    while (!isShuffled) {
        linkedList.shuffle();
        isShuffled = Comparator.checkForGame(original, linkedList);
    }

    res.render('index', {linkedList, user: req.query.user});
}

exports.switchPieces = (req, res) => {
    nodeOne = req.query.nodeOne;
    nodeTwo = req.query.nodeTwo;

    linkedList.swapNodes(nodeOne, nodeTwo);
    Comparator.checkForGame(original, linkedList);

    res.status(200).send(
        {
            linkedList
        }
    );
}

exports.switchedState = (req, res) => {
    res.render('index', {linkedList: linkedList});
}