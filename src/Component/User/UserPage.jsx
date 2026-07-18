import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
  Popconfirm,
} from "antd";

import api from "../../auth/axios";

function UserPage() {
  // ===================== STATE =====================

  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [editingUser, setEditingUser] =
    useState(null);

  const [form] = Form.useForm();

  // =====================
  // GET USERS
  // =====================

  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/users");

      setUsers(response.data.data);
    } catch (error) {
      console.log(error);

      message.error(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // =====================
  // CREATE / UPDATE USER
  // =====================

  const onFinish = async (values) => {
    try {
      setLoading(true);

      if (editingUser) {
        await api.put(
          `/users/${editingUser.id}`,
          values
        );

        message.success(
          "User Updated Successfully"
        );
      } else {
        await api.post("/users", values);

        message.success(
          "User Created Successfully"
        );
      }

      form.resetFields();

      setEditingUser(null);

      setOpen(false);

      getUsers();
    } catch (error) {
      console.log(error);

      message.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // DELETE USER
  // =====================

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);

      message.success(
        "User Deleted Successfully"
      );

      getUsers();
    } catch (error) {
      console.log(error);

      message.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  // =====================
  // EDIT USER
  // =====================

  const handleEdit = (record) => {
    setEditingUser(record);

    form.setFieldsValue({
      name: record.name,
      email: record.email,
      phone: record.phone,
      role: record.role,
    });

    setOpen(true);
  };
    // =====================
  // TABLE COLUMNS
  // =====================

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // =====================
  // JSX
  // =====================

  return (
    <div className="w-full p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all users in the system
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Add User
        </Button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm p-5">

        <Table
          rowKey="id"
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />

      </div>
            {/* Modal */}

      <Modal
        open={open}
        width={700}
        footer={null}
        destroyOnHidden
        title={
          editingUser
            ? "Edit User"
            : "Create User"
        }
        onCancel={() => {
          setOpen(false);
          setEditingUser(null);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="grid grid-cols-2 gap-4">

            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Enter Name",
                },
              ]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter Valid Email",
                },
              ]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Enter Phone Number",
                },
              ]}
            >
              <Input placeholder="Enter Phone Number" />
            </Form.Item>

            {!editingUser && (
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Enter Password",
                  },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>
            )}

            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Select Role",
                },
              ]}
            >
              <Select
                placeholder="Select Role"
                options={[
                  {
                    label: "Admin",
                    value: "ADMIN",
                  },
                  {
                    label: "Teacher",
                    value: "TEACHER",
                  },
                  {
                    label: "Student",
                    value: "STUDENT",
                  },
                ]}
              />
            </Form.Item>

          </div>

          <div className="flex justify-end gap-3 mt-6">

            <Button
              onClick={() => {
                setOpen(false);
                setEditingUser(null);
                form.resetFields();
              }}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {editingUser
                ? "Update User"
                : "Create User"}
            </Button>

          </div>

        </Form>
      </Modal>

    </div>
  );
}

export default UserPage;