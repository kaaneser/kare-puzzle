const router = require('express').Router();
const pageController = require('../controller/page/page_controller');

router.get('/', pageController.index);

module.exports = router;