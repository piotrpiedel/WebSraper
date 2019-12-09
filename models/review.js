'user strict';
const databaseConnection = require("../database/mysqlconnection");

//review object constructor
const Review = function (id,
                         authorName,
                         wasPurchased,
                         dateOfPurchase,
                         reviewDate,
                         reviewStars,
                         isRecommended,
                         reviewContent,
                         advantages,
                         disadvantages,
                         upvotes,
                         downvotes,
                         productId) {
    this.id = id;
    this.author_name = authorName;
    this.was_purchased = wasPurchased;
    this.date_of_purchase = dateOfPurchase;
    this.date_creation = reviewDate;
    this.review_stars = reviewStars.charAt(0);
    this.is_recommended = isRecommended;
    this.review_content = reviewContent;
    this.advantages = advantages.join();
    this.disadvantages = disadvantages.join();
    this.upvotes = upvotes;
    this.downvotes = downvotes;
    this.product_id_fk = productId;
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

Review.clearTable = async function () {
    return databaseConnection.promise().query("DELETE FROM review")
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Review.clearTable: rows", rows);
                    return rows;
                }
            }
        );
};

module.exports = Review;