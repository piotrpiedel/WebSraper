'user strict';
const databaseConnection = require("../database/mysqlconnection");

//QuestionAnswer object constructor
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

    validate(question) {
        return !!question.id && !!question.question_id;
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

QuestionAnswer.createOrUpdateQuestionAnswer = async function (questionAnswerModelInstance) {
    if (questionAnswerModelInstance instanceof QuestionAnswer) {
        let isQuestionAnswerExisting = await QuestionAnswer.checkIfExistsInDatabase(questionAnswerModelInstance.id);
        console.log("isQuestionAnswerExisting", isQuestionAnswerExisting);
        if (isQuestionAnswerExisting) {
            let QuestionAnswerUpdated = await QuestionAnswer.updateById(questionAnswerModelInstance);
            console.log("createOrUpdateQuestionAnswer QuestionAnswerUpdated");
            return QuestionAnswerUpdated;
        } else {
            let QuestionAnswerInserted = await QuestionAnswer.insert(questionAnswerModelInstance);
            console.log("createOrUpdateQuestionAnswer QuestionAnswerInserted");
            return QuestionAnswerInserted;
        }
    }
};

QuestionAnswer.insert = async function (questionAnswerModelInstance) {
    return databaseConnection.promise().query("INSERT INTO question_answer set ?", questionAnswerModelInstance)
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("QuestionAnswer.inserted - rows: ", rows);
                    return rows;
                }
            }
        );
};

QuestionAnswer.checkIfExistsInDatabase = async function (questionAnswerId) {
    return databaseConnection.promise().query("Select * from question_answer where id = ? ", questionAnswerId)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("QuestionAnswer.checkIfExistsInDatabase - rows: ", rows);
                return !!(rows && rows.length);
            }
        });
};


QuestionAnswer.getQuestionAnswerById = async function (questionAnswerId) {
    return databaseConnection.promise().query("Select * from question_answer where id = ? ", questionAnswerId,)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("QuestionAnswer.getQuestionAnswerById - rows: ", rows);
                return rows;
            }
        });
};

QuestionAnswer.getAllQuestionAnswers = function () {
    return databaseConnection.promise().query("Select * from question_answer")
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("QuestionAnswer.getAllQuestionAnswers - rows: ", rows);
                return rows;
            }
        });
};

QuestionAnswer.updateById = async function (QuestionAnswer) {
    return databaseConnection.promise().query("UPDATE question_answer SET ? WHERE id = ?", [QuestionAnswer, QuestionAnswer.id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("QuestionAnswer.updateById: rows", rows);
                    return rows;
                }
            }
        );
};

QuestionAnswer.delete = async function (id) {
    return databaseConnection.promise().query("DELETE FROM question_answer WHERE id = ?", [id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("QuestionAnswer.delete: rows", rows);
                    return rows;
                }
            }
        );
};

QuestionAnswer.clearTable = async function () {
    return databaseConnection.promise().query("DELETE FROM question_answer")
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("QuestionAnswer.clearTable: rows", rows);
                    return rows;
                }
            }
        );
};

module.exports = QuestionAnswer;