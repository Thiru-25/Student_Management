import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaSignOutAlt,
  FaUserCircle,
  FaUser,
  FaShieldAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function MainBody() {
  const { user, logout } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
      roles: ["ADMIN", "TEACHER", "STUDENT"],
    },
    {
      name: "Students",
      path: "/students",
      icon: <FaUserGraduate />,
      roles: ["ADMIN", "TEACHER", "STUDENT"],
    },
    {
      name: "Teachers",
      path: "/teachers",
      icon: <FaChalkboardTeacher />,
      roles: ["ADMIN", "TEACHER"],
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />,
      roles: ["ADMIN"],
    },
  ];

  const roleIcon = {
    ADMIN: <FaShieldAlt className="text-purple-600" />,
    TEACHER: <FaChalkboardTeacher className="text-amber-500" />,
    STUDENT: <FaUserGraduate className="text-green-600" />,
  };

  return (
    <div className="flex h-full flex-col justify-between px-5 py-6">

      {/* Navigation */}

      <nav className="space-y-2">

        {menus
          .filter((menu) => menu.roles.includes(user.role))
          .map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-5 py-3.5 font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-700 hover:bg-slate-100 hover:translate-x-1"
                }`
              }
            >
              <span className="text-xl">{menu.icon}</span>

              <span>{menu.name}</span>
            </NavLink>
          ))}

      </nav>

      {/* Profile Card */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <FaUserCircle className="text-3xl text-indigo-600" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {user.name}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              {roleIcon[user.role]}
              <span>{user.role}</span>
            </div>

          </div>

        </div>

        <div className="my-4 border-t border-slate-200"></div>

        {/* Profile */}

        <button
          className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-white"
        >
          <FaUser />

          Profile
        </button>

        {/* Logout */}

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </div>
  );
}

export default MainBody;