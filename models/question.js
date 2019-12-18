'user strict';
const databaseConnection = require("../database/mysqlconnection");

//Question object constructor
class Question {
    constructor(question) {
        if (arguments.length === 1 && this.validateProduct(question)) {
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

    validateProduct(product) {
        return (String(product.constructor) === String(Question.Builder));
    }

    static get Builder() {
        class Builder {
            constructor(id) {
                this.id = id;
            }
            withQuestionTitle(questionTitle){
                this.question_title = questionTitle;
                return this;
            }
            withQuestionMessage(questionMessage){
                this.question_content = questionMessage;
                return this;
            }
            withQuestionDate(questionDate){
                this.date_creation = questionDate;
                return this;
            }
            withQuestionUserName(userName){
                this.user_name = userName;
                return this;
            }
            withQuestionUpVotes(upVotes){
                this.upvotes = upVotes;
                return this;
            }
            withQuestionDownVotes(downVotes){
                this.downvotes = downVotes;
                return this;
            }
            withQuestionProductId(productId){
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