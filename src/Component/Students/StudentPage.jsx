import { useEffect, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import api from "../../auth/axios";

import { useAuth } from "../../auth/AuthContext";

import StudentTable from "./StudentTable";
import StudentModal from "./StudentModal";
import StudentFilter from "./StudentFilter";
import StudentNavigator from "./StudentNavigator";

function StudentPage() {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isTeacher = user?.role === "TEACHER";
  const isStudent = user?.role === "STUDENT";

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/student/get");

      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error(error);

      message.error(
        error.response?.data?.message ||
          "Failed to fetch students"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = () => {
    setEditingStudent(null);
    setOpen(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/student/delete/${id}`);

      message.success(
        "Student deleted successfully"
      );

      fetchStudents();
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
      setFilteredStudents(students);
      setCurrentPage(1);
      return;
    }

    const keyword = text.toLowerCase();

    const filtered = students.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(keyword) ||
        student.email
          .toLowerCase()
          .includes(keyword) ||
        student.phone
          .toLowerCase()
          .includes(keyword)
    );

    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const start =
    (currentPage - 1) * pageSize;

  const paginatedStudents =
    filteredStudents.slice(
      start,
      start + pageSize
    );

  const handleSuccess = () => {
    setOpen(false);
    setEditingStudent(null);
    fetchStudents();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">
          Students
        </h1>

        {(isAdmin ||
          isTeacher ||
          isStudent) && (
          <Button
            type="primary"
            onClick={handleAdd}
          >
            Add Student
          </Button>
        )}
      </div>

      <StudentFilter
        onSearch={handleSearch}
      />

      <StudentTable
        students={paginatedStudents}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        Popconfirm={Popconfirm}
      />

      <StudentNavigator
        currentPage={currentPage}
        pageSize={pageSize}
        total={filteredStudents.length}
        onChange={setCurrentPage}
      />

      <StudentModal
        open={open}
        student={editingStudent}
        onClose={() => {
          setOpen(false);
          setEditingStudent(null);
        }}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default StudentPage;