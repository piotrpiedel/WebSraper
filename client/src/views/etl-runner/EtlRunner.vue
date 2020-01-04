<template>
    <div class="main" v-loading="isLoading">
        <Navbar />
        <div :hidden="!notification" class="notification">
            <p>{{ notification }}</p>
        </div>
        <el-form>
            <el-form-item style="width: 20%;">
                <el-input class="input" v-model="productId" placeholder="Product Id" />
            </el-form-item>
            <el-button @click="onWholeEtlBtnClicked">Whole etl</el-button>
            <el-button @click="onExtractBtnClicked">Extract</el-button>
            <el-button :disabled="isTransformBtnDisabled" @click="onTransformBtnClicked">Transform</el-button>
            <el-button :disabled="isLoadBtnDisabled" @click="onLoadBtnClicked">Load</el-button>
            <el-button @click="onClearDatabaseBtnClicked">Clear database</el-button>
        </el-form>
    </div>
</template>

<script src="./EtlRunnerScript.js" />

<style>
* {
    margin: 0;
    padding: 0;
    /* font-size: 13px; */
    box-sizing: border-box;
    text-align: center;
}

.main {
    background-color: #c0c0c0;
    height: 100vh;
}

.notification {
    font-size: 19px;
    /* position: absolute; */
    background-color: white;
    border-radius: 5px;
    white-space: pre;
    padding: 10px;
}

.el-form-item {
    margin: auto;
}

.input {
    margin: 20px auto;
}
</style>
