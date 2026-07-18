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

function TeacherModal({
  open,
  onClose,
  teacher,
  onSuccess,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (teacher) {
      form.setFieldsValue(teacher);
    } else {
      form.resetFields();
    }
  }, [teacher, form]);

  const handleSubmit = async (values) => {
    try {
      if (teacher) {
        await api.put(`/teachers/${teacher.id}`, values);
        message.success("Teacher Updated Successfully");
      } else {
        await api.post("/teachers", values);
        message.success("Teacher Added Successfully");
      }

      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "Operation Failed"
      );
    }
  };

  return (
    <Modal
      open={open}
      title={teacher ? "Edit Teacher" : "Add Teacher"}
      footer={null}
      destroyOnHidden
      width={700}
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
            label="Name"
            name="name"
            rules={[{ required: true, message: "Enter Name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Enter Valid Email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Enter Phone" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Select Department" }]}
          >
            <Select
              options={[
                { label: "Computer Science", value: "ComputerScience" },
                { label: "Mathematics", value: "Mathematics" },
                { label: "Physics", value: "Physics" },
                { label: "Biology", value: "Biology" },
              ]}
            />
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

          <Button type="primary" htmlType="submit">
            {teacher ? "Update Teacher" : "Add Teacher"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default TeacherModal;
