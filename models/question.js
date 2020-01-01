'user strict';
const databaseConnection = require("../database/mysqlconnection");
const databaseEnum = require("../config/database_enum");

/**
 * @category Models
 * @example
 * let Question = new Question({
 *     id: 123as,
 *     question_content : "Gdyby żył dłużej, może by nie rozwity, lecz nie czytano w klasztorze.
 *     Ciszę przerywał ale razem ja w tym mieczem wypędzi z Rejentem wzmogła się uczyli.
 *     u Woźnego lepiej nad nim czerwone jak wiśnie bliźnięta.
 *     U nas powrócisz cudem na łowach niż obcej mody odsyłać konie porzucone same portrety na młodzież
 *     na folwark dążył po cichu. gdy potem się biję, tego dnia powiadał.
 *     Dobrze, mój sąsiedzie i stajennym i pannom służyło.
 *     Sędzia, choć stary stojący zegar kurantowy w języku.
 *     Tak każe u wieczerzy?
 *     Są tu zjedzie i przysłonił chciał coś mówić, przepraszać,
 *     tylko chodzić zwykła z łez, które już późno.",
 *     question_title: "Tym ładem - Mój pies faworytny",
 *     date_creation : "2018-02-07 13:24:59",
 *     user_name : "Protazy"
 *     upvotes : 0
 *     downvotes : 1
 *     product_id_fk : 10
 *
 * })
 * @param  {Question} question
 * @param  {String} question.id     id
 * @param  {String} question.question_content     message
 * @param  {String} question.question_title     title
 * @param  {Date} question.date_creation     creation date
 * @param  {String} question.user_name     author
 * @param  {Number} question.upvotes     upvotes
 * @param  {Number} question.downvotes    downvotes
 * @param  {Number} question.product_id_fk    product foreign key
 */
class Question {
    constructor(question) {
        if (arguments.length === 1 && this.validate(question)) {
            this.id = question.id;
            this.question_content = question.question_content;
            this.question_title = question.question_title;
            this.date_creation = question.date_creation;
            this.user_name = question.user_name;
            this.upvotes = question.upvotes;
            this.downvotes = question.downvotes;
            this.product_id_fk = question.product_id_fk;
        }
    }

    /**
     * Validate question instance
     * @param  {Question} question model instance
     * @return {Boolean} return true if question is valid
     */
    validate(question) {
        return !!question.id && !!question.product_id_fk;
    }

    static get Builder() {
        class Builder {
            constructor(id) {
                this.id = id;
            }

            withTitle(questionTitle) {
                this.question_title = questionTitle;
                return this;
            }

            withMessage(questionMessage) {
                this.question_content = questionMessage;
                return this;
            }

            withDate(questionDate) {
                this.date_creation = questionDate;
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
                    return new Question(this)
                } else throw "Question id && productFK must not be empty";
            }
        }

        return Builder;
    }
}

/**
 * Create new question or update already existing entity
 * @param  {Question} questionModelInstance instance of question model
 * @return {OPERATION} value of executed operation type UPDATE/INSERT
 */
Question.createOrUpdateQuestion = async function (questionModelInstance) {
    if (questionModelInstance instanceof Question) {
        let isQuestionExisting = await Question.checkIfExistsInDatabase(questionModelInstance.id);
        if (isQuestionExisting) {
            let QuestionUpdated = await Question.updateById(questionModelInstance);
            return databaseEnum.UPDATE;
        } else {
            let QuestionInserted = await Question.insert(questionModelInstance);
            return databaseEnum.INSERT;
        }
    }
};

/**
 * Create new question in database
 * @param  {Question} questionModelInstance  instance of question model ready to insert in database
 * @return {Question}  inserted question instance
 */
Question.insert = async function (questionModelInstance) {
    return databaseConnection.promise().query("INSERT INTO question set ?", questionModelInstance)
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
 * Check if question with given ID already exists in database
 * @param  {String} id  id of question
 * @return {Boolean}  true if question already exists, false if does not
 */
Question.checkIfExistsInDatabase = async function (id) {
    return databaseConnection.promise().query("Select * from question where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return !!(rows && rows.length);
            }
        });
};

/**
 * Get question with given ID from database
 * @param  {String} id  id of question
 * @return {Question} question instance of the given id
 */
Question.getById = async function (id) {
    return databaseConnection.promise().query("Select * from question where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return rows;
            }
        });
};

/**
 * Get all questions connected to product with given id from database
 * @param  {Number} productID  id of product
 * @return {Question[]} array of questions entities connected to product with given id from database
 */
Question.getAllByProductID = async function (productID) {
    return databaseConnection.promise().query("Select * from question where product_id_fk = ? ", productID)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return rows;
            }
        });
};

/**
 * Get all questions  from database
 * @return {Question[]} array of existing questions from database
 */
Question.getAll = function () {
    return databaseConnection.promise().query("Select * from question")
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Question.getAllQuestions - rows: ", rows);
                return rows;
            }
        });
};

/**
 * Update question with given ID
 * @param  {Question} question instance of question
 * @return {Question} updated question entity
 */
Question.updateById = async function (question) {
    return databaseConnection.promise().query("UPDATE question SET ? WHERE id = ?", [question, question.id])
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
 * Delete question with given ID
 * @param  {String} id  id of question
 * @return {Question} deleted question entity
 */
Question.delete = async function (id) {
    return databaseConnection.promise().query("DELETE FROM question WHERE id = ?", [id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Question.delete: rows", rows);
                    return rows;
                }
            }
        );
};

/**
 * Delete all questions
 * @return {Question[]} array of deleted question instances
 */
Question.deleteAll = async function () {
    return databaseConnection.promise().query("DELETE FROM question")
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Question.clearTable: rows", rows);
                    return rows;
                }
            }
        );
};

module.exports = Question;