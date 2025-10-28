import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { userAction } from "../../../slices/user/user.slice";
// import Booking from "./booking/Booking";

export default function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userAction.logout());
  };
  return (
    <>
      <aside className="w-64 bg-[#1E293B] text-white flex flex-col py-6 px-4">
        <h1 className="text-lg font-semibold mb-6 px-2">Admin Dashboard</h1>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="booking"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-600 text-white rounded-lg px-3 py-2 text-sm font-medium"
                : "text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            }
          >
            Quản lý lịch
          </NavLink>
          <NavLink
            to="user"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-600 text-white rounded-lg px-3 py-2 text-sm font-medium"
                : "text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            }
          >
            Quản lý người dùng
          </NavLink>
          <NavLink
            to="course"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-600 text-white rounded-lg px-3 py-2 text-sm font-medium"
                : "text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            }
          >
            Quản lý lớp học
          </NavLink>
          <NavLink
            to="/"
            className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          >
            Trang chủ
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 rounded-lg px-3 py-2 text-sm font-medium mt-auto text-left"
          >
            Đăng xuất
          </button>
        </nav>
      </aside>
      {/* <Booking />; */}
    </>
  );
}
