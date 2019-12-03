const express = require("express");
const Router = express.Router();
const databaseConnection = require("../database/mysqlconnection");

Router.get("/", (request, response) => {
    databaseConnection.query("SELECT * from product", (error, rows, fields) => {
        if (!error) {
            response.send(rows);
        } else {
            console.log(error)
        }
    })
});

module.exports = Router;