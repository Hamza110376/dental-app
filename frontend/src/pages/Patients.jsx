import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../utils/apiClient";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await apiClient.get("/patients", {
          params: {
            page,
            pageSize,
            keyword: searchTerm,
          },
        });
        setPatients(response.data.data);
        setTotalPages(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();
  }, [searchTerm, page, pageSize]);

  const filteredPatients = patients ? patients : [];

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Patients</h1>
          <button className="md:hidden bg-blue-500 text-white p-2 rounded-md"></button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
              Patient List
            </h2>
            <div className="w-full md:w-1/3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patients by name, email or phone..."
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Age</th>
                  <th className="py-3 px-6 text-left">Phone</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Treatment</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="font-medium">{patient.name}</div>
                      </td>
                      <td className="py-3 px-6 text-left">{patient.age}</td>
                      <td className="py-3 px-6 text-left">{patient.phone}</td>
                      <td className="py-3 px-6 text-left">{patient.email}</td>
                      <td className="py-3 px-6 text-left">
                        {patient.treatment || "No treatment provided"}
                      </td>
                      <td className="py-3 px-6 text-left">
                        <Link to={`/patients/details/${patient._id}`}>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-600">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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
      </div>
    </main>
  );
};

export default Patients;
