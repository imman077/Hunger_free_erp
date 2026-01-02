import { useNavigate } from "react-router-dom";
import { Package, TrendingUp } from "lucide-react";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ReusableButton from "../../../../global/components/resuable-components/button";

const NGODashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Requested Items",
      val: "45",
      trend: "Active requests",
      color: "bg-blue-500",
    },
    {
      label: "Total Beneficiaries",
      val: "850",
      trend: "+120 this month",
      color: "bg-[#22c55e]",
    },
    {
      label: "Inventory Status",
      val: "Good",
      trend: "Stocked up",
      color: "bg-[#22c55e]",
    },
    {
      label: "Pending Pickups",
      val: "8",
      trend: "Ready for collection",
      color: "bg-orange-500",
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
    <div className="w-full space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-black text-start">
        NGO Operations Center
      </h1>

      <ImpactCards data={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Needs */}
        <div className="bg-white rounded-sm p-5 border border-gray-100 flex flex-col items-start min-h-[300px]">
          <div className="flex justify-between items-center w-full mb-4">
            <h3 className="text-lg font-semibold text-black">Active Needs</h3>
            <ReusableButton
              variant="ghost"
              size="sm"
              onClick={() => navigate("/ngo/needs/post")}
              className="!text-[#22c55e] !font-bold"
            >
              Post New Need +
            </ReusableButton>
          </div>

          <div className="w-full space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-start">
              <p className="text-sm font-bold text-gray-900">
                Baby Food & Formula
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Quantity: 20 packs • Urgency: High
              </p>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#22c55e] h-full w-[65%]" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 text-right">
                65% fulfilled
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-start">
              <p className="text-sm font-bold text-gray-900">Winter Blankets</p>
              <p className="text-xs text-gray-500 mt-1">
                Quantity: 50 units • Urgency: Medium
              </p>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full w-[30%]" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 text-right">
                30% fulfilled
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-sm p-5 border border-gray-100 flex flex-col items-start min-h-[300px]">
          <h3 className="text-lg font-semibold text-black mb-4">
            Recent Notifications
          </h3>
          <div className="w-full space-y-4">
            {notifications.map((notif, index) => (
              <div key={index} className="flex gap-4 items-start group">
                <div
                  className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${
                    notif.type === "donation"
                      ? "bg-emerald-50 text-[#22c55e]"
                      : "bg-blue-50 text-blue-500"
                  }`}
                >
                  {notif.type === "donation" ? (
                    <Package size={18} />
                  ) : (
                    <TrendingUp size={18} />
                  )}
                </div>
                <div className="flex flex-col items-start border-b border-gray-50 pb-3 w-full">
                  <p className="text-sm font-bold text-gray-900">
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-500 text-start mt-0.5">
                    {notif.desc}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
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
