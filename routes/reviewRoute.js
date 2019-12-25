const express = require("express");
const Router = express.Router();
const ReviewController = require("../controllers/reviewController");
Router.get("/:id", ReviewController.getReviewById);

Router.get("/", ReviewController.getAllReviews);

Router.get("/:id/comments", ReviewController.getReviewByIdWithAllComments);

module.exports = Router;