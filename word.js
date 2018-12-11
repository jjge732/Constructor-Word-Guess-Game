const Letter = require('./letter.js');

class Word {
    constructor(word) {
        this.word = [];
        this.correctGuesses = 0;
        this.incorrectGuesses = 0;
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
                this.correctGuesses++;
            };
        }
        return status;
    }
}

module.exports = Word;