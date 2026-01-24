import { useState } from "react";
import { Icon } from "../../../../global/components/resuable-components/Icon";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableInput from "../../../../global/components/resuable-components/input";

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
      {/* Header Section */}
      <div
        className="bg-white border-b sticky top-0 z-20"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
            <div className="relative group">
              <div className="w-36 h-36 rounded-sm overflow-hidden border-4 border-white shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://mui.com/static/images/avatar/1.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#22c55e] text-white p-2 rounded-sm border-2 border-white shadow-md">
                <Icon name="verified" className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <h1 className="text-4xl font-black tracking-tighter text-slate-900">
                  {profile.name}
                </h1>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-sm text-[10px] font-black uppercase tracking-widest border border-green-100 shadow-sm">
                  Lvl 12
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-500">
                <p className="font-bold text-xs flex items-center gap-2">
                  <Icon name="office" className="w-4 h-4 text-[#22c55e]" />
                  {profile.location}
                </p>
                <p className="font-bold text-xs flex items-center gap-2">
                  <Icon name="calendar" className="w-4 h-4 text-[#22c55e]" />
                  Member since Jan 2025
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <ResuableButton
                onClick={handleEditToggle}
                variant={isEditing ? "dark" : "dark"}
                className="px-10 py-3.5 !rounded-sm text-xs font-black uppercase tracking-widest shadow-lg"
              >
                {isEditing ? "Save Selection" : "Edit Profile"}
              </ResuableButton>
              <ResuableButton
                variant="secondary"
                className="p-3.5 !rounded-sm border-slate-200"
              >
                <Icon name="settings" className="w-6 h-6" />
              </ResuableButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-8 pb-12">
        {/* Impact Cards */}
        <ImpactCards data={impactData} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Row 1: Personal Details & Recent Activity */}
          <section
            className="lg:col-span-2 border p-8 transition-all h-full flex flex-col rounded-sm bg-white shadow-sm"
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
                    className="p-3.5 rounded-sm border transition-all duration-300 group-hover:bg-green-50 group-hover:border-green-100 group-hover:text-green-600 shadow-sm"
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
                      <ResuableInput
                        value={item.value}
                        onChange={(val) =>
                          setProfile({ ...profile, [item.key]: val })
                        }
                        align="left"
                        className="!space-y-0"
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
            className="border p-8 h-full flex flex-col rounded-sm bg-white shadow-sm"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black tracking-tight uppercase">
                Recent Activity
              </h3>
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest cursor-pointer hover:underline">
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
                        className="w-4 h-4 text-green-600"
                      />
                    </div>
                    <div>
                      <h4
                        className="text-sm font-black group-hover:text-green-600 transition-colors leading-tight"
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
            className="lg:col-span-2 border p-8 h-full flex flex-col relative overflow-hidden group/ach bg-white rounded-sm shadow-sm"
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
              <div className="flex items-center gap-3 px-3 py-1.5 bg-green-50 text-[#16a34a] rounded-md border border-green-100 shadow-sm">
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
                  color: "green",
                  icon: "verified",
                },
                {
                  name: "First Donation",
                  desc: "Completed first mission",
                  status: "Unlocked",
                  color: "green",
                  icon: "check-circle",
                },
                {
                  name: "Community Hero",
                  desc: "Helped over 50 families",
                  status: "Veteran",
                  color: "green",
                  icon: "users",
                },
                {
                  name: "Consistency King",
                  desc: "Donated 5 weeks in a row",
                  status: "Active",
                  color: "green",
                  icon: "calendar",
                },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-sm border border-slate-50 hover:border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between bg-white text-start shadow-sm"
                >
                  <div className="flex items-center gap-4 relative z-10 mb-3">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-[#22c55e] text-white shadow-[#22c55e]/20 shadow-md transition-all duration-500 group-hover:scale-105">
                      <Icon name={badge.icon} className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-black tracking-tight truncate text-slate-800">
                        {badge.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm border bg-green-50 text-green-700 border-green-100">
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

          <section
            className="bg-white rounded-sm p-8 text-slate-800 relative overflow-hidden group h-full flex flex-col border shadow-sm"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h4 className="text-green-600 text-[10px] font-black uppercase tracking-[0.4em]">
                Current Status
              </h4>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-sm border border-green-100 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                <Icon name="trending" className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Top 5%
                </span>
              </div>
            </div>

            <div className="flex items-end gap-2.5 mb-8 relative z-10">
              <span className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
                Elite
              </span>
              <span className="text-[#22c55e] text-xs font-black pb-1 underline underline-offset-8 decoration-[#22c55e]/30">
                Lvl 12
              </span>
            </div>

            {/* Extra Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 flex-1 relative z-10">
              <div className="bg-slate-50 rounded-sm p-5 border border-slate-100 hover:border-[#22c55e]/20 transition-colors shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="donations" className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em]">
                    Streak
                  </span>
                </div>
                <div className="text-xl font-black text-slate-900">
                  15 Weeks
                </div>
              </div>
              <div className="bg-slate-50 rounded-sm p-5 border border-slate-100 hover:border-[#22c55e]/20 transition-colors shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="verified" className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em]">
                    Earned
                  </span>
                </div>
                <div className="text-xl font-black text-slate-900">
                  12.5K pts
                </div>
              </div>
            </div>

            {/* Next Perk Preview */}
            <div className="bg-green-50 rounded-sm p-5 mb-8 border border-green-100 group-hover:border-[#22c55e]/20 transition-colors relative z-10 shadow-sm">
              <div className="text-[10px] font-black text-green-600 uppercase tracking-[0.25em] mb-2">
                Next: Lvl 13
              </div>
              <div className="text-sm font-black flex items-center gap-3 text-slate-800">
                <div className="w-2.5 h-2.5 bg-[#22c55e] rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                Priority Support
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="flex justify-between items-end mb-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  280 pts to lvl 13
                </p>
                <span className="text-[11px] font-black text-green-600">
                  72%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                <div className="bg-[#22c55e] h-full w-[72%] transition-all duration-1000 shadow-[2px_0_10px_rgba(16,185,129,0.2)]" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
