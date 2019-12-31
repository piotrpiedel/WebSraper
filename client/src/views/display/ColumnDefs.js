export function getColumnDefs() {
    return [
        {
            headerName: "Author",
            field: "user_name",
            width: 100,
            sortable: true
        },
        { headerName: "Score", field: "review_stars", width: 100 },
        { headerName: "Creation date", field: "date_creation", width: 100 },
        { headerName: "Was purchased", field: "was_purchased", width: 100 },
        { headerName: "Purchase date", field: "date_of_purchase", width: 100 },
        { headerName: "Recommendation", field: "is_recommended", width: 100 },
        {
            headerName: "Review",
            field: "review_content",
            width: 500,
            autoHeight: true,
            cellStyle: { "white-space": "normal" }
            // cellClass: "cell-wrap-text",
        },
        { headerName: "Upvotes", field: "upvotes", width: 100 },
        { headerName: "Downvotes", field: "downvotes", width: 100 },
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
