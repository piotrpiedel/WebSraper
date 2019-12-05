const Apify = require("apify");
const url = require("url");
const fs = require("fs");

const { log } = Apify.utils;
log.setLevel(log.LEVELS.WARNING);

const productId = 10201710;
(async () => {
    const numberOfReviewsAndQuestions = await getNumberOfReviewsAndQuestions(
        productId
    );
    const numberOfReviewPages = Math.ceil(
        numberOfReviewsAndQuestions.numberOfReviews / 10
    );
    // const numberOfQuestionPages = Math.ceil(
    //     numberOfReviewsAndQuestions.numberOfQuestions / 10
    // );
    const reviews = await getReviews(numberOfReviewPages);
    // const questions = await getQuestions(numberOfQuestionPages);
    saveDataToJsonFile(reviews);
})();

async function getNumberOfReviewsAndQuestions(productId) {
    const requestList = new Apify.RequestList({
        sources: [{ url: `https://www.ceneo.pl/${productId}` }]
    });
    await requestList.initialize();

    let numberOfReviews = 0;
    let numberOfQuestions = 0;
    const crawler = new Apify.CheerioCrawler({
        requestList,
        minConcurrency: 10,
        maxConcurrency: 50,
        maxRequestRetries: 1,
        handlePageTimeoutSecs: 60,
        handlePageFunction: async ({ request, body, $ }) => {
            numberOfReviews = $(".reviews a")
                .attr("title")
                .replace(/\D/g, "");
            numberOfQuestions = $(".questions a")
                .attr("title")
                .replace(/\D/g, "");
        },
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed twice.`);
        }
    });

    await crawler.run();

    return { numberOfReviews, numberOfQuestions };
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
        handlePageFunction: async ({ request, body, $ }) => {
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
                const wasPurchased = !!dateOfPurchase;
                const message = elObj
                    .find(".product-review-body")
                    .text()
                    .trim();
                const advantages = [];
                elObj.find(".pros-cell li").each((index, element) => {
                    advantages.push(
                        $(element)
                            .text()
                            .trim()
                    );
                });

                const disadvantages = [];
                elObj.find(".cons-cell li").each((index, element) => {
                    disadvantages.push(
                        $(element)
                            .text()
                            .trim()
                    );
                });
                const numberOfUpVotes = elObj.find(".vote-yes span").text();
                const numberOfDownVotes = elObj.find(".vote-no span").text();

                const comments = [];
                elObj
                    .find("li.product-review-comment")
                    .each((index, element) => {
                        const comment = {};
                        const header = $(element)
                            .first()
                            .first()
                            .text()
                            .split("\n")
                            .filter(element => element.trim().length > 0);

                        comment.id = $(element).attr("data-entry-id");
                        comment.author = header[0].trim();
                        comment.message = header[2].trim();

                        comment.dateOfComment = $(element)
                            .find(".review-time")
                            .children()[0].attribs.datetime;
                        comments.push(comment);
                    });

                reviews.push({
                    id,
                    author,
                    wasPurchased,
                    dateOfPurchase,
                    dateOfReview,
                    score,
                    isRecommended,
                    message,
                    advantages,
                    disadvantages,
                    numberOfUpVotes,
                    numberOfDownVotes,
                    comments
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
    console.log(__dirname);
    fs.writeFile(
        url.resolve(__dirname, "data\\data.json"),
        JSON.stringify(data, null, 4),
        error => {
            if (error) return;
            console.log("Data has been succesfully saved!");
        }
    );
}
