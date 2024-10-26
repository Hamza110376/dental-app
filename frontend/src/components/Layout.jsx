import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="ml-64 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
