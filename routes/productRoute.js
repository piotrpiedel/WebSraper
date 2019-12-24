const express = require("express");
const Router = express.Router();
const ProductController = require("../controllers/productController");

Router.get("/:productID", async function (request, response) {
    console.log(request.params.productID);
    await ProductController.getProductById(request, response);
});

Router.get("/", async function (request, response) {
    await ProductController.getAllProducts(response);
});

module.exports = Router;