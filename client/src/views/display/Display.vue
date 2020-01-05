<template>
    <div class="main" v-loading="isLoading">
        <Navbar />
        <el-form @submit.prevent.native="onDisplayDataBtnClicked">
            <el-form-item class="search">
                <el-select
                    v-model="productId"
                    no-data-text="Database is empty"
                    placeholder="Select Product ID"
                >
                    <el-option
                        v-for="productId in allProductIds"
                        :key="productId.id"
                        :label="`${productId.id}`"
                        :value="productId.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-button :disabled="!productId" @click="onDisplayDataBtnClicked">Display Data</el-button>
            <el-button :disabled="!productId" @click="onExportToCsvBtnClicked">Export to csv</el-button>
        </el-form>

        <div class="product">{{this.productInformation}}</div>

        <div class="mainContent">
            <div class="reviews">
                <h2>Reviews</h2>
                <ag-grid-vue
                    class="ag-theme-balham"
                    rowSelection="single"
                    :columnDefs="grids.reviewGrid.columnDefs"
                    :rowData="grids.reviewGrid.rowData"
                    @gridReady="onReviewGridReady"
                    @rowClicked="onReviewGridRowClicked"
                    :defaultColDef="defaultColDef"
                />
            </div>

            <div class="questions">
                <h2>Questions</h2>
                <ag-grid-vue
                    class="ag-theme-balham"
                    rowSelection="single"
                    :columnDefs="grids.questionGrid.columnDefs"
                    :rowData="grids.questionGrid.rowData"
                    @gridReady="onQuestionGridReady"
                    @rowClicked="onQuestionGridRowClicked"
                    :defaultColDef="defaultColDef"
                />
            </div>

            <div class="comments">
                <div :hidden="grids.commentGrid.isHidden">
                    <h2>Comments (select a single review to display)</h2>
                    <ag-grid-vue
                        class="ag-theme-balham"
                        :columnDefs="grids.commentGrid.columnDefs"
                        :rowData="grids.commentGrid.rowData"
                        @gridReady="onCommentGridReady"
                        :defaultColDef="defaultColDef"
                    />
                </div>
            </div>

            <div class="answers">
                <div :hidden="grids.answerGrid.isHidden">
                    <h2>Answers (select a single question to display)</h2>
                    <ag-grid-vue
                        class="ag-theme-balham"
                        :columnDefs="grids.answerGrid.columnDefs"
                        :rowData="grids.answerGrid.rowData"
                        @gridReady="onAnswerGridReady"
                        :defaultColDef="defaultColDef"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./DisplayScript.js" />
<style>
* {
    margin: 0;
    padding: 0;
    font-size: 13px;
    box-sizing: border-box;
    text-align: center;
}

.main {
    position: relative;
    background-color: #c0c0c0;
    height: 100vh;
}

.search {
    width: 30%;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
}

.el-select {
    width: 100%;
}

.button {
    display: inline-block;
}

.mainContent {
    height: 70vh;
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 3fr 1fr;
    grid-gap: 3px;
    grid-template-areas:
        "reviews questions"
        "comments answers";
}

.reviews {
    grid-area: reviews;
    /* height: 100%; */
    grid-row: 1 / 2;
}

.comments {
    grid-area: comments;
    grid-row: 2 / 3;
}

.questions {
    grid-area: questions;
    grid-row: 1 / 2;
}

.answers {
    grid-area: answers;
    grid-row: 2 / 3;
}

.ag-root-wrapper-body,
.ag-theme-balham {
    width: 100%;
    height: 30vh;
    padding: 0;
    margin: 0;
    border: 0;
}

h2 {
    background-color: #f5f7f7;
}

.product {
    margin-bottom: 20px;
    white-space: pre;
    font-size: 20px;
}
</style>
