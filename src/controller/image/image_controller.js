const fs = require('fs');
const path = require('path');
const imageDownloader = require('image-downloader');
const ImageSlicer = require('../../utils/image_slicer');

exports.imageFileUpload = (req, res) => {
    const uploadDir = '/../../public/image';
    clearFolder(__dirname + uploadDir);

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/../../public/image/puzzle' + path.extname(uploadedImage.name);

    uploadedImage.mv(uploadPath).then(() => {
        ImageSlicer.SliceImage().then(() => {
            res.render('start', {isUploaded: true});
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
            res.render('start', {isUploaded: true});
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