const Word = require('./word.js');
const randomWords = require('random-words');
const inquirer = require('inquirer');
const ks = require('node-key-sender');

let wordInPlay = new Word(randomWords());
let playing = false;
let guessedLetters = [];
let totalIncorrectGuesses = 7;

inquirer.prompt([{
    type: 'confirm',
    message: 'Would you like to play a game?',
    name: 'play'
}]).then(res => {
    playing = res.play;
    const guessLetter = () => {
        if (playing) {
            console.log('\n  ' + wordInPlay.wordToString() + '\n\n' + 'Number of incorrect guesses remaining: ' + (totalIncorrectGuesses - wordInPlay.incorrectGuesses) + '\n');
            inquirer.prompt([{
                message: 'Guess a letter!',
                name: 'letter'
            }]).then(res => {
                console.log();
                if (res.letter.length !== 1 || [...ks.getKeyCode(res.letter)].length > 1) {
                    console.log('Please guess a letter.')
                    guessLetter();
                } else if (guessedLetters.indexOf(res.letter) !== -1) {
                    console.log(`${res.letter} has already been guessed.`)
                    guessLetter();
                } else if (wordInPlay.checkLetters(res.letter)) {
                    console.log(`Yes! ${res.letter} is in this word!`);
                    guessedLetters.push(res.letter);
                    if (wordInPlay.correctGuesses === wordInPlay.word.length) {
                        console.log('\nYou win!\n');
                        inquirer.prompt([{
                            type: 'confirm',
                            message: 'Play again?',
                            name: 'again'
                        }]).then(res => {
                            if (res.again) {
                                wordInPlay = new Word(randomWords()); //new word
                                guessedLetters = [];
                                guessLetter();
                            } else {
                                playing = false;
                                console.log('\nOkay, goodbye.');
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        guessLetter();
                    }
                } else if (!wordInPlay.checkLetters(res.letter)) {
                    console.log(`No, ${res.letter} is not in this word.`);
                    wordInPlay.incorrectGuesses++;
                    guessedLetters.push(res.letter);
                    if (wordInPlay.incorrectGuesses === totalIncorrectGuesses) {
                        console.log('\nYou are out of guesses!\n');
                        for (let i = 0; i < wordInPlay.word.length; i++) {
                            wordInPlay.word[i].guessed = true;
                        }
                        console.log(`The last word was ${wordInPlay.wordToString()}!\n`)
                        inquirer.prompt([{
                            type: 'confirm',
                            message: 'Play again?',
                            name: 'again'
                        }]).then(res => {
                            if (res.again) {
                                wordInPlay = new Word(randomWords()); //new word
                                guessedLetters = [];
                                guessLetter();
                            } else {
                                playing = false;
                                console.log('\nOkay, goodbye.');
                            }
                        })
                    } else {
                        guessLetter();
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            console.log('\nOkay, goodbye.');
        }
    }
    guessLetter();
}).catch(err => {
    console.log(err);
})