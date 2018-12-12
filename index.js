const Word = require('./word.js');
const randomWords = require('random-words');
const inquirer = require('inquirer');
const ks = require('node-key-sender');

let wordInPlay = new Word(randomWords());
let playing = false;
let guessedLetters = [];

inquirer.prompt([{
    type: 'confirm',
    message: 'Would you like to play a game?',
    name: 'play'
}]).then(res => {
    playing = res.play;
    const guessLetter = () => {
        if (playing) {
            console.log(wordInPlay.wordToString());
            inquirer.prompt([{
                message: 'Guess a letter!',
                name: 'letter'
            }]).then(res => {
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
                        console.log('\nYou win!');
                        inquirer.prompt([{
                            type: 'confirm',
                            message: 'Play again?',
                            name: 'again'
                        }]).then(res => {
                            if (res.again) {
                                wordInPlay = new Word(randomWords()); //new word
                                guessLetter();
                            } else {
                                playing = false;
                                console.log('Ok, goodbye.');
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
                    if (wordInPlay.incorrectGuesses === 6) {
                        console.log('You are out of guesses!');
                        for (let i = 0; i < wordInPlay.word.length; i++) {
                            wordInPlay.word[i].guessed = true;
                        }
                        console.log(`The last word was ${wordInPlay.wordToString()}!`)
                        inquirer.prompt([{
                            type: 'confirm',
                            message: 'Play again?',
                            name: 'again'
                        }]).then(res => {
                            if (res.again) {
                                wordInPlay = new Word(randomWords()); //new word
                                guessLetter();
                            } else {
                                playing = false;
                                console.log('Ok, goodbye.');
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
            console.log('Okay, goodbye.');
        }
    }
    guessLetter();
}).catch(err => {
    console.log(err);
})