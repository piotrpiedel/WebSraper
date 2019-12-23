const express = require("express");
const Router = express.Router();
const ETLController = require("../controllers/ETLController");

Router.post("/", async function (request, response) {
    console.log("request.params.productID", request.body.productID);
    await ETLController.createETLProcessAtOnce(request, response);

});

Router.post("/onlyextract", async function (request, response) {
    console.log("request.params.productID", request.body.productID);
    await ETLController.onlyExtractStep(request, response);

});
// Router.get("/", async function (request, response) {
//     await ProductController.getAllProducts(response);
// });
//
// //should start webscrapper and whole process;
// Router.post("/", async function (request, response) {
//     await ProductController.getProductByIdPost(request, response);
// });

module.exports = Router;


// 4 post;
// 1 post na wszystko;
// 2 post na e;
// 3 post na t;
// 4 post na l;