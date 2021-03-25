/* Allowable parameters:
description: [skill- c++,javascript,html,css,python,ruby, api, react,node.js,jquery]
location:[remote/texas]
type: fulltime[yes/no{parttime/contract}]
*/

var chosenSkill = " ";

function getGithubJobData(skillname) {

    if (localStorage.getItem(`${skillname}-remote`) !== null) {
        var JobRemoteArray = JSON.parse(localStorage.getItem(`${skillname}-remote`));
        displayRemoteJobResults(JobRemoteArray);
    } else {
        var apiUrl = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location=remote&description=' + skillname;
        var headers = new Headers({ mode: "no-cors", 'Access-Control-Allow-Origin': '*'});
        fetch(apiUrl, { headers: headers })
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        var remoteResultsArray = data;
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
        pDescriptionEl.innerHTML = resultsArray[i].description;

        var anchorDiv = document.createElement('div');
        anchorDiv.classList = 'card-action';

        var aApplyEl = document.createElement('a');
        aApplyEl.setAttribute('href', resultsArray[i].how_to_apply);
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