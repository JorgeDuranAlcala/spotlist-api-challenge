
const BaseError = require(".");
const HTTP_STATUS_CODE = require("../constants/http-status-code");

class api400Error extends BaseError {
    constructor(
        name,
        statusCode = HTTP_STATUS_CODE.BAD_REQUEST,
        isOperational = true,
        description = "Whether something must've been missing or something went wrong"
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = api400Error