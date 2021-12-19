const validatorError = require("./validatorError")

class Validator {
    
    validateListData(data) {
        if(!data.name) throw validatorError.nameUndefined();
        return true;
    }
}

module.exports = Validator