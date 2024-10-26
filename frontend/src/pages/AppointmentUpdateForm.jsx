import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

export default function AppointmentUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateTime: "",
    appointmentType: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    apiClient
      .get(`/appointments/${id}`)
      .then((response) => {
        setFormData(response.data.data);
      })
      .catch((error) => {
        alert("An error occurred while fetching the appointment details");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient
      .put(`/appointments/${id}`, formData)
      .then(() => {
        navigate("/");
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
          alert("An error occurred while updating the appointment");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Update Appointment
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="dateTime"
                className="block text-sm font-medium text-gray-700"
              >
                Preferred Date and Time
              </label>
              <div className="mt-1">
                <input
                  id="dateTime"
                  name="dateTime"
                  type="datetime-local"
                  required
                  value={formData.dateTime}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                />
                {errors.dateTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.dateTime}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="appointmentType"
                className="block text-sm font-medium text-gray-700"
              >
                Appointment Type
              </label>
              <div className="mt-1">
                <select
                  id="appointmentType"
                  name="appointmentType"
                  required
                  value={formData.appointmentType}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select an appointment type</option>
                  <option value="Regular Check-up">Regular Check-up</option>
                  <option value="Teeth Cleaning">Teeth Cleaning</option>
                  <option value="Cavity Filling">Cavity Filling</option>
                  <option value="Root Canal">Root Canal</option>
                  <option value="Other">Other</option>
                </select>
                {errors.appointmentType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.appointmentType}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="note"
                  name="note"
                  rows="3"
                  value={formData.note}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Any additional information or concerns"
                  onChange={handleChange}
                ></textarea>
                {errors.note && (
                  <p className="text-red-500 text-xs mt-1">{errors.note}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
