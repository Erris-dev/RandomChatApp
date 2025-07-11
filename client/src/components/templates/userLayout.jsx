// src/components/layouts/UserLayout.jsx
import NavigationBar from "../organism/navigationBar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex h-screen bg-[#F9F9F9]">
      <NavigationBar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
