
class validatorError {
    static nameUndefined() {
        return new Error("You must give a name to the list")
    }
}

module.exports = validatorError