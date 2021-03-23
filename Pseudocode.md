### Pseudo Code for CAS Job Search Engine

We are creating a job search engine for bootcamp graduates. When a user first comes to our site, they are presented with a "Skill" drop-down menu where they can select a skill they are interested in, and radio buttons for location ("Texas" or "Remote"). 

For example, when a user selects "Javascript" from the drop-down menu and selects the Texas radio button, we query the Adzuna API and retrieve job postings that match that particular skill in Texas. (Stretch goal: other locations in the future)

When a user selects "CSS" (example) from the drop-down menu and then selects the "Remote" radio button, we query the GitHub jobs API and retrieve job postings that match that particular skill with remote locations.

We display the results of the user's query on a separate "search-results.html" page/tab ("_blank"). 


Technologies we are using:
    + Materialze (CSS Framework)
    + JavaScript
    + HTML/CSS
    + JQuery



(Question:: What parameters can we use for Adzun and GitHub jobs API's???)


Search by skill and filter by criteria provided.