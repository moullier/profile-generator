const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');
const generateHTML = require("./generateHTML.js");

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

    // prompt for username and favorite color from list of choices
    inquirer
        .prompt(questions)
        .then(function(answers) {

            let fullname, company, location, gitHubLink, blogLink, bio, repos, followers, stars, following;

            let queryURL = "https://api.github.com/users/" + answers.username;
            let queryURLRepos = "https://api.github.com/users/" + answers.username + "/repos?per_page=100";


            // query for most GitHub user data
            axios.get(queryURL)
            .then(response => {
                console.log(response.data);
                console.log("Data Needed:");
                fullname = response.data.name;
                company = response.data.company;
                location = response.data.location;
                gitHubLink = response.data.html_url;
                blogLink = response.data.blog;
                bio = response.data.bio;
                repos = response.data.public_repos;
                followers = response.data.followers;
                stars = 0;
                console.log(fullname);
                console.log(company);
                console.log(location);
                console.log(gitHubLink);
                console.log(blogLink);
                console.log(bio);

            })
            .catch(error => {
                console.log(error);
            });

            // Query for repo info, in order to iterate through and get star total
            axios.get(queryURLRepos)
            .then(response => { 

                console.log("second response: "+ response.data);
                let totalStars = 0;
                
                response.data.forEach(element => {
                    totalStars += element.stargazers_count;
                    console.log(`stars on ${element.name} are ${element.stargazers_count}`);
                });

                console.log("total stars = " + totalStars);
            })
            .catch(error => {
                console.log(error);
            });

            // build results object to pass in to generateHTML function
            let results = {
                name: fullname,
                company: company,
                location: location,
            };



        });

}

init();
