import {
  Star,
  Clock,
  CheckCircle,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
} from "lucide-react";

const VolunteerProfile = () => {
  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Heading */}
        <div className="text-start">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
            VOLUNTEER PROFILE
          </h1>
          <p className="text-gray-600 font-medium">
            Manage your credentials, availability and showcase your
            contributions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Overview & Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Main Profile Card */}
            <div className="bg-white p-8 rounded-sm border border-gray-100 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-sm bg-gray-50 border border-gray-100 flex items-center justify-center text-6xl overflow-hidden">
                  🚴
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-sm border border-gray-100">
                  <div className="bg-emerald-50 p-1.5 rounded-sm border border-emerald-100">
                    <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                Sam Volunteer
              </h3>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-2 mb-6">
                Active Member since 2024
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ecfdf5] border border-[#d1fae5] rounded-sm">
                <Star className="w-4 h-4 text-[#22c55e]" fill="currentColor" />
                <span className="text-[11px] text-[#16a34a] font-black uppercase tracking-[0.15em]">
                  Master Courier
                </span>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white p-6 rounded-sm border border-gray-100">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <User size={14} /> Personal Information
              </h4>
              <div className="space-y-5">
                {[
                  {
                    icon: <Mail size={16} />,
                    label: "Email Address",
                    value: "sam.v@hungerfree.org",
                  },
                  {
                    icon: <Phone size={16} />,
                    label: "Phone Number",
                    value: "+1 (555) 123-4567",
                  },
                  {
                    icon: <MapPin size={16} />,
                    label: "Base Location",
                    value: "Downtown Hub, Sector 4",
                  },
                ].map((info, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-2 bg-gray-50 border border-gray-100 rounded-sm text-gray-400 shrink-0">
                      {info.icon}
                    </div>
                    <div className="text-start">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                        {info.label}
                      </p>
                      <p className="text-sm font-bold text-gray-900 leading-tight">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Grid */}
            <div className="bg-white p-6 rounded-sm border border-gray-100">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Calendar size={14} /> Weekly Availability
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => {
                    const isActive = ["Mon", "Wed", "Fri", "Sat"].includes(day);
                    return (
                      <div
                        key={day}
                        className={`p-2 rounded-sm border text-center transition-all ${
                          isActive
                            ? "bg-blue-50 border-blue-100"
                            : "bg-gray-50 border-gray-100 opacity-50"
                        }`}
                      >
                        <p
                          className={`text-[10px] font-black uppercase ${
                            isActive ? "text-blue-600" : "text-gray-400"
                          }`}
                        >
                          {day}
                        </p>
                        <div
                          className={`w-1 h-1 rounded-full mx-auto mt-1 ${
                            isActive ? "bg-blue-400" : "bg-gray-200"
                          }`}
                        ></div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Vehicle (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Impact & Achievements Record */}
            <div className="bg-white p-8 rounded-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                  <Star className="w-6 h-6 text-[#22c55e]" />
                  Impact & Achievement Record
                </h4>
                <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-sm text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Updated Today
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Star />,
                    value: "4.9",
                    unit: "/5",
                    label: "Quality Rating",
                    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
                  },
                  {
                    icon: <Clock />,
                    value: "98",
                    unit: "%",
                    label: "On-time Delivery",
                    color: "bg-blue-50 text-blue-600 border-blue-100",
                  },
                  {
                    icon: <CheckCircle />,
                    value: "0",
                    unit: "Issues",
                    label: "Reliability Score",
                    color: "bg-purple-50 text-purple-600 border-purple-100",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`h-full p-6 rounded-sm border flex flex-col items-center justify-center text-center ${stat.color}`}
                  >
                    <div className="mb-4 bg-white/50 p-2 rounded-sm">
                      {stat.icon}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black">{stat.value}</span>
                      <span className="text-xs font-black uppercase opacity-70">
                        {stat.unit}
                      </span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registered Vehicle Section */}
            <div className="bg-white p-8 rounded-sm border border-gray-100">
              <h4 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-[#22c55e]" />
                Primary Transport Vehicle
              </h4>

              <div className="p-8 rounded-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 group transition-all hover:bg-gray-50/50">
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center text-5xl shrink-0 group-hover:bg-white transition-colors">
                    🚲
                  </div>
                  <div>
                    <h5 className="text-xl font-black text-gray-900 tracking-tight">
                      Electric Bicycle
                    </h5>
                    <p className="text-gray-400 font-bold text-sm mt-1 mb-4 uppercase tracking-widest">
                      Model: EcoRider 3000
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ecfdf5] border border-[#d1fae5] rounded-sm">
                        <CheckCircle className="w-3 h-3 text-[#22c55e]" />
                        <span className="text-[9px] text-[#16a34a] font-black uppercase tracking-widest">
                          Verified
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-sm">
                        <Clock className="w-3 h-3 text-blue-500" />
                        <span className="text-[9px] text-blue-600 font-black uppercase tracking-widest">
                          Last Service: Dec 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <button className="w-full md:w-auto px-10 py-3 bg-[#0f172a] text-white rounded-sm text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all active:scale-95">
                    Service Logs
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 flex justify-end gap-4">
                <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-sm text-xs font-black uppercase tracking-[0.15em] hover:bg-gray-50 transition-colors">
                  Request Change
                </button>
                <button className="px-8 py-3 bg-[#22c55e] text-white rounded-sm text-xs font-black uppercase tracking-[0.15em] hover:bg-[#16a34a] transition-all shadow-none">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;
