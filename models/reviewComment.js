'user strict';
const databaseConnection = require("../database/mysqlconnection");

//review object constructor
const ReviewComment = function (id,
                                commentContent,
                                dateCreation,
                                userName,
                                reviewIdExternalKey) {

    this.id = id;
    this.comment_content = commentContent;
    this.date_creation = dateCreation;
    this.user_name = userName;
    this.review_id = reviewIdExternalKey;
};

ReviewComment.createOrUpdateReviewComment = async function (reviewCommentModelInstance) {
    if (reviewCommentModelInstance instanceof ReviewComment) {
        let isReviewCommentExisting = await ReviewComment.checkIfExistsInDatabase(reviewCommentModelInstance.id);
        console.log("isReviewCommentExisting", isReviewCommentExisting);
        if (isReviewCommentExisting) {
            let reviewCommentUpdated = await ReviewComment.updateById(reviewCommentModelInstance);
            console.log("createOrUpdateReview reviewCommentUpdated");
            return reviewCommentUpdated;
        } else {
            let reviewCommentInserted = await ReviewComment.insert(reviewCommentModelInstance);
            console.log("createOrUpdateReview reviewCommentInserted");
            return reviewCommentInserted;
        }
    }
};
ReviewComment.insert = async function (reviewCommentModelInstance) {
    return databaseConnection.promise().query("INSERT INTO review_comment set ?", reviewCommentModelInstance)
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("ReviewComment.inserted - rows: ", rows);
                    return rows;
                }
            }
        );
};

ReviewComment.checkIfExistsInDatabase = async function (reviewCommentId) {
    return databaseConnection.promise().query("Select * from review_comment where id = ? ", reviewCommentId)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("ReviewComment.checkIfExistsInDatabase - rows: ", rows);
                return !!(rows && rows.length);
            }
        });
};


ReviewComment.getReviewById = async function (reviewCommentId) {
    return databaseConnection.promise().query("Select * from review_comment where id = ? ", reviewCommentId,)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("ReviewComment.getReviewById - rows: ", rows);
                return rows;
            }
        });
};

ReviewComment.getAllReviews = function () {
    return databaseConnection.promise().query("Select * from review_comment")
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("ReviewComment.getAllReviews - rows: ", rows);
                return rows;
            }
        });
};

ReviewComment.updateById = async function (reviewComment) {
    return databaseConnection.promise().query("UPDATE review_comment SET ? WHERE id = ?", [reviewComment, reviewComment.id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("ReviewComment.updateById: rows", rows);
                    return rows;
                }
            }
        );
};

ReviewComment.delete = async function (reviewCommentId) {
    return databaseConnection.promise().query("DELETE FROM review_comment WHERE reviewCommentId = ?", [reviewCommentId])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("ReviewComment.delete: rows", rows);
                    return rows;
                }
            }
        );
};

ReviewComment.clearTable = async function () {
    return databaseConnection.promise().query("DELETE FROM review_comment")
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("ReviewComment.clearTable: rows", rows);
                    return rows;
                }
            }
        );
};

module.exports = ReviewComment;