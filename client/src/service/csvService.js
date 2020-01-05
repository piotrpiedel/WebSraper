function convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = "";

    for (let i = 0; i < array.length; i++) {
        var line = "";
        for (let index in array[i]) {
            if (line !== '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    const jsonObject = JSON.stringify(items);

    const csv = convertToCSV(jsonObject);

    const exportedFilename = fileTitle + '.csv' || 'export.csv';

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
    } else {
        const link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

export function exportReviewsToCsv(reviews) {
    const fileTitle = 'reviews';
    const headers = {
        id: "Id",
        author: "Author",
        score: "Score",
        creationDate: "Creation Date",
        purchaseDate: "Purchase Date",
        recommendation: "Recommendation",
        review: "Review",
        upvotes: "Upvotes",
        downvotes: "Downvotes",
        advantages: "Advantages",
        disadvantages: "Disadvantages"
    };

    const reviewsFormatted = [];

    reviews.forEach(review => {
        reviewsFormatted.push({
            id: review.id,
            author: review.user_name,
            score: review.review_stars,
            creationDate: review.date_creation,
            purchaseDate: review.date_of_purchase,
            recommendation: review.is_recommended,
            review: review.review_content,
            upvotes: review.upvotes,
            downvotes: review.downvotes,
            advantages: review.advantages,
            disadvantages: review.disadvantages
        });
    });
    exportCSVFile(headers, reviewsFormatted, fileTitle);
}

export function exportQuestionsToCsv(questions) {
    const fileTitle = 'questions';
    const headers = {
        id: "Id",
        author: "Author",
        creationDate: "Creation Date",
        questionTitle: "Title",
        questionContent: "Question",
        upvotes: "Upvotes",
        downvotes: "Downvotes"
    };

    const questionsFormatted = [];

    questions.forEach(question => {
        questionsFormatted.push({
            id: question.id,
            author: question.user_name,
            creationDate: question.date_creation,
            questionTitle: question.question_title,
            questionContent: question.question_content,
            upvotes: question.upvotes,
            downvotes: question.downvotes
        });
    });
    exportCSVFile(headers, questionsFormatted, fileTitle);
}

export function exportCommentsToCsv(comments) {
    const fileTitle = 'comments';
    const headers = {
        reviewId: "Review id",
        author: "Author",
        creationDate: "Creation Date",
        comment: "Comment"
    };

    const commentsFormatted = [];

    comments.forEach(comment => {
        commentsFormatted.push({
            id: comment.review_id,
            author: comment.user_name,
            creationDate: comment.date_creation,
            questionContent: comment.comment_content
        });
    });
    exportCSVFile(headers, commentsFormatted, fileTitle);
}

export function exportAnswersToCsv(answers) {
    const fileTitle = 'answers';
    const headers = {
        questionId: "Question id",
        author: "Author",
        creationDate: "Creation Date",
        answer: "Answer",
        upvotes: "Upvotes",
        downvotes: "Downvotes"
    };

    const answersFormatted = [];

    answers.forEach(answer => {
        answersFormatted.push({
            questionId: answer.question_id,
            author: answer.user_name,
            creationDate: answer.date_creation,
            answer: answer.question_answer_content,
            upvotes: answer.upvotes,
            downvotes: answer.downvotes
        });
    });
    exportCSVFile(headers, answersFormatted, fileTitle);
}
