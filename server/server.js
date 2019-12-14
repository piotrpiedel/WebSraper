const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const databaseConnection = require("../database/mysqlconnection");
const ProductRoutes = require("../routes/productRoute");
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/product", ProductRoutes);

app.listen(3000);