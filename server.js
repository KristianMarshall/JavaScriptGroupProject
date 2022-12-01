//Group Assignment - Kristian Marshall, Corson Shane
const express = require('express');
const queries = require("./mysql/queries");
const app = express();


app.listen(3000);
app.set('view engine', 'ejs');

// http://localhost:3000/
app.get("/", (request, response) => {
  response.render("index");
});