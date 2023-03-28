const PuzzleModel = require('../../model/puzzle_model');
const LinkedList = require('../../model/linked_list');

/*

    TODO:
    Shuffle -> İki linklist karşılaştır, en az birinin aynı konumda olması lazım.
    Switch -> Doğru yerdeyse kilitlememiz lazım, bool ataması yap ve kilitleme fonksiyonu yaz

*/

var linkedList = new LinkedList();

exports.createPuzzle = (req, res) => {
    if (linkedList.size !== null) {
        linkedList = new LinkedList();
    }

    // Şimdilik 3 piece düşünelim:
    elements = [
        {pieceNum: 1, picUrl: "asd"},
        {pieceNum: 2, picUrl: "qwe"},
        {pieceNum: 3, picUrl: "zxc"}
    ];

    elements.forEach(el => {
        linkedList.add(new PuzzleModel(el.pieceNum, el.picUrl));
    });

    res.status(200).send(linkedList);
}

exports.shufflePuzzle = (req, res) => {
    linkedList.shuffle();

    res.status(200).send(linkedList);
}

exports.switchPieces = (req, res) => {
    linkedList.swapNodes(1, 3);

    res.status(200).send(linkedList); 
}