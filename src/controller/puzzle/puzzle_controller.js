const PuzzleModel = require('../../model/puzzle_model');
const ScoreModel = require('../../model/score_model');
const LinkedList = require('../../model/linked_list');
const Comparator = require('../../utils/comparator');
const PiecePrep = require('../../utils/piece_prep');
const CalcScore = require('../../utils/calc_score');

var original = new LinkedList();
var linkedList = new LinkedList();
var score = new ScoreModel();

exports.createPuzzle = async (req, res) => {
    if (linkedList.size !== null) {
        linkedList = new LinkedList();
        original = new LinkedList();
        score = new ScoreModel();
    }

    score.user = req.body.user;
    elements = PiecePrep.piecePrep();
    elements.forEach((val, i) => {
        linkedList.add(new PuzzleModel(i+1, val));
        original.add(new PuzzleModel(i+1, val));
    });

    res.render('index', { linkedList, score, isShuffled: req.body.isShuffled });
}

exports.shufflePuzzle = (req, res) => {
    var isShuffled = false;

    while (!isShuffled) {
        linkedList.shuffle();
        isShuffled = Comparator.checkForGame(original, linkedList);
    }

    res.render('index', {linkedList, score, isShuffled});
}

exports.switchPieces = (req, res) => {
    nodeOne = req.query.nodeOne;
    nodeTwo = req.query.nodeTwo;

    linkedList.swapNodes(nodeOne, nodeTwo);
    CalcScore.calcScore(score, original, linkedList, nodeOne, nodeTwo);
    console.log(score);
    Comparator.checkForGame(original, linkedList);

    if (linkedList === original) {
        console.log("Oyun bitti");
        CalcScore.saveScore(score);
        alert("oyun bitti");
    }

    res.status(200).send(
        {
            linkedList, 
            score
        }
    );
}

exports.switchedState = (req, res) => {
    res.render('index', {linkedList: linkedList, isShuffled: true, score});
}