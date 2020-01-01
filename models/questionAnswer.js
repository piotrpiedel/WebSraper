'user strict';
const databaseConnection = require("../database/mysqlconnection");
const databaseEnum = require("../config/database_enum");


/**
 * @category Models
 * @example
 * let Question = new QuestionAnswer({
 *     id: 123as,
 *     question_answer_content : "Mój pies faworytny Żeby nie poruczy, bo tak rzuciły.
 *     Tuż myśliwców herbowne klejnoty wyryte i z Wereszczaką, Giedrojć z rąk muskała włosów pukle nie chciałby
 *     do Lachowicz i silni do ojca mego w kalendarzu można wydrukować wszystkie procesu wypadki spotkanie..",
 *     date_creation : "2018-02-07 13:24:59",
 *     user_name : "Patrycja"
 *     upvotes : 0
 *     downvotes : 1
 *     question_id : 10
 *
 * })
 * @param  {QuestionAnswer} questionAnswer
 * @param  {String} question.id    question id
 * @param  {String} question.question_answer_content answer content
 * @param  {Date} question.date_creation   date of answer
 * @param  {String} question.user_name    author
 * @param  {Number} question.upvotes     upvotes
 * @param  {Number} question.downvotes    downvotes
 * @param  {String} question.question_id   question foreign key
 */
class QuestionAnswer {
    constructor(questionAnswer) {
        if (arguments.length === 1 && this.validate(questionAnswer)) {
            this.id = questionAnswer.id;
            this.question_answer_content = questionAnswer.question_answer_content;
            this.date_creation = questionAnswer.date_creation;
            this.user_name = questionAnswer.user_name;
            this.upvotes = questionAnswer.upvotes;
            this.downvotes = questionAnswer.downvotes;
            this.question_id = questionAnswer.question_id;
        }
    }

    /**
     * Validate answer instance
     * @param  {QuestionAnswer} questionAnswer answer model instance
     * @return {Boolean} return true if answer model is valid
     */
    validate(questionAnswer) {
        return !!questionAnswer.id && !!questionAnswer.question_id;
    }

    static get Builder() {
        class Builder {
            constructor(id) {
                this.id = id;
            }

            withMessage(questionMessage) {
                this.question_answer_content = questionMessage;
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

            withQuestionID(questionId) {
                this.question_id = questionId;
                return this;
            }

            build() {
                if (this.id && this.question_id) {
                    return new QuestionAnswer(this)
                } else throw "QuestionAnswer id && questionFK must not be empty";
            }
        }

        return Builder;
    }
}

/**
 * Create new answer or update already existing entity
 * @param  {Question} questionAnswerModelInstance  instance of questionAnswer model
 * @return {OPERATION} value of executed operation type UPDATE/INSERT
 */
QuestionAnswer.createOrUpdateQuestionAnswer = async function (questionAnswerModelInstance) {
    if (questionAnswerModelInstance instanceof QuestionAnswer) {
        let isQuestionAnswerExisting = await QuestionAnswer.checkIfExistsInDatabase(questionAnswerModelInstance.id);
        if (isQuestionAnswerExisting) {
            let QuestionAnswerUpdated = await QuestionAnswer.updateById(questionAnswerModelInstance);
            return databaseEnum.UPDATE;
        } else {
            let QuestionAnswerInserted = await QuestionAnswer.insert(questionAnswerModelInstance);
            return databaseEnum.INSERT;
        }
    }
};

/**
 * Create new answer in database
 * @param  {Question} questionAnswerModelInstance  instance of answer model to insert in database
 * @return {QuestionAnswer} inserted answer instance
 */
QuestionAnswer.insert = async function (questionAnswerModelInstance) {
    return databaseConnection.promise().query("INSERT INTO question_answer set ?", questionAnswerModelInstance)
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
 * Check if answer with given ID already exists in database
 * @param  {String} id id of answer
 * @return {Boolean}  true if answer already exists, false if does not
 */
QuestionAnswer.checkIfExistsInDatabase = async function (id) {
    return databaseConnection.promise().query("Select * from question_answer where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return !!(rows && rows.length);
            }
        });
};

/**
 * Get answer with given ID from database
 * @param  {String} id  id of answer
 * @return {QuestionAnswer} answer instance of the given id
 */
QuestionAnswer.getById = async function (id) {
    return databaseConnection.promise().query("Select * from question_answer where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return rows;
            }
        });
};

/**
 * Get all answers connected to question with given id from database
 * @param  {String} questionId  id of question
 * @return {QuestionAnswer[]} array of answers entities connected to question with given id from database
 */
QuestionAnswer.getAllByQuestionID = async function (questionId) {
    return databaseConnection.promise().query("Select * from question_answer where question_id = ? ", questionId)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return rows;
            }
        });
};

/**
 * Get all answers from database
 * @return {QuestionAnswer[]} array of answers existing in database
 */
QuestionAnswer.getAllQuestionAnswers = function () {
    return databaseConnection.promise().query("Select * from question_answer")
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return rows;
            }
        });
};

/**
 * Update answer with given ID
 * @param  {Question} questionAnswer instance of answer
 * @return {Question} updated answer entity
 */
QuestionAnswer.updateById = async function (questionAnswer) {
    return databaseConnection.promise().query("UPDATE question_answer SET ? WHERE id = ?", [questionAnswer, questionAnswer.id])
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
 * Delete answer with given ID
 * @param  {String} id  id of answer
 * @return {QuestionAnswer} deleted answer entity
 */
QuestionAnswer.delete = async function (id) {
    return databaseConnection.promise().query("DELETE FROM question_answer WHERE id = ?", [id])
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
 * Delete all answers
 * @return {QuestionAnswer[]} array of deleted answer entities
 */
QuestionAnswer.deleteAll = async function () {
    return databaseConnection.promise().query("DELETE FROM question_answer")
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

module.exports = QuestionAnswer;