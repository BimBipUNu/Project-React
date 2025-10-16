export default function Register() {
  return (
    <div className="w-screen h-screen bg-[#f7f8fa] flex justify-center items-center font-sans">
      <div className="bg-white w-[400px] rounded-[8px] shadow-md px-[32px] py-[36px] flex flex-col items-center">
        <h1 className="text-[20px] font-bold mb-[24px]">Đăng ký tài khoản</h1>

        {/* Họ và tên */}
        <div className="w-full mb-[16px]">
          <label className="block text-[14px] font-medium text-gray-700 mb-[6px]">
            Họ và tên
          </label>
          <input
            type="text"
            className="w-full h-[40px] border border-gray-300 rounded-[4px] px-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="w-full mb-[16px]">
          <label className="block text-[14px] font-medium text-gray-700 mb-[6px]">
            Email
          </label>
          <input
            type="email"
            className="w-full h-[40px] border border-gray-300 rounded-[4px] px-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Mật khẩu */}
        <div className="w-full mb-[16px]">
          <label className="block text-[14px] font-medium text-gray-700 mb-[6px]">
            Mật khẩu
          </label>
          <input
            type="password"
            className="w-full h-[40px] border border-gray-300 rounded-[4px] px-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="w-full mb-[20px]">
          <label className="block text-[14px] font-medium text-gray-700 mb-[6px]">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            className="w-full h-[40px] border border-gray-300 rounded-[4px] px-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Nút đăng ký */}
        <button className="w-full h-[40px] bg-blue-500 hover:bg-blue-600 text-white font-medium text-[15px] rounded-[4px] transition-all duration-200">
          Đăng ký
        </button>

        {/* Đăng nhập */}
        <p className="text-[14px] text-gray-600 mt-[16px]">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
}
