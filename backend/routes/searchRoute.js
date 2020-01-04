const express = require("express");
const Router = express.Router();
const SearchController = require("../controllers/searchController");

// http://localhost:3000/search?product=3082984&reviews=false&reviewscomment=true&questions=false&questionsanswers=true
Router.get("/", SearchController.serchForProductData);

Router.get("/all", SearchController.searchForAllDataFromDatabase);

Router.get("/productids", SearchController.searchForAllProductsOnlyID);

module.exports = Router;