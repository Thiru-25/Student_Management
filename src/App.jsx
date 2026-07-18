import { Route, Routes } from "react-router-dom";

import "./Styles/Global.css";

// Layout
import SideBarPage from "./Component/SideBar/SideBarPage";

// Pages
import StudentPage from "./Component/Students/StudentPage";
import TeacherPage from "./Component/Teachers/TeacherPage";
import UserPage from "./Component/User/UserPage";

// Authentication
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Unauthorized from "./auth/Unauthorized";
import DashboardPage from "./Component/Dashboard/DashboardPage";

function App() {
  return (
    <Routes>
      {/* =========================
          Public Routes
      ========================== */}

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* =========================
          Protected Layout
      ========================== */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SideBarPage />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route
          index
          element={
            <ProtectedRoute
              roles={[
                "ADMIN",
                "TEACHER",
                "STUDENT",
              ]}
            >
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Students */}
        <Route
          path="students"
          element={
            <ProtectedRoute
              roles={[
                "ADMIN",
                "TEACHER",
                "STUDENT",
              ]}
            >
              <StudentPage />
            </ProtectedRoute>
          }
        />

        {/* Teachers */}
        <Route
          path="teachers"
          element={
            <ProtectedRoute
              roles={[
                "ADMIN",
                "TEACHER",
              ]}
            >
              <TeacherPage />
            </ProtectedRoute>
          }
        />

        {/* Users */}
        <Route
          path="users"
          element={
            <ProtectedRoute
              roles={["ADMIN"]}
            >
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* =========================
          404 Page
      ========================== */}

      <Route
        path="*"
        element={<h1>404 - Page Not Found</h1>}
      />
    </Routes>
  );
}

export default App;