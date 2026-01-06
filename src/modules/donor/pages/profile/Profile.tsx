import { useState } from "react";
import { Icon } from "../../../../global/components/resuable-components/Icon";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";

const DonorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Johnathan Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    occupation: "Businessman",
    location: "New York, USA",
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes (in real app, this would call an API)
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };
  const impactData = [
    {
      label: "Total Impact",
      val: "1.2K",
      trend: "Points earned",
      color: "bg-[#22c55e]",
    },
    {
      label: "Lives Saved",
      val: "48",
      trend: "Direct impact",
      color: "bg-[#22c55e]",
    },
    {
      label: "Donations",
      val: "24",
      trend: "Total contributions",
      color: "bg-[#22c55e]",
    },
    {
      label: "Global Rank",
      val: "#128",
      trend: "Top 5% Donor",
      color: "bg-[#22c55e]",
    },
  ];

  const activities = [
    {
      title: "Donation Completed",
      time: "2 hours ago",
      desc: "Donated 5kg of rice to Hope Orphanage.",
      type: "donation",
    },
    {
      title: "Point Milestone",
      time: "Yesterday",
      desc: "Reached 1,000 impact points!",
      type: "milestone",
    },
    {
      title: "Profile Updated",
      time: "3 days ago",
      desc: "Updated phone number and location.",
      type: "update",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Hero Section */}
      <div className="relative h-64 bg-[#15803d] overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-8 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 w-full text-white">
            <div className="relative group">
              <div className="w-32 h-32 rounded-md overflow-hidden border-4 border-white/40 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://mui.com/static/images/avatar/1.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#22c55e] text-white p-2 rounded-md border-2 border-white shadow-md">
                <Icon name="verified" className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left mb-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-1.5">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
                  {profile.name}
                </h1>
                <span className="px-3 py-1 bg-[#16a34a] rounded-md text-[10px] font-black uppercase tracking-widest border border-white/20 shadow-sm">
                  Lvl 12
                </span>
              </div>
              <p className="text-[#ecfdf5]/80 font-medium text-xs flex items-center justify-center md:justify-start gap-1.5">
                <Icon name="office" className="w-3.5 h-3.5" />
                {profile.location} • Jan 2025
              </p>
            </div>

            <div className="flex gap-4 mb-2">
              <button
                onClick={handleEditToggle}
                className="px-8 py-3 bg-white text-emerald-900 rounded-md text-xs font-black hover:bg-[#ecfdf5] transition-all uppercase tracking-widest shadow-lg active:scale-95"
              >
                {isEditing ? "Save" : "Edit Profile"}
              </button>
              <button className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all border border-white/20 backdrop-blur-sm active:scale-95">
                <Icon name="settings" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-10 pb-16">
        {/* Impact Cards */}
        <ImpactCards data={impactData} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Row 1: Personal Details & Recent Activity */}
          <section
            className="lg:col-span-2 border p-8 transition-all h-full flex flex-col rounded-md bg-white shadow-sm"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black tracking-tight uppercase text-slate-800">
                Personal Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 flex-1">
              {[
                {
                  label: "Full Name",
                  value: profile.name,
                  icon: "users",
                  key: "name",
                },
                {
                  label: "Email Address",
                  value: profile.email,
                  icon: "mail",
                  key: "email",
                },
                {
                  label: "Phone",
                  value: profile.phone,
                  icon: "phone",
                  key: "phone",
                },
                {
                  label: "Occupation",
                  value: profile.occupation,
                  icon: "office",
                  key: "occupation",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div
                    className="p-3.5 rounded-md border transition-all duration-300 group-hover:bg-[#ecfdf5] group-hover:border-[#d1fae5] group-hover:text-[#16a34a] shadow-sm"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <Icon name={item.icon} className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <label
                      className="text-[10px] font-black uppercase tracking-[0.25em] mb-1 group-hover:text-[#22c55e]/50 transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.label}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                          setProfile({ ...profile, [item.key]: e.target.value })
                        }
                        className="text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-sm px-2 py-1 focus:outline-none focus:border-[#22c55e] transition-colors"
                      />
                    ) : (
                      <span
                        className="text-xs font-bold truncate transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            className="border p-8 h-full flex flex-col rounded-md bg-white shadow-sm"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black tracking-tight uppercase">
                Recent Activity
              </h3>
              <span className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="relative flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <div className="space-y-4 relative pt-1">
                <div
                  className="absolute left-[13px] top-2 bottom-2 w-px"
                  style={{ backgroundColor: "var(--border-color)" }}
                />
                {activities.map((activity, i) => (
                  <div key={i} className="relative pl-10 group">
                    <div
                      className="absolute left-0 top-0.5 w-8 h-8 rounded-full border flex items-center justify-center group-hover:border-[#22c55e] transition-all z-10 shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <Icon
                        name={
                          activity.type === "donation"
                            ? "donations"
                            : "trending"
                        }
                        className="w-4 h-4 text-[#16a34a]"
                      />
                    </div>
                    <div>
                      <h4
                        className="text-sm font-black group-hover:text-[#16a34a] transition-colors leading-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {activity.title}
                      </h4>
                      <p
                        className="text-[9px] font-black uppercase tracking-widest mb-1.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {activity.time}
                      </p>
                      <p
                        className="text-[11px] leading-relaxed font-semibold text-start opacity-70"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {activity.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Row 2: Achievements & Status */}
          <section
            className="lg:col-span-2 border p-8 h-full flex flex-col relative overflow-hidden group/ach bg-white rounded-md shadow-sm"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h3 className="text-sm font-black tracking-tighter uppercase leading-none">
                  Impact Milestones
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] mt-2 text-slate-400">
                  Unlock hidden potential
                </p>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 bg-emerald-50 text-[#16a34a] rounded-md border border-emerald-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  4 / 12 UNLOCKED
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 relative z-10">
              {[
                {
                  name: "Top Contributor",
                  desc: "Ranked in top 1% this month",
                  status: "Mastered",
                  color: "amber",
                  icon: "verified",
                },
                {
                  name: "First Donation",
                  desc: "Completed first mission",
                  status: "Unlocked",
                  color: "emerald",
                  icon: "check-circle",
                },
                {
                  name: "Community Hero",
                  desc: "Helped over 50 families",
                  status: "Veteran",
                  color: "emerald",
                  icon: "users",
                },
                {
                  name: "Consistency King",
                  desc: "Donated 5 weeks in a row",
                  status: "Active",
                  color: "emerald",
                  icon: "calendar",
                },
              ].map((badge, i) => (
                <div
                  key={i}
                  className={`group relative p-6 rounded-md border transition-all duration-300 cursor-pointer flex flex-col justify-between bg-white text-start shadow-sm
                  ${
                    badge.color === "amber"
                      ? "border-amber-50 hover:border-amber-200 hover:shadow-md"
                      : "border-slate-50 hover:border-emerald-200 hover:shadow-md"
                  }
                `}
                >
                  <div className="flex items-center gap-4 relative z-10 mb-3">
                    <div
                      className={`w-12 h-12 rounded-md flex items-center justify-center transition-all duration-500 group-hover:scale-105 shadow-md
                      ${
                        badge.color === "amber"
                          ? "bg-amber-500 text-white shadow-amber-500/20"
                          : "bg-[#22c55e] text-white shadow-emerald-500/20"
                      }
                    `}
                    >
                      <Icon name={badge.icon} className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-black tracking-tight truncate text-slate-800">
                        {badge.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border
                          ${
                            badge.color === "amber"
                              ? "bg-amber-50 text-amber-700 border-amber-100"
                              : "bg-emerald-50 text-[#15803d] border-emerald-100"
                          }
                        `}
                        >
                          {badge.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] font-semibold leading-relaxed text-slate-400 mt-auto">
                    {badge.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-emerald-950 rounded-md p-8 text-white relative overflow-hidden group h-full flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h4 className="text-[#34d399] text-[10px] font-black uppercase tracking-[0.4em]">
                Current Status
              </h4>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-md border border-white/5 group-hover:bg-[#34d399] group-hover:text-emerald-900 transition-all duration-500">
                <Icon name="trending" className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Top 5%
                </span>
              </div>
            </div>

            <div className="flex items-end gap-2.5 mb-6 relative z-10">
              <span className="text-4xl font-black tracking-tighter">
                Elite
              </span>
              <span className="text-[#34d399] text-xs font-black pb-1.5 underline underline-offset-8 decoration-[#22c55e]/50">
                Lvl 12
              </span>
            </div>

            {/* Extra Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 flex-1 relative z-10">
              <div className="bg-white/5 rounded-md p-5 border border-white/5 hover:bg-white/10 transition-colors shadow-inner">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon
                    name="donations"
                    className="w-3.5 h-3.5 text-[#34d399]"
                  />
                  <span className="text-[9px] font-black text-[#6ee7b7] uppercase tracking-[0.25em]">
                    Streak
                  </span>
                </div>
                <div className="text-lg font-black">15 Weeks</div>
              </div>
              <div className="bg-white/5 rounded-md p-5 border border-white/5 hover:bg-white/10 transition-colors shadow-inner">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon
                    name="verified"
                    className="w-3.5 h-3.5 text-[#34d399]"
                  />
                  <span className="text-[9px] font-black text-[#6ee7b7] uppercase tracking-[0.25em]">
                    Earned
                  </span>
                </div>
                <div className="text-lg font-black">12.5K pts</div>
              </div>
            </div>

            {/* Next Perk Preview */}
            <div className="bg-emerald-800/40 rounded-md p-5 mb-8 border border-white/5 group-hover:bg-emerald-800/60 transition-colors relative z-10 shadow-lg">
              <div className="text-[10px] font-black text-[#34d399] uppercase tracking-[0.25em] mb-1.5">
                Next: Lvl 13
              </div>
              <div className="text-sm font-black flex items-center gap-3">
                <div className="w-2 h-2 bg-[#34d399] rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                Priority Support
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="flex justify-between items-end mb-2.5">
                <p className="text-[10px] font-black text-[#6ee7b7] uppercase tracking-[0.2em]">
                  280 pts to lvl 13
                </p>
                <span className="text-[10px] font-black">72%</span>
              </div>
              <div className="w-full bg-emerald-800/50 h-2.5 rounded-full overflow-hidden shadow-inner">
                <div className="bg-[#34d399] h-full w-[72%] transition-all duration-1000 shadow-[2px_0_10px_rgba(52,211,153,0.5)]" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
