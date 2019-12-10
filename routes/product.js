const express = require("express");
const Router = express.Router();
const databaseConnection = require("../database/mysqlconnection");
const Product = require("../models/product");
Router.get("/:productID", (request, response) => {
    console.log(request.params.productID);
    response.send(Product.getProductById(request.params.productID));
});

module.exports = Router;