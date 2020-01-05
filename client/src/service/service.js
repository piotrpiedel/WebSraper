import { HttpMethod } from "../enums/HttpMethod";

export async function getData(productId) {
    return (
        await doHttpRequest(
            HttpMethod.GET,
            `http://localhost:3000/search?product=${productId}&reviews=true&reviewscomment=true&questions=true&questionsanswers=true`
        )
    ).json();
}

export async function getAllData() {
    return (
        await doHttpRequest(
            HttpMethod.GET,
            `http://localhost:3000/search/all`
        )
    ).json();
}

export async function getAllProductsIds() {
    return (
        await doHttpRequest(
            HttpMethod.GET,
            `http://localhost:3000/search/productids`
        )
    ).json();
}

export async function doEtlProcess(productId) {
    return (
        await doHttpRequest(
            HttpMethod.POST,
            "http://localhost:3000/etl/etlwhole",
            { productID: productId }
        )
    ).json();
}

export async function extractData(productId) {
    return (
        await doHttpRequest(
            HttpMethod.POST,
            "http://localhost:3000/etl/onlyextractstep",
            { productID: productId }
        )
    ).json();
}

export async function transformData(productId) {
    return (
        await doHttpRequest(
            HttpMethod.POST,
            "http://localhost:3000/etl/onlytransformstep",
            { productID: productId }
        )
    ).json();
}

export async function saveDataToDatabase(productId) {
    return (
        await doHttpRequest(
            HttpMethod.POST,
            "http://localhost:3000/etl/onlyloadstep",
            { productID: productId }
        )
    ).json();
}

export async function clearDatabase() {
    return (
        await doHttpRequest(
            HttpMethod.DELETE,
            "http://localhost:3000/clearDatabase"
        )
    ).json();
}

export async function createCsvFile(data) {
    // const items = json3.items
    // const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    // const header = Object.keys(items[0])
    // let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    // csv.unshift(header.join(','))
    // csv = csv.join('\r\n')
}

async function doHttpRequest(method, url, body) {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}
