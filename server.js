//Group Assignment - Kristian Marshall, Corson Shane
const express = require('express');
const auth = require('./mysql/auth'); //TODO: Replace with config on submit
const app = express();
const mysql = require('mysql');

app.listen(3000);
app.set('view engine', 'ejs');

// http://localhost:3000/
app.get("/", (request, response) => {
  response.render("index");
});