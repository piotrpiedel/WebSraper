import { HttpMethod } from "../enums/HttpMethod";

export async function getData(productId) {
    return (
        await doHttpRequest(
            HttpMethod.GET,
            `http://localhost:3000/search?product=${productId}&reviews=true&reviewscomment=true&questions=true&questionsanswers=true`
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

async function doHttpRequest(method, url, body) {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}
