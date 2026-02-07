import LineChart from "../../../../global/charts/LineChart";
import BarChart from "../../../../global/charts/BarChart";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Donations",
      value: "1.2K",
      change: "+15% from last month",
      changeColor: "text-green-600",
      // icon: <HandHeart size={20} />,
    },
    {
      title: "Active Users",
      value: "542",
      change: "+8% from last week",
      changeColor: "text-green-600",
      // icon: <Users size={20} />,
    },
    {
      title: "NGO Partners",
      value: "68",
      change: "+2 new this month",
      changeColor: "text-green-600",
      // icon: <Handshake size={20} />,
    },
    {
      title: "Volunteers Onboarded",
      value: "210",
      change: "-3% from last month",
      changeColor: "text-red-600",
      // icon: <UserPlus size={20} />,
    },
  ];

  const activities = [
    {
      title: 'New NGO partner "Green Harvest" registered.',
      category: "Partner Registration",
      time: "2 hours ago",
      date: "Jan 5, 2026",
    },
    {
      title: 'Volunteer "Amit" redeemed "Goa Beach Trip" reward!',
      category: "Rewards",
      time: "3 hours ago",
      date: "Jan 5, 2026",
    },
    {
      title: 'Donor "XYZ Corp" reached Legend Tier!',
      category: "Milestone",
      time: "4 hours ago",
      date: "Jan 5, 2026",
    },
    {
      title: 'User "John Doe" updated profile details.',
      category: "User Update",
      time: "5 hours ago",
      date: "Jan 5, 2026",
    },
    {
      title: "Donation pickup for order #10023 confirmed.",
      category: "Logistics",
      time: "Yesterday",
      date: "Jan 4, 2026",
    },
    {
      title: "System alert: Database backup completed successfully.",
      category: "System Alert",
      time: "Yesterday",
      date: "Jan 4, 2026",
    },
    {
      title: 'Volunteer "Jane Smith" completed training.',
      category: "Training",
      time: "2 days ago",
      date: "Jan 3, 2026",
    },
  ];

  return (
    <div className="w-full space-y-6 p-6">
      {/* Admin Panel */}
      {/* <h1
        className="text-2xl font-semibold text-start"
        style={{ color: "var(--text-primary)" }}
      >
        Quick Stats
      </h1> */}

      {/* Four Boxes */}
      <ImpactCards
        data={stats.map((item) => ({
          label: item.title,
          val: item.value,
          trend: item.change,
          color: item.changeColor.includes("green")
            ? "bg-emerald-500"
            : "bg-slate-300",
        }))}
      />

      {/* Activity Charts */}
      {/* <h1
        className="text-2xl font-semibold text-start"
        style={{ color: "var(--text-primary)" }}
      >
        Activity Charts
      </h1> */}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="rounded-md p-5 border"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="mb-3 flex flex-col items-start">
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Donation Trends
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>
              Monthly overview of donations and pickups.
            </p>
          </div>
          <LineChart />
        </div>
        <div
          className="rounded-md p-5 border"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="mb-3 flex flex-col items-start">
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              User Sign-ups by Role
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>
              New user registrations per role.
            </p>
          </div>
          <BarChart />
        </div>
      </div>

      {/* Recent Activities */}
      {/* Recent Activities Section */}
      <div
        className="rounded-2xl border transition-all duration-300 shadow-sm"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div
          className="p-6 border-b border-dashed flex items-center justify-between"
          style={{ borderColor: "var(--border-color)" }}
        >
          <h2
            className="text-xl font-bold flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            <div className="w-2 h-6 bg-emerald-500 rounded-full" />
            Recent Activities & Alerts
          </h2>
          <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-all">
            See all activity
          </button>
        </div>

        <div className="p-4 space-y-2">
          {activities.map((activity, index) => {
            // Map categories to pillar colors for consistent visual cues
            const getPillarColor = (category: string) => {
              const lowerCat = category.toLowerCase();
              if (
                lowerCat.includes("registration") ||
                lowerCat.includes("confirmed")
              )
                return "bg-emerald-500";
              if (lowerCat.includes("reward") || lowerCat.includes("alert"))
                return "bg-amber-500";
              if (
                lowerCat.includes("milestone") ||
                lowerCat.includes("training")
              )
                return "bg-purple-500";
              return "bg-blue-500";
            };

            return (
              <div
                key={index}
                className="group relative flex items-center gap-3 p-2.5 rounded-xl border border-transparent hover:bg-slate-500/5 transition-all duration-200 cursor-pointer overflow-hidden"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                {/* Vertical Pillar Indicator - Pattern matched from Header.tsx */}
                <div
                  className={`w-1 h-8 rounded-full shrink-0 ${getPillarColor(
                    activity.category,
                  )}`}
                />

                {/* Content */}
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="flex flex-col items-start min-w-0">
                    <p
                      className="text-[13px] font-bold truncate w-full group-hover:text-emerald-600 transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {activity.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-[10px] font-black uppercase tracking-widest transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {activity.category}
                      </span>
                    </div>
                  </div>

                  {/* Meta - Time and Date */}
                  <div
                    className="flex flex-col items-end shrink-0 pl-4 border-l ml-4"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <time
                      className="text-[11px] font-bold uppercase tracking-tighter"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {activity.time}
                    </time>
                    <span
                      className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {activity.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
