const router = require('express').Router();
const pageController = require('../controller/page/page_controller');
const puzzleController = require('../controller/puzzle/puzzle_controller');
const imageController = require('../controller/image/image_controller');

router.get('/', pageController.index);
router.get('/start', pageController.start);
router.get('/shufflePuzzle', puzzleController.shufflePuzzle);
router.get('/switchPieces', puzzleController.switchPieces);
router.get('/createPuzzle', puzzleController.shufflePuzzle);
router.get('/switchedState', puzzleController.switchedState);

router.post('/imageFileUpload', imageController.imageFileUpload);
router.post('/urlFileUpload', imageController.urlFileUpload);
router.post('/createPuzzle', puzzleController.createPuzzle);

module.exports = router;