import { useState } from "react";
import {
  Clock,
  CheckCircle,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  Settings,
} from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ResuableButton from "../../../../global/components/resuable-components/button";

const VolunteerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sam Volunteer",
    email: "sam.v@hungerfree.org",
    phone: "+1 (555) 123-4567",
    location: "Downtown Hub, Sector 4",
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const impactData = [
    {
      label: "Quality Rating",
      val: "4.9",
      trend: "Top 1% rated",
      color: "bg-[#22c55e]",
    },
    {
      label: "On-time Rate",
      val: "98%",
      trend: "Excellence streak",
      color: "bg-[#22c55e]",
    },
    {
      label: "Total Missions",
      val: "124",
      trend: "Highly active",
      color: "bg-[#22c55e]",
    },
    {
      label: "Impact Score",
      val: "940",
      trend: "Level 12",
      color: "bg-[#22c55e]",
    },
  ];

  const activities = [
    {
      title: "Delivery Completed",
      time: "2 hours ago",
      desc: "Successfully delivered 15kg food bundle to Sector 4 Community Center.",
    },
    {
      title: "Profile Verified",
      time: "Yesterday",
      desc: "Vehicle insurance and registration documents verified by NGO.",
    },
    {
      title: "Badge Earned",
      time: "3 days ago",
      desc: "Awarded 'Master Courier' badge for 100+ successful deliveries.",
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
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
            <div className="relative group">
              <div
                className="w-36 h-36 rounded-sm border-4 border-white shadow-xl group-hover:scale-[1.02] transition-transform duration-500 flex items-center justify-center text-6xl"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                🚴
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#22c55e] text-white p-2 rounded-sm border-2 border-white shadow-md">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                <h1
                  className="text-4xl font-black tracking-tighter"
                  style={{ color: "var(--text-primary)" }}
                >
                  {profile.name}
                </h1>
                <span className="px-3 py-1 bg-emerald-50 text-[#22c55e] rounded-sm text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                  Lvl 12
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                <p
                  className="font-bold text-xs flex items-center gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <MapPin className="w-4 h-4 text-[#22c55e]" />
                  {profile.location}
                </p>
                <p
                  className="font-bold text-xs flex items-center gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Calendar className="w-4 h-4 text-[#22c55e]" />
                  Member since Jan 2024
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <ResuableButton
                onClick={handleEditToggle}
                variant="primary"
                className="px-10 py-3.5 !rounded-sm text-xs font-black uppercase tracking-widest shadow-lg shadow-[#22c55e]/20"
              >
                {isEditing ? "Save Selection" : "Edit Profile"}
              </ResuableButton>
              <ResuableButton
                variant="secondary"
                className="p-3.5 !rounded-sm border-slate-200"
              >
                <Settings className="w-6 h-6" />
              </ResuableButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-10 pb-16">
        {/* Impact Cards */}
        <ImpactCards data={impactData} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Personal Details Section */}
            <section
              className="border p-8 rounded-sm bg-white shadow-sm"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black tracking-tight uppercase text-slate-800 flex items-center gap-3">
                  <User size={18} className="text-[#22c55e]" />
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {[
                  {
                    icon: <Mail size={18} />,
                    label: "Email Address",
                    value: profile.email,
                    key: "email",
                  },
                  {
                    icon: <Phone size={18} />,
                    label: "Phone Number",
                    value: profile.phone,
                    key: "phone",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div
                      className="p-4 rounded-sm border transition-all duration-300 group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-[#22c55e] shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] mb-1 text-slate-400">
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
                        <span className="text-sm font-bold truncate text-slate-700">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="md:col-span-2 flex items-center gap-4 group">
                  <div
                    className="p-4 rounded-sm border transition-all duration-300 group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-[#22c55e] shadow-sm"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] mb-1 text-slate-400">
                      Base Location
                    </label>
                    {isEditing ? (
                      <ResuableInput
                        value={profile.location}
                        onChange={(val) =>
                          setProfile({ ...profile, location: val })
                        }
                        align="left"
                        className="!space-y-0"
                      />
                    ) : (
                      <span className="text-sm font-bold truncate text-slate-700">
                        {profile.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Vehicle Section */}
            <section
              className="border p-8 rounded-sm bg-white shadow-sm"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black tracking-tight uppercase text-slate-800 flex items-center gap-3">
                  <TrendingUp size={18} className="text-[#22c55e]" />
                  Active Transport Vehicle
                </h3>
                <span className="px-3 py-1 bg-emerald-50 text-[#22c55e] rounded-sm text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  Verified
                </span>
              </div>

              <div
                className="p-8 rounded-sm border flex flex-col md:flex-row justify-between items-center gap-8 group transition-all hover:bg-opacity-50"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-center gap-8">
                  <div
                    className="w-24 h-24 border rounded-sm flex items-center justify-center text-5xl shrink-0 transition-colors shadow-sm"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    🚲
                  </div>
                  <div className="text-left">
                    <h5 className="text-xl font-black tracking-tight text-slate-800">
                      Electric Bicycle
                    </h5>
                    <p className="font-bold text-xs mt-1 mb-4 uppercase tracking-[0.2em] text-slate-400">
                      Model: EcoRider 3000
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#ecfdf5] border border-[#d1fae5] rounded-sm">
                        <Clock className="w-3 h-3 text-[#22c55e]" />
                        <span className="text-[9px] text-[#22c55e] font-black uppercase tracking-widest">
                          Service: Dec 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <ResuableButton
                  variant="primary"
                  className="w-full md:w-auto px-8 py-3 !rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#22c55e]/10"
                >
                  Service Logs
                </ResuableButton>
              </div>
            </section>

            {/* Weekly Availability */}
            <section
              className="border p-8 rounded-sm bg-white shadow-sm"
              style={{ borderColor: "var(--border-color)" }}
            >
              <h3 className="text-sm font-black tracking-tight uppercase text-slate-800 mb-8 flex items-center gap-3">
                <Calendar size={18} className="text-[#22c55e]" />
                Weekly Availability
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => {
                    const isActive = ["Mon", "Wed", "Fri", "Sat"].includes(day);
                    return (
                      <div
                        key={day}
                        className={`p-4 rounded-sm border text-center transition-all duration-300 ${
                          isActive
                            ? "bg-emerald-50 border-[#22c55e]/20"
                            : "opacity-40 hover:opacity-100"
                        }`}
                        style={{
                          borderColor: isActive
                            ? "#d1fae5"
                            : "var(--border-color)",
                          backgroundColor: isActive ? "#ecfdf5" : "transparent",
                        }}
                      >
                        <p
                          className={`text-[10px] font-black uppercase tracking-widest ${
                            isActive ? "text-[#22c55e]" : "text-slate-400"
                          }`}
                        >
                          {day}
                        </p>
                        <div
                          className={`w-1.5 h-1.5 rounded-full mx-auto mt-2 ${
                            isActive ? "bg-[#22c55e]" : "bg-slate-200"
                          }`}
                        ></div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          </div>

          {/* Right Sidebar Area (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Recent Activity Card */}
            <section
              className="border p-8 rounded-sm bg-white shadow-sm h-full"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black tracking-tight uppercase text-slate-800">
                  Recent Activity
                </h3>
              </div>

              <div className="relative space-y-8">
                <div
                  className="absolute left-[13px] top-2 bottom-2 w-px"
                  style={{ backgroundColor: "var(--border-color)" }}
                />
                {activities.map((activity, i) => (
                  <div key={i} className="relative pl-10 group">
                    <div
                      className="absolute left-0 top-0 w-7 h-7 rounded-sm border flex items-center justify-center transition-all group-hover:border-[#22c55e] bg-white z-10 shadow-sm"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-black text-slate-800 leading-tight group-hover:text-[#22c55e] transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 mb-2">
                        {activity.time}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                        {activity.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Account Status / Rank */}
            <section
              className="border p-8 rounded-sm bg-white shadow-sm"
              style={{ borderColor: "var(--border-color)" }}
            >
              <h4 className="text-[#22c55e] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                Volunteer Rank
              </h4>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-4xl font-black tracking-tighter text-slate-800 leading-none">
                  Master
                </span>
                <span className="text-[#22c55e] text-xs font-black pb-1">
                  Courier
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Next Level: 1,000 Pts
                  </p>
                  <span className="text-xs font-black text-[#22c55e]">94%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#22c55e] h-full w-[94%] transition-all duration-1000" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;
