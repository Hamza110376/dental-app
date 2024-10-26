import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../utils/apiClient";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [analytics, setAnalytics] = useState({
    todayAppointments: 0,
    pendingConfirmations: 0,
    confirmedAppointments: 0,
  });

  useEffect(() => {
    fetchAppointments();
  }, [page, pageSize, keyword]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await apiClient.get("/appointments", {
        params: { page, pageSize, keyword },
      });
      setAppointments(response.data.data);
      setTotalPages(response.data.count);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await apiClient.get("/appointments/analytics");
      setAnalytics(response.data.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Appointments</h2>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Today's Appointments</h3>
            <p className="text-3xl font-bold text-blue-600">
              {analytics.todayAppointments}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Pending Confirmations
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {analytics.pendingConfirmations}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Confirmed</h3>
            <p className="text-3xl font-bold text-green-600">
              {analytics.confirmedAppointments}
            </p>
          </div>
        </div>

        {/* Appointment List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between">
            <input
              type="text"
              placeholder="Search appointments..."
              value={keyword}
              onChange={handleSearch}
              className="p-2 border rounded"
            />
            <Link
              to={"/appointments/form"}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
            >
              Create an appointment
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4">Patient Name</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Time</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment) => (
                <tr key={appointment._id} className="border-t">
                  <td className="p-4">{appointment.name}</td>
                  <td className="p-4">
                    {new Date(appointment.dateTime).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {new Date(appointment.dateTime).toLocaleTimeString()}
                  </td>
                  <td className="p-4">{appointment.appointmentType}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === "Approved"
                          ? "bg-green-200 text-green-800"
                          : appointment.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/appointments/details/${appointment._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 border-t bg-gray-50 flex justify-end items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 rounded mr-2"
            >
              Previous
            </button>
            <span className="mx-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
