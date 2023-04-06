const fs = require('fs');
const path = require('path');

const dirPath = "/public/pieces";

exports.piecePrep = () => {
    const pieces = [];
    const regex = /^section-(\d{1,2})\./;

    const files = fs.readdirSync(dirPath)
    .filter(file => regex.test(file))
    .sort((a, b) => {
        const numA = parseInt(a.match(regex)[1], 10);
        const numB = parseInt(b.match(regex)[1], 10);
        return numA - numB;
    });

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const { base } = path.parse(filePath);

        pieces.push(base);
    }

    return pieces;
}