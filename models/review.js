'user strict';
const databaseConnection = require("../database/mysqlconnection");

//review object constructor
const Review = function (id, name) {
    this.id = id;
    this.name = name;
};

Review.createOrUpdateReview = async function (reviewModelInstance) {
    if (reviewModelInstance instanceof Review) {
        let isReviewExisting = await Review.checkIfExistsInDatabase(reviewModelInstance.id);
        console.log("isReviewExisting", isReviewExisting);
        if (isReviewExisting) {
            let reviewUpdated = await Review.updateById(reviewModelInstance);
            console.log("createOrUpdateReview reviewUpdated");
            return reviewUpdated;
        } else {
            let reviewInserted = await Review.insert(reviewModelInstance);
            console.log("createOrUpdateReview reviewInserted");
            return reviewInserted;
        }
    }
};
Review.insert = async function (reviewModelInstance) {
    return databaseConnection.promise().query("INSERT INTO review set ?", reviewModelInstance)
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Review.inserted - rows: ", rows);
                    return rows;
                }
            }
        );
};

Review.checkIfExistsInDatabase = async function (reviewId) {
    return databaseConnection.promise().query("Select * from review where id = ? ", reviewId)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Review.checkIfExistsInDatabase - rows: ", rows);
                return !!(rows && rows.length);
            }
        });
};


Review.getReviewById = async function (reviewId, cb) {
    return databaseConnection.promise().query("Select * from review where id = ? ", reviewId,)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Review.getReviewById - rows: ", rows);
                return rows;
            }
        });
};

Review.getAllReviews = function (cb) {
    return databaseConnection.promise().query("Select * from review")
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Review.getAllReviews - rows: ", rows);
                return rows;
            }
        });
};

Review.updateById = async function (review) {
    return databaseConnection.promise().query("UPDATE review SET ? WHERE id = ?", [review, review.id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Review.updateById: rows", rows);
                    return rows;
                }
            }
        );
};

Review.delete = async function (id) {
    return databaseConnection.promise().query("DELETE FROM review WHERE id = ?", [id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Review.delete: rows", rows);
                    return rows;
                }
            }
        );
};

module.exports = Review;