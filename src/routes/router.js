const router = require('express').Router();
const pageController = require('../controller/page/page_controller');
const puzzleController = require('../controller/puzzle/puzzle_controller');

router.get('/', pageController.index);
router.get('/start', pageController.start);
router.get('/createPuzzle', puzzleController.createPuzzle);
router.get('/shufflePuzzle', puzzleController.shufflePuzzle);
router.get('/switchPieces', puzzleController.switchPieces);

module.exports = router;