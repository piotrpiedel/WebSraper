export function getReviewGridColumnDefs() {
    return [
        {
            headerName: "Author",
            field: "user_name",
            width: 150
        },
        {
            headerName: "Score",
            field: "review_stars",
            width: 150
        },
        {
            headerName: "Creation date",
            field: "date_creation",
            width: 200,
            valueFormatter: data => {
                return data.value.substring(0, data.value.indexOf("T"));
            }
        },
        {
            headerName: "Purchase date",
            field: "date_of_purchase",
            width: 200,
            valueFormatter: data => {
                return data.value ? data.value.substring(0, data.value.indexOf("T")) : "";
            }
        },
        {
            headerName: "Recommendation",
            field: "is_recommended",
            cellRendererParams: { checkbox: true },
            width: 150
        },
        {
            headerName: "Review",
            field: "review_content",
            width: 500,
            autoHeight: true,
            cellStyle: { "white-space": "normal" }
        },
        { headerName: "Upvotes", field: "upvotes", width: 150 },
        {
            headerName: "Downvotes",
            field: "downvotes",
            width: 170
        },
        {
            headerName: "Advantages",
            field: "advantages",
            autoHeight: true,
            cellStyle: { "white-space": "pre-wrap" },
            valueFormatter: data => {
                return data.value.replace(/,/g, ", ");
            }
        },
        {
            headerName: "Disadvantages",
            field: "disadvantages",
            autoHeight: true,
            cellStyle: { "white-space": "normal" },
            valueFormatter: data => {
                return data.value.replace(/,/g, ", ");
            }
        }
    ];
}

export function getAnswerGridColumnDefs() {
    return [
        {
            headerName: "Author",
            field: "user_name",
            width: 150
        },
        {
            headerName: "Creation date",
            field: "date_creation",
            width: 150,
            valueFormatter: data => {
                return data.value.substring(0, data.value.indexOf("T"));
            }
        },
        {
            headerName: "Answer",
            field: "question_answer_content",
            width: 500,
            autoHeight: true,
            cellStyle: { "white-space": "normal" }
        },
        { headerName: "Upvotes", field: "upvotes", width: 150 },
        {
            headerName: "Downvotes",
            field: "downvotes",
            width: 150
        }
    ];
}

export function getCommentGridColumnDefs() {
    return [
        {
            headerName: "Author",
            field: "user_name",
            width: 150
        },
        {
            headerName: "Creation date",
            field: "date_creation",
            width: 100,
            valueFormatter: data => {
                return data.value.substring(0, data.value.indexOf("T"));
            }
        },
        {
            headerName: "Comment",
            field: "comment_content",
            width: 500,
            autoHeight: true,
            cellStyle: { "white-space": "normal" }
        }
    ];
}

export function getQuestionGridColumnDefs() {
    return [
        {
            headerName: "Author",
            field: "user_name",
            width: 150
        },
        {
            headerName: "Creation date",
            field: "date_creation",
            width: 200,

            valueFormatter: data => {
                return data.value.substring(0, data.value.indexOf("T"));
            }
        },
        {
            headerName: "Title",
            field: "question_title",
            width: 300,
            autoHeight: true,
            cellStyle: { "white-space": "normal" }
        },
        {
            headerName: "Question",
            field: "question_content",
            width: 300,
            autoHeight: true,
            cellStyle: { "white-space": "normal" }
        },
        { headerName: "Upvotes", field: "upvotes", width: 150 },
        {
            headerName: "Downvotes",
            field: "downvotes",
            width: 150
        }
    ];
}
