const { encrypt, decrypt } = require("./encrypt")

const pass = "anextremelyunsecuredpassword"
const pass_encrypted = encrypt(pass, 20)

test('should encrypt a pass', () => {
    expect(pass_encrypted).not.toEqual(pass)
})

test('should decrypt a pass', () => {
    const pass_decrypted = decrypt(pass_encrypted, 20)
    expect(pass_decrypted).toEqual(pass)
})
