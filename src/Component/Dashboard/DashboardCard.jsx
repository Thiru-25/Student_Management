import React from "react";
import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
} from "react-icons/fa";

function DashboardCard({ title, count, color }) {
  const config = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <FaUsers className="text-2xl" />,
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      icon: <FaUserGraduate className="text-2xl" />,
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      icon: <FaChalkboardTeacher className="text-2xl" />,
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      icon: <FaUserShield className="text-2xl" />,
    },
  };

  const current = config[color];

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {count}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Total {title.toLowerCase()}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${current.bg} ${current.text}`}
        >
          {current.icon}
        </div>

      </div>
    </div>
  );
}

export default DashboardCard;