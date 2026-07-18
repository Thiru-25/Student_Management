import { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
} from "antd";

import api from "../../auth/axios";

const { Option } = Select;

function StudentModal({
  open,
  onClose,
  student,
  onSuccess,
}) {
  const [form] = Form.useForm();

  // ==========================
  // SET FORM VALUES
  // ==========================

  useEffect(() => {
    if (student) {
      form.setFieldsValue(student);
    } else {
      form.resetFields();
    }
  }, [student, form]);

  // ==========================
  // SUBMIT
  // ==========================

  const handleSubmit = async (values) => {
    try {
      if (student) {
        await api.put(
          `/student/update/${student.id}`,
          values
        );

        message.success("Student Updated Successfully");
      } else {
        await api.post(
          "/student/create",
          values
        );

        message.success("Student Added Successfully");
      }

      form.resetFields();

      onSuccess();
    } catch (error) {
      console.log(error);

      message.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  return (
    <Modal
      open={open}
      title={
        student
          ? "Edit Student"
          : "Add Student"
      }
      footer={null}
      width={700}
      destroyOnHidden
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">

          <Form.Item
            label="Student Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Enter Student Name",
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

          <Form.Item
            label="Department"
            name="department"
            rules={[
              {
                required: true,
                message: "Select Department",
              },
            ]}
          >
            <Select placeholder="Select Department">
              <Option value="ComputerScience">
                Computer Science
              </Option>

              <Option value="Mathematics">
                Mathematics
              </Option>

              <Option value="Physics">
                Physics
              </Option>

              <Option value="Biology">
                Biology
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Year"
            name="year"
            rules={[
              {
                required: true,
                message: "Select Year",
              },
            ]}
          >
            <Select placeholder="Select Year">
              <Option value="1st Year">
                1st Year
              </Option>

              <Option value="2nd Year">
                2nd Year
              </Option>

              <Option value="3rd Year">
                3rd Year
              </Option>

              <Option value="4th Year">
                4th Year
              </Option>
            </Select>
          </Form.Item>

        </div>

        <div className="flex justify-end gap-3 mt-5">

          <Button
            onClick={() => {
              form.resetFields();
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            {student
              ? "Update Student"
              : "Add Student"}
          </Button>

        </div>
      </Form>
    </Modal>
  );
}

export default StudentModal;