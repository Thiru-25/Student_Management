import { Table, Button, Popconfirm, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useAuth } from "../../auth/AuthContext";

function StudentTable({
  students,
  loading,
  onEdit,
  onDelete,
}) {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isTeacher = user?.role === "TEACHER";
  const isStudent = user?.role === "STUDENT";

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center",
    },
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
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",

      render: (_, record) => (
        <Space>

          {/* Edit */}
          {(isAdmin || isTeacher || isStudent) && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            >
              Edit
            </Button>
          )}

          {/* Delete */}
          {isAdmin && (
            <Popconfirm
              title="Delete Student"
              description="Are you sure you want to delete this student?"
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
          )}

        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={students}
      pagination={false}
      scroll={{ x: 900 }}
    />
  );
}

export default StudentTable;