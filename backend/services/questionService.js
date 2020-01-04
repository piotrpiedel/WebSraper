'use strict';
const Question = require("../models/question");
const QuestionAnswer = require("../models/questionAnswer");
const FileUtil = require("../utils/fileUtil");
const baseService = require("../services/baseService");
const fileAndFolderNames = require("../config/folderAndFilesNames");

/**
 * @category Services
 * @module questionService
 */

/**
 * Creates or update questions, clear files with transformed questions data after loading to database
 * @return {{Number,Number}} return object composed of two numbers (inserted and updated rows)
 */
exports.createOrUpdateQuestion = async function createOrUpdateQuestion() {
    let data = await baseService.createOrUpdate(Question,
        Question.createOrUpdateQuestion,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_QUESTIONS_FILE);

    return data;
};

/**
 * Creates or update question answers, clear files with transformed answers to questions data after loading to database
 * @return {{Number,Number}} return object composed of two numbers (inserted and updated rows)
 */
exports.createOrUpdateQuestionAnswer = async function createOrUpdateQuestionAnswer() {
    let data = await baseService.createOrUpdate(QuestionAnswer,
        QuestionAnswer.createOrUpdateQuestionAnswer,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_ANSWER_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_ANSWER_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_QUESTIONS_FILE);

    return data;
};

/**
 * Get question from database
 * @param  {String} id id of question to get from database
 * @return {Question} return question entity from database
 */
exports.getQuestionById = async function getQuestionById(id) {
    return Question.getById(id);
};

/**
 * Get all questions from database
 * @return {Question[]} return question entities from database
 */
exports.getAllQuestions = async function getAll() {
    return Question.getAll();
};

/**
 * Delete all questions from database
 * @return {Question} return deleted question entities from database
 */
exports.deleteAllQuestions = async function deleteAll() {
    return Question.deleteAll()
};

/**
 * Get question from database
 * @param  {String} id id of question to get answers for
 * @return {{Question, QuestionAnswer[]}} return object composed with question and array of answers to that question from database; if answers not found then return only question object
 */
exports.getQuestionsByIdWithAllAnswers = async function getQuestionsByIdWithAllAnswers(id) {
    let data = {};
    data.question = await Question.getById(id);
    if (data.question.length) {
        data.questionAnswers = await QuestionAnswer.getAllByQuestionID(id);
    } else return data;
    return data;
};