/* Allowable parameters:
description: [skill- c++,javascript,html,css,python,ruby, api, react,node.js,jquery]
location:[remote/texas]
type: fulltime[yes/no{parttime/contract}]
*/

var formEl = document.querySelector('#searchBtn'); // Reference to search button
var chosenSkill = " ";

var FormSubmithandler = function(event) {
    event.preventDefault(); // Prevent default action
    console.log("We clicked the button");

    var pickedValue = document.getElementById("optionSelectBox").value; // Get the selected value number 0-5 from the option that was selected
    var chosenText = document.getElementById(`${pickedValue}`); // Get reference to html ID associated with selected option
    chosenText = chosenText.textContent; // Get the Text content from the selected option
    chosenSkill = chosenText;

    var selectedRemote = document.getElementById("remote");

    if (selectedRemote.checked) {
        getGithubJobData(chosenSkill);
    } else {
        console.log(error)
        return (error);
    }
};

function getGithubJobData(skillname) {

    // if (localStorage.getItem(`${skillname}-remote`) !== null) {
    //     var skillRemoteArray = JSON.parse(localStorage.getItem(`${skillname}-remote`));
    //     displayRemoteJobResults(remoteResultsArray);
    // }

    var apiUrl = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location=remote&description=' + skillname;
    //var apiUrl = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location=remote&description=javascript'
    /*'https://cors-anywhere.herokuapp.com/' remove this part once deploy to github pages so it doesnt conflict w/ cors*/

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    var remoteResultsArray = displayRemoteJobResults(data);
                    localStorage.setItem(`${skillname}-remote`, JSON.stringify(remoteResultsArray));
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to GitHub Jobs');
            console.log(error)
        });
}

function setRemoteJobs() {}

function displayRemoteJobResults(resultsArray) {

    var searchResultsContainerEL = document.querySelector('#searchResults');
    searchResultsContainerEL.innerHTML = " ";

    var searchResultsTitleEl = document.createElement('h3');
    searchResultsTitleEl.textContent = "Job Search Results: ";
    searchResultsContainerEL.appendChild(searchResultsTitleEl);
    var skillRemoteArray = [];
    // Loop through 50 results
    for (var i = 0; i < resultsArray.length; i++) {

        console.log("Job Type: " + resultsArray[i].type);
        console.log("Job URL: " + resultsArray[i].url);
        console.log("Job Created On: " + resultsArray[i].created_at);
        console.log("Company Name: " + resultsArray[i].company);
        console.log("Job Location: " + resultsArray[i].location);
        console.log("Job Title: " + resultsArray[i].title);
        console.log("Description: " + resultsArray[i].description);
        //console.log("Job Category: " + resultsArray[i].category.label);
        console.log("Apply: " + resultsArray[i].how_to_apply);
    }
    return (skillRemoteArray);
};

formEl.addEventListener('click', FormSubmithandler);