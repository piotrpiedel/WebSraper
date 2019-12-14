const Apify = require("apify");
const url = require("url");
const fs = require("fs");

const { log } = Apify.utils;
log.setLevel(log.LEVELS.WARNING);

const productId = 10201710;
scrapData(productId);

async function scrapData(productId) {
    const numberOfReviewPages = await getNumberOfReviewPages(productId);
    const numberOfQuestionPages = await getNumberOfQuestionPages(productId);
    const reviews = await getReviews(productId, numberOfReviewPages);
    const questions = await getQuestions(productId, numberOfQuestionPages);
    saveDataToJsonFile(questions);
}

async function getNumberOfReviewPages(productId) {
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
        },
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed twice.`);
        }
    });

    await crawler.run();

    return Math.ceil(numberOfReviews / 10);
}

async function getNumberOfQuestionPages(productId) {
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
            numberOfQuestions = $(".questions a")
                .attr("title")
                .replace(/\D/g, "");
        },
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed twice.`);
        }
    });

    await crawler.run();

    return Math.ceil(numberOfQuestions / 10);
}

async function getReviews(productId, numberOfPages) {
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

async function getQuestions(productId, numberOfPages) {
    const urls = [];
    urls.push({ url: `https://www.ceneo.pl/${productId}#tab=questions` });
    for (let i = 2; i <= numberOfPages; i++) {
        urls.push({ url: `https://www.ceneo.pl/${productId}/pytania-${i}` });
    }
    const requestList = new Apify.RequestList({
        sources: urls
    });
    await requestList.initialize();

    const questions = [];

    const crawler = new Apify.CheerioCrawler({
        requestList,
        minConcurrency: 10,
        maxConcurrency: 50,
        maxRequestRetries: 1,
        handlePageTimeoutSecs: 300,
        handlePageFunction: async ({ request, body, $ }) => {
            const questionData = $("li.review-box.js_product-question");
            questionData.each((index, el) => {
                const elObj = $(el);
                const id = elObj.attr("data-question-id");
                const author = elObj
                    .find(".reviewer-name-line")
                    .text()
                    .split(" ")[0]
                    .replace(/\r|\n|\t/g, "");
                const dateOfQuestion = $(
                    elObj.find(".review-time").children()[0]
                ).attr("datetime");
                const title = elObj
                    .find(".product-question-title")
                    .text()
                    .trim();
                const message = elObj
                    .find(".product-question-body")
                    .text()
                    .trim();
                const numberOfUpVotes = elObj.find(".vote-yes").html();
                const numberOfDownVotes = elObj.find(".vote-no").html();

                const answers = [];
                elObj.find("li.product-answer").each((index, element) => {
                    const answer = {};
                    const header = $(element)
                        .first()
                        .first()
                        .text()
                        .split("\n")
                        .filter(element => element.trim().length > 0);

                    answer.id = $(element).attr("data-answer-id");
                    answer.author = $(element)
                        .find(".reviewer-name-line")
                        .text()
                        .trim();
                    answer.message = $(element)
                        .find(".product-review-body")
                        .text()
                        .trim()
                        .replace(/\r|\n|\t/g, "");

                    answer.dateOfAnswer = $(element)
                        .find(".review-time")
                        .children()[0].attribs.datetime;

                    answer.numberOfUpVotes = $(element)
                        .find(".vote-yes")
                        .html();
                    answer.numberOfDownVotes = $(element)
                        .find(".vote-yes")
                        .html();
                    answers.push(answer);
                });

                questions.push({
                    id,
                    author,
                    dateOfQuestion,
                    title,
                    message,
                    numberOfUpVotes,
                    numberOfDownVotes,
                    answers
                });
            });
        },
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed twice.`);
        }
    });

    await crawler.run();
    return questions;
}

function saveDataToJsonFile(data) {
    console.log(__dirname);
    fs.writeFile(
        url.resolve(__dirname, "data\\data.json"),
        JSON.stringify(data, null, 4),
        error => {
            if (error) return;
            console.log("Data has been successfully saved!");
        }
    );
}
