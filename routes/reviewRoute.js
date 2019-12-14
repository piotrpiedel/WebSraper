const express = require("express");
const Router = express.Router();
const databaseConnection = require("../database/mysqlconnection");
const ReviewRoute = require("../models/review");
// http://localhost:3000/product/123
Router.get("/:reviewId", (request, response) => {
    console.log(request.params.reviewId);
    var reviewtest = new ReviewRoute(request.params.reviewId, 'gfgff');
    // console.log(newporductionstest.name);
    response.send(ReviewRoute.createOrUpdateReview(newporductionstest));
});

module.exports = Router;