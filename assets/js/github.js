/* Allowable parameters:
description: [skill- c++,javascript,html,css,python,ruby, api, react,node.js,jquery]
location:[remote/texas]
type: fulltime[yes/no{parttime/contract}]
*/

var searchBtnEl = document.querySelector('#searchBtn'); // Reference to search button

var buttonClickHandler = function(event) {
    event.preventDefault(); // Prevent default action
    console.log("We clicked the button");
    getJobData();
};

//function getJobData(skillname) {
function getJobData() {
    //var apiUrl = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location=remote&description=' + skillname;
    var apiUrl = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location=remote&description=javascript'
        /*'https://cors-anywhere.herokuapp.com/' remove this part once deploy to github pages so it doesnt conflict w/ cors*/

    //console.log(apiUrl); //the api url works 
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    // If github jobs returns empty data object, alert the user and go back
                    if (data == "") {
                        alert('Error: ' + 'We could not find that city, please try again.');
                        return;
                    }
                    displayResults(data.results);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to GitHub Jobs');
        });
}

function displayResults(resultsArray) {

    var searchResultsContainerEL = document.querySelector('#searchResults');
    searchResultsContainerEL.innerHTML = "";

    // var searchResultsTitleEl = document.createElement('h3');
    // searchResultsTitleEl.textContent = "Job Search Results: ";
    // searchResultsContainerEL.appendChild(searchResultsTitleEl);

    // Loop through 50 results
    for (var i = 1; i < resultsArray.length; i++) {

        console.log("Job Type: " + resultsArray[i].type);
        console.log("Job URL: " + resultsArray[i].url);
        console.log("Job Created On: " + resultsArray[i].created_at);
        console.log("Company Name: " + resultsArray[i].company.display_name);
        console.log("Job Location: " + resultsArray[i].location.display_name);
        console.log("Job Title: " + resultsArray[i].title);
        console.log("Description: " + resultsArray[i].description);
        //console.log("Job Category: " + resultsArray[i].category.label);
        console.log("Apply: " + resultsArray[i].how_to_apply);
    }
};

/*** Event Listeners ***/
searchBtnEl.addEventListener('click', buttonClickHandler);