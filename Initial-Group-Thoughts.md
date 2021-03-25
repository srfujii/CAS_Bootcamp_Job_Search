1. Project title: Bootcamp Job Search Engine, CAS-per the bootcamp-friendly job search engine

2. Project Description:
        


3. User Stories
    As a recent bootcamp graduate, I want to search for possible jobs related to my skillset so that I can see possible job opportunities related to my skillset.

4. Wire Frame

5. API'S
    + OpenSkills API

    Retrieve a collection of "unusual" job titles based on a partial or full match of a specified title.
curl -X GET /path/to/api/v1/jobs/normalize?job_title="ninja"
[
  {
    "description" : "financial manager",
    "parent_uuid" : "90369dd177d9dc5305079b81f1dc0702",
    "uuid" : "9ffbfbe0c0f711a4b5c09cb9489dffa0",
    "title" : "accounting ninja"
  },
  {
    "description" : "sales executive",
    "parent_uuid" : "193e2cfef58673322b3e112004e22464",
    "uuid" : "1a53001559d3244c7825e01f5bf47053",
    "title" : "sales ninja"
  },
  {
    "description" : "customer service or social media",
    "parent_uuid" : "be9577e912d72645481316acfcdafa66",
    "uuid" : "4fc168e1113b1f26cc2df5bba8e4d731",
    "title" : "customer engagement ninja"
  },
  {
    "description" : "software engineer",
    "parent_uuid" : "d202138ac2ddca18189dd7464b395a61",
    "uuid" : "1254c7d8dda6756e1094a040d5724675",
    "title" : "software ninjaneer"
  },
  {
    "description" : "web application developer",
    "parent_uuid" : "292316eb40b9c152340ae42d7b2816f7",
    "uuid" : "a50d6a27ebeaa857a184fce80c6e37cc",
    "title" : "php ninja"
  },
  {
    "description" : "baker",
    "parent_uuid" : "1c4217f2cc6c8afa6532f13475e17ed2",
    "uuid" : "bfd0ab9037525887e167e1ed019402b5",
    "title" : "cupcake ninja"
  }
]

    + Adzuna API

    Example #2: Complex jobs query
There are lots of parameters you can use to enhance your query. In this example, we want javascript developers with salaries over 50k (salary_min=50000), full time (full_time=1) and permanent (permanent=1) positions, to reduce ambiguity we exclude any ads that contain the keyword "Java" (what_exclude=java), we limit the results to London (where=london) and we sort by salary (sort_by=salary). The resulting GET call:
http://api.adzuna.com:80/v1/api/jobs/gb/search/1?app_id={YOUR_APP_ID}&app_key={YOUR_APP_KEY}&results_per_page=20&what=javascript%20developer&what_exclude=java&where=london&sort_by=salary&salary_min=30000&full_time=1&permanent=1&content-type=application/json
    + Github Jobs API (maybe future)

6. Task Breakdown