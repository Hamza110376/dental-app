import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient"; // Adjust the import path as necessary

const Icon = ({ d }) => (
  <svg
    className="h-5 w-5 text-gray-400 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await apiClient.get(`/appointments/${id}`);
        setAppointmentData(data.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleApproveAppointment = async () => {
    try {
      await apiClient.put(`/appointments/${id}`, { status: "Approved" });
      navigate("/");
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };

  const handleCancelAppointment = async () => {
    try {
      await apiClient.put(`/appointments/${id}`, { status: "Cancelled" });
      navigate("/");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  if (!appointmentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Appointment Details
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Details and information about the patient's appointment.
                </p>
              </div>
              <Link
                to={`/appointments/form/${id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Appointment
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Icon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  Patient Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {appointmentData.name}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  Appointment Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {appointmentData.appointmentType}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(appointmentData.dateTime).toLocaleDateString()}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Icon d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(appointmentData.dateTime).toLocaleTimeString()}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Icon d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      appointmentData.status === "Approved"
                        ? "bg-green-200 text-green-800"
                        : appointmentData.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {appointmentData.status}
                  </span>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Icon d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {appointmentData.email}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Icon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {appointmentData.phone}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {appointmentData.note}
                </dd>
              </div>
            </dl>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end space-x-3">
            {appointmentData.status !== "Pending" && (
              <button
                type="button"
                onClick={handleApproveAppointment}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Approve Appointment
              </button>
            )}

            {appointmentData.status !== "Cancelled" && (
              <button
                type="button"
                onClick={handleCancelAppointment}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
