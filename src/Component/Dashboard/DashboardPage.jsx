import { useEffect, useState } from "react";
import api from "../../auth/axios";

import DashboardCard from "./DashboardCard";
import RecentActivities from "./RecentActivities";

function DashboardPage() {
  const [counts, setCounts] = useState({
    users: 0,
    students: 0,
    teachers: 0,
    admins: 0,
  });

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/dashboard");

      setCounts(data.counts || {});
      setActivities(data.activities || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-lg font-semibold text-slate-600">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Statistics */}

      <section>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A quick summary of your management system.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Users"
            count={counts.users}
            color="blue"
          />

          <DashboardCard
            title="Students"
            count={counts.students}
            color="green"
          />

          <DashboardCard
            title="Teachers"
            count={counts.teachers}
            color="orange"
          />

          <DashboardCard
            title="Admins"
            count={counts.admins}
            color="purple"
          />

        </div>

      </section>

      {/* Activity */}

      <section>

        <RecentActivities
          activities={activities}
        />

      </section>

    </div>
  );
}

export default DashboardPage;