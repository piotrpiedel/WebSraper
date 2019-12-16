'use strict';
const Question = require("../models/question");
const FileUtil = require("../utils/fileUtil");

async function transformQuestionData(questions) {
    questions.forEach(question => {
        question.author = question.author
            .split(" ")[0]
            .replace(/\r|\n|\t/g, "");
        question.dateOfQuestion = new Date(question.dateOfQuestion).getTime();
        question.title = question.title.trim();
        question.message = question.message.trim();
        question.numberOfUpVotes = Number(question.numberOfUpVotes);
        question.numberOfDownVotes = Number(question.numberOfDownVotes);

        question.answers.forEach(answer => {
            answer.author = answer.author.trim();
            answer.message = answer.message.trim().replace(/\r|\n|\t/g, "");
            answer.dateOfAnswer = new Date(answer.dateOfAnswer).getTime();
            answer.numberOfUpVotes = Number(answer.numberOfUpVotes);
            answer.numberOfDownVotes = Number(answer.numberOfDownVotes);
        });
    });
}

