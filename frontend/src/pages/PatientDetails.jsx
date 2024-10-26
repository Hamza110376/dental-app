import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../utils/apiClient"; // Adjust the import path as necessary

const PatientDetails = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState({});
  const [selectedTeeth, setSelectedTeeth] = useState([]);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const response = await apiClient.get(`/patients/${id}`);
      if (response.data.success) {
        setPatientData(response.data.data);
        setSelectedTeeth(response.data.data.selectedTeeth || []);
      } else {
        alert("Failed to fetch patient data");
      }
    } catch (error) {
      alert("Error fetching patient data");
    }
  };

  const renderSection = (title, content) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{content || "Not provided"}</p>
    </div>
  );

  const renderCheckboxSection = (title, data) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <ul className="list-disc list-inside">
        {Object.entries(data || {}).map(
          ([key, value]) =>
            value && (
              <li key={key} className="text-gray-600">
                {key}
              </li>
            )
        )}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Patient Information Summary
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Personal Information
          </h2>
          {renderSection("Name", patientData.name)}
          {renderSection("Phone", patientData.phone)}
          {renderSection("Age", patientData.age)}
          {renderSection("Address", patientData.address)}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Dental History
          </h2>
          {renderSection("Chief Complaint", patientData.chiefComplaint)}
          {renderSection(
            "History of Present Complaint",
            patientData.historyOfPresentComplaint
          )}
          {renderSection("Past Dental History", patientData.pastDentalHistory)}
          {renderSection(
            "Family Dental History",
            patientData.familyDentalHistory
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Dental History Questionnaire
          </h2>
          {renderCheckboxSection("Dental History", patientData.dentalHistory)}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Medical History
          </h2>
          {renderCheckboxSection(
            "Medical Conditions",
            patientData.medicalHistory
          )}
          {renderSection(
            "Medical Conditions Detail",
            patientData.medicalConditionsDetail
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Habits</h2>
          {renderCheckboxSection("Patient Habits", patientData.habits)}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Dental Chart
          </h2>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Selected Teeth:
          </h3>
          {selectedTeeth && selectedTeeth.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedTeeth.map((toothId) => (
                <li key={toothId} className="text-gray-600">
                  Tooth {toothId}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No teeth selected</p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Treatment
          </h2>
          {renderSection("Patient Treatment", patientData.treatment)}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
