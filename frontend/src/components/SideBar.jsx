import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  UserIcon,
  CalendarIcon,
  ClipboardIcon,
  Cog6ToothIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

const SideBar = () => {
  return (
    <div className="fixed w-64 h-screen bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">Dental Care</h1>
      </div>
      <NavLink className="mt-4">
        <Link
          to={"/"}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <CalendarIcon className="w-5 h-5 mr-2" />
          Appointments
        </Link>
        {/* <Link
          to={"/appointments/form"}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <ClipboardIcon className="w-5 h-5 mr-2" />
          Add Appointment
        </Link> */}
        <Link
          to={"/patients"}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <UserIcon className="w-5 h-5 mr-2" />
          Patients
        </Link>
        <Link
          to={"/patients/form"}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <NewspaperIcon className="w-5 h-5 mr-2" />
          Add Patient
        </Link>
      </NavLink>
    </div>
  );
}

export default SideBar