'use strict';
const APICodes = require('../config/apiCodes');
const Question = require('../models/question');
const QuestionService = require('../services/questionService');
const BaseController = require('../controllers/baseController');

exports.getQuestionById = async function (request, response) {
    try {
        let data = await QuestionService.getQuestionById(request.params.id);
        if (data && data.length) {
            console.log("questionController data:", data);
            return BaseController.fillResponse(response, APICodes.SUCCESS, "Question successfully retrieved", data);
        } else {
            console.log("questionController getQuestionById question not found");
            return BaseController.fillResponse(response, APICodes.NOT_FOUND, "Question not found");
        }
    } catch (e) {
        console.error("Function getQuestionById controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

exports.getQuestionsByIdWithAllAnswers = async function (request, response) {
    try {
        let data = await QuestionService.getQuestionsByIdWithAllAnswers(request.params.id);
        if (data.question.length) {
            console.log("questionController getQuestionByIdWithAllComments", data);
            return BaseController.fillResponse(response, APICodes.SUCCESS, "Question with comments successfully retrieved", data);
        } else {
            console.log("questionController getQuestionByIdWithAllComments question not found");
            return BaseController.fillResponse(response, APICodes.NOT_FOUND, "Question not found");
        }
    } catch (e) {
        console.error("Function getQuestionById controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

exports.getAllQuestions = async function (request, response) {
    try {
        const data = await QuestionService.getAllQuestions();
        if (data && data.length) {
            return BaseController.fillResponse(response, APICodes.SUCCESS, "Questions successfully retrieved", data);
        } else {
            console.log("There is no questions in database");
            return BaseController.fillResponse(response, APICodes.NOT_FOUND, "Questions not found");
        }
    } catch (e) {
        console.error("Function getAllQuestions controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

exports.deleteAll = async function (request, response) {
    try {
        await Question.deleteAll();
        return BaseController.fillResponse(response, APICodes.SUCCESS, "Questions successfully deleted from database");
    } catch (e) {
        console.error("Function deleteAll questions controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

