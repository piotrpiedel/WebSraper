/**
 * Enum for OPERATIONS indicator values .
 * @readonly
 * @enum {number}
 */
const HTTP_CODES = {
    /** 200  indicates that operation ended with success */
    SUCCESS: 200,
    /** 400  indicates that user request is not correct */
    BAD_REQUEST: 400,
    /** 403  indicates that operation is forbidden */
    FORBIDDEN: 403,
    /** 405  indicates that operation is not allowed */
    METHOD_NOT_ALLOWED: 405,
    /** 404  indicates that object not found */
    NOT_FOUND: 404,
    /** 500  indicates that operation ended with server error */
    SERVER_ERROR: 500
};

module.exports = HTTP_CODES;