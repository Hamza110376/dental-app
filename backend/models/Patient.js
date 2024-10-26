const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: Number,
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: String,
    chiefComplaint: String,
    historyOfPresentComplaint: String,
    pastDentalHistory: String,
    familyDentalHistory: String,
    dentalHistory: {
      foodCaught: Boolean,
      missingTeeth: Boolean,
      gumsBleed: Boolean,
      flossRegularly: Boolean,
      gumDisease: Boolean,
      teethSensitiveHotCold: Boolean,
      teethExtracted: Boolean,
      sensitiveToSweets: Boolean,
      clenchOrGrind: Boolean,
      nightGuard: Boolean,
      oralSurgery: Boolean,
      tiredJaws: Boolean,
      orthodontics: Boolean,
      poppingJaw: Boolean,
      periodontalTreatment: Boolean,
      chewHabits: Boolean,
      faceJawInjury: Boolean,
      drinks: Boolean,
    },
    medicalHistory: {
      cardiac: Boolean,
      bloodPressure: Boolean,
      diabetes: Boolean,
      GIT: Boolean,
      liverDisease: Boolean,
      tuberculosis: Boolean,
      STI: Boolean,
      abnormalBleeding: Boolean,
      allergies: String,
      others: String,
      currentMedications: String,
    },
    medicalConditionsDetail: String,
    habits: {
      mouthBreathing: Boolean,
      tobaccoChewing: Boolean,
      smoking: Boolean,
      drugs: Boolean,
    },
    treatment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
