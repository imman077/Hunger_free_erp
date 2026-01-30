import { useState } from "react";
import { Icon } from "../../../../global/components/resuable-components/Icon";
import ResuableButton from "../../../../global/components/resuable-components/button";
import {
  INITIAL_TIERS,
  INITIAL_MILESTONES,
  getIcon,
} from "../../../../global/constants/milestone_config";
import { ShieldCheck } from "lucide-react";

const DonorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile] = useState({
    businessName: "Grand Regal Hotel",
    name: "Johnathan Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    donorType: "Hotel",
    location: "Chennai, TN",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const currentPoints = 24500;
  const currentTier =
    INITIAL_TIERS.find((t) => currentPoints >= t.pointsRequired) ||
    INITIAL_TIERS[0];

  const impactData = [
    {
      label: "Community Impact",
      val: "1.2K",
      trend: "Total Points",
      icon: "users",
    },
    {
      label: "Support Reach",
      val: "48",
      trend: "Lives Impacted",
      icon: "donations",
    },
    {
      label: "Contribution Count",
      val: "24",
      trend: "Active Missions",
      icon: "donations",
    },
    {
      label: "Current Tier",
      val: currentTier.name,
      trend: currentTier.perks,
      icon: "trophy",
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

  const intelligenceStats = [
    {
      label: "Trust Score",
      value: "98.4%",
      color: "from-emerald-500 to-teal-400",
      progress: 98,
    },
    {
      label: "System Rank",
      value: "#128",
      color: "from-blue-500 to-indigo-400",
      progress: 85,
    },
    {
      label: "Response Rate",
      value: "100%",
      color: "from-amber-500 to-orange-400",
      progress: 100,
    },
  ];

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* 1. PREMIUM IDENTITY HEADER */}
      <div className="relative h-80 w-full bg-[#0f172a] overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-40 -mt-20" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-20 -mb-20" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 h-full flex items-center pt-12 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-10 w-full mb-12">
            {/* Logo/Avatar */}
            <div className="relative shrink-0 group">
              <div className="w-48 h-48 rounded-sm overflow-hidden border-[8px] border-[#0f172a] shadow-2xl bg-white bg-opacity-95 backdrop-blur-xl">
                <img
                  src="/hotel_logo1.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-3 rounded-sm border-4 border-[#0f172a] shadow-xl">
                <Icon name="verified" className="w-6 h-6" />
              </div>
            </div>

            {/* Identity Info */}
            <div className="flex-1 space-y-4 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-sm">
                    Verified {currentTier.name}
                  </span>
                  <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">
                    ID: DON-2025-0012
                  </span>
                </div>
                <h1 className="text-6xl font-black tracking-tighter text-white uppercase leading-none">
                  {profile.businessName}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-8 border-t border-white/5 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                    Industry Category
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-tight">
                    {profile.donorType} Services
                  </span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                    Primary Region
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-tight">
                    {profile.location}
                  </span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                    Member Since
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-tight">
                    January 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Control Hub */}
            <div className="flex gap-4 pb-4">
              <ResuableButton
                onClick={() => {}}
                variant="dark"
                className="w-14 h-14 !p-0 !rounded-sm border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center group"
              >
                <Icon
                  name="settings"
                  className="w-5 h-5 text-white/40 group-hover:text-white transition-colors"
                />
              </ResuableButton>
              <ResuableButton
                onClick={handleEditToggle}
                variant="primary"
                className="px-10 h-14 !rounded-sm text-[11px] text-white font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all"
              >
                {isEditing ? "Save Profile Changes" : "Edit Enterprise Profile"}
              </ResuableButton>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE INTELLIGENCE DASHBOARD BAR */}
      <div className="max-w-7xl mx-auto px-8 -mt-20 relative z-20">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-sm p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          {intelligenceStats.map((stat, i) => (
            <div key={i} className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-slate-900 leading-none">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 bg-gradient-to-br ${stat.color} rounded-sm shadow-lg shadow-emerald-500/20`}
                >
                  <Icon name="trending" className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 delay-${i * 200}`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN OPERATIONAL HUB */}
      <div className="max-w-7xl mx-auto px-8 mt-12 relative z-10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-12 justify-center mb-12 border-b border-slate-200">
          {[
            { id: "overview", label: "Intelligence Hub" },
            { id: "donations", label: "Contribution Ledger" },
            { id: "milestones", label: "Recognition Vault" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${
                activeTab === tab.id
                  ? "text-slate-900 scale-110"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-500 shadow-[0_-2px_10px_rgba(16,185,129,0.5)]" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {impactData.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm group hover:border-emerald-500/30 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-slate-50 rounded-full group-hover:bg-emerald-50 transition-colors" />
                  <Icon
                    name={item.icon}
                    className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 mb-4 transition-colors relative z-10"
                  />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                    {item.label}
                  </p>
                  <h4 className="text-3xl font-black tracking-tighter text-slate-900 mb-1">
                    {item.val}
                  </h4>
                  <p className="text-[9px] font-bold uppercase text-emerald-500 tracking-widest">
                    {item.trend}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Profile Deep Dive - Left */}
              <div className="lg:col-span-3 space-y-8">
                <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800">
                      Enterprise Identity
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {[
                      {
                        label: "Entity Level",
                        val: `${currentTier.name} Status`,
                      },
                      { label: "Primary POC", val: profile.name },
                      { label: "Verified Contact", val: profile.email },
                      { label: "Security Tier", val: "Level III Access" },
                    ].map((row, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                          {row.label}
                        </p>
                        <p className="text-[11px] font-bold text-slate-800 uppercase tabular-nums">
                          {row.val}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <ResuableButton
                    variant="outline"
                    className="w-full h-14 !rounded-sm border-slate-200 hover:border-emerald-500 text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <Icon name="mail" className="w-4 h-4 mr-2" />
                    Open Communication Hub
                  </ResuableButton>
                  <ResuableButton
                    variant="outline"
                    className="w-full h-14 !rounded-sm border-slate-200 hover:border-emerald-500 text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <Icon name="phone" className="w-4 h-4 mr-2" />
                    Secure Voice Line
                  </ResuableButton>
                </div>
              </div>

              {/* Operational Log - Middle */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm flex flex-col h-full">
                  <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800">
                      Operational Log
                    </h3>
                    <Icon name="analytics" className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="p-8 space-y-8">
                    {activities.map((activity, i) => (
                      <div key={i} className="flex gap-6 relative group">
                        {i !== activities.length - 1 && (
                          <div className="absolute left-4 top-10 bottom-0 w-px bg-slate-100" />
                        )}
                        <div className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center shrink-0 z-10 group-hover:border-emerald-500 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-800">
                              {activity.title}
                            </h4>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                              {activity.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                            {activity.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievement Matrix - Right */}
              <div className="lg:col-span-4">
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm flex flex-col h-full">
                  <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800">
                      Achievement Matrix
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="p-8 grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-100 p-5 rounded-sm group hover:border-emerald-500/30 transition-all"
                      >
                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon
                            name="verified"
                            className="w-5 h-5 text-emerald-500 opacity-60"
                          />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-1">
                          Badge #{idx + 200}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          Secured Rank
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "donations" && (
          <div className="bg-white border border-slate-200 rounded-sm p-20 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100 mb-8">
              <Icon name="stack" className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black tracking-tighter text-slate-900 mb-4">
              ENCRYPTED CONTRIBUTION LEDGER
            </h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest max-w-lg mx-auto leading-loose mb-10">
              Your historical donation data is synchronized via decentralized
              verification. Review all past food-sharing operations with full
              transparency.
            </p>
            <ResuableButton
              variant="primary"
              className="px-12 h-14 text-[10px] font-black uppercase tracking-[0.3em]"
            >
              Initialize Secure Access
            </ResuableButton>
          </div>
        )}

        {activeTab === "milestones" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-700">
            {INITIAL_MILESTONES.map((badge, i) => {
              const isUnlocked = i < 3;
              const BadgeIcon = getIcon(badge.icon);
              return (
                <div
                  key={i}
                  className={`bg-white border border-slate-200 p-10 flex flex-col gap-6 hover:shadow-2xl transition-all group relative overflow-hidden ${!isUnlocked && "opacity-60 grayscale"}`}
                >
                  <div className="flex items-center gap-10">
                    <div
                      className={`w-24 h-24 rounded-sm flex items-center justify-center shrink-0 border transition-colors duration-500 ${isUnlocked ? "bg-emerald-50 border-emerald-100 group-hover:bg-emerald-500" : "bg-slate-100 border-slate-200"}`}
                    >
                      <BadgeIcon
                        size={40}
                        className={`transition-colors ${isUnlocked ? "text-emerald-500 group-hover:text-white" : "text-slate-400"}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-black tracking-tighter text-slate-900 leading-tight">
                        {badge.name}
                      </h4>
                      <p
                        className={`text-[10px] font-black uppercase tracking-[0.3em] ${isUnlocked ? "text-emerald-600" : "text-slate-500"}`}
                      >
                        {isUnlocked ? "UNLOCKED" : "LOCKED"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                      {badge.desc}
                    </p>
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className={`w-3 h-3 ${isUnlocked ? "text-emerald-500" : "text-slate-300"}`}
                      />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Requirement: {badge.threshold} {badge.requirementType}
                      </span>
                    </div>
                  </div>
                  {!isUnlocked && (
                    <div className="absolute top-4 right-4 text-slate-200">
                      <Icon name="settings" className="w-5 h-5 opacity-20" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;
