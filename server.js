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
  
  queries.getData(skip, take).then(results => {
    response.json(results);
  })
  
});

