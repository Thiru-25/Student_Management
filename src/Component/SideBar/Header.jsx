import { FaGraduationCap } from "react-icons/fa";

function Header() {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-5">

      <div className="flex items-center gap-5">

        {/* Logo */}

        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
          <FaGraduationCap className="text-3xl text-white" />
        </div>

        {/* Brand */}

        <div className="flex flex-col justify-center">

          <h1 className="text-[24px] font-extrabold leading-none tracking-tight text-slate-900">
            StudentMS
          </h1>

          <p className="mt-2 text-[12px] font-medium text-slate-500">
            Management System
          </p>

        </div>

      </div>

    </div>
  );
}

export default Header;