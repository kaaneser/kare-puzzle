const router = require('express').Router();
const pageController = require('../controller/page/page_controller');

router.get('/', pageController.index);
router.get('/start', pageController.start);


module.exports = router;