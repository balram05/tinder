const validator = require("validator");

const validationRules = (req) => {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is missing");
    }

    if (!email || !validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
};

module.exports = {
    validationRules,
};