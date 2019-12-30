<template>
    <div v-loading="isLoading">
        <p style="white-space: pre;">{{ notification }}</p>
        <el-form>
            <el-form-item style="width: 20%;" label="Product Id">
                <el-input v-model="productId" />
            </el-form-item>
            <el-button @click="onWholeEtlBtnClicked">Whole etl</el-button>
            <el-button @click="onExtractBtnClicked">Extract</el-button>
            <el-button
                :disabled="isTransformBtnDisabled"
                @click="onTransformBtnClicked"
                >Transform</el-button
            >
            <el-button :disabled="isLoadBtnDisabled" @click="onLoadBtnClicked"
                >Load</el-button
            >
        </el-form>
    </div>
</template>

<script src="./DisplayScript.js" />
