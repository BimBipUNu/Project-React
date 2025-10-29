import { Link } from "react-router-dom";
import "./navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../slices";
import { userAction } from "../../../slices/user/user.slice";

export default function Navbar() {
  const userStore = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userAction.logout());
  };

  return (
    <div className="nav-container">
      {/* Nav bar */}
      <div className="flex justify-center">
        <div className="main xl:w-[1280px] md:w-[768px] w-[342px] h-[52px] flex-nowrap flex justify-between items-center">
          <div className="">
            <span className="text-[24px] text-white font-bold">GYM </span>
            <span className="text-[24px] text-white font-bold">MANAGEMENT</span>
          </div>
          <div className="tool flex items-center">
            <Link className="item text-white text-[16px]" to="/">
              Trang chủ
            </Link>
            <Link className="item text-white text-[16px]" to="/booking">
              Lịch tập
            </Link>

            {userStore.isLogin && userStore.data.role === "admin" && (
              <Link className="item text-white text-[16px]" to="/admin">
                Quản lý
              </Link>
            )}

            {userStore.isLogin ? (
              <>
                <span className="item text-white text-[16px]">
                  Xin chào, {userStore.data.fullName.toUpperCase()}
                </span>
                <button
                  onClick={handleLogout}
                  className="item text-white text-[16px] cursor-pointer hover:text-blue-300 transition"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link className="item text-white text-[16px]" to="/login">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
