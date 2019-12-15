'user strict';
const databaseConnection = require("../database/mysqlconnection");

//QuestionAnswer object constructor
class QuestionAnswer {
    constructor(id,
                QuestionAnswerMessage,
                QuestionAnswerDate,
                userName,
                upvotes,
                downvotes,
                questionId) {
        this.id = id;
        this.question_content = QuestionAnswerMessage;
        this.date_creation = QuestionAnswerDate;
        this.user_name = userName;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.question_id = questionId;
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