const fs = require('fs');
const path = require('path');

exports.imageFileUpload = (req, res) => {
    const uploadDir = '/../../public/image';
    clearFolder(__dirname + uploadDir);

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/../../public/image/puzzle' + path.extname(uploadedImage.name);

    uploadedImage.mv(uploadPath, () => {
        res.render('start', {isUploaded: true, image: "puzzle"+path.extname(uploadedImage.name)})
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