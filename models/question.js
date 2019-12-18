'user strict';
const databaseConnection = require("../database/mysqlconnection");

//Question object constructor
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

Question.createOrUpdateQuestion = async function (questionModelInstance) {
    if (questionModelInstance instanceof Question) {
        let isQuestionExisting = await Question.checkIfExistsInDatabase(questionModelInstance.id);
        console.log("isQuestionExisting", isQuestionExisting);
        if (isQuestionExisting) {
            let QuestionUpdated = await Question.updateById(questionModelInstance);
            console.log("createOrUpdateQuestion QuestionUpdated");
            return QuestionUpdated;
        } else {
            let QuestionInserted = await Question.insert(questionModelInstance);
            console.log("createOrUpdateQuestion QuestionInserted");
            return QuestionInserted;
        }
    }
};

Question.insert = async function (QuestionModelInstance) {
    return databaseConnection.promise().query("INSERT INTO question set ?", QuestionModelInstance)
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Question.inserted - rows: ", rows);
                    return rows;
                }
            }
        );
};

Question.checkIfExistsInDatabase = async function (id) {
    return databaseConnection.promise().query("Select * from question where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Question.checkIfExistsInDatabase - rows: ", rows);
                return !!(rows && rows.length);
            }
        });
};


Question.getQuestionById = async function (id) {
    return databaseConnection.promise().query("Select * from question where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Question.getQuestionById - rows: ", rows);
                return rows;
            }
        });
};

Question.getAllQuestions = function () {
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

Question.updateById = async function (question) {
    return databaseConnection.promise().query("UPDATE question SET ? WHERE id = ?", [question, question.id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Question.updateById: rows", rows);
                    return rows;
                }
            }
        );
};

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

Question.clearTable = async function () {
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