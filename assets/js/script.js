// Adzuna App ID: 81c88f02
// Adzuna App Key: 8fd8923d7be696f1f642efb26fcc6fd7
//
// https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=81c88f02&app_key=8fd8923d7be696f1f642efb26fcc6fd7&results_per_page=50&what=javascript&where=Texas
var searchBtnEl = document.querySelector('#searchBtn');             // Reference to search button

var buttonClickHandler = function (event) {
    event.preventDefault();                   // Prevent default action
  
    console.log("We clicked the button");
    getJobData();
  };

function getJobData () {
    var apiUrl = 'https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=81c88f02&app_key=8fd8923d7be696f1f642efb26fcc6fd7&results_per_page=50&what=javascript&where=Texas'
            
        fetch(apiUrl)
            .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    // If Adzuna returns empty data object, alert the user and go back
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
            .catch(function (error) {
            alert('Unable to connect to Adzuna Job Aggregator');
            });
}

function displayResults (resultsArray) {

    var searchResultsContainerEL = document.querySelector('#searchResults');

    searchResultsContainerEL.innerHTML = "";
    
    var searchResultsTitleEl = document.createElement('h3');
    searchResultsTitleEl.textContent = "Job Search Results: ";
    searchResultsContainerEL.appendChild(searchResultsTitleEl);

    // Loop through 50 results
    for (var i = 1; i < resultsArray.length; i++) {

        console.log("Company Name: " + resultsArray[i].company.display_name);
        console.log("Job Category: " + resultsArray[i].category.label);
        console.log("Job Created On: " + resultsArray[i].created);
        console.log("Description: " + resultsArray[i].description);
        console.log("Job Location: " + resultsArray[i].location.display_name);
        console.log("Job URL: " + resultsArray[i].redirect_url);
        console.log("Job Title: " + resultsArray[i].title);
    }
};

/*** Event Listeners ***/
searchBtnEl.addEventListener('click', buttonClickHandler);
