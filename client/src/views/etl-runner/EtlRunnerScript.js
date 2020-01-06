import {
    doEtlProcess,
    extractData,
    transformData,
    saveDataToDatabase,
    clearDatabase
} from "../../service/service.js";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        Navbar
    },
    data() {
        return {
            productId: "",
            isLoading: false,

            isTransformBtnDisabled: true,
            isLoadBtnDisabled: true,

            notification: ""
        };
    },

    methods: {
        async onWholeEtlBtnClicked() {
            this.isLoading = true;
            const response = await doEtlProcess(this.productId);

            if (response.status === 200) {
                let message = response.message + "\n\n";
                Object.keys(response.data).forEach(item => {
                    message += `${item}: inserted: ${response.data[item].insertedStats} record(s) and updated ${response.data[item].updatedStats} record(s)\n`;
                });
                this.showNotification(message);
            } else {
                this.showNotification(
                    `Server returned error code ${response.status}`
                );
            }
            console.log(response);
            this.isTransformBtnDisabled = true;
            this.isLoadBtnDisabled = true;
            this.isLoading = false;
        },

        async onExtractBtnClicked() {
            this.isLoading = true;
            const response = await extractData(this.productId);

            if (response.status === 200) {
                let message = response.message + "\n\n";
                message += `extracted ${response.data.resultReviewsStats.reviewExtractedStats} review(s)\n`;
                message += `extracted ${response.data.resultQuestionStats.questionExtractedStats} question(s)\n`;
                this.showNotification(message);
                this.isTransformBtnDisabled = false;
            } else {
                this.showNotification(
                    `Server returned error code ${response.status}`
                );
            }
            console.log(response);
            this.isLoading = false;
        },

        async onTransformBtnClicked() {
            this.isLoading = true;
            const response = await transformData(this.productId);

            if (response.status === 200) {
                let message = response.message + "\n\n";
                message += `transformed ${response.data.resultsProduct.transformedProducts} product information(s)\n`;
                message += `transformed ${response.data.resultsReviews.transformedReviews} question(s)\n`;
                message += `transformed ${response.data.resultsQuestions.transformedQuestions} question(s)\n`;
                this.showNotification(message);
                this.isLoadBtnDisabled = false;
            } else {
                this.showNotification(
                    `Server returned error code ${response.status}`
                );
            }

            this.isTransformBtnDisabled = true;
            console.log(response);
            this.isLoading = false;
        },

        async onLoadBtnClicked() {
            this.isLoading = true;
            const response = await saveDataToDatabase(this.productId);

            if (response.status === 200) {
                let message = response.message + "\n\n";
                Object.keys(response.data).forEach(item => {
                    message += `${item}: inserted: ${response.data[item].insertedStats} record(s) and updated ${response.data[item].updatedStats} record(s)\n`;
                });
                this.showNotification(message);
            } else {
                this.showNotification(
                    `Server returned error code ${response.status}`
                );
            }

            this.isTransformBtnDisabled = true;
            this.isLoadBtnDisabled = true;

            console.log(response);
            this.isLoading = false;
        },

        async onClearDatabaseBtnClicked() {
            const response = await clearDatabase();
            this.showNotification(response.message);
        },

        showNotification(message) {
            this.notification = message;
        }
    }
};
