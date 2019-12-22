'use strict';
const Question = require("../models/question");
const QuestionAnswer = require("../models/questionAnswer");
const FileUtil = require("../utils/fileUtil");

async function transformQuestionData(productId, questions) {
    const arrayOfParsedQuestionModels = [];
    const arrayOfParsedQuestionAnswerModels = [];
    questions.forEach(question => {
        let questionModel = new Question.Builder(question.id)
            .withTitle(question.title.trim())
            .withMessage(question.message.trim())
            .withDate(question.dateOfQuestion.trim())
            .withUserName(question.author
                .split(" ")[0]
                .replace(/\r|\n|\t/g, ""))
            .withUpVotes(Number(question.numberOfUpVotes))
            .withDownVotes(Number(question.numberOfDownVotes))
            .withProductId(productId)
            .build();
        arrayOfParsedQuestionModels.push(questionModel);
        question.answers.forEach(answer => {
            let questionAnswerModel = new QuestionAnswer.Builder(answer.id)
                .withMessage(answer.message.trim().replace(/\r|\n|\t/g, ""))
                .withDate(answer.dateOfAnswer.trim())
                .withUserName(answer.author.trim())
                .withUpVotes(Number(answer.numberOfUpVotes))
                .withDownVotes(Number(answer.numberOfDownVotes))
                .withQuestionID(question.id)
                .build();
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