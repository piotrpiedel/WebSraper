import {
    doPostEtlWhole,
    doPostExtract,
    doPostTransform,
    doPostLoad
} from "../../service/EtlService";

export default {
    data() {
        return {
            productId: "43073126",
            isLoading: false,

            isTransformBtnDisabled: true,
            isLoadBtnDisabled: true,

            notification: ""
        };
    },

    methods: {
        async onWholeEtlBtnClicked() {
            this.isLoading = true;
            const response = await doPostEtlWhole(this.productId);

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
            this.isLoading = false;
        },

        async onExtractBtnClicked() {
            this.isLoading = true;
            const response = await doPostExtract(this.productId);

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
            const response = await doPostTransform(this.productId);

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
            const response = await doPostLoad(this.productId);

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

        showNotification(message) {
            this.notification = message;
        }
    }
};
