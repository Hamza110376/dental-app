const { body, param, query } = require("express-validator");

const validateGetPatients = [
  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page size must be a positive integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("keyword")
    .optional()
    .isString()
    .withMessage("Keyword must be a string"),
];

const validateGetPatientById = [
  param("id").isMongoId().withMessage("Invalid patient ID"),
];

const validateCreatePatient = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),
];

const validateUpdatePatient = [
  param("id").isMongoId().withMessage("Invalid patient ID"),
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("phone")
    .optional()
    .notEmpty()
    .withMessage("Phone number cannot be empty"),
];

const validateDeletePatient = [
  param("id").isMongoId().withMessage("Invalid patient ID"),
];

module.exports = {
  validateGetPatients,
  validateGetPatientById,
  validateCreatePatient,
  validateUpdatePatient,
  validateDeletePatient,
};
