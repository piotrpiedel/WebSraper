<template>
    <div v-loading="isLoading">
        <p style="white-space: pre;">{{ notification }}</p>
        <el-form>
            <el-form-item
                style="width: 40%; display: inline-block;"
                label="Product Id"
            >
                <el-input v-model="productId" />
            </el-form-item>
            <el-button @click="onDisplayDataBtnClicked">Display Data</el-button>
        </el-form>

        <ag-grid-vue
            style="width: 100%; height: 300px;"
            class="ag-theme-balham"
            :columnDefs="columnDefs"
            :rowData="rowData"
            @gridReady="onGridReady"
        >
        </ag-grid-vue>
    </div>
</template>

<script src="./DisplayScript.js" />
