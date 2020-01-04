const express = require("express");
const Router = express.Router();
const ETLController = require("../controllers/ETLController");

// http://localhost:3000/etl/etlwhole
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "3082984"
// }

Router.post("/etlwhole", ETLController.createETLProcessAtOnce);


// http://localhost:3000/etl/onlyextractstep
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "3082984"
// // }
Router.post("/onlyextractstep",ETLController.onlyExtractStep);


// http://localhost:3000/etl/onlytransformstep
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "3082984"
// // }
Router.post("/onlytransformstep", ETLController.onlyTransformStep);


// http://localhost:3000/etl/onlyloadstep
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "3082984"
// // }
Router.post("/onlyloadstep", ETLController.onlyLoadStep);

module.exports = Router;
