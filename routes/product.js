const express = require("express");
const Router = express.Router();
const databaseConnection = require("../database/mysqlconnection");
const Product = require("../models/product");
// http://localhost:3000/product/123
Router.get("/:productID", (request, response) => {
    console.log(request.params.productID);
    var newporductionstest= new Product(request.params.productID,'gfgff');
    // console.log(newporductionstest.name);
    response.send(Product.createOrUpdateProduct(newporductionstest));
});

module.exports = Router;