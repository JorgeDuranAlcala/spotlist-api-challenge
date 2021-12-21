const BaseError = require(".");
const HTTP_STATUS_CODE = require("../constants/http-status-code");

class api404Error extends BaseError {
    constructor(
        name,
        statusCode = HTTP_STATUS_CODE.NOT_FOUND,
        isOperational = true,
        description = 'Not found'
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = api404Error