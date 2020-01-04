const express = require("express");
const Router = express.Router();
const ProductController = require("../controllers/productController");

Router.get("/:id", ProductController.getProductById);

Router.get("/", ProductController.getAllProducts);

module.exports = Router;