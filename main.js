const Apify = require("apify");
const fs = require("fs");

const { log } = Apify.utils;
log.setLevel(log.LEVELS.WARNING);

const productId = 41546872;
(async () => {
    const numberOfPages = await getNumberOfPages(productId);
    const reviews = await getReviews(numberOfPages);
    saveDataToJsonFile(reviews);
})();

async function getNumberOfPages(productId) {
    const requestList = new Apify.RequestList({
        sources: [{ url: `https://www.ceneo.pl/${productId}` }]
    });
    await requestList.initialize();

    let numberOfReviews = 0;
    const crawler = new Apify.CheerioCrawler({
        requestList,
        minConcurrency: 10,
        maxConcurrency: 50,
        maxRequestRetries: 1,
        handlePageTimeoutSecs: 60,
        handlePageFunction: async ({ request, html, $ }) => {
            numberOfReviews = $(".reviews a")
                .attr("title")
                .replace(/\D/g, "");
        },
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed twice.`);
        }
    });

    await crawler.run();

    return Math.ceil(numberOfReviews / 10);
}

async function getReviews(numberOfPages) {
    const urls = [];
    for (let i = 1; i <= numberOfPages; i++) {
        urls.push({ url: `https://www.ceneo.pl/${productId}/opinie-${i}` });
    }
    const requestList = new Apify.RequestList({
        sources: urls
    });
    await requestList.initialize();

    const reviews = [];

    const crawler = new Apify.CheerioCrawler({
        requestList,
        minConcurrency: 10,
        maxConcurrency: 50,
        maxRequestRetries: 1,
        handlePageTimeoutSecs: 60,
        handlePageFunction: async ({ request, html, $ }) => {
            const reviewData = $("li.review-box");
            reviewData.each((index, el) => {
                const elObj = $(el);
                const id = elObj.attr("data-entry-id");
                const author = elObj
                    .find(".reviewer-name-line")
                    .text()
                    .trim();
                const dateOfReview = $(
                    elObj.find(".review-time").children()[0]
                ).attr("datetime");
                const dateOfPurchase = $(
                    elObj.find(".review-time").children()[1]
                ).attr("datetime");
                const score = elObj.find(".review-score-count").text();
                const isRecommended =
                    elObj.find(".product-review-summary em").html() ===
                    "Polecam";
                const message = elObj
                    .find(".product-review-body")
                    .text()
                    .trim();
                reviews.push({
                    id,
                    author,
                    dateOfReview,
                    dateOfPurchase,
                    score,
                    isRecommended,
                    message
                });
            });
        },
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed twice.`);
        }
    });

    await crawler.run();
    return reviews;
}

function saveDataToJsonFile(data) {
    fs.writeFile("data.json", JSON.stringify(data, null, 4), error => {
        if (error) return;
        console.log("Data has been succesfully saved!");
    });
}