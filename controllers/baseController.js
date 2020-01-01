'use strict';

/**
 * @category Controllers
 * @module baseController
 */

//response object example
// {
//     "status": 200,
//     "data": [
//     {
//         "id": 3082984,
//         "name": "Głośniki Creative GigaworkS T20 Series II (51MF1545AA000)",
//         "producer": "Creative"
//     }
// ],
//     "message": "Product successfully retrieved"
// }
/**
 * Fill response object with status (api code), message and optional data
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @param  {HTTP_CODES} apiCode one of the api return codes
 * @param  {String} message message to send with response object
 * @param  {Object} data object with data (any type) to send to an endpoint;
 * @return  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 */
exports.fillResponse = function fillResponse(response, apiCode, message, data) {
    if (data) {
        return response
            .status(apiCode)
            .json({status: apiCode, data: data, message: message});
    } else {
        return response
            .status(apiCode)
            .json({status: apiCode, message: message});
    }
};