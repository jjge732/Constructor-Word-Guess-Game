class Letter {
    constructor(character, guessed = false) {
        this.character = character;
        this.guessed = guessed;
    }

    displayChar() {
        if(this.guessed) {
            return this.character;
        } else {
            return '_';
        }
    }

    charChecker(char) {
        if (char === this.character) {
            this.guessed = true;
            return true;
        } else {
            return false;
        }
    }
};

module.exports = Letter;