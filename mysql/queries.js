//const mysql = require("./config.js");
const mysql = require('./auth'); //TODO: Replace with config on submit

module.exports = {
    querySql: querySql,
    getData: getData
};

function getData(skip, take){
let query = "SELECT name, country, city, cuisine from restaurants LIMIT ?, ?";

  query = mysql.functions.format(query, [skip, take]);

  return querySql(query);
}


/*****************************************************************
 *        You can ignore everything below here!
 *****************************************************************/

// don't worry too much about this function! 
// it has been written to return the data from your database query
// *** it DOES NOT need modifying! ***
function querySql(sql) {
    let con = mysql.getCon();

    con.connect(function(error) {
        if (error) {
          return console.error(error);
        } 
      });

    return new Promise((resolve, reject) => {
        con.query(sql, (error, sqlResult) => {
            if(error) {
                return reject(error);
            }           

            return resolve(sqlResult);
        });

        con.end();
    });
}