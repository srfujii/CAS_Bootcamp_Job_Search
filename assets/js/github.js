/* Allowable parameters:
description: [skill- c++,javascript,html,css,python,ruby, api, react,node.js,jquery]
location:[remote/texas]
type: fulltime[yes/no{parttime/contract}]
*/

//var formEl = document.querySelector('#searchForm');
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
        return ("error");
    }
};

function getGithubJobData(skillname) {

    if (localStorage.getItem(`${skillname}-remote`) !== null) {
        var JobRemoteArray = JSON.parse(localStorage.getItem(`${skillname}-remote`));
        displayRemoteJobResults(JobRemoteArray);
    } else {
        //var apiUrl = 'https://jobs.github.com/positions.json?location=remote&description=' + skillname;
        var apiUrl = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location=remote&description=' + skillname;
        //var apiUrl = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location=remote&description=javascript'
        /*'https://cors-anywhere.herokuapp.com/' remove this part once deploy to github pages so it doesnt conflict w/ cors*/
        var headers = new Headers({ mode: "no-cors" });
        fetch(apiUrl, { headers: headers })
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        //console.log(apiUrl);
                        console.log(data);
                        var remoteResultsArray = data;
                        // var remoteResultsArray = setRemoteJobs(data);
                        displayRemoteJobResults(remoteResultsArray);
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
}

function setRemoteJobs(resultsArray) {
    var JobRemoteArray = [];

    for (var i = 0; i < resultsArray.length; i++) {
        var infoRemote = {
            JobTitle: " ",
            URL: " ",
            Type: " ",
            CompanyName: " ",
            CreationDate: " ",
            Location: " ",
            Description: " ",
            Apply: " "
        };

        infoRemote.Type == resultsArray[i].type;
        infoRemote.URL = resultsArray[i].url;
        infoRemote.CreationDate = resultsArray[i].created_at;
        infoRemote.CompanyName = resultsArray[i].company;
        infoRemote.Location = resultsArray[i].location;
        infoRemote.JobTitle = resultsArray[i].title;
        infoRemote.Description = resultsArray[i].description;
        infoRemote.Apply = resultsArray[i].how_to_apply;

        JobRemoteArray.push(infoRemote);
    }
    return (JobRemoteArray);
}

function displayRemoteJobResults(resultsArray) {

    var searchResultsContainerEL = document.querySelector('#searchResults');
    searchResultsContainerEL.innerHTML = " ";

    var searchResultsTitleEl = document.createElement('h3');
    searchResultsTitleEl.textContent = "Job Search Results: ";
    searchResultsContainerEL.appendChild(searchResultsTitleEl);

    // Loop through 50 results
    for (var i = 0; i < resultsArray.length; i++) {
        console.log("Job Type: " + resultsArray[i].type);
        console.log("Job URL: " + resultsArray[i].url);
        console.log("Job Created On: " + resultsArray[i].created_at);
        console.log("Company Name: " + resultsArray[i].company);
        console.log("Job Location: " + resultsArray[i].location);
        console.log("Job Title: " + resultsArray[i].title);
        console.log("Description: " + resultsArray[i].description);
        console.log("Apply: " + resultsArray[i].how_to_apply);
        //console.log("Job Category: " + resultsArray[i].category.label);
    }

    for (var i = 0; i < resultsArray.length; i++) {

        var outerDivEl = document.createElement('div');
        outerDivEl.classList = 'card teal lighten-2';

        var innerDivEl = document.createElement('div');
        innerDivEl.classList = 'card-content white-text';

        var h4JobTitleEl = document.createElement('h4');
        h4JobTitleEl.textContent = resultsArray[i].title;

        var pTypeEl = document.createElement('p');
        pTypeEl.textContent = resultsArray[i].type;

        var pCompanyNameEl = document.createElement('p');
        pCompanyNameEl.textContent = resultsArray[i].company;

        var pCreationDateEl = document.createElement('p');
        pCreationDateEl.textContent = resultsArray[i].created_at;

        var pLocationEl = document.createElement('p');
        pLocationEl.textContent = resultsArray[i].location;

        var pDescriptionEl = document.createElement('p');
        pDescriptionEl.textContent = resultsArray[i].description;

        var anchorDiv = document.createElement('div');
        anchorDiv.classList = 'card-action';

        var aApplyEl = document.createElement('a');
        aApplyEl.setAttribute('href', resultsArray[i].how_to_apply);
        // aJobURLEl.setAttribute('href', `${resultsArray[i].redirect_url}`);
        aApplyEl.textContent = "Click here to Apply!";

        searchResultsContainerEL.appendChild(outerDivEl);
        outerDivEl.appendChild(innerDivEl);
        innerDivEl.appendChild(h4JobTitleEl);
        innerDivEl.appendChild(pTypeEl);
        innerDivEl.appendChild(pCompanyNameEl);
        innerDivEl.appendChild(pCreationDateEl);
        innerDivEl.appendChild(pLocationEl);
        innerDivEl.appendChild(pDescriptionEl);
        outerDivEl.appendChild(anchorDiv);
        anchorDiv.appendChild(aApplyEl);

    }
};
formEl.addEventListener('click', FormSubmithandler);
//formEl.addEventListener('submit', FormSubmithandler);