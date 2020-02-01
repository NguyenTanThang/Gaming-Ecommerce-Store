const bcrypt = require("bcryptjs");

const encryptPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));
}

const comparePassword = (plainPassword, hashPassword) => {
    return bcrypt.compareSync(plainPassword, hashPassword);
}

module.exports = {
    encryptPassword,
    comparePassword
}