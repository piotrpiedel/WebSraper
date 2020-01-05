import { getData, getAllData, getAllProductsIds } from "../../service/service.js";
import { exportReviewsToCsv, exportCommentsToCsv, exportAnswersToCsv, exportQuestionsToCsv } from "../../service/csvService.js";

import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Navbar from "../../components/Navbar.vue";
import {
    getReviewGridColumnDefs,
    getCommentGridColumnDefs,
    getQuestionGridColumnDefs,
    getAnswerGridColumnDefs
} from "./ColumnDefs.js";

export default {
    components: {
        AgGridVue,
        Navbar
    },

    data() {
        return {
            productId: "",
            isLoading: false,

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
                    isHidden: false,
                    columnDefs: getCommentGridColumnDefs(),
                    rowData: []
                },
                answerGrid: {
                    gridOptions: null,
                    isHidden: false,
                    columnDefs: getAnswerGridColumnDefs(),
                    rowData: []
                }
            },
            defaultColDef: {
                sortable: true,
                resizable: true
            },
            allProductIds: [],
            data: [],

            notification: ""
        };
    },

    computed: {
        productInformation() {
            if (
                !this.data.productInfromations ||
                !this.data.productInfromations[0]
            ) {
                return "";
            }
            return (
                this.data.productInfromations[0].name +
                "\n" +
                this.data.productInfromations[0].producer
            );
        }
    },

    created() {
        // getAllData().then(result => this.allProductIds = result))
        getAllProductsIds().then(result => this.allProductIds = result.data.productids);
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
                    this.grids.answerGrid.rowData = questions;
                }
            });
        },
        async onDisplayDataBtnClicked() {
            this.isLoading = true;
            await this.loadData();

            this.isLoading = false;
        },

        async onExportToCsvBtnClicked() {
            await this.loadData();
            exportReviewsToCsv(this.data.reviews);
            exportQuestionsToCsv(this.data.questions);
            exportCommentsToCsv(this.data.reviewsComments.flat());
            exportAnswersToCsv(this.data.questionsAnswers.flat());
        },


        async loadData() {
            this.data = (await getData(this.productId)).data;
            this.grids.reviewGrid.rowData = this.data.reviews;
            this.grids.questionGrid.rowData = this.data.questions;
            console.log(this.data);
        },

        showNotification(message) {
            this.notification = message;
        }
    }
};
