import { HttpMethods } from "../enums/HttpMethods";

export async function doPostEtlWhole(productId) {
    return (
        await doHttpRequest(
            HttpMethods.POST,
            "http://localhost:3000/etl/etlwhole",
            { productID: productId }
        )
    ).json();
}

export async function doPostExtract(productId) {
    return (
        await doHttpRequest(
            HttpMethods.POST,
            "http://localhost:3000/etl/onlyextractstep",
            { productID: productId }
        )
    ).json();
}

export async function doPostTransform(productId) {
    return (
        await doHttpRequest(
            HttpMethods.POST,
            "http://localhost:3000/etl/onlytransformstep",
            { productID: productId }
        )
    ).json();
}

export async function doPostLoad(productId) {
    return (
        await doHttpRequest(
            HttpMethods.POST,
            "http://localhost:3000/etl/onlyloadstep",
            { productID: productId }
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
