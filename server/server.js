const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const databaseConnection = require("../database/mysqlconnection");
const ProductRoutes = require("../routes/product");

var app = express();
app.use(bodyParser.json());

app.use("/product", ProductRoutes);

app.listen(3000);