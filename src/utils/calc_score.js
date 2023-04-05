const fs = require('fs');
const fileName = './src/public/score/enyuksekskor.txt';


exports.calcScore = (score, original, linkedList, nodeOne, nodeTwo) => {
    console.log(original.getData(nodeTwo-1));
    console.log(linkedList.getData(nodeTwo-1));

    if (original.getData(nodeTwo-1)  == linkedList.getData(nodeTwo-1) || original.getData(nodeOne-1) == linkedList.getData(nodeOne-1) ) {
        score.score += 5;
    }
    else{
        score.score -= 10;
    }
    score.moveCount++;
}

exports.saveScore = (score) => {
    let userInfo = `${score.user},${score.moveCount},${score.score}`;
    
    fs.appendFile(fileName, `${userInfo}\n`, (err) => {
        if (err) throw err;
    });
}

exports.getScores = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const users = data.split('\n').filter(user => user.trim() !== '');
        
            const usersObj = users.map(user => {
                const [name, moves, score] = user.split(',');
                return { name: name, moveCount: moves, score: score };
            });
        
            const sortedUsers = usersObj.sort((a, b) => b.score - a.score);
        
            const top3Users = sortedUsers.slice(0, 3);

            resolve(top3Users);
        });
    });
}