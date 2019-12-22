'user strict';
const databaseConnection = require("../database/mysqlconnection");
const databaseEnum = require("../config/database_enum");

//review object constructor
class Review {
    constructor(review) {
        if (arguments.length === 1 && this.validate(review)) {
            this.id = review.id;
            this.user_name = review.user_name;
            this.was_purchased = review.was_purchased;
            this.date_of_purchase = review.date_of_purchase;
            this.date_creation = review.date_creation;
            this.review_stars = review.review_stars;
            this.is_recommended = review.is_recommended;
            this.review_content = review.review_content;
            this.advantages = review.advantages;
            this.disadvantages = review.disadvantages;
            this.upvotes = review.upvotes;
            this.downvotes = review.downvotes;
            this.product_id_fk = review.product_id_fk;
        }
    }

    validate(review) {
        return !!review.id && !!review.product_id_fk;
    }

    static get Builder() {
        class Builder {
            constructor(id) {
                this.id = id;
            }

            withWasPurchased(wasPurchased) {
                this.was_purchased = wasPurchased;
                return this;
            }

            withDateOfPurchase(dateOfPurchase) {
                this.date_creation = dateOfPurchase;
                return this;
            }

            withDateOfReview(reviewDate) {
                this.date_creation = reviewDate;
                return this;
            }

            withReviewStars(reviewStars) {
                this.review_stars = reviewStars;
                return this;
            }

            withIsRecommended(isRecommended) {
                this.is_recommended = isRecommended;
                return this;
            }

            withContent(reviewContent) {
                this.review_content = reviewContent;
                return this;
            }

            withAdvantages(advantages) {
                this.advantages = advantages;
                return this;
            }

            withDisadvantages(disadvantages) {
                this.disadvantages = disadvantages;
                return this;
            }

            withUserName(userName) {
                this.user_name = userName;
                return this;
            }

            withUpVotes(upVotes) {
                this.upvotes = upVotes;
                return this;
            }

            withDownVotes(downVotes) {
                this.downvotes = downVotes;
                return this;
            }

            withProductId(productId) {
                this.product_id_fk = productId;
                return this;
            }

            build() {
                if (this.id && this.product_id_fk) {
                    return new Review(this)
                } else throw "Review id && productFK must not be empty";
            }
        }

        return Builder;
    }

}

Review.createOrUpdateReview = async function (reviewModelInstance) {
    if (reviewModelInstance instanceof Review) {
        let isReviewExisting = await Review.checkIfExistsInDatabase(reviewModelInstance.id);
        if (isReviewExisting) {
            let reviewUpdated = await Review.updateById(reviewModelInstance);
            return databaseEnum.UPDATE;
        } else {
            let reviewInserted = await Review.insert(reviewModelInstance);
            return databaseEnum.INSERT;
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
                    return rows;
                }
            }
        );
};

Review.checkIfExistsInDatabase = async function (id) {
    return databaseConnection.promise().query("Select * from review where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return !!(rows && rows.length);
            }
        });
};


Review.getReviewById = async function (id) {
    return databaseConnection.promise().query("Select * from review where id = ? ", id,)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Review.getReviewById - rows: ", rows);
                return rows;
            }
        });
};

Review.getAllReviews = function () {
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