const CalcScore = require('../../utils/calc_score');

exports.index = (req, res) => {
    res.render('index');
}

exports.start = (req, res) => {
    CalcScore.getScores()
        .then(scores => {
            console.log(scores);
            res.render('start', {isUploaded: false, scores: scores});
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
}