const asyncHandler = require("express-async-handler");
const Patient = require("../models/Patient");

const getPatients = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { email: { $regex: req.query.keyword, $options: "i" } },
          { phone: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const count = await Patient.countDocuments({ ...keyword });
  const patients = await Patient.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    success: true,
    data: patients,
    page,
    pageSize,
    count: Math.ceil(count / pageSize),
  });
});

const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    res.json({ success: true, data: patient });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

const createPatient = asyncHandler(async (req, res) => {
  const patient = new Patient(req.body);

  const createdPatient = await patient.save();
  res.status(201).json({ success: true, data: createdPatient });
});

const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    Object.assign(patient, req.body);
    const updatedPatient = await patient.save();
    res.json({ success: true, data: updatedPatient });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    await patient.remove();
    res.json({ success: true, message: "Patient removed" });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
