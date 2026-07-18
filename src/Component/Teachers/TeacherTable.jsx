import { Table, Button, Space, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useAuth } from "../../auth/AuthContext";

function TeacherTable({
  teachers,
  loading,
  onEdit,
  onDelete,
}) {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isTeacher = user?.role === "TEACHER";

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Teacher Name",
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
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Action",
      key: "action",
      width: 220,

      render: (_, record) => (
        <Space>

          {/* ADMIN ONLY */}

          {isAdmin && (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => onEdit(record)}
              >
                Edit
              </Button>

              <Popconfirm
                title="Delete Teacher"
                description="Are you sure you want to delete this teacher?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(record.id)}
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                >
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}

          {/* TEACHER */}

          {isTeacher && (
            <span className="text-gray-500">
              View Only
            </span>
          )}

        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={teachers}
      loading={loading}
      bordered
      pagination={false}
      scroll={{
        x: true,
      }}
    />
  );
}

export default TeacherTable;