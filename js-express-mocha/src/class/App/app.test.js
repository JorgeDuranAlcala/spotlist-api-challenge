const appCreator = require(".")
const {Database} = require("../Database")

describe("App creator", () => {

    let myApp;

    beforeEach(() => {
        myApp = appCreator(new Database())
    })

    test('should have a db and an express app as properties', () => {
        
        expect(myApp.db).toBeDefined()
        expect(myApp.app).toBeDefined()
    })

})