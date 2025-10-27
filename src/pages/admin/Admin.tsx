import { Outlet } from "react-router-dom";
import Navbar from "./nav/Navbar";

export default function Admin() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <Outlet />
    </div>
  );
}
