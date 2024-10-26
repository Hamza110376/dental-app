import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Appointments from "./pages/Appointments";
import AppointmentDetails from "./pages/AppointmentDetails";
import AppointmentForm from "./pages/AppointmentForm";
import AppointmentUpdateForm from "./pages/AppointmentUpdateForm";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import PatientForm from "./pages/PatientForm";
// import PatientUpdateForm from "./pages/PatientUpdateForm";
import Login from "./pages/Login";
import "./index.css";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <Appointments />,
        },
        {
          path: "appointments/details/:id",
          element: <AppointmentDetails />,
        },
        {
          path: "appointments/form",
          element: <AppointmentForm />,
        },
        {
          path: "appointments/form/:id",
          element: <AppointmentUpdateForm />,
        },
        {
          path: "/patients",
          element: <Patients />,
        },
        {
          path: "/patients/details/:id",
          element: <PatientDetails />,
        },
        {
          path: "/patients/form",
          element: <PatientForm />,
        },
        // {
        //   path: "/patients/form/:id",
        //   element: <PatientUpdateForm />,
        // },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={routers} />;
}

export default App;
