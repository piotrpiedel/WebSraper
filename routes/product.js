const express = require("express");
const Router = express.Router();
const databaseConnection = require("../database/mysqlconnection");
const Product = require("../models/product");
const ProductController = require("../controllers/productController");


Router.get("/:productID", async function (request, response) {
    console.log(request.params.productID);
    await ProductController.getProductById(request, response);
    // var product = await Product.getProductById(request.params.productID);
    // // console.log("response.send: ", JSON.parse(JSON.stringify(product)));
    // // var string = JSON.parse(JSON.stringify(product));
    // response.send(product[0]);
});

Router.get("/", async function (request, response) {
    await ProductController.getAllProducts(response);
});

module.exports = Router;