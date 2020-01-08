const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');

const questions = [
    {
        type: "input",
        message: "What is your GitHub user name?",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        choices: ["green", "blue", "red", "pink"],
        name: "color"   
    }
];

function writeToFile(fileName, data) {
 
}

function init() {

    inquirer
        .prompt(questions)
        .then(function(answers) {

            console.log(answers.username);

            let queryURL = "https://api.github.com/users/" + answers.username;

            axios.get(queryURL)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });





        });

}

init();
