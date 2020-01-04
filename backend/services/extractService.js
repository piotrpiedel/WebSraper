'use strict';
const FileUtil = require("../utils/fileUtil");
const fileAndFolderNames = require("../config/folderAndFilesNames");

exports.getWebScraperExtractionStatistics = function getWebScraperExtractionStatistics() {
    let resultReviewsStats = getHowManyReviewsAndReviewsCommentsExtracted(FileUtil
        .readDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_REVIEWS_FILE));

    let resultQuestionStats = getHowManyQuestionsAndQuestionsAnswersExtracted(FileUtil
        .readDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_QUESTIONS_FILE));
    return {
        resultReviewsStats: resultReviewsStats,
        resultQuestionStats: resultQuestionStats,
    };
};

function getHowManyQuestionsAndQuestionsAnswersExtracted(questions) {
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

function getHowManyReviewsAndReviewsCommentsExtracted(reviews) {
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

exports.getHowManyQuestionsAndQuestionsAnswersExtracted = getHowManyQuestionsAndQuestionsAnswersExtracted;
exports.getHowManyReviewsAndReviewsCommentsExtracted = getHowManyReviewsAndReviewsCommentsExtracted;