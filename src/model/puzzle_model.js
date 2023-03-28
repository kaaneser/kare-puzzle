module.exports = class Puzzle {
    constructor(pieceNum, picUrl) {
        this.data = {
            "pieceNum": pieceNum, 
            "picUrl": picUrl
        };
        this.next = null;
    }
}
