const express = require("express");
const Router = express.Router();
const SearchController = require("../controllers/searchController");


Router.get("/:productID", async function (request, response) {
    await SearchController.serchForProductData(request, response);
});

module.exports = Router;

// https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js

// //get query&params in express
//
// //etc. example.com/user/000000?sex=female
//
// app.get('/user/:id', function(req, res) {
//
//     const query = req.query;// query = {sex:"female"}
//
//     const params = req.params; //params = {id:"000000"}
//
// })