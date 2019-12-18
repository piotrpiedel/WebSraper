'use strict';
const Question = require("../models/question");
const QuestionAnswer = require("../models/questionAnswer");
const FileUtil = require("../utils/fileUtil");

async function transformQuestionData(productId, questions) {
    const arrayOfParsedQuestionModels = [];
    const arrayOfParsedQuestionAnswerModels = [];
    questions.forEach(question => {
        let questionModel = new Question.Builder(question.id)
            .withQuestionTitle(question.title.trim())
            .withQuestionMessage(question.message.trim())
            .withQuestionDate(new Date(question.dateOfQuestion).getTime())
            .withQuestionUserName(question.author
                .split(" ")[0]
                .replace(/\r|\n|\t/g, ""))
            .withQuestionUpVotes(Number(question.numberOfUpVotes))
            .withQuestionDownVotes(Number(question.numberOfDownVotes))
            .withQuestionProductId(productId);
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