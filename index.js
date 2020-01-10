const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');
const convertFactory = require('electron-html-to');
const generate = require("./generateHTML.js");
let results;

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
    fs.writeFile(fileName, data, 'utf8', function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("Success!");
    });
}

function init() {

    // prompt for username and favorite color from list of choices
    inquirer
        .prompt(questions)
        .then(function(answers) {

            let fullname, company, location, gitHubLink, blogLink, bio, repos, followers, stars, following, pictureURL;

            let queryURL = "https://api.github.com/users/" + answers.username;
            let queryURLRepos = "https://api.github.com/users/" + answers.username + "/repos?per_page=100";


            // query for most GitHub user data
            axios.get(queryURL)
            .then(response => {
                fullname = response.data.name;
                company = response.data.company;
                location = response.data.location;
                gitHubLink = response.data.html_url;
                blogLink = response.data.blog;
                bio = response.data.bio;
                repos = response.data.public_repos;
                followers = response.data.followers;
                stars = 0;
                pictureURL = response.data.avatar_url;
                following = response.data.following;
            })
            .catch(error => {
                console.log(error);
            });

            // Query for repo info, in order to iterate through and get star total
            axios.get(queryURLRepos)
            .then(response => { 

                console.log("second response: "+ response.data);
                stars = 0;
                
                response.data.forEach(element => {
                    stars += element.stargazers_count;
                    console.log(`stars on ${element.name} are ${element.stargazers_count}`);
                });

                console.log("total stars = " + stars);

                // build results object to pass in to generateHTML function
                results = {
                    name: fullname,
                    company: company,
                    location: location,
                    gitHubLink: gitHubLink,
                    blogLink: blogLink,
                    bio: bio,
                    repos: repos,
                    followers: followers,
                    stars: stars,
                    following: following,
                    pictureURL: pictureURL,
                    color: answers.color
                };

                let HTMLSource = generate.generateHTML(results);
                console.log(HTMLSource);

                writeToFile("testfile.html", HTMLSource);

                let conversion = convertFactory({
                    converterPath: convertFactory.converters.PDF
                });

                conversion({ html: HTMLSource }, function(err, result) {
                    if (err) {
                      return console.error(err);
                    }
                  
                    // console.log(result.numberOfPages);
                    // console.log(result.logs);
                    result.stream.pipe(fs.createWriteStream(`./${answers.username}.pdf`));
                    conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
                  });


            })
            .catch(error => {
                console.log(error);
            });





        });

}

init();
