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
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="relative h-64 bg-[#15803d] overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full text-white">
            <div className="relative group">
              <div className="w-32 h-32 rounded-none overflow-hidden border-2 border-white/50 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://mui.com/static/images/avatar/1.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#22c55e] text-white p-2 rounded-none border-2 border-white">
                <Icon name="verified" className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left mb-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                <h1 className="text-3xl font-black tracking-tight">
                  {profile.name}
                </h1>
                <span className="px-3 py-1 bg-[#16a34a] rounded-none text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  Lvl 12
                </span>
              </div>
              <p className="text-[#ecfdf5]/80 font-medium flex items-center justify-center md:justify-start gap-2">
                <Icon name="office" className="w-4 h-4" />
                {profile.location} • Member since Jan 2025
              </p>
            </div>

            <div className="flex gap-4 mb-2">
              <button
                onClick={handleEditToggle}
                className="px-6 py-2.5 bg-white text-emerald-900 rounded-none text-sm font-black hover:bg-[#ecfdf5] transition-colors uppercase tracking-wider"
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
              <button className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-none transition-colors border border-white/20">
                <Icon name="settings" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 pb-12">
        {/* Impact Cards */}
        <ImpactCards data={impactData} className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Row 1: Personal Details & Recent Activity */}
          <section className="lg:col-span-2 bg-white rounded-none border border-gray-100 p-8 hover:border-[#d1fae5] transition-colors h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-gray-900 tracking-tight uppercase">
                Personal Details
              </h3>
              <div className="h-1 w-12 bg-[#22c55e]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 flex-1">
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
                  <div className="p-3 bg-gray-50 rounded-none border border-gray-100 group-hover:bg-[#ecfdf5] group-hover:border-[#d1fae5] group-hover:text-[#16a34a] transition-all duration-300">
                    <Icon name={item.icon} className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5 group-hover:text-[#22c55e]/50 transition-colors">
                      {item.label}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                          setProfile({ ...profile, [item.key]: e.target.value })
                        }
                        className="text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-none px-2 py-1 focus:outline-none focus:border-[#22c55e] transition-colors"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-700 truncate group-hover:text-gray-900 transition-colors">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-none border border-gray-100 p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-gray-900 tracking-tight uppercase px-1">
                Recent Activity
              </h3>
              <span className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="relative flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <div className="space-y-6 relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100" />
                {activities.map((activity, i) => (
                  <div key={i} className="relative pl-10 group">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:border-[#22c55e] transition-colors z-10">
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
                      <h4 className="text-sm font-black text-gray-900 group-hover:text-[#16a34a] transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                        {activity.time}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium text-start">
                        {activity.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Row 2: Achievements & Status */}
          <section className="lg:col-span-2 bg-white rounded-none border border-gray-100 p-8 h-full flex flex-col relative overflow-hidden group/ach">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h3 className="text-sm font-black text-gray-900 tracking-tighter uppercase leading-none px-1">
                  Impact Milestones
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mt-2">
                  Unlock your hidden potential
                </p>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#ecfdf5] text-[#16a34a] rounded-none border border-[#d1fae5] transition-transform duration-500 group-hover/ach:scale-105">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  4 / 12 UNLOCKED
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 relative z-10">
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
                  desc: "Completed your first mission",
                  status: "Unlocked",
                  color: "emerald",
                  icon: "check-circle",
                },
                {
                  name: "Community Hero",
                  desc: "Helped over 50 families",
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
                  className={`group relative p-5 rounded-none border transition-all duration-300 cursor-pointer flex flex-col justify-between
                  ${
                    badge.color === "amber"
                      ? "bg-white border-amber-50 hover:border-amber-200"
                      : ""
                  }
                  ${
                    badge.color === "emerald"
                      ? "bg-white border-[#d1fae5] hover:border-emerald-200"
                      : ""
                  }
                  ${
                    badge.color === "blue"
                      ? "bg-white border-blue-100 hover:border-blue-200"
                      : ""
                  }
                  ${
                    badge.color === "purple"
                      ? "bg-white border-purple-100 hover:border-purple-200"
                      : ""
                  }
                `}
                >
                  <div className="flex items-center gap-4 relative z-10 mb-3">
                    <div
                      className={`w-14 h-14 rounded-none flex items-center justify-center transition-all duration-500 group-hover:scale-105
                      ${
                        badge.color === "amber" ? "bg-amber-500 text-white" : ""
                      }
                      ${
                        badge.color === "emerald"
                          ? "bg-[#22c55e] text-white"
                          : ""
                      }
                      ${badge.color === "blue" ? "bg-blue-500 text-white" : ""}
                      ${
                        badge.color === "purple"
                          ? "bg-purple-500 text-white"
                          : ""
                      }
                    `}
                    >
                      <Icon name={badge.icon} className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h4 className="text-sm font-black text-gray-900 tracking-tight truncate">
                          {badge.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-none border
                          ${
                            badge.color === "amber"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : ""
                          }
                          ${
                            badge.color === "emerald"
                              ? "bg-[#d1fae5] text-[#15803d] border-emerald-200"
                              : ""
                          }
                          ${
                            badge.color === "blue"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : ""
                          }
                          ${
                            badge.color === "purple"
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : ""
                          }
                        `}
                        >
                          {badge.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed relative z-10 text-start">
                    {badge.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-emerald-900 rounded-none p-7 text-white relative overflow-hidden group h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h4 className="text-[#34d399] text-[10px] font-black uppercase tracking-[0.3em]">
                Current Status
              </h4>
              <div className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded-none border border-white/10 group-hover:bg-[#34d399] group-hover:text-emerald-900 transition-all duration-300">
                <Icon name="trending" className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  Top 5%
                </span>
              </div>
            </div>

            <div className="flex items-end gap-2 mb-6 relative z-10">
              <span className="text-4xl font-black tracking-tighter">
                Elite
              </span>
              <span className="text-[#34d399] text-xs font-bold pb-1 underline underline-offset-4 decoration-2 decoration-[#22c55e]/50">
                Level 12
              </span>
            </div>

            {/* Extra Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 flex-1 relative z-10">
              <div className="bg-white/5 rounded-none p-3.5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="donations" className="w-3 h-3 text-[#34d399]" />
                  <span className="text-[9px] font-bold text-[#6ee7b7] uppercase tracking-widest">
                    Streak
                  </span>
                </div>
                <div className="text-lg font-black">15 Weeks</div>
              </div>
              <div className="bg-white/5 rounded-none p-3.5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="verified" className="w-3 h-3 text-[#34d399]" />
                  <span className="text-[9px] font-bold text-[#6ee7b7] uppercase tracking-widest">
                    Earned
                  </span>
                </div>
                <div className="text-lg font-black">12.5K pts</div>
              </div>
            </div>

            {/* Next Perk Preview */}
            <div className="bg-emerald-800/80 rounded-none p-3.5 mb-6 border border-white/5 group-hover:bg-emerald-800 transition-colors relative z-10">
              <div className="text-[9px] font-bold text-[#34d399] uppercase tracking-widest mb-1">
                Next Perk Unlocks at Lvl 13
              </div>
              <div className="text-xs font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#34d399] rounded-full animate-pulse" />
                Priority Support Access
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-end mb-2">
                <p className="text-[10px] font-bold text-[#6ee7b7] uppercase tracking-widest">
                  280 pts to lvl 13
                </p>
                <span className="text-[10px] font-black">72%</span>
              </div>
              <div className="w-full bg-emerald-800/50 h-2 rounded-none overflow-hidden">
                <div className="bg-[#34d399] h-full w-[72%] transition-all duration-1000 group-hover:w-[75%]" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
