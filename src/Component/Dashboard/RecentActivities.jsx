import {
  UserOutlined,
  TeamOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const RecentActivities = ({ activities = [] }) => {
  const getActivity = (type) => {
    switch (type) {
      case "Student":
        return {
          icon: <ReadOutlined className="text-xl text-blue-600" />,
          bg: "bg-blue-100",
        };

      case "Teacher":
        return {
          icon: <TeamOutlined className="text-xl text-green-600" />,
          bg: "bg-green-100",
        };

      case "User":
        return {
          icon: <UserOutlined className="text-xl text-orange-500" />,
          bg: "bg-orange-100",
        };

      default:
        return {
          icon: <UserOutlined className="text-xl text-slate-500" />,
          bg: "bg-slate-100",
        };
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest updates from your system
        </p>

      </div>

      {/* Empty */}

      {activities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">

          <p className="text-lg font-medium text-slate-600">
            No Recent Activities
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Activities will appear here once users start using the system.
          </p>

        </div>
      ) : (

        <div className="space-y-5">

          {activities.map((activity) => {

            const current = getActivity(activity.type);

            return (

              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-xl p-3 transition hover:bg-slate-50"
              >

                {/* Icon */}

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${current.bg}`}
                >
                  {current.icon}
                </div>

                {/* Content */}

                <div className="flex-1">

                  <h4 className="font-semibold text-slate-800">
                    {activity.title}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.type}
                  </p>

                </div>

                {/* Date */}

                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">

                  {new Date(activity.createdAt).toLocaleDateString()}

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
};

export default RecentActivities;