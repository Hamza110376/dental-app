const express = require("express");
const router = express.Router();
const { validateReq } = require("../middlewares/error");
const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentAnalytics,
} = require("../controllers/appointment");
const {
  validateGetAppointments,
  validateGetAppointmentById,
  validateCreateAppointment,
  validateUpdateAppointment,
  validateDeleteAppointment,
} = require("../validators/appointment");

router.get("/", validateReq(validateGetAppointments), getAppointments);
router.get("/analytics", getAppointmentAnalytics);
router.get("/:id", validateReq(validateGetAppointmentById), getAppointmentById);
router.post("/", validateReq(validateCreateAppointment), createAppointment);
router.put("/:id", validateReq(validateUpdateAppointment), updateAppointment);
router.delete(
  "/:id",
  validateReq(validateDeleteAppointment),
  deleteAppointment
);

module.exports = router;
