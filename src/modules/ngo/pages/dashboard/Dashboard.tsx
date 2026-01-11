import { useNavigate } from "react-router-dom";
import { Package, TrendingUp } from "lucide-react";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ReusableButton from "../../../../global/components/resuable-components/button";

const NGODashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Impact Points",
      val: "45,000",
      trend: "Legend Tier",
      color: "bg-indigo-600",
    },
    {
      label: "Total Beneficiaries",
      val: "12,500",
      trend: "+1,200 this month",
      color: "bg-indigo-500",
    },
    {
      label: "Trees Planted",
      val: "150",
      trend: "Impact Forest",
      color: "bg-[#22c55e]",
    },
    {
      label: "Grant Eligible",
      val: "₹3.0L",
      trend: "Super Grant Unlocked",
      color: "bg-orange-600",
    },
  ];

  const notifications = [
    {
      title: "New Donation Available",
      desc: "Fresh bread from Local Bakery (10kg)",
      time: "10 mins ago",
      type: "donation",
    },
    {
      title: "Driver Assigned",
      desc: "Michael is on the way for pickup #2234",
      time: "45 mins ago",
      type: "logistics",
    },
  ];

  return (
    <div
      className="w-full space-y-10 p-8 min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-start">
          <h1 className="text-5xl font-black tracking-tighter uppercase text-slate-900">
            NGO Operations Center
          </h1>
          <p className="font-medium text-lg text-slate-500 mt-2">
            Managing impact and logistics in real-time ⚡
          </p>
        </div>
      </div>

      <ImpactCards data={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Needs */}
        <div
          className="rounded-sm p-8 border flex flex-col items-start min-h-[400px] bg-white shadow-sm"
          style={{
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex justify-between items-center w-full mb-8">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">
              Active Needs
            </h3>
            <ReusableButton
              variant="ghost"
              size="sm"
              onClick={() => navigate("/ngo/needs/post")}
              className="!text-indigo-600 !font-black !rounded-sm uppercase text-[10px] tracking-widest hover:!bg-indigo-50"
            >
              Post New Need +
            </ReusableButton>
          </div>

          <div className="w-full space-y-4">
            <div className="p-5 bg-slate-50 rounded-sm border border-slate-100 text-start group hover:border-emerald-100 hover:bg-emerald-50/30 transition-all">
              <p className="text-sm font-black text-slate-800">
                Baby Food & Formula
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-bold uppercase tracking-wide">
                Quantity: 20 packs • Urgency: High
              </p>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-4 overflow-hidden border border-slate-100 shadow-inner">
                <div className="bg-indigo-500 h-full w-[65%] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
              </div>
              <p className="text-[10px] font-black text-indigo-600 mt-2 text-right uppercase tracking-widest">
                65% fulfilled
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-sm border border-slate-100 text-start group hover:border-emerald-100 hover:bg-emerald-50/30 transition-all">
              <p className="text-sm font-black text-slate-800">
                Winter Blankets
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-bold uppercase tracking-wide">
                Quantity: 50 units • Urgency: Medium
              </p>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-4 overflow-hidden border border-slate-100">
                <div className="bg-blue-500 h-full w-[30%] rounded-full" />
              </div>
              <p className="text-[10px] font-black text-blue-600 mt-2 text-right uppercase tracking-widest">
                30% fulfilled
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div
          className="rounded-sm p-8 border flex flex-col items-start min-h-[400px] bg-white shadow-sm"
          style={{
            borderColor: "var(--border-color)",
          }}
        >
          <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">
            Recent Notifications
          </h3>
          <div className="w-full space-y-6">
            {notifications.map((notif, index) => (
              <div key={index} className="flex gap-5 items-start group">
                <div
                  className={`w-12 h-12 rounded-sm flex items-center justify-center shrink-0 shadow-sm border ${
                    notif.type === "donation"
                      ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                      : "bg-blue-50 text-blue-500 border-blue-100"
                  }`}
                >
                  {notif.type === "donation" ? (
                    <Package size={22} />
                  ) : (
                    <TrendingUp size={22} />
                  )}
                </div>
                <div className="flex flex-col items-start border-b border-slate-50 pb-5 w-full last:border-0">
                  <p className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {notif.title}
                  </p>
                  <p className="text-xs font-medium text-slate-500 text-start mt-1 leading-relaxed">
                    {notif.desc}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">
                    {notif.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
