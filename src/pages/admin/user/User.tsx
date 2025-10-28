import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { User } from "../../../types/user.type";
import Api from "../../../apis";
import { Form, Input, Modal, Popconfirm, Select } from "antd";
import type { AppDispatch, RootState } from "../../../slices";
import {
  addNewUserByAdmin,
  fetchUser,
  updateUser,
} from "../../../slices/user/userManagement.slice";

export default function User() {
  const userStore = useSelector((state: RootState) => state.user);
  const userManagementStore = useSelector(
    (state: RootState) => state.userManagement
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  //Edit user
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (user: User) => {
    setIsAdd(false);
    setEditingUser(user);

    form.setFieldsValue({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      role: user.role,
      phone: user.phone,
    });
    setIsModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        const updatedUser = {
          ...editingUser,
          id: values.id,
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: values.role,
          phone: values.phone,
        };
        await dispatch(updateUser(updatedUser));
        dispatch(fetchUser()); // Refresh danh sách
        setIsModalVisible(false);
        setEditingUser(null);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    setIsAdd(false);
    form.resetFields();
  };

  //Add New User
  const handleAddUser = async () => {
    try {
      const values = await form.validateFields();

      const newUser: User = {
        id: Date.now(),
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
        phone: values.phone,
      };
      await dispatch(addNewUserByAdmin(newUser));
      dispatch(fetchUser()); // Refresh danh sách
      setIsModalVisible(false);
      setIsAdd(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  // const handleOpenAddModal = () => {
  //   setIsAdd(true);
  //   setEditingUser(null);
  //   form.resetFields(); // ✅ Reset form trước khi mở modal Add
  //   setIsModalVisible(true);
  // };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-8 py-6 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quản lý Người dùng</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
          onClick={() => {
            setIsAdd(true);
            setIsModalVisible(true);
          }}
        >
          Thêm người dùng mới
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                STT
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Tên
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Password
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                SĐT
              </th>
              <th className="px-6 py-3 text-right font-semibold text-gray-700">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {userManagementStore.data.map((user, index) => {
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-6 py-3">{user.fullName}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    {" * ".repeat(user.password.length)}
                  </td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3">
                    {user.phone ? user.phone : "Chưa có"}
                  </td>
                  <td className="px-6 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className={
                        user.id === userStore.data.id
                          ? "text-gray-600 text-sm font-medium"
                          : "text-blue-600 hover:text-blue-800 text-sm font-medium"
                      }
                      disabled={user.id === userStore.data.id ? true : false}
                    >
                      Sửa
                    </button>

                    <Popconfirm
                      title="Xác nhận xóa"
                      description="Bạn chắc chắn muốn xóa người dùng này??"
                      okText="Xóa"
                      cancelText="Không"
                      onConfirm={async () => {
                        await Api.user.DELETE(user);
                        dispatch(fetchUser());
                      }}
                    >
                      <button
                        className={
                          user.id === userStore.data.id
                            ? "text-gray-600 text-sm font-medium"
                            : "text-red-600 hover:text-red-800 text-sm font-medium"
                        }
                        disabled={user.id === userStore.data.id ? true : false}
                      >
                        Xóa
                      </button>
                    </Popconfirm>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Modal thông tin người dùng */}
        <Modal
          title={isAdd ? "Thêm người dùng" : "Sửa thông tin người dùng"}
          open={isModalVisible}
          onOk={isAdd ? handleAddUser : handleSaveEdit}
          onCancel={handleCancel}
          okText={isAdd ? "Thêm mới" : "Lưu"}
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item name="id" label="ID" hidden={isAdd}>
              <Input type="text" disabled />
            </Form.Item>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
            >
              <Select placeholder="Chọn vai trò">
                <Select.Option value="admin">admin</Select.Option>
                <Select.Option value="user">user</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại">
              <Input type="text" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
