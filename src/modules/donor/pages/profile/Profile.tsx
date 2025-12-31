import React from "react";
import { Icon } from "../../../../global/components/resuable-components/Icon";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";

const DonorProfile = () => {
  const impactData = [
    {
      label: "Total Impact",
      val: "1.2K",
      trend: "Points earned",
      color: "bg-emerald-500",
    },
    {
      label: "Lives Saved",
      val: "48",
      trend: "Direct impact",
      color: "bg-emerald-500",
    },
    {
      label: "Donations",
      val: "24",
      trend: "Total contributions",
      color: "bg-emerald-500",
    },
    {
      label: "Global Rank",
      val: "#128",
      trend: "Top 5% Donor",
      color: "bg-emerald-500",
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
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-br from-emerald-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://mui.com/static/images/avatar/1.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                <Icon name="verified" className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left mb-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                <h1 className="text-3xl font-black text-white tracking-tight">
                  Johnathan Doe
                </h1>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                  Lvl 12
                </span>
              </div>
              <p className="text-emerald-50/80 font-medium flex items-center justify-center md:justify-start gap-2">
                <Icon name="office" className="w-4 h-4" />
                New York, USA • Member since Jan 2025
              </p>
            </div>

            <div className="flex gap-4 mb-2">
              <button className="px-6 py-2.5 bg-white text-emerald-900 rounded-xl text-sm font-black shadow-xl hover:bg-emerald-50 transition-colors uppercase tracking-wider">
                Edit Profile
              </button>
              <button className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-colors border border-white/20 shadow-xl">
                <Icon name="settings" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 pb-12">
        {/* Impact Cards */}
        <ImpactCards data={impactData} className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Row 1: Personal Details & Recent Activity */}
          <section className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">
                Personal Details
              </h3>
              <div className="h-1 w-12 bg-emerald-500 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 flex-1">
              {[
                { label: "Full Name", value: "Johnathan Doe", icon: "users" },
                {
                  label: "Email Address",
                  value: "john.doe@example.com",
                  icon: "mail",
                },
                { label: "Phone", value: "+1 234 567 890", icon: "phone" },
                {
                  label: "Occupation",
                  value: "Businessman",
                  icon: "office",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-emerald-600 transition-all duration-300">
                    <Icon name={item.icon} className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5 group-hover:text-emerald-500/50 transition-colors">
                      {item.label}
                    </label>
                    <span className="text-sm font-bold text-gray-700 truncate group-hover:text-gray-900 transition-colors">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm h-full flex flex-col max-h-[280px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">
                Recent Activity
              </h3>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="relative flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <div className="space-y-6 relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100" />
                {activities.map((activity, i) => (
                  <div key={i} className="relative pl-10 group">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center group-hover:border-emerald-500 transition-colors z-10 shadow-sm">
                      <Icon
                        name={
                          activity.type === "donation"
                            ? "donations"
                            : "trending"
                        }
                        className="w-4 h-4 text-emerald-600"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                        {activity.time}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        {activity.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Row 2: Achievements & Status */}
          <section className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">
                Achievements
              </h3>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-full">
                4 / 12 Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Top Contributor",
                  desc: "Ranked in the top 1% this month",
                  status: "Mastered",
                  color: "amber",
                  icon: "verified",
                },
                {
                  name: "First Donation",
                  desc: "Completed your first impact mission",
                  status: "Unlocked",
                  color: "emerald",
                  icon: "check-circle",
                },
                {
                  name: "Community Hero",
                  desc: "Helped over 50 families this year",
                  status: "Veteran",
                  color: "blue",
                  icon: "users",
                },
                {
                  name: "Consistency King",
                  desc: "Donated 5 weeks in a row",
                  status: "Active",
                  color: "purple",
                  icon: "calendar",
                },
              ].map((badge, i) => (
                <div
                  key={i}
                  className={`group relative p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-default overflow-hidden
                  ${
                    badge.color === "amber"
                      ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100 shadow-sm hover:shadow-amber-100/50"
                      : ""
                  }
                  ${
                    badge.color === "emerald"
                      ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100 shadow-sm hover:shadow-emerald-100/50"
                      : ""
                  }
                  ${
                    badge.color === "blue"
                      ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-sm hover:shadow-blue-100/50"
                      : ""
                  }
                  ${
                    badge.color === "purple"
                      ? "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 shadow-sm hover:shadow-purple-100/50"
                      : ""
                  }
                `}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                  <div className="flex items-start gap-4 relative z-10">
                    <div
                      className={`p-3 rounded-xl shadow-inner border border-white/50 backdrop-blur-sm
                      ${
                        badge.color === "amber"
                          ? "bg-amber-100/50 text-amber-600"
                          : ""
                      }
                      ${
                        badge.color === "emerald"
                          ? "bg-emerald-100/50 text-emerald-600"
                          : ""
                      }
                      ${
                        badge.color === "blue"
                          ? "bg-blue-100/50 text-blue-600"
                          : ""
                      }
                      ${
                        badge.color === "purple"
                          ? "bg-purple-100/50 text-purple-600"
                          : ""
                      }
                    `}
                    >
                      <Icon name={badge.icon} className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-black text-gray-900 truncate tracking-tight">
                          {badge.name}
                        </h4>
                        <span
                          className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/50
                          ${
                            badge.color === "amber"
                              ? "bg-amber-200/50 text-amber-700"
                              : ""
                          }
                          ${
                            badge.color === "emerald"
                              ? "bg-emerald-200/50 text-emerald-700"
                              : ""
                          }
                          ${
                            badge.color === "blue"
                              ? "bg-blue-200/50 text-blue-700"
                              : ""
                          }
                          ${
                            badge.color === "purple"
                              ? "bg-purple-200/50 text-purple-700"
                              : ""
                          }
                        `}
                        >
                          {badge.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium leading-tight">
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-emerald-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group h-full flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h4 className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Current Status
              </h4>
              <div className="flex items-center gap-2 px-2 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 group-hover:bg-emerald-400 group-hover:text-emerald-900 transition-all duration-300">
                <Icon name="trending" className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  Top 5%
                </span>
              </div>
            </div>

            <div className="flex items-end gap-2 mb-8 relative z-10">
              <span className="text-5xl font-black tracking-tighter">
                Elite
              </span>
              <span className="text-emerald-400 text-sm font-bold pb-1.5 underline underline-offset-4 decoration-2 decoration-emerald-500/50">
                Level 12
              </span>
            </div>

            {/* Extra Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 flex-1 relative z-10">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="donations" className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest">
                    Streak
                  </span>
                </div>
                <div className="text-xl font-black">15 Weeks</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="verified" className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest">
                    Earned
                  </span>
                </div>
                <div className="text-xl font-black">12.5K pts</div>
              </div>
            </div>

            {/* Next Perk Preview */}
            <div className="bg-emerald-800/80 rounded-2xl p-4 mb-8 border border-white/5 group-hover:bg-emerald-800 transition-colors relative z-10">
              <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
                Next Perk Unlocks at Lvl 13
              </div>
              <div className="text-xs font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Priority Support Access
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-end mb-2">
                <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
                  280 points to level 13
                </p>
                <span className="text-[10px] font-black">72%</span>
              </div>
              <div className="w-full bg-emerald-800/50 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[72%] transition-all duration-1000 group-hover:w-[75%]" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
