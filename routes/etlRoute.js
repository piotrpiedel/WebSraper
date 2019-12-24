const express = require("express");
const Router = express.Router();
const ETLController = require("../controllers/ETLController");

// http://localhost:3000/etl/etlwhole
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "3082984"
// }

Router.post("/etlwhole", async function (request, response) {
    console.log("request.params.productID", request.body.productID);
    await ETLController.createETLProcessAtOnce(request, response);

});


// http://localhost:3000/etl/onlyextractstep
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "3082984"
// // }
Router.post("/onlyextractstep", async function (request, response) {
    console.log("request.params.productID", request.body.productID);
    await ETLController.onlyExtractStep(request, response);

});


// http://localhost:3000/etl/onlytransformstep
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "3082984"
// // }
Router.post("/onlytransformstep", async function (request, response) {
    console.log("request.params.productID", request.body.productID);
    await ETLController.onlyTransformStep(request, response);
});


// http://localhost:3000/etl/onlyloadstep
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "3082984"
// // }
Router.post("/onlyloadstep", async function (request, response) {
    console.log("request.params.productID", request.body.productID);
    await ETLController.onlyLoadStep(request, response);
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
