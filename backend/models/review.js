'user strict';
const databaseConnection = require("../database/mysqlconnection");
const databaseEnum = require("../config/database_enum");

/**
 * @category Models
 * @example
 * let Review = new Review({
 *     id: 123,
 *     user_name : "Patrycja",
 *     was_purchased : 1,
 *     date_of_purchase : "2018-02-07 13:24:59",
 *     date_creation : "2018-02-08 13:24:59",
 *     review_stars : 5,
 *     is_recommended : 1,
 *     review_content :
 *     date_creation : "2018-02-07 13:24:59",
 *     review_content: "Dunaj tam pogląda, gdzie mieszkał, dzieckiem będąc, przed nim fajt w guberskim rządzie.
 *     Wreszcie po kryjomu kazał stoły do stolicy dajem i każdemu powinną uczciwość wyrządzić. I starzy i wzgląd."
 *     advantages: "dobry dźwięk,niewielkie wymiary"
 *     disadvantages: "nie najlepsze kable"
 *     upvotes : 4
 *     downvotes : 1
 *     product_id_fk : 1
 *
 * })
 * @param  {Review} review
 * @param  {Number} review.id     id
 * @param  {String} review.user_name     author
 * @param  {Boolean} review.was_purchased  indicator if product was purchased
 * @param  {Date} review.date_of_purchase     date of purchase
 * @param  {Date} review.date_creation     review creation date
 * @param  {Number} review.review_stars     review score/stars
 * @param  {Boolean} review.is_recommended     indicator if product is recommended
 * @param  {String} review.review_content     review message
 * @param  {String} review.advantages     listed advantages of product
 * @param  {String} review.disadvantages     listed disadvantages of product
 * @param  {Number} review.upvotes     number of upvotes
 * @param  {Number} review.downvotes     number of downvotes
 * @param  {Number} review.product_id_fk    product foreign key
 */
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

    /**
     * Validate review instance
     * @param  {Review} review model instance
     * @return {Boolean} return true if review is valid
     */
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
                this.date_of_purchase = dateOfPurchase;
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

/**
 * Create new review or update already existing entity
 * @param  {Review} reviewModelInstance instance of review model
 * @return {OPERATION} value of executed operation type UPDATE/INSERT
 */
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

/**
 * Create new review in database
 * @param  {Review} reviewModelInstance  instance of review model ready to insert in database
 * @return {Review}  inserted review instance
 */
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

/**
 * Check if review with given ID already exists in database
 * @param  {Number} id  id of review
 * @return {Boolean}  true if review already exists, false if does not
 */
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

/**
 * Get review with given ID from database
 * @param  {Number} id  id of review
 * @return {Review} review instance of the given id
 */
Review.getByID = async function (id) {
    return databaseConnection.promise().query("Select * from review where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Review.getReviewById - rows: ", rows);
                return rows;
            }
        });
};

/**
 * Get all reviews connected to product with given id from database
 * @param  {Number} productID  id of product
 * @return {Review[]} array of review entities connected to product with given id from database
 */
Review.getAllReviewsByProductID = function (productID) {
    return databaseConnection.promise().query("Select * from review where product_id_fk= ? ", productID)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return rows;
            }
        });
};

/**
 * Get all reviews  from database
 * @return {Review[]} array of existing reviews from database
 */
Review.getAll = function () {
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

/**
 * Update review with given ID
 * @param  {Review} review instance of review
 * @return {Review} updated review entity
 */
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

/**
 * Delete review with given ID
 * @param  {Number} id  id of review
 * @return {Review} deleted review entity
 */
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

/**
 * Delete all reviews
 * @return {Review[]} array of deleted review instances
 */
Review.deleteAll = async function () {
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