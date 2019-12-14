const express = require("express");
const Router = express.Router();
const databaseConnection = require("../database/mysqlconnection");
const ProductRoute = require("../models/product");
const ProductController = require("../controllers/productController");

Router.get("/:productID", async function (request, response) {
    console.log(request.params.productID);
    await ProductController.getProductById(request, response);
});

Router.get("/", async function (request, response) {
    await ProductController.getAllProducts(response);
});

//should start webscrapper and whole process;
Router.post("/", async function (request, response) {
    await ProductController.getProductByIdPost(request, response);
});
module.exports = Router;