const Word = require('./word.js');
const axios = require('axios');
const inquirer = require('inquirer');
const ks = require('node-key-sender');



let hello = new Word('hello');
let wordInPlay = hello;



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
                // } else if () {
                    
                // } else if (out of guesses) {
                } else if (wordInPlay.correctGuesses = wordInPlay.length) {
                    console.log('You win!');
                } else if (wordInPlay.checkLetters(res.letter)) {
                    console.log(`Yes ${res.letter} is in this word!`);
                    guessLetter();
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