const asyncHandler = require("express-async-handler");
const Appointment = require("../models/Appointment");

const getAppointments = asyncHandler(async (req, res) => {
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

  const count = await Appointment.countDocuments({ ...keyword });
  const appointments = await Appointment.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    success: true,
    data: appointments,
    page,
    pageSize,
    count: Math.ceil(count / pageSize),
  });
});

const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  console.log("appointment", appointment, req.params.id);
  if (appointment) {
    res.json({ success: true, data: appointment });
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

const createAppointment = asyncHandler(async (req, res) => {
  const appointment = new Appointment(req.body);
  const createdAppointment = await appointment.save();
  res.status(201).json({ success: true, data: createdAppointment });
});

const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    Object.assign(appointment, req.body);
    const updatedAppointment = await appointment.save();
    res.json({ success: true, data: updatedAppointment });
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    await appointment.remove();
    res.json({ success: true, message: "Appointment removed" });
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

const getAppointmentAnalytics = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayAppointments = await Appointment.countDocuments({
    dateTime: { $gte: today, $lt: tomorrow },
  });

  const pendingConfirmations = await Appointment.countDocuments({
    status: "Pending",
  });

  const confirmedAppointments = await Appointment.countDocuments({
    status: "Approved",
  });

  res.json({
    success: true,
    data: {
      todayAppointments,
      pendingConfirmations,
      confirmedAppointments,
    },
  });
});

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentAnalytics,
};
