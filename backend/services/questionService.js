'use strict';
const Question = require("../models/question");
const QuestionAnswer = require("../models/questionAnswer");
const FileUtil = require("../utils/fileUtil");
const baseService = require("../services/baseService");
const fileAndFolderNames = require("../config/folderAndFilesNames");

async function createOrUpdateQuestion() {
    let data = await baseService.createOrUpdate(Question,
        Question.createOrUpdateQuestion,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_QUESTIONS_FILE);

    return data;
}

async function createOrUpdateQuestionAnswer() {
    let data = await baseService.createOrUpdate(QuestionAnswer,
        QuestionAnswer.createOrUpdateQuestionAnswer,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_ANSWER_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_ANSWER_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_QUESTIONS_FILE);

    return data;
}

async function getQuestionById(id) {
    return Question.getById(id);
}

async function getAll(id) {
    return Question.getAll();
}

async function deleteAll() {
    return Question.deleteAll()
}

async function getQuestionsByIdWithAllAnswers(id) {
    let data = {};
    data.question = await getQuestionById(id);
    if (data.question.length) {
        data.questionAnswers = await QuestionAnswer.getAllByQuestionID(id);
    } else return data;
    return data;
}

exports.createOrUpdateQuestion = createOrUpdateQuestion;
exports.createOrUpdateQuestionAnswer = createOrUpdateQuestionAnswer;

exports.deleteAllReviews = deleteAll;
exports.getAllQuestions = getAll;
exports.getQuestionById = getQuestionById;
exports.getQuestionsByIdWithAllAnswers = getQuestionsByIdWithAllAnswers;