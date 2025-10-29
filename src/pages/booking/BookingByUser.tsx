import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar/Navbar.tsx";
import type { AppDispatch, RootState } from "../../slices/index.ts";
import { useEffect, useState } from "react";
import {
  addNewBooking,
  deleteBooking,
  fetchBooking,
  updateBooking,
} from "../../slices/booking/booking.slice.ts";
import { fetchCourse } from "../../slices/course/course.slice.ts";
import { Form, Input, Modal, Popconfirm, Select } from "antd";
import type { Booking, BookingDetail } from "../../types/booking.type.ts";

export default function BookingByUser() {
  const bookingStore = useSelector((state: RootState) => state.booking);
  const courseStore = useSelector((state: RootState) => state.course);
  const userStore = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  //lọc dữ liệu theo user hiện tại
  const filteredData = bookingStore.data.filter(
    (booking) => booking.userId === userStore.data.id
  );

  useEffect(() => {
    dispatch(fetchBooking());
    dispatch(fetchCourse());
  }, [dispatch]);

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
  const [form] = Form.useForm();
  const [editingBooking, setEditingBooking] = useState<BookingDetail | null>(
    null
  );
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleEdit = (booking: BookingDetail) => {
    setEditingBooking(booking);
    form.setFieldsValue({
      userId: userStore.data.id,
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
        const updatedBooking: Booking = {
          id: editingBooking.id,
          userId: values.userId,
          courseId: values.courseId,
          bookingDate: values.bookingDate,
          bookingTime: values.bookingTime,
          status: "pending",
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

  //Add
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
      await dispatch(addNewBooking(newBooking));
      await dispatch(fetchBooking()); // Refresh danh sách
      setIsEditModalVisible(false);
      setIsAdd(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Tiêu đề và nút */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Quản lý lịch tập</h1>
          <button
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
            onClick={() => {
              form.setFieldsValue({
                userId: userStore.data.id,
                status: "pending",
              });

              setIsAdd(true);
              setIsEditModalVisible(true);
            }}
          >
            Đặt lịch mới
          </button>
        </div>
        {/* Bảng hiển thị dữ liệu */}
        <div className="overflow-x-auto bg-white rounded-md shadow-sm">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Lớp học</th>
                <th className="px-4 py-3 font-medium">Ngày tập</th>
                <th className="px-4 py-3 font-medium">Khung giờ</th>
                <th className="px-4 py-3 font-medium">Họ tên</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
                <th className="px-4 py-3 font-medium text-center">Thao tác</th>
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
              <p>
                {userStore.data.email} - {userStore.data.fullName}
              </p>
              <Form.Item
                name="userId"
                label="Người dùng"
                rules={[
                  { required: true, message: "Vui lòng chọn người dùng" },
                ]}
              >
                <Input type="text" disabled />
              </Form.Item>

              <Form.Item
                name="courseId"
                label="Khóa học"
                rules={[{ required: true, message: "Vui lòng chọn khóa học" }]}
              >
                <Select placeholder="Chọn khóa học">
                  {courseStore.data.map((course) => (
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
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái" },
                ]}
              >
                <Select placeholder="Chọn trạng thái" disabled>
                  <Select.Option value="pending">Chờ xác nhận</Select.Option>
                  <Select.Option value="confirmed">Đã xác nhận</Select.Option>
                  <Select.Option value="cancelled">Đã hủy</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
}
