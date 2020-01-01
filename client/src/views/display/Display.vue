<template>
    <div v-loading="isLoading">
        <p style="white-space: pre;">{{ notification }}</p>
        <el-form>
            <el-form-item style="width: 40%; display: inline-block;" label="Product Id">
                <el-input v-model="productId" />
            </el-form-item>
            <el-button @click="onDisplayDataBtnClicked">Display Data</el-button>
        </el-form>

        <h2>Reviews</h2>
        <ag-grid-vue
            style="width: 100%; height: 300px;"
            class="ag-theme-balham"
            rowSelection="single"
            :columnDefs="grids.reviewGrid.columnDefs"
            :rowData="grids.reviewGrid.rowData"
            @gridReady="onReviewGridReady"
            @rowClicked="onReviewGridRowClicked"
        />

        <div :hidden="grids.commentGrid.isHidden">
            <h2>Comments</h2>
            <ag-grid-vue
                style="width: 100%; height: 300px;"
                class="ag-theme-balham"
                :columnDefs="grids.commentGrid.columnDefs"
                :rowData="grids.commentGrid.rowData"
                @gridReady="onCommentGridReady"
            />
        </div>

        <h2>Questions</h2>
        <ag-grid-vue
            style="width: 100%; height: 300px;"
            class="ag-theme-balham"
            rowSelection="single"
            :columnDefs="grids.questionGrid.columnDefs"
            :rowData="grids.questionGrid.rowData"
            @gridReady="onQuestionGridReady"
            @rowClicked="onQuestionGridRowClicked"
        />

        <div :hidden="grids.answerGrid.isHidden">
            <h2>Answers</h2>
            <ag-grid-vue
                style="width: 100%; height: 300px;"
                class="ag-theme-balham"
                :columnDefs="grids.answerGrid.columnDefs"
                :rowData="grids.answerGrid.rowData"
                @gridReady="onAnswerGridReady"
            />
        </div>
    </div>
</template>

<script src="./DisplayScript.js" />
