import { Package, TrendingUp } from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";

const NGODashboard = () => {
  const stats = [
    {
      title: "Requested Items",
      value: "45",
      change: "Active requests",
      changeColor: "text-blue-600",
    },
    {
      title: "Total Beneficiaries",
      value: "850",
      change: "+120 this month",
      changeColor: "text-green-600",
    },
    {
      title: "Inventory Status",
      value: "Good",
      change: "Stocked up",
      changeColor: "text-green-600",
    },
    {
      title: "Pending Pickups",
      value: "8",
      change: "Ready for collection",
      changeColor: "text-orange-600",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Needs */}
        <div className="bg-white rounded-md p-5 border border-gray-100 flex flex-col items-start min-h-[300px]">
          <div className="flex justify-between items-center w-full mb-4">
            <h3 className="text-lg font-semibold text-black">Active Needs</h3>
            <button className="text-xs font-bold text-emerald-600">
              Post New Need +
            </button>
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
                <div className="bg-emerald-500 h-full w-[65%]" />
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
        <div className="bg-white rounded-md p-5 border border-gray-100 flex flex-col items-start min-h-[300px]">
          <h3 className="text-lg font-semibold text-black mb-4">
            Recent Notifications
          </h3>
          <div className="w-full space-y-4">
            {notifications.map((notif, index) => (
              <div key={index} className="flex gap-4 items-start group">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    notif.type === "donation"
                      ? "bg-emerald-50 text-emerald-500"
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
