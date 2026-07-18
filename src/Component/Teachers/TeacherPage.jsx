import { useEffect, useState } from "react";
import { Button, message } from "antd";
import api from "../../auth/axios";

import { useAuth } from "../../auth/AuthContext";

import TeacherTable from "./TeacherTable";
import TeacherModal from "./TeacherModal";
import TeacherFilter from "./TeacherFilter";
import TeacherNavigator from "./TeacherNavigator";

function TeacherPage() {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isTeacher = user?.role === "TEACHER";

  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const getTeachers = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/teachers");

      setTeachers(data);
      setFilteredTeachers(data);
    } catch (error) {
      console.error(error);

      message.error(
        error.response?.data?.message ||
          "Failed to load teachers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const handleAdd = () => {
    setEditingTeacher(null);
    setOpen(true);
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/teachers/${id}`);

      message.success(
        "Teacher deleted successfully"
      );

      getTeachers();
    } catch (error) {
      console.error(error);

      message.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const handleSearch = (text) => {
    if (!text) {
      setFilteredTeachers(teachers);
      setCurrentPage(1);
      return;
    }

    const keyword = text.toLowerCase();

    const filtered = teachers.filter(
      (teacher) =>
        teacher.name
          .toLowerCase()
          .includes(keyword) ||
        teacher.email
          .toLowerCase()
          .includes(keyword) ||
        teacher.phone
          .toLowerCase()
          .includes(keyword)
    );

    setFilteredTeachers(filtered);
    setCurrentPage(1);
  };

  const paginatedTeachers =
    filteredTeachers.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Teacher Management
        </h1>

        {isAdmin && (
          <Button
            type="primary"
            onClick={handleAdd}
          >
            Add Teacher
          </Button>
        )}

      </div>

      <TeacherFilter
        onSearch={handleSearch}
      />

      <TeacherTable
        teachers={paginatedTeachers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TeacherNavigator
        currentPage={currentPage}
        pageSize={pageSize}
        total={filteredTeachers.length}
        onChange={setCurrentPage}
      />

      <TeacherModal
        open={open}
        teacher={editingTeacher}
        onClose={() => {
          setOpen(false);
          setEditingTeacher(null);
        }}
        onSuccess={() => {
          setOpen(false);
          setEditingTeacher(null);
          getTeachers();
        }}
      />
    </div>
  );
}

export default TeacherPage;