import { MapPin, Clock, CheckCircle2, Trophy } from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";

const VolunteerDashboard = () => {
  const stats = [
    {
      title: "Deliveries Completed",
      value: "32",
      change: "+4 this week",
      changeColor: "text-green-600",
    },
    {
      title: "Hours Volunteered",
      value: "156",
      change: "Top 5% in city",
      changeColor: "text-blue-600",
    },
    {
      title: "Carbon Offset",
      value: "45kg",
      change: "e-Vehicle used",
      changeColor: "text-emerald-600",
    },
    {
      title: "Active Assignments",
      value: "2",
      change: "Due today",
      changeColor: "text-orange-600",
    },
  ];

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black text-start">
          Volunteer Dashboard
        </h1>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-emerald-700">
            Active - Available for Pickups
          </span>
        </div>
      </div>

      <ImpactCards
        data={stats.map((item) => ({
          label: item.title,
          val: item.value,
          trend: item.change,
          color: item.changeColor.includes("green")
            ? "bg-emerald-500"
            : item.changeColor.includes("blue")
            ? "bg-blue-500"
            : "bg-orange-500",
        }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="md:col-span-2 bg-white rounded-md p-5 border border-gray-100 flex flex-col items-start min-h-[300px]">
          <h3 className="text-lg font-semibold text-black mb-4">
            Today's Schedule
          </h3>
          <div className="w-full space-y-4">
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start gap-4 group cursor-pointer hover:bg-emerald-50 transition-all">
              <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-200">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col items-start pt-0.5">
                <h4 className="font-bold text-gray-900">
                  Food Collection - Local Bakery
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Pickup at 2:00 PM • 15th Ave Street
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] px-2 py-0.5 bg-white rounded-full border border-emerald-200 text-emerald-700 font-bold uppercase">
                    Pickup Pending
                  </span>
                  <span className="text-[10px] text-gray-400 py-0.5 flex items-center gap-1">
                    <Clock size={10} /> 45 mins from now
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4 opacity-75">
              <div className="p-3 bg-blue-500 text-white rounded-xl">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex flex-col items-start pt-0.5">
                <h4 className="font-bold text-gray-900">
                  Delivery - Orphanage Home
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Completed at 10:30 AM • Downtown Area
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 rounded-full text-blue-700 font-bold uppercase">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Progress */}
        <div className="bg-white rounded-md p-5 border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border-2 border-emerald-100">
            <Trophy className="text-emerald-500" size={32} />
          </div>
          <h4 className="font-bold text-gray-900">Elite Courier</h4>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-black mt-1">
            Level 4
          </p>

          <div className="w-full mt-8 space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
              <span>Progress to Level 5</span>
              <span>85%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            </div>
            <p className="text-[10px] text-gray-500 text-center mt-4">
              8 more successful deliveries to reach Level 5!
            </p>
          </div>

          <button className="w-full mt-6 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors">
            Claim Rewards
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
