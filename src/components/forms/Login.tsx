import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../slices";
import { useDispatch } from "react-redux";
import { loginFlow } from "../../slices/user/user.slice";
import { message } from "antd";

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((pre) => ({ ...pre, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = form;

    const newErrors = {
      email: "",
      password: "",
      message: "",
    };

    let hasError = false;

    if (email.trim() === "") {
      newErrors.email = "Email không được để trống";
      hasError = true;
    }

    if (password.trim() === "") {
      newErrors.password = "Mật khẩu không được để trống";
      hasError = true;
    }

    setError(newErrors);

    if (!hasError) {
      try {
        const result = await dispatch(loginFlow({ email, password })).unwrap();
        if (result.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Email hoặc mật khẩu không đúng",
        });
        return error;
      }
    }
  };
  return (
    <div className="w-screen h-screen bg-[#f7f8fa] flex justify-center items-center font-sans">
      {contextHolder}
      <div className="bg-white w-[448px] rounded-[8px] shadow-md px-[32px] py-[36px] flex flex-col items-center">
        <h1 className="text-[20px] font-bold mb-[24px]">Đăng nhập</h1>

        <form className="w-full mb-[16px]">
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

          {/* Nút đăng nhập */}
          <button
            className="w-full h-[40px] bg-blue-500 hover:bg-blue-600 text-white font-medium text-[15px] rounded-[4px] transition-all duration-200"
            onClick={(e) => {
              handleSubmit(e);
            }}
            type="submit"
          >
            Đăng nhập
          </button>
        </form>

        {/* Đăng ký */}
        <p className="text-[14px] text-gray-600 mt-[16px]">
          Chưa có tài khoản?{" "}
          <Link className="text-blue-500" to="/login">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
