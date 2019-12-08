const express = require("express");
const Router = express.Router();
const databaseConnection = require("../database/mysqlconnection");
const Review = require("../models/review");
// http://localhost:3000/product/123
Router.get("/:reviewId", (request, response) => {
    console.log(request.params.reviewId);
    var reviewtest = new Review(request.params.reviewId, 'gfgff');
    // console.log(newporductionstest.name);
    response.send(Review.createOrUpdateReview(newporductionstest));
});

module.exports = Router;