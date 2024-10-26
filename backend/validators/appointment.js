const { body, param, query } = require("express-validator");

const validateGetAppointments = [
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

const validateGetAppointmentById = [
  param("id").isMongoId().withMessage("Invalid appointment ID"),
];

const validateCreateAppointment = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("dateTime")
    .isISO8601()
    .toDate()
    .withMessage("Valid date and time is required"),
  body("appointmentType")
    .notEmpty()
    .withMessage("Appointment type is required"),
  body("note").optional().isString().withMessage("Note must be a string"),
];

const validateUpdateAppointment = [
  param("id").isMongoId().withMessage("Invalid appointment ID"),
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("phone").optional().notEmpty().withMessage("Phone cannot be empty"),
  body("dateTime")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Valid date and time is required"),
  body("appointmentType")
    .optional()
    .notEmpty()
    .withMessage("Appointment type cannot be empty"),
  body("status")
    .optional()
    .isIn(["Pending", "Approved", "Cancelled"])
    .withMessage("Invalid status"),
  body("note").optional().isString().withMessage("Note must be a string"),
];

const validateDeleteAppointment = [
  param("id").isMongoId().withMessage("Invalid appointment ID"),
];

module.exports = {
  validateGetAppointments,
  validateGetAppointmentById,
  validateCreateAppointment,
  validateUpdateAppointment,
  validateDeleteAppointment,
};
