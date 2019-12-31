import { HttpMethods } from "../enums/HttpMethods";

export async function doGetSearch(productId) {
    return (
        await doHttpRequest(
            HttpMethods.GET,
            `http://localhost:3000/search?product=${productId}&reviews=true&reviewscomment=true&questions=true&questionsanswers=true`
        )
    ).json();
}

async function doHttpRequest(method, url, body = null) {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : null
    });
}
