const mysql = require('mysql2');

// https://www.techiediaries.com/node-mysql-database-crud/

const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'QTDW3qnbeYPPkIJddIR9',
    database: 'web_scraper_schema'
});

databaseConnection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = databaseConnection;