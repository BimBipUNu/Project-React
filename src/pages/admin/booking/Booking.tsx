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
import type { AppDispatch, RootState } from "../../../slices";
import {
  deleteBooking,
  fetchBooking,
  updateBooking,
} from "../../../slices/booking/booking.slice";
import { Form, Input, Modal, Popconfirm, Select } from "antd";
import type { Booking, BookingDetail } from "../../../types/booking.type";
import axios from "axios";
import type { Course } from "../../../types/course.type";
import type { User } from "../../../types/user.type";
import Api from "../../../apis";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Booking() {
  const bookingStore = useSelector((state: RootState) => state.booking);
  const [editingBooking, setEditingBooking] = useState<BookingDetail | null>(
    null
  );
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState({
    classType: "Tất cả",
    email: "",
    date: "",
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchBooking());
    const loadData = async () => {
      try {
        const [coursesRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_LOCALHOST_API}/courses`),
          axios.get(`${import.meta.env.VITE_LOCALHOST_API}/users`),
        ]);
        setCourses(coursesRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, [dispatch]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const formatTimeRange = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const startHour = parseInt(hours);
    // const startMin = parseInt(minutes);
    const endHour = (startHour + 2) % 24;

    const startTime = `${hours}:${minutes}`;
    const endTime = `${endHour.toString().padStart(2, "0")}:${minutes}`;

    return `${startTime} - ${endTime}`;
  };

  //Edit
  const handleEdit = (booking: BookingDetail) => {
    setEditingBooking(booking);
    form.setFieldsValue({
      userId: booking.userId,
      courseId: booking.courseId,
      bookingDate: booking.bookingDate,
      bookingTime: booking.bookingTime,
      status: booking.status,
    });
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      const values = await form.validateFields();
      if (editingBooking) {
        const updatedBooking = {
          id: editingBooking.id,
          userId: values.userId,
          courseId: values.courseId,
          bookingDate: values.bookingDate,
          bookingTime: values.bookingTime,
          status: values.status,
        };
        await dispatch(updateBooking(updatedBooking));
        dispatch(fetchBooking()); // Refresh danh sách
        setIsEditModalVisible(false);
        setEditingBooking(null);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setEditingBooking(null);
    form.resetFields();
  };

  //ADD New Booking
  const [isAdd, setIsAdd] = useState(false);
  const handleAddBooking = async () => {
    try {
      const values = await form.validateFields();

      const newBooking: Booking = {
        id: Date.now(),
        userId: values.userId,
        courseId: values.courseId,
        bookingDate: values.bookingDate,
        bookingTime: values.bookingTime,
        status: values.status,
      };
      await Api.booking.POST(newBooking);
      dispatch(fetchBooking()); // Refresh danh sách
      setIsEditModalVisible(false);
      setIsAdd(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
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
      booking.user?.email?.toLowerCase().includes(filter.email.toLowerCase());

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
    <div className="w-full">
      {/* Main Content */}
      <main className="flex-1 px-8 py-6 overflow-y-auto w-auto">
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
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
            onClick={() => {
              setIsAdd(true);
              setIsEditModalVisible(true);
            }}
          >
            Thêm Lịch tập mới
          </button>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3">Lớp học</th>
                <th className="p-3">Ngày tập</th>
                <th className="p-3">Khung giờ</th>
                <th className="p-3">Họ tên</th>
                <th className="p-3">Email</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={7}>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filteredData.map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{row.course?.type}</td>
                    <td className="p-3">{row.bookingDate}</td>
                    <td className="p-3">{formatTimeRange(row.bookingTime)}</td>
                    <td className="p-3">{row.user?.fullName}</td>
                    <td className="p-3">{row.user?.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          row.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : row.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.status === "confirmed"
                          ? "Đã xác nhận"
                          : row.status === "pending"
                          ? "Chờ xác nhận"
                          : "Đã hủy"}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => {
                          setIsAdd(false);
                          handleEdit(row);
                        }}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Sửa
                      </button>
                      <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn chắc chắn muốn xóa lịch này??"
                        okText="Xóa"
                        cancelText="Không"
                        onConfirm={async () => {
                          await dispatch(deleteBooking(row));
                          dispatch(fetchBooking());
                        }}
                      >
                        <button className="text-red-600 hover:underline text-sm">
                          Xóa
                        </button>
                      </Popconfirm>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Modal sửa lịch */}
        <Modal
          title={isAdd ? "Thêm mới lịch tập" : "Sửa lịch tập"}
          open={isEditModalVisible}
          onOk={isAdd ? handleAddBooking : handleSaveEdit}
          onCancel={handleCancelEdit}
          okText={isAdd ? "Thêm mới" : "Lưu"}
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="userId"
              label="Người dùng"
              rules={[{ required: true, message: "Vui lòng chọn người dùng" }]}
            >
              <Select placeholder="Chọn người dùng">
                {users.map((user) => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.fullName} ({user.email})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="courseId"
              label="Khóa học"
              rules={[{ required: true, message: "Vui lòng chọn khóa học" }]}
            >
              <Select placeholder="Chọn khóa học">
                {courses.map((course) => (
                  <Select.Option key={course.id} value={course.id}>
                    {course.name} ({course.type})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="bookingDate"
              label="Ngày tập"
              rules={[{ required: true, message: "Vui lòng chọn ngày tập" }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              name="bookingTime"
              label="Khung giờ"
              rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
            >
              <Input type="time" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            >
              <Select placeholder="Chọn trạng thái">
                <Select.Option value="pending">Chờ xác nhận</Select.Option>
                <Select.Option value="confirmed">Đã xác nhận</Select.Option>
                <Select.Option value="cancelled">Đã hủy</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </div>
  );
}
