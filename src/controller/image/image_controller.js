const fs = require('fs');
const path = require('path');
const imageDownloader = require('image-downloader');
const ImageSlicer = require('../../utils/image_slicer');
const CalcScore = require('../../utils/calc_score');

exports.imageFileUpload = (req, res) => {
    const uploadDir = '/../../public/image';
    clearFolder(__dirname + uploadDir);

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/../../public/image/puzzle' + path.extname(uploadedImage.name);

    uploadedImage.mv(uploadPath).then(() => {
        ImageSlicer.SliceImage().then(() => {
            CalcScore.getScores()
            .then(scores => {
                res.render('start', {isUploaded: true, scores: scores});
            })
            .catch(err => {
                console.error(err);
                res.sendStatus(500);
            });
        });
    });
}

exports.urlFileUpload = (req, res) => {
    const uploadDir = '/../../public/image';
    clearFolder(__dirname + uploadDir);
    options = {
        url: req.body.url,
        dest: __dirname + '/../../public/image/puzzle.jpg'
    };
    
    imageDownloader.image(options).then(() => {
        ImageSlicer.SliceImage().then(() => {
            CalcScore.getScores()
            .then(scores => {
                res.render('start', {isUploaded: true, scores: scores});
            })
            .catch(err => {
                console.error(err);
                res.sendStatus(500);
            });
        });
    });
}

function clearFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);

        for (const file of files) {
            const filePath = `${folderPath}/${file}`;

            if (fs.lstatSync(filePath).isDirectory()) {
                clearFolder(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        }
    }
}