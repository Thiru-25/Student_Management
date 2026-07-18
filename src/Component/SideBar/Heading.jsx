import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useAuth } from "../../auth/AuthContext";

function Heading() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="flex h-24 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Left */}

      <div>
        <div className="flex items-center gap-2 text-indigo-600">
          <HiOutlineSparkles className="text-xl" />

          <span className="text-sm font-semibold">
            {greeting}
          </span>
        </div>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-800">
          Welcome back, {user?.name}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening in your dashboard today.
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-100">

          <IoNotificationsOutline
            size={24}
            className="text-slate-700"
          />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

      </div>

    </header>
  );
}

export default Heading;