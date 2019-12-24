const express = require("express");
const Router = express.Router();

// const ReviewDAO = require("../models/review");
// // http://localhost:3000/product/123
// Router.get("/:reviewId", (request, response) => {
//     console.log(request.params.reviewId);
//     var reviewtest = new ReviewDAO(request.params.reviewId, 'gfgff');
//     // console.log(newporductionstest.name);
//     response.send(ReviewDAO.createOrUpdateReview(newporductionstest));
// });

module.exports = Router;