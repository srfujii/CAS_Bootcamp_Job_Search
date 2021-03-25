// CAS Bootcamp Job Search JavaScript Code

/*** Global Variables  ***/
var formEl = document.querySelector('#searchForm'); // Get reference to our Search Form
var selectedSkill = ""; // Global variable for selected skill


/*** Function formSubmitHandler: called when user clicks "Search" button on form ***/
function formSubmitHandler(event) {

    event.preventDefault();

    var selectedValue = document.getElementById("optionSelectBox").value; // Get the selected value number 0-5 from the option that was selected
    var selectedText = document.getElementById(`${selectedValue}`); // Get reference to html ID associated with selected option
    selectedText = selectedText.textContent; // Get the Text content from the selected option
    selectedSkill = selectedText; // Set our global "skill" variable to selected skill

    // Grab our radio buttons...
    var selectedTexas = document.getElementById("texas");

    // If "Texas" is selected then Susan's search, else Cesar's search
    if (selectedTexas.checked) {
        getTexasJobData(selectedSkill);
    } else {
        // Run Cesar's Web API query for Remote
        getGithubJobData(selectedSkill);
        console.log("Cesar web API query to run here!");
    }

};

/*** Function getTexasJobData: called by formSubmitHandler, issues fetch to Adzuna API
 *   for user's desired skill. Calls displayTexasResults to display the results of the
 *   query if successful. ***/
function getTexasJobData(skillName) {

    // Check to see if skillset-location is already stored in local storage, if so, retrieve & display
    if (localStorage.getItem(`${skillName}-texas`) !== null) {
        var skillLocationArray = JSON.parse(localStorage.getItem(`${skillName}-texas`));
        displayTexasJobResults(skillLocationArray);
    } else {
        // Set our fetch URL to skill selected
        var apiUrl = 'https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=81c88f02&app_key=8fd8923d7be696f1f642efb26fcc6fd7&results_per_page=50&what=' + skillName + '&where=Texas';

        fetch(apiUrl)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        var searchResultArray = setTexasJobResults(data.results);
                        displayTexasJobResults(searchResultArray);
                        localStorage.setItem(`${skillName}-texas`, JSON.stringify(searchResultArray));
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function(error) {
                alert('Unable to connect to Adzuna Job Aggregator');
            });
    }
}


function setTexasJobResults(resultsArray) {

    var skillLocationArray = []; // An array of job Objects

    for (var i = 0; i < resultsArray.length; i++) {

        var jobObject = { // Job Object populated with job info
            jobTitle: "",
            jobCategory: "",
            companyName: "",
            creationDate: "",
            jobLocation: "",
            jobDesc: "",
            jobURL: ""
        };

        // Sanitize our results data, remove <strong> and </strong> tags
        var jobTitleText = resultsArray[i].title.replace(/<strong>/g, '');
        jobTitleText = jobTitleText.replace(/<\/strong>/g, '');
        var jobDescriptionText = resultsArray[i].description.replace(/<strong>/g, '');
        jobDescriptionText = jobDescriptionText.replace(/<\/strong>/g, '');
        var jobCreationDateText = moment(`${resultsArray[i].created}`).format("LL");

        // Sanitize URL data, remove ""
        var jobURLText = resultsArray[i].redirect_url.replace(/\"/g, '');

        // Set Job Object data
        jobObject.jobTitle = jobTitleText;
        jobObject.jobCategory = resultsArray[i].category.label;
        jobObject.companyName = resultsArray[i].company.display_name;
        jobObject.creationDate = jobCreationDateText;
        jobObject.jobLocation = resultsArray[i].location.display_name;
        jobObject.jobDesc = jobDescriptionText;
        jobObject.jobURL = jobURLText;

        // Add new job object to end of our array
        skillLocationArray.push(jobObject);
    }
    return (skillLocationArray);
}

/*** Function displayTexasResults: called by getTexasData to display the results of our fetch.
 *      Loops through 50 results and dynamically displays them to the HTML. ***/
function displayTexasJobResults(resultsArray) {

    // Empty old results before displaying new ones
    var searchResultsContainerEL = document.querySelector('#searchResults');
    searchResultsContainerEL.innerHTML = "";

    // Loop through 50 results
    for (var i = 0; i < resultsArray.length; i++) {

        //Div to contain individual job result info
        var outerDivEl = document.createElement('div');
        outerDivEl.classList = 'card teal lighten-2';

        var innerDivEl = document.createElement('div');
        innerDivEl.classList = 'card-content white-text';

        var h4JobTitleEl = document.createElement('h4');
        h4JobTitleEl.textContent = resultsArray[i].jobTitle;

        var pJobCategoryEl = document.createElement('p');
        pJobCategoryEl.textContent = resultsArray[i].jobCategory;

        var pCompanyNameEl = document.createElement('p');
        pCompanyNameEl.textContent = resultsArray[i].companyName;

        var pJobCreationDateEl = document.createElement('p');
        pJobCreationDateEl.textContent = resultsArray[i].creationDate;

        var pJobLocationEl = document.createElement('p');
        pJobLocationEl.textContent = resultsArray[i].jobLocation;

        var pJobDescriptionEl = document.createElement('p');
        pJobDescriptionEl.textContent = resultsArray[i].jobDesc;

        var anchorDiv = document.createElement('div');
        anchorDiv.classList = 'card-action';

        var aJobURLEl = document.createElement('a');
        aJobURLEl.setAttribute('href', resultsArray[i].jobURL);
        // aJobURLEl.setAttribute('href', `${resultsArray[i].redirect_url}`);
        aJobURLEl.textContent = "Click here for more details...";

        searchResultsContainerEL.appendChild(outerDivEl);
        outerDivEl.appendChild(innerDivEl);
        innerDivEl.appendChild(h4JobTitleEl);
        innerDivEl.appendChild(pJobCategoryEl);
        innerDivEl.appendChild(pCompanyNameEl);
        innerDivEl.appendChild(pJobCreationDateEl);
        innerDivEl.appendChild(pJobLocationEl);
        innerDivEl.appendChild(pJobDescriptionEl);
        outerDivEl.appendChild(anchorDiv);
        anchorDiv.appendChild(aJobURLEl);
    }
};

/*** Event Listeners ***/
formEl.addEventListener('submit', formSubmitHandler);