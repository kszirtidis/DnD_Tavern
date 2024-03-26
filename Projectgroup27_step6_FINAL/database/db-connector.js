// ./database/db-connector.js

/* Citation for the following db-connector.js function:
    Date: 2/29/2024 
    Adapted from code provided by Prof. Safonte and Dr. Curry for students at Oregon State University.
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : '',
    password        : '',
    database        : ''
})

// Export it for use in our applicaiton
module.exports.pool = pool;
