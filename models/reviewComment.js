'user strict';
const databaseConnection = require("../database/mysqlconnection");

//review object constructor
class ReviewComment {
    constructor(reviewComment) {
        if (arguments.length === 1 && this.validate(reviewComment)) {
            this.id = reviewComment.id;
            this.comment_content = reviewComment.comment_content;
            this.date_creation = reviewComment.date_creation;
            this.user_name = reviewComment.user_name;
            this.review_id = reviewComment.review_id;
        }
    }

    validate(reviewComment) {
        return !!reviewComment.id && !!reviewComment.review_id;
    }

    static get Builder() {
        class Builder {
            constructor(id) {
                this.id = id;
            }

            withMessage(commentContent) {
                this.comment_content = commentContent;
                return this;
            }

            withDate(commentDate) {
                this.date_creation = commentDate;
                return this;
            }

            withUserName(userName) {
                this.user_name = userName;
                return this;
            }

            withReviewId(reviewId) {
                this.review_id = reviewId;
                return this;
            }

            build() {
                if (this.id && this.review_id) {
                    return new ReviewComment(this)
                } else throw "ReviewComment id && reviewFK must not be empty";
            }
        }

        return Builder;
    }
}

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

ReviewComment.checkIfExistsInDatabase = async function (id) {
    return databaseConnection.promise().query("Select * from review_comment where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("ReviewComment.checkIfExistsInDatabase - rows: ", rows);
                return !!(rows && rows.length);
            }
        });
};


ReviewComment.getReviewById = async function (id) {
    return databaseConnection.promise().query("Select * from review_comment where id = ? ", id)
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

ReviewComment.delete = async function (id) {
    return databaseConnection.promise().query("DELETE FROM review_comment WHERE reviewCommentId = ?", [id])
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