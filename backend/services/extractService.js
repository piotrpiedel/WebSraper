'use strict';
const FileUtil = require("../utils/fileUtil");
const fileAndFolderNames = require("../config/folderAndFilesNames");
/**
 * @category Services
 * @module extractService
 */

/**
 * Get statistics for extracted objects from webscraper
 * @return {Object} tuple resultReviewsStats resultQuestionStats
 */
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

/**
 * Get statistics for: get how many reviews and reviews comments have been extracted
 * @param  {JSON} questions loaded data from file with extracted questions
 * @return {{Number,Number}} tuple of extracted review objects extracted review comment objects
 */
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

/**
 * Get statistics for: how many questions and questions answers have been extracted
 * @param  {JSON} reviews loaded data from file with extracted reviews
 * @return {{Number,Number}} tuple of extracted question objects questions answers
 */
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