'user strict';
const databaseConnection = require("../database/mysqlconnection");
const databaseEnum = require("../config/database_enum");
/**
 * @category Models
 * @example
 * let QuestionAnswer = new QuestionAnswer({
 *     id: 123,
 *     comment_content : "Waszeć z wolna w dawnej surowości prawidłach wychował.
 *     Tadeusz Telimenie, Asesor Krajczance a Praga już im pokazał wyprutą z Podkomorzyną obok srebrnych,
 *     od kogoś, co gród zamkowy nowogródzki ochraniasz z łowów wracając trafia się, spójrzał,
 *     lecz na sąd Pańskiej cioci. Choć o porządku, nikt nigdy sługom nie jedli.
 *     , choć świadka nie dostrzegł, nazbyt rychło znikła ale szerzej niż się jak mógł schwytać.
 *     Wojskiego Woźny ciągle Sędziemu tłumaczył dlaczego urządzenie pańskie jachał szlachcic młody panek i w charta.
 *     Tak każe u panów rozmów trwała już jej oczyma ciekawymi po kryjomu kazał stoły
 *     z Paryża a był zwierzem szlacheckim, a wzdycha.",
 *     date_creation : "2018-02-22 13:24:59",
 *     user_name : "Patrycja"
 *     review_id : 2
 *
 * })
 * @param  {ReviewComment} reviewComment
 * @param  {Number} reviewComment.id  id
 * @param  {String} reviewComment.user_name comment author
 * @param  {Date} reviewComment.date_creation  comment creation date
 * @param  {String} reviewComment.comment_content comment message
 * @param  {Number} reviewComment.review_id  review foreign key
 */
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

    /**
     * Validate ReviewComment instance
     * @param  {Review} reviewComment  comment model instance
     * @return {Boolean} return true if comment instance is valid
     */
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

/**
 * Create new comment or update already existing entity
 * @param  {ReviewComment} reviewCommentModelInstance instance of comment model
 * @return {OPERATION} value of executed operation type UPDATE/INSERT
 */
ReviewComment.createOrUpdateReviewComment = async function (reviewCommentModelInstance) {
    if (reviewCommentModelInstance instanceof ReviewComment) {
        let isReviewCommentExisting = await ReviewComment.checkIfExistsInDatabase(reviewCommentModelInstance.id);
        if (isReviewCommentExisting) {
            let reviewCommentUpdated = await ReviewComment.updateById(reviewCommentModelInstance);
            return databaseEnum.UPDATE;
        } else {
            let reviewCommentInserted = await ReviewComment.insert(reviewCommentModelInstance);
            return databaseEnum.INSERT;
        }
    }
};

/**
 * Create new comment in database
 * @param  {ReviewComment} reviewCommentModelInstance  instance of comment model to insert in database
 * @return {ReviewComment}  inserted review instance
 */
ReviewComment.insert = async function (reviewCommentModelInstance) {
    return databaseConnection.promise().query("INSERT INTO review_comment set ?", reviewCommentModelInstance)
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
 * Check if comment with given ID already exists in database
 * @param  {Number} id  id of comment
 * @return {Boolean} true if comment already exists, false if does not
 */
ReviewComment.checkIfExistsInDatabase = async function (id) {
    return databaseConnection.promise().query("Select * from review_comment where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return !!(rows && rows.length);
            }
        });
};

/**
 * Get comment with given ID from database
 * @param  {Number} id  id of comment
 * @return {ReviewComment} comment instance of the given id
 */
ReviewComment.getById = async function (id) {
    return databaseConnection.promise().query("Select * from review_comment where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return rows;
            }
        });
};

/**
 * Get all comments connected to review with given id from database
 * @param  {Number} reviewID  id of review
 * @return {ReviewComment[]} array of comment entities connected to review with given id from database
 */
ReviewComment.getAllByReviewID = async function (reviewID) {
    return databaseConnection.promise().query("Select * from review_comment where review_id = ? ", reviewID)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return rows;
            }
        });
};

/**
 * Get all comments  from database
 * @return {ReviewComment[]} array of existing comment from database
 */
ReviewComment.getAll = function () {
    return databaseConnection.promise().query("Select * from review_comment")
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return rows;
            }
        });
};

/**
 * Update comment with given ID
 * @param  {ReviewComment} reviewComment instance of comment
 * @return {ReviewComment} updated comment entity
 */
ReviewComment.updateById = async function (reviewComment) {
    return databaseConnection.promise().query("UPDATE review_comment SET ? WHERE id = ?", [reviewComment, reviewComment.id])
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
 * Delete comment with given ID
 * @param  {Number} id  id of comment
 * @return {ReviewComment} deleted comment entity
 */
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

/**
 * Delete all comments
 * @return {ReviewComment[]} array of deleted comments instances
 */
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