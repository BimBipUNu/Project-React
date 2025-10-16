import { Link } from "react-router-dom";
import "./navbar.scss";

export default function Navbar() {
  return (
    <div>
      {/* Nav bar */}
      <div className="flex justify-center">
        <div className="main xl:w-[1280px] md:w-[768px] w-[342px] h-[52px] flex-nowrap flex justify-between items-center">
          <div className="">
            <span className="text-[24px] text-white font-bold">GYM </span>
            <span className="text-[24px] text-white font-bold">MANAGEMENT</span>
          </div>
          <div className="tool">
            <Link className="item text-white" to="/">
              Trang chủ
            </Link>
            <Link className="item text-white" to="/">
              Lịch tập
            </Link>
            <Link className="item text-white" to="/">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
