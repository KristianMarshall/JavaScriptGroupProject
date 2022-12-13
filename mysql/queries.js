//const mysql = require("./config.js");
const mysql = require('./auth'); //TODO: Replace with config on submit

module.exports = {
    querySql: querySql,
    getData: getData
};

function getData(skip, take, filterType, filterValue){
  let query = `
      SELECT name, country, city, cuisine 
      FROM restaurants`;
  let queryVars = [skip, take];

  let queryFilter = "";

  if(filterType != ''){
    queryFilter += " WHERE ?? = ?";
    queryVars.unshift(filterValue);
    queryVars.unshift(filterType);
    queryVars.push(filterType);
    queryVars.push(filterValue);
  }
  query += queryFilter;
  query += ` ORDER BY name LIMIT ?, ?; SELECT count(id) as total FROM restaurants ${queryFilter};`;
  query = mysql.functions.format(query, queryVars);

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
        con.query(sql, [1, 2], (error, sqlResult) => {
            if(error) {
                return reject(error);
            }           

            return resolve(sqlResult);
        });

        con.end();
    });
}