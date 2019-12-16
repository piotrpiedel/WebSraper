'use strict';
const Question = require("../models/question");
const QuestionAnswer = require("../models/questionAnswer");
const FileUtil = require("../utils/fileUtil");

async function transformQuestionData(productId, questions) {
    const arrayOfParsedQuestionModels = [];
    const arrayOfParsedQuestionAnswerModels = [];
    questions.forEach(question => {
        let questionModel = new Question(question.id,
            question.title.trim(),
            question.message.trim(),
            new Date(question.dateOfQuestion).getTime(),
            question.author
                .split(" ")[0]
                .replace(/\r|\n|\t/g, ""),
            Number(question.numberOfUpVotes),
            Number(question.numberOfDownVotes),
            productId
        );
        arrayOfParsedQuestionModels.push(questionModel);
        question.answers.forEach(answer => {
            let questionAnswerModel = new QuestionAnswer(
                answer.id,
                answer.message.trim().replace(/\r|\n|\t/g, ""),
                new Date(answer.dateOfAnswer).getTime(),
                answer.author.trim(),
                Number(answer.numberOfUpVotes),
                Number(answer.numberOfDownVotes),
                question.id
            );
            arrayOfParsedQuestionAnswerModels.push(questionAnswerModel);
        });
    });
    FileUtil.saveDataToJsonFile("datatransfromed", "questionsTransformed", arrayOfParsedQuestionModels);
    FileUtil.saveDataToJsonFile("datatransfromed", "questionAnswersTransformed", arrayOfParsedQuestionAnswerModels);
}

async function transformQuestionDataFromDataExtracted(productId) {
    let questionsData = FileUtil.readDataFile("dataextracted", "questions");
    await transformQuestionData(productId, questionsData)
}

exports.transformQuestionData = transformQuestionData;
exports.transformQuestionDataFromDataExtracted = transformQuestionDataFromDataExtracted;