const Letter = require('./letter.js');


class Word {
    constructor(word) {
        this.word = [];
        for (let i = 0; i < word.length; i++) {
            this.word.push(new Letter([...word][i]));
        }
    }
    wordString() {
        let word = '';
        for (let i = 0; i < word.length; i++) {
            word += letter[i].displayChar();
        }
        return word;
    }
    checkLetters() {
        for (let i = 0; i < letter.length; i++) {
            if (this.word !== letter[i].charChecker()) {
                return false;
            };
        }

    }
}


module.exports = Word;