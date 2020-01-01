import { getData } from "../../service/service.js";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {
    getReviewGridColumnDefs,
    getCommentGridColumnDefs,
    getQuestionGridColumnDefs,
    getAnswerGridColumnDefs
} from "./ColumnDefs.js";

export default {
    components: {
        AgGridVue
    },

    data() {
        return {
            productId: "43073126",
            isLoading: false,

            isTransformBtnDisabled: true,
            isLoadBtnDisabled: true,

            grids: {
                reviewGrid: {
                    gridOptions: null,
                    columnDefs: getReviewGridColumnDefs(),
                    rowData: []
                },
                questionGrid: {
                    gridOptions: null,
                    columnDefs: getQuestionGridColumnDefs(),
                    rowData: []
                },
                commentGrid: {
                    gridOptions: null,
                    isHidden: true,
                    columnDefs: getCommentGridColumnDefs(),
                    rowData: []
                },
                answerGrid: {
                    gridOptions: null,
                    isHidden: true,
                    columnDefs: getAnswerGridColumnDefs(),
                    rowData: []
                }
            },

            data: [],

            notification: ""
        };
    },

    methods: {
        onReviewGridReady(gridOptions) {
            this.grids.reviewGrid.gridOptions = gridOptions;
            gridOptions.api.sizeColumnsToFit();
        },
        onCommentGridReady(gridOptions) {
            this.grids.commentGrid.gridOptions = gridOptions;
            gridOptions.api.sizeColumnsToFit();
        },
        onQuestionGridReady(gridOptions) {
            this.grids.questionGrid.gridOptions = gridOptions;
            gridOptions.api.sizeColumnsToFit();
        },
        onAnswerGridReady(gridOptions) {
            this.grids.answerGrid.gridOptions = gridOptions;
            gridOptions.api.sizeColumnsToFit();
        },

        onReviewGridRowClicked(row) {
            this.grids.commentGrid.isHidden = false;
            this.grids.commentGrid.rowData = [];
            const reviewId = row.data.id;
            this.data.reviewsComments.forEach(comments => {
                if (comments[0].review_id === reviewId) {
                    console.log(comments);
                    this.grids.commentGrid.rowData = comments;
                }
            });
        },
        onQuestionGridRowClicked(row) {
            this.grids.answerGrid.isHidden = false;
            this.grids.answerGrid.rowData = [];
            const questionId = row.data.id;
            this.data.questionsAnswers.forEach(questions => {
                if (questions[0].question_id === questionId) {
                    console.log(questions);
                    this.grids.answerGrid.rowData = questions;
                }
            });
        },
        async onDisplayDataBtnClicked() {
            this.isLoading = true;
            await this.loadData();
            this.isLoading = false;
        },

        async loadData() {
            this.data = (await getData(this.productId)).data;
            this.grids.reviewGrid.rowData = this.data.reviews;
            // this.grids.commentGrid.rowData = this.data.reviewsComments[0];
            this.grids.questionGrid.rowData = this.data.questions;
            // this.grids.answerGrid.rowData = this.data.questionsAnswers[0];
            console.log(this.data);
        },

        showNotification(message) {
            this.notification = message;
        }
    }
};
