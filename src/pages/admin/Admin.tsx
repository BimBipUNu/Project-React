import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Calendar, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../slices";
import { fetchBooking } from "../../slices/booking/booking.slice";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const bookingStore = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState({
    classType: "Tất cả",
    email: "",
    date: "",
  });

  useEffect(() => {
    dispatch(fetchBooking());
  }, [dispatch]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  //Table
  const dataTable = bookingStore.data;

  // Data thống kê
  const stats = {
    gym: dataTable.filter((booking) => booking.course?.type == "Gym").length,
    yoga: dataTable.filter((booking) => booking.course?.type == "Yoga").length,
    zumba: dataTable.filter((booking) => booking.course?.type == "Zumba")
      .length,
  };

  // Lọc dữ liệu theo bộ lọc
  const filteredData = dataTable.filter((booking) => {
    // Lọc theo lớp học
    const matchClassType =
      filter.classType === "Tất cả" ||
      booking.course?.type === filter.classType;

    // Lọc theo email (không phân biệt hoa thường)
    const matchEmail =
      filter.email === "" ||
      booking.user?.email.toLowerCase().includes(filter.email.toLowerCase());

    // Lọc theo ngày
    const matchDate = filter.date === "" || booking.bookingDate === filter.date;

    return matchClassType && matchEmail && matchDate;
  });

  const data = {
    labels: ["Gym", "Yoga", "Zumba"],
    datasets: [
      {
        label: "Số lượng lịch đặt",
        data: [stats.gym, stats.yoga, stats.zumba],
        backgroundColor: [
          "rgba(54, 162, 235, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E293B] text-white flex flex-col py-6 px-4">
        <h1 className="text-lg font-semibold mb-6 px-2">Admin Dashboard</h1>
        <nav className="flex flex-col gap-2">
          <a
            href="#"
            className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm font-medium"
          >
            Quản lý lịch
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 text-sm font-medium"
          >
            Quản lý dịch vụ
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 text-sm font-medium"
          >
            Trang chủ
          </a>
          <a
            href="#"
            className="text-red-400 hover:text-red-300 rounded-lg px-3 py-2 text-sm font-medium mt-auto"
          >
            Đăng xuất
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6 overflow-y-auto">
        {/* Thống kê */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Thống kê lịch tập</h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500">Tổng số lịch Gym</p>
              <p className="text-3xl font-bold text-blue-600">{stats.gym}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500">Tổng số lịch Yoga</p>
              <p className="text-3xl font-bold text-green-600">{stats.yoga}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500">Tổng số lịch Zumba</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.zumba}
              </p>
            </div>
          </div>

          {/* Biểu đồ */}
          <div className="bg-white rounded-lg shadow-sm  p-4 mb-8 h-[300px]">
            <Bar data={data} options={options} />
          </div>
        </section>

        {/* Bộ lọc */}
        <section className="bg-white rounded-lg shadow-sm  p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Bộ lọc</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Lớp học */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Lớp học
              </label>
              <select
                name="classType"
                value={filter.classType}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Tất cả</option>
                <option>Gym</option>
                <option>Yoga</option>
                <option>Zumba</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  name="email"
                  type="text"
                  value={filter.email}
                  onChange={handleFilterChange}
                  placeholder="Tìm theo email"
                  className="w-full border border-gray-300 rounded-lg p-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Ngày */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Ngày</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  name="date"
                  type="date"
                  value={filter.date}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg p-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bảng dữ liệu */}
        <section className="bg-white rounded-lg shadow-sm p-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3">Lớp học</th>
                <th className="p-3">Ngày tập</th>
                <th className="p-3">Khung giờ</th>
                <th className="p-3">Họ tên</th>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={6}>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filteredData.map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{row.course?.type}</td>
                    <td className="p-3">{row.bookingDate}</td>
                    <td className="p-3">{row.bookingTime}</td>
                    <td className="p-3">{row.user?.fullName}</td>
                    <td className="p-3">{row.user?.email}</td>
                    <td className="p-3 text-center space-x-2">
                      <button className="text-blue-600 hover:underline text-sm">
                        Sửa
                      </button>
                      <button className="text-red-600 hover:underline text-sm">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
