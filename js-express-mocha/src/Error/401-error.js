const BaseError = require(".");
const HTTP_STATUS_CODE = require("../constants/http-status-code");

class ErrorUnauthorized extends BaseError {
    constructor(
        name,
        statusCode = HTTP_STATUS_CODE.UNAUTHORIZED,
        isOperational = true,
        description = "User is not authenticated"
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = ErrorUnauthorized