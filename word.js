const Letter = require('./letter.js');

class Word {
    constructor(word, correct = 0) {
        this.word = [];
        this.correctGuesses = correct;
        for (let i = 0; i < word.length; i++) {
            this.word.push(new Letter([...word][i]));
        }
    }
    wordToString() {
        let word = '';
        for (let i = 0; i < this.word.length; i++) {
            word += this.word[i].displayChar();
        }
        return word;
    }
    checkLetters(guess) {
        let status = false;
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i].charChecker(guess)) {
                status = true;
                console.log(this.correctGuesses);
            };
        }
        return status;
    }
}

module.exports = Word;