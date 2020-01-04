'use strict';

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