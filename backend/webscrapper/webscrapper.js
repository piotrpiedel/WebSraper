const Apify = require("apify");
const url = require("url");
const FileUtil = require("../utils/fileUtil");
const fileAndFolderNames = require("../config/folderAndFilesNames");

const { log } = Apify.utils;
log.setLevel(log.LEVELS.WARNING);

// const productId = 10201710;
// scrapData(productId);

function saveDataToJsonFile(productData, reviews, questions) {
    FileUtil.saveDataToJsonFile(
        fileAndFolderNames.DATA_EXTRACTED_FOLDER,
        fileAndFolderNames.DATA_EXTRACTED_PRODUCT_FILE,
        productData
    );
    FileUtil.saveDataToJsonFile(
        fileAndFolderNames.DATA_EXTRACTED_FOLDER,
        fileAndFolderNames.DATA_EXTRACTED_REVIEWS_FILE,
        reviews
    );
    FileUtil.saveDataToJsonFile(
        fileAndFolderNames.DATA_EXTRACTED_FOLDER,
        fileAndFolderNames.DATA_EXTRACTED_QUESTIONS_FILE,
        questions
    );
}

async function scrapData(productId) {
    const productData = await extractProductData(productId);
    const numberOfReviewPages = await getNumberOfReviewPages(productId);
    const numberOfQuestionPages = await getNumberOfQuestionPages(productId);
    const reviews = await extractReviewData(productId, numberOfReviewPages);
    const questions = await extractQuestionData(
        productId,
        numberOfQuestionPages
    );
    saveDataToJsonFile(productData, reviews, questions);
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
            throw new Error(
                "Could not scrap data for product - productID is not correct"
            );
        }
    });

    await crawler.run();

    return Math.ceil(numberOfQuestions / 10);
}

async function extractProductData(productId) {
    const urls = [{ url: `https://www.ceneo.pl/${productId}` }];
    const requestList = new Apify.RequestList({
        sources: urls
    });
    await requestList.initialize();

    const productData = {};

    const crawler = new Apify.CheerioCrawler({
        requestList,
        minConcurrency: 10,
        maxConcurrency: 50,
        maxRequestRetries: 1,
        handlePageTimeoutSecs: 60,
        handlePageFunction: async ({ request, body, $ }) => {
            handleProductInformationPage($, productData);
        },
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed twice.`);
        }
    });

    await crawler.run();
    return productData;
}

async function handleProductInformationPage($, resultObject) {
    const productName = $("h1.product-name")
        .text()
        .trim();
    let producer = $($("div.specs-group").children()[1])
        .first()
        .first()
        .find(".attr-value")
        .text()
        .trim()
        .replace(/\r|\n|\t/g, "");
    const n = producer.indexOf(" ");
    producer = producer.substring(0, n ? n : producer.length);
    resultObject.productName = productName;
    resultObject.producer = producer.split(" ")[0];
}

async function extractReviewData(productId, numberOfPages) {
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
            handleReviewPage($, reviews);
        },
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed twice.`);
        }
    });

    await crawler.run();
    return reviews;
}

// data will be saved in resultArray
async function handleReviewPage($, resultArray) {
    const reviewData = $("li.review-box");
    reviewData.each((index, el) => {
        const elObj = $(el);
        const id = elObj.attr("data-entry-id");
        const author = elObj.find(".reviewer-name-line").text();
        const dateOfReview = $(elObj.find(".review-time").children()[0]).attr(
            "datetime"
        );
        const dateOfPurchase = $(elObj.find(".review-time").children()[1]).attr(
            "datetime"
        );
        const score = elObj.find(".review-score-count").text();
        const isRecommended = elObj.find(".product-review-summary em").html();
        const message = elObj.find(".product-review-body").text();
        const advantages = [];
        elObj.find(".pros-cell li").each((index, element) => {
            advantages.push($(element).text());
        });

        const disadvantages = [];
        elObj.find(".cons-cell li").each((index, element) => {
            disadvantages.push($(element).text());
        });
        const numberOfUpVotes = elObj.find(".vote-yes span").text();
        const numberOfDownVotes = elObj.find(".vote-no span").text();

        const comments = [];
        elObj.find("li.product-review-comment").each((index, element) => {
            const comment = {};
            const header = $(element)
                .first()
                .first()
                .text()
                .split("\n")
                .filter(element => element.trim().length > 0);

            comment.id = $(element).attr("data-entry-id");
            comment.author = header[0];
            comment.message = header[2];

            comment.dateOfComment = $(element)
                .find(".review-time")
                .children()[0].attribs.datetime;
            comments.push(comment);
        });

        resultArray.push({
            id,
            author,
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
}

async function extractQuestionData(productId, numberOfPages) {
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
            handleQuestionPage($, questions);
        },
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed twice.`);
        }
    });

    await crawler.run();
    return questions;
}

// data will be saved in resultArray
async function handleQuestionPage($, resultArray) {
    const questionData = $("li.review-box.js_product-question");
    questionData.each((index, el) => {
        const elObj = $(el);
        const id = elObj.attr("data-question-id");
        const author = elObj
            .find(".reviewer-name-line")
            .text()
            .split(" ")[0]
            .replace(/\r|\n|\t/g, "");
        const dateOfQuestion = $(elObj.find(".review-time").children()[0]).attr(
            "datetime"
        );
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

        resultArray.push({
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
}

exports.scrapData = scrapData;
