const express = require("express");
const router = express.Router();
const { validateReq } = require("../middlewares/error");
const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient");
const {
  validateGetPatients,
  validateGetPatientById,
  validateCreatePatient,
  validateUpdatePatient,
  validateDeletePatient,
} = require("../validators/patient");

router.get("/", validateReq(validateGetPatients), getPatients);
router.get("/:id", validateReq(validateGetPatientById), getPatientById);
router.post("/", validateReq(validateCreatePatient), createPatient);
router.put("/:id", validateReq(validateUpdatePatient), updatePatient);
router.delete("/:id", validateReq(validateDeletePatient), deletePatient);

module.exports = router;
