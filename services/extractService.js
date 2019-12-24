'use strict';
const FileUtil = require("../utils/fileUtil");

function getWebScraperExtractionStatistics() {
    let resultReviewsStats = getHowManyReviewsExtracted(FileUtil
        .readDataFile("dataextracted", "reviews"));

    let resultQuestionStats = getHowManyQuestionsExtracted(FileUtil
        .readDataFile("dataextracted", "questions"));
    return {
        resultReviewsStats: resultReviewsStats,
        resultQuestionStats: resultQuestionStats,
    };
}


function getHowManyQuestionsExtracted(questions) {
    let questionExtractedStats = 0;
    let questionsAnswerStats = 0;
    questions.forEach(question => {
        questionExtractedStats++;
        question.answers.forEach(answer => {
            questionsAnswerStats++;
        });
    });
    return {questionExtractedStats, questionsAnswerStats}
}

function getHowManyReviewsExtracted(reviews) {
    let reviewExtractedStats = 0;
    let reviewCommentStats = 0;
    reviews.forEach(review => {
        reviewExtractedStats++;
        review.comments.forEach(answer => {
            reviewCommentStats++;
        });
    });
    return {reviewExtractedStats, reviewCommentStats}
}

exports.getHowManyQuestionsExtracted = getHowManyQuestionsExtracted;
exports.getHowManyReviewsExtracted = getHowManyReviewsExtracted;
exports.getWebScraperExtractionStatistics = getWebScraperExtractionStatistics;