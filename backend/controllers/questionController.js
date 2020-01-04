'use strict';
const APICodes = require('../config/apiCodes');
const Question = require('../models/question');
const QuestionService = require('../services/questionService');
const BaseController = require('../controllers/baseController');

/**
 * @category Controllers
 * @module questionController
 */

/**
 * Get question entity by id from database; Send result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and data;
 */
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

/**
 * Get question entity by id with all answers connected to question from database; Send result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and data;
 */
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

/**
 * Get all question entities; Send result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and  data;
 */
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

/**
 * Delete all question entities; Send operation result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message;
 */
exports.deleteAll = async function (request, response) {
    try {
        await Question.deleteAll();
        return BaseController.fillResponse(response, APICodes.SUCCESS, "Questions successfully deleted from database");
    } catch (e) {
        console.error("Function deleteAll questions controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

