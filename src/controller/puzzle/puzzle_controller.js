const PuzzleModel = require('../../model/puzzle_model');
const ScoreModel = require('../../model/score_model');
const LinkedList = require('../../model/linked_list');
const Comparator = require('../../utils/comparator');
const PiecePrep = require('../../utils/piece_prep');
const CalcScore = require('../../utils/calc_score');

var original = new LinkedList();
var linkedList = new LinkedList();
var score = new ScoreModel();
var isFinished = false;

exports.createPuzzle = async (req, res) => {
    if (linkedList.size !== null) {
        linkedList = new LinkedList();
        original = new LinkedList();
        score = new ScoreModel();
        isFinished = false;
    }

    score.user = req.body.user;
    elements = PiecePrep.piecePrep();
    elements.forEach((val, i) => {
        linkedList.add(new PuzzleModel(i+1, val));
        original.add(new PuzzleModel(i+1, val));
    });

    res.render('index', { linkedList, score, isShuffled: req.body.isShuffled, isFinished });
}

exports.shufflePuzzle = (req, res) => {
    var isShuffled = false;

    while (!isShuffled) {
        linkedList.shuffle();
        isShuffled = Comparator.checkForGame(original, linkedList);
    }

    res.render('index', {linkedList, score, isShuffled, isFinished});
}

exports.switchPieces = (req, res) => {
    nodeOne = req.query.nodeOne;
    nodeTwo = req.query.nodeTwo;

    linkedList.swapNodes(nodeOne, nodeTwo);
    CalcScore.calcScore(score, original, linkedList, nodeOne, nodeTwo);
    Comparator.checkForGame(original, linkedList);

    if (Comparator.isEqual(original, linkedList)) {
        CalcScore.saveScore(score);
        isFinished = true;
    }

    res.status(200).send(
        {
            linkedList, 
            score,
            isFinished
        }
    );
}

exports.switchedState = (req, res) => {
    res.render('index', {linkedList: linkedList, isShuffled: true, score, isFinished});
}