// Adzuna App ID: 81c88f02
// Adzuna App Key: 8fd8923d7be696f1f642efb26fcc6fd7
//
// https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=81c88f02&app_key=8fd8923d7be696f1f642efb26fcc6fd7&results_per_page=50&what=javascript&where=Texas
var searchBtnEl = document.querySelector('#searchBtn');             // Reference to search button
var optionSelectBoxEl = document.querySelector('#optionSelectBox');  // id = optionSelectBox
var selectedSkill = "javascript";


var buttonClickHandler = function (event) {
    event.preventDefault();                   // Prevent default action
  
    console.log("We clicked the button");
    getJobData(selectedSkill);
  };

// function selectOptionHandler (event) {
    
//     event.preventDefault();
//     console.log("Changed our skill");
//     selectedSkill = event.options[event.selectedIndex].text;
//     console.log(selectedSkill);
// };

function getJobData (skillName) {
    var apiUrl = 'https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=81c88f02&app_key=8fd8923d7be696f1f642efb26fcc6fd7&results_per_page=50&what=' + skillName + '&where=Texas';
            
        fetch(apiUrl)
            .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    // If Adzuna returns empty data object, alert the user and go back
                    if (data == "") {
                        alert('Error: ' + 'We could not find skillset, please try again.');
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
    
    // var searchResultsTitleEl = document.createElement('h3');
    // searchResultsTitleEl.textContent = "Job Search Results: ";
    // searchResultsContainerEL.appendChild(searchResultsTitleEl);

    // Loop through 50 results
    for (var i = 1; i < resultsArray.length; i++) {

        console.log("Job Title: " + resultsArray[i].title);
        console.log("Job Category: " + resultsArray[i].category.label);
        console.log("Company Name: " + resultsArray[i].company.display_name);
        console.log("Job Created On: " + resultsArray[i].created);
        console.log("Description: " + resultsArray[i].description);
        console.log("Job Location: " + resultsArray[i].location.display_name);
        console.log("Job URL: " + resultsArray[i].redirect_url);
        
        // Sanitize our results data
        var jobTitleText = resultsArray[i].title.replace(/<strong>/g, '');
        jobTitleText = jobTitleText.replace(/<\/strong>/g, '');

        var jobDescriptionText = resultsArray[i].description.replace(/<strong>/g, '');
        jobDescriptionText = jobDescriptionText.replace(/<\/strong>/g, '');

        var jobURLText = resultsArray[i].redirect_url.replace(/\"/g, '');
        console.log(jobURLText);

    // <div class="card blue-grey darken-1">
    //     <div class="card-content white-text">
    //         <span class="card-title">Job Title</span>
    //         <p>I am a very simple card. I am good at containing small bits of information.
    //         I am convenient because I require little markup to use effectively.</p>
    //     </div>

    //     <div class="card-action">
    //         <a href="#">This is a link</a>
    //         <a href="#">This is a link</a>
    //     </div>
    // </div>

        //Div to contain individual job info
        var outerDivEl = document.createElement('div');
        outerDivEl.classList = 'card blue-grey darken-1';

        var innerDivEl = document.createElement('div');
        innerDivEl.classList = 'card-content white-text';

        var spanJobTitleEl = document.createElement('span');
        spanJobTitleEl.textContent = jobTitleText;

        var pJobCategoryEl = document.createElement('p');
        pJobCategoryEl.textContent = resultsArray[i].category.label;

        var pCompanyNameEl = document.createElement('p');
        pCompanyNameEl.textContent = resultsArray[i].company.display_name;

        var pJobCreationDateEl = document.createElement('p');
        pJobCreationDateEl.textContent = resultsArray[i].created;

        var pJobDescriptionEl = document.createElement('p');
        pJobDescriptionEl.textContent = jobDescriptionText;

        var pJobLocationEl = document.createElement('p');
        pJobLocationEl.textContent = resultsArray[i].location.display_name;

        var anchorDiv = document.createElement('div');
        anchorDiv.classList = 'card-action';

        var aJobURLEl = document.createElement('a');
        aJobURLEl.setAttribute('href', `${resultsArray[i].redirect_url}`);
        aJobURLEl.textContent = "Click here for more details and to apply for " + jobTitleText;
        // var hrEl = document.createElement('hr');
        
        searchResultsContainerEL.appendChild(outerDivEl);
        outerDivEl.appendChild(innerDivEl);
        innerDivEl.appendChild(spanJobTitleEl);
        innerDivEl.appendChild(pJobCategoryEl);
        innerDivEl.appendChild(pCompanyNameEl);
        innerDivEl.appendChild(pJobCreationDateEl);
        innerDivEl.appendChild(pJobDescriptionEl);
        innerDivEl.appendChild(pJobLocationEl);

        outerDivEl.appendChild(anchorDiv);
        anchorDiv.appendChild(aJobURLEl);
    }
};

/*** Event Listeners ***/
searchBtnEl.addEventListener('click', buttonClickHandler);
// optionSelectBoxEl.addEventListener('onchange', selectOptionHandler);

