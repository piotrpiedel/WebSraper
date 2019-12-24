'use strict';
const Question = require("../models/question");
const QuestionAnswer = require("../models/questionAnswer");
const FileUtil = require("../utils/fileUtil");
const baseService = require("../services/baseService");

// (async () => {
//     await createOrUpdateQuestion(FileUtil.readDataFile("datatransfromed", "questionsTransformed"));
// })();

async function createOrUpdateQuestion() {
    return await baseService.createOrUpdate(Question,
        Question.createOrUpdateQuestion,
        FileUtil.readDataFile("datatransfromed", "questionsTransformed"));
}

async function createOrUpdateQuestionAnswer() {
    return await baseService.createOrUpdate(QuestionAnswer,
        QuestionAnswer.createOrUpdateQuestionAnswer,
        FileUtil.readDataFile("datatransfromed", "questionAnswersTransformed"));
}

exports.createOrUpdateQuestion = createOrUpdateQuestion;
exports.createOrUpdateQuestionAnswer = createOrUpdateQuestionAnswer;