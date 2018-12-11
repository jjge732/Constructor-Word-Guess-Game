const Word = require('./word.js');
const randomWords = require('random-words');
const inquirer = require('inquirer');
const ks = require('node-key-sender');

let wordInPlay = new Word(randomWords());

inquirer.prompt([{
    type: 'confirm',
    message: 'Would you like to play a game?',
    name: 'play'
}]).then(res => {
    if (res.play) {
        const guessLetter = () => {
            console.log(wordInPlay.wordToString());
            inquirer.prompt([{
                message: 'Guess a letter!',
                name: 'letter'
            }]).then(res => {
                if (res.letter.length !== 1 || [...ks.getKeyCode(res.letter)].length > 1) {
                    console.log('Please guess a letter.')
                    guessLetter();
                } else if (wordInPlay.checkLetters(res.letter)) {
                    console.log(`Yes! ${res.letter} is in this word!`);
                    guessLetter();
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
                                console.log('Ok, goodbye.');
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                } else {
                    console.log(`No, ${res.letter} is not in this word.`);
                    wordInPlay.incorrectGuesses++;
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
        }
        guessLetter();
    } else {
        console.log('Okay, goodbye.');
    }
}).catch(err => {
    console.log(err);
})