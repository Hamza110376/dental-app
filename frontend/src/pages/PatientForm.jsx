import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";
import DentalChart from "../components/dentalchart";

const PatientForm = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    chiefComplaint: "",
    historyOfPresentComplaint: "",
    pastDentalHistory: "",
    familyDentalHistory: "",
    dentalHistory: {
      foodCaught: false,
      missingTeeth: false,
      gumsBleed: false,
      flossRegularly: false,
      gumDisease: false,
      teethSensitiveHotCold: false,
      teethExtracted: false,
      sensitiveToSweets: false,
      clenchOrGrind: false,
      nightGuard: false,
      oralSurgery: false,
      tiredJaws: false,
      orthodontics: false,
      poppingJaw: false,
      periodontalTreatment: false,
      chewHabits: false,
      faceJawInjury: false,
      drinks: false,
    },
    medicalHistory: {
      cardiac: false,
      bloodPressure: false,
      diabetes: false,
      GIT: false,
      liverDisease: false,
      tuberculosis: false,
      STI: false,
      abnormalBleeding: false,
      allergies: false,
      others: false,
      currentMedications: false,
    },
    habits: {
      mouthBreathing: false,
      tobaccoChewing: false,
      smoking: false,
      drugs: false,
    },
    medicalConditionsDetail: "",
    treatment: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPatientData((prevState) => ({
      ...prevState,
      medicalHistory: {
        ...prevState.medicalHistory,
        [name]: checked,
      },
    }));
  };
  const handleDentalBoxChange = (e) => {
    const { name, checked } = e.target;
    setPatientData((prevState) => ({
      ...prevState,
      dentalHistory: {
        ...prevState.dentalHistory,
        [name]: checked,
      },
    }));
  };
  const handleHabitsChange = (e) => {
    const { name, checked } = e.target;
    setPatientData((prevState) => ({
      ...prevState,
      habits: {
        ...prevState.habits,
        [name]: checked,
      },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient
      .post("/patients", patientData)
      .then(() => {
        navigate("/patients");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const apiErrors = error.response.data.errors.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {});
          setErrors(apiErrors);
        } else {
          alert("An error occurred while creating the appointment");
        }
      });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dental Patient Form</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Patient Information</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Patient Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              name="age"
              onChange={handleChange}
              required
            />
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              name="phone"
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              name="address"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Dental History</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="chiefComplaint"
            >
              Chief Complaint
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="chiefComplaint"
              name="chiefComplaint"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="historyOfPresentComplaint"
            >
              History of Present Complaint
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="historyOfPresentComplaint"
              name="historyOfPresentComplaint"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pastDentalHistory"
            >
              Past Dental History
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pastDentalHistory"
              name="pastDentalHistory"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="familyDentalHistory"
            >
              Family Dental History
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="familyDentalHistory"
              name="familyDentalHistory"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="foodCaught"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you get food caught between your teeth?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="missingTeeth"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you have any missing teeth?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="gumsBleed"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do your gums bleed?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="flossRegularly"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you floss regularly?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="gumDisease"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Does gum disease run in your family?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="teethSensitiveHotCold"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Are your teeth hot/cold sensitive?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="teethExtracted"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Teeth extracted?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="sensitiveToSweets"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Are your teeth sensitive to sweets?{" "}
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="clenchOrGrind"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you clench or grind your teeth?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="nightGuard"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you have a night guard/bite splint?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="oralSurgery"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Have you ever had an oral surgery?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="tiredJaws"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you have tired jaws?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="orthodontics"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you have orthodontics/braces?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="poppingJaw"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you have popping or clicking in the jaw?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="periodontalTreatment"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Have you ever had a periodontal treatment?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="chewHabits"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you chew on pens, fingernails, etc?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="faceJawInjury"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Have you had any injury to your face/jaw?
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="dental"
              name="drinks"
              className="mr-2"
              onChange={handleDentalBoxChange}
            />
            <label htmlFor={`dental`} className="text-sm text-gray-700">
              Do you drink coffee, tea or red wine?
            </label>
          </div>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Medical History</h2>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="cardiac"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              Cardiac
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="bloodPressure"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              Blood Pressure
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="diabetes"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              Diabetes
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="GIT"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              GIT
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="liverDisease"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              Hepatitis, Jaundice, or Liver disease
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="liverDisease"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              Hepatitis, Jaundice, or Liver disease
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="tuberculosis"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              Tuberculosis
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="STI"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              STI
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="abnormalBleeding"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              Abnormal bleeding with previous extraction, surgery or trauma
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="allergies"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              Allergies (LA, Medicines, Others){" "}
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="medical"
              name="allergies"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`medical`} className="text-sm text-gray-700">
              Allergies (LA, Medicines, Others){" "}
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="medicalConditionsDetail"
            >
              Other Medical Conditions Detail
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="medicalConditionsDetail"
              name="medicalConditionsDetail"
              onChange={handleChange}
              rows={6}
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Habits</h2>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id={`habit`}
              className="mr-2"
              name="mouthBreathing"
              onChange={handleHabitsChange}
            />
            <label htmlFor={`habit`} className="text-sm text-gray-700">
              Mouth Breathing
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id={`habit`}
              className="mr-2"
              name="tobaccoChewing"
              onChange={handleHabitsChange}
            />
            <label htmlFor={`habit`} className="text-sm text-gray-700">
              Tobacco Chewing
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id={`habit`}
              className="mr-2"
              name="smoking"
              onChange={handleHabitsChange}
            />
            <label htmlFor={`habit`} className="text-sm text-gray-700">
              Smoking
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id={`habit`}
              className="mr-2"
              name="drugs"
              onChange={handleHabitsChange}
            />
            <label htmlFor={`habit`} className="text-sm text-gray-700">
              Drugs
            </label>
          </div>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Patient Treatment</h2>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="treatment"
            name="treatment"
            onChange={handleChange}
            placeholder="Enter all procedures done for the patient"
            rows={6}
          />
        </div>
        <DentalChart />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
