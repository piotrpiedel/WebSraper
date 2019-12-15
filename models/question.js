'user strict';
const databaseConnection = require("../database/mysqlconnection");

//Question object constructor
class Question {
    constructor(id,
                questionMessage,
                questionDate,
                userName,
                upvotes,
                downvotes,
                productId) {
        this.id = id;
        this.question_content = questionMessage;
        this.date_creation = questionDate;
        this.user_name = userName;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.product_id_fk = productId;
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

Question.checkIfExistsInDatabase = async function (QuestionId) {
    return databaseConnection.promise().query("Select * from question where id = ? ", QuestionId)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Question.checkIfExistsInDatabase - rows: ", rows);
                return !!(rows && rows.length);
            }
        });
};


Question.getQuestionById = async function (QuestionId) {
    return databaseConnection.promise().query("Select * from question where id = ? ", QuestionId,)
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

Question.updateById = async function (Question) {
    return databaseConnection.promise().query("UPDATE question SET ? WHERE id = ?", [Question, Question.id])
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