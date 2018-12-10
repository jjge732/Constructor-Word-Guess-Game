const Word = require('./word.js');
const axios = require('axios');
const inquirer = require('inquirer');

let hello = new Word('hello');
let wordInPlay = hello;

inquirer.prompt([{
    type: 'confirm',
    message: 'Would you like to play a game?',
    name: 'play'
}]).then(res => {
    if (res.play) {
        const guessLetter = () => {
            inquirer.prompt([{
                message: 'Guess a letter!',
                name: 'letter'
            }]).then(res => {
                if (res.letter > 1 || process.argv[2].keyCode < 65 && process.argv[2].keyCode > 90) {
                    console.log('Please guess a letter.')
                    guessLetter();
                }
                else if(!wordInPlay.checkLetters()) {
                    guessLetter();
                // } else if (out of guesses) {

                // } else {

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