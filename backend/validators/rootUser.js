const { check } = require("express-validator");

const validateSignIn = [
  check("key")
    .exists()
    .withMessage("Key is required")
    .notEmpty()
    .withMessage("Key cannot be empty"),
];

module.exports = { validateSignIn };
