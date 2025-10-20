import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../../types/user.type";
import { addNewUser } from "../../slices/user/user.slice";
import type { AppDispatch } from "../../slices";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((pre) => ({ ...pre, [id]: value }));
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = form;

    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let hasError = false;

    if (fullName.trim() === "") {
      newErrors.fullName = "Tên không được để trống";
      hasError = true;
    }
    if (email.trim() === "") {
      newErrors.email = "Email không được để trống";
      hasError = true;
    } else {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(email.trim())) {
        newErrors.email = "Email không đúng định dạng";
        hasError = true;
      }
    }
    if (password.trim() === "") {
      newErrors.password = "Mật khẩu không được để trống";
      hasError = true;
    } else {
      if (password.trim().length < 8) {
        newErrors.password = "Mật khẩu không được ít hơn 8 ký tự";
        hasError = true;
      }
    }

    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
      hasError = true;
    } else {
      if (confirmPassword.trim() !== password.trim()) {
        newErrors.confirmPassword = "Xác nhận mật khẩu không khớp với mật khẩu";
        hasError = true;
      }
    }

    setError(newErrors);
    const newUser: User = {
      id: Date.now(),
      fullName: fullName.trim(),
      email: email.trim(),
      password: password.trim(),
      role: "user",
      phone: "",
    };

    if (!hasError) {
      await dispatch(addNewUser(newUser));

      navigate("/");
    }
  };
  return (
    <div className="w-screen h-screen bg-[#f7f8fa] flex justify-center items-center font-sans">
      <div className="bg-white w-[448px] rounded-[8px] shadow-md px-[32px] py-[36px] flex flex-col items-center">
        <h1 className="text-[20px] font-bold mb-[24px]">Đăng ký tài khoản</h1>

        <form className="w-full mb-[16px]">
          {/* Họ và tên */}
          <div className="w-full mb-[16px]">
            <label className="block text-[14px] font-medium text-gray-700 mb-[6px]">
              Họ và tên
            </label>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-300 rounded-[4px] px-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="fullName"
              value={form.fullName}
              onChange={(e) => handleChange(e)}
            />
            {error.fullName ? (
              <div className="text-red-600">{error.fullName}</div>
            ) : (
              <div></div>
            )}
          </div>

          {/* Email */}
          <div className="w-full mb-[16px]">
            <label className="block text-[14px] font-medium text-gray-700 mb-[6px]">
              Email
            </label>
            <input
              type="email"
              className="w-full h-[40px] border border-gray-300 rounded-[4px] px-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="email"
              value={form.email}
              onChange={(e) => handleChange(e)}
            />
            {error.email ? (
              <div className="text-red-600">{error.email}</div>
            ) : (
              <div></div>
            )}
          </div>

          {/* Mật khẩu */}
          <div className="w-full mb-[16px]">
            <label className="block text-[14px] font-medium text-gray-700 mb-[6px]">
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full h-[40px] border border-gray-300 rounded-[4px] px-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="password"
              value={form.password}
              onChange={(e) => handleChange(e)}
            />
            {error.password ? (
              <div className="text-red-600">{error.password}</div>
            ) : (
              <div></div>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="w-full mb-[20px]">
            <label className="block text-[14px] font-medium text-gray-700 mb-[6px]">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="w-full h-[40px] border border-gray-300 rounded-[4px] px-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
            {error.confirmPassword ? (
              <div className="text-red-600">{error.confirmPassword}</div>
            ) : (
              <div></div>
            )}
          </div>

          {/* Nút đăng ký */}
          <button
            className="w-full h-[40px] bg-blue-500 hover:bg-blue-600 text-white font-medium text-[15px] rounded-[4px] transition-all duration-200"
            onClick={(e) => {
              handleSubmit(e);
            }}
            type="submit"
          >
            Đăng ký
          </button>
        </form>

        {/* Đăng nhập */}
        <p className="text-[14px] text-gray-600 mt-[16px]">
          Đã có tài khoản?{" "}
          <Link className="text-blue-500" to="/login">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
