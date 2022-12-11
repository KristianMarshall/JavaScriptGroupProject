//Group Assignment - Kristian Marshall, Corson Shane
const express = require('express');
const queries = require("./mysql/queries");
const app = express();
app.use(express.static("public"));

app.listen(3000);
app.set('view engine', 'ejs');

// http://localhost:3000/
app.get("/", (request, response) => {
  response.render("index");
});

app.get("/restaurantsJson", (request, response) => {
  let take = parseInt(request.query.take);
  let skip = parseInt(request.query.page) * take;
  
  queries.getData(skip, take, request.query.filterType, request.query.filterValue)
  .then(results => {
    response.json(results);
  })
  
});

app.get("/filtersJson", (request, response) => {
  
  let countries = queries.querySql("SELECT DISTINCT country FROM restaurants ORDER BY country");
  let cities = queries.querySql("SELECT DISTINCT city FROM restaurants ORDER BY city");
  let cuisine = queries.querySql("SELECT DISTINCT cuisine FROM restaurants ORDER BY cuisine");

  Promise.all([countries, cities, cuisine]).then(result => {
    response.json( {
      resultsData: {
        Country: result[0],
        City: result[1],
        Cuisine: result[2]
      }
    });
  });
  
});

