'use strict';
const Question = require("../models/question");
const QuestionAnswer = require("../models/questionAnswer");
const FileUtil = require("../utils/fileUtil");
const fileAndFolderNames = require("../config/folderAndFilesNames");

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
    FileUtil.saveDataToJsonFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_FILE, arrayOfParsedQuestionModels);
    FileUtil.saveDataToJsonFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_QUESTIONS_ANSWER_FILE, arrayOfParsedQuestionAnswerModels);
    return {
        transformedQuestions: arrayOfParsedQuestionModels.length,
        transformedQuestionsAnswers: arrayOfParsedQuestionAnswerModels.length
    }
}

async function transformQuestionDataFromDataExtracted(productId) {
    let questionsData = FileUtil.readDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_QUESTIONS_FILE);
    return transformQuestionData(productId, questionsData)
}

exports.transformQuestionData = transformQuestionData;
exports.transformQuestionDataFromDataExtracted = transformQuestionDataFromDataExtracted;