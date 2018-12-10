class Letter {
    constructor(character, guessed = false) {
        this.character = character;
        this.guessed = guessed;
    }

    displayChar() {
        if(guessed) {
            return this.character;
        } else {
            return '_';
        }
    }

    charChecker(char) {
        if (char === this.character) {
            guessed = true;
        }
    }
};

module.exports = Letter;