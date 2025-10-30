import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Input, Modal, Popconfirm } from "antd";
import type { AppDispatch, RootState } from "../../../slices";
import {
  addNewCourse,
  deleteCourse,
  fetchCourse,
  updateCourse,
} from "../../../slices/course/course.slice";
import type { Course } from "../../../types/course.type";
import { uploadImage } from "../../../cloundinary/uploadImage";

export default function Course() {
  const courseStore = useSelector((state: RootState) => state.course);
  const dispatch = useDispatch<AppDispatch>();
  const [isAdd, setIsAdd] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); //Hình ảnh
  const [editImageUrl, setEditImageUrl] = useState(""); // Theo dõi việc up ảnh khi edit

  useEffect(() => {
    dispatch(fetchCourse());
    setImageUrl("");
  }, [dispatch]);

  //Edit Course
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (course: Course) => {
    setEditImageUrl(course.imageUrl); // Lưu URL ảnh hiện tại
    setIsAdd(false);
    setEditingCourse(course);

    form.setFieldsValue({
      id: course.id,
      name: course.name,
      type: course.type,
      description: course.description,
      price: course.price,
      imageUrl: course.imageUrl,
    });
    setIsModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      const values = await form.validateFields();
      if (editingCourse) {
        const updatedCourse: Course = {
          ...editingCourse,
          id: values.id,
          name: values.name,
          type: values.type,
          description: values.description,
          price: values.price,
          imageUrl: imageUrl || values.imageUrl,
        };
        await dispatch(updateCourse(updatedCourse));
        dispatch(fetchCourse()); // Refresh danh sách
        setIsModalVisible(false);
        setEditingCourse(null);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCourse(null);
    setIsAdd(false);
    form.resetFields();
  };

  //Add New Course
  const handleAddCourse = async () => {
    try {
      const values = await form.validateFields();

      const newCourse: Course = {
        id: Date.now(),
        name: values.name,
        type: values.type,
        description: values.description,
        price: values.price,
        imageUrl: imageUrl,
      };
      await dispatch(addNewCourse(newCourse));
      dispatch(fetchCourse()); // Refresh danh sách
      setIsModalVisible(false);
      setIsAdd(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };
  //Upload img
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = await uploadImage(file);
      if (url) {
        setImageUrl(url);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-8 py-6 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quản lý Khóa học</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
          onClick={() => {
            setIsAdd(true);
            setIsModalVisible(true);
          }}
        >
          Thêm Khóa học mới
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Tên khóa học
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Loại khóa học
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Giá
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                IMG
              </th>
              <th
                className="px-6 py-3 text-right font-semibold text-gray-700"
                colSpan={2}
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courseStore.data.map((course) => {
              return (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{course.name}</td>
                  <td className="px-6 py-3">{course.type}</td>
                  <td className="px-6 py-3">{course.description}</td>
                  <td className="px-6 py-3">{course.price}</td>
                  <td className="px-6 py-3">
                    <img
                      src={course.imageUrl}
                      alt="img"
                      className="w-[80px] h-[50px]"
                    />
                  </td>
                  <td className="px-6 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-blue-600 text-sm font-medium"
                    >
                      Sửa
                    </button>

                    <Popconfirm
                      title="Xác nhận xóa"
                      description="Bạn chắc chắn muốn xóa người dùng này??"
                      okText="Xóa"
                      cancelText="Không"
                      onConfirm={async () => {
                        await dispatch(deleteCourse(course));
                        dispatch(fetchCourse());
                      }}
                    >
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Xóa
                      </button>
                    </Popconfirm>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Modal Khóa học */}
        <Modal
          title={isAdd ? "Thêm khóa học" : "Sửa thông tin khóa học"}
          open={isModalVisible}
          onOk={isAdd ? handleAddCourse : handleSaveEdit}
          onCancel={handleCancel}
          okText={isAdd ? "Thêm mới" : "Lưu"}
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item name="id" label="ID" hidden={isAdd}>
              <Input type="text" disabled />
            </Form.Item>
            <Form.Item
              name="name"
              label=" Tên Khóa học"
              rules={[
                { required: true, message: "Vui lòng nhập tên khóa học" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="type"
              label="Loại"
              rules={[
                { required: true, message: "Vui lòng nhập loại khóa học" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Giá"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="imageUrl"
              label="IMG"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đường dẫn hoặc chọn hình ảnh",
                },
              ]}
            >
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Nhập đường dẫn hình ảnh"
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Hoặc tải lên hình ảnh mới:
                  </p>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="mb-2 border"
                  />
                </div>
                {/* Hiển thị preview ảnh */}
                {(imageUrl || editImageUrl) && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Xem trước:</p>
                    <img
                      src={imageUrl || editImageUrl}
                      alt="Preview"
                      className="max-w-[200px] rounded-md"
                    />
                  </div>
                )}
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
