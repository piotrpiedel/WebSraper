const mysql = require('mysql2');

// https://www.techiediaries.com/node-mysql-database-crud/

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'QTDW3qnbeYPPkIJddIR9',
    database: 'web_scraper_schema'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

connection.query('INSERT INTO product SET ?', ["name 001","name001@email.com"], (err, res) => {
    if(err) throw err;
});

connection.query('SELECT * FROM product', (err,rows) => {
    if(err) throw err;
    console.log(rows);
});

connection.query(
    'UPDATE product SET email = ? Where ID = ?',
    ['updated@email.com', 1],
    (err, result) => {
        if (err) throw err;
    }
);


connection.query(
    'DELETE FROM contacts where id = ?', [1], (err, result) => {
        if (err) throw err;
    }
);