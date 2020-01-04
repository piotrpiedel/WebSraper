const express = require("express");
const Router = express.Router();
const QuestionController = require("../controllers/questionController");
Router.get("/:id", QuestionController.getQuestionById);

Router.get("/", QuestionController.getAllQuestions);

Router.get("/:id/answers", QuestionController.getQuestionsByIdWithAllAnswers);

module.exports = Router;