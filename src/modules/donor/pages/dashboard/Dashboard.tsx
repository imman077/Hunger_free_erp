import { Heart, Package, Clock, Award } from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";

const DonorDashboard = () => {
  const stats = [
    {
      title: "Total Donations",
      value: "24",
      change: "+2 this month",
      changeColor: "text-green-600",
    },
    {
      title: "Meals Provided",
      value: "120",
      change: "+15 since last week",
      changeColor: "text-green-600",
    },
    {
      title: "Impact Points",
      value: "1,250",
      change: "Level 3 Donor",
      changeColor: "text-blue-600",
    },
    {
      title: "Active Requests",
      value: "3",
      change: "Pending pickups",
      changeColor: "text-orange-600",
    },
  ];

  const recentDonations = [
    {
      icon: <Package className="w-6 h-6 text-green-600" />,
      title: "Fresh Vegetables & Fruits",
      ngo: "Green Harvest NGO",
      time: "2 hours ago",
      status: "Collected",
      color: "border-green-500",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Cooked Meals (10 portions)",
      ngo: "Hope Shelter",
      time: "Yesterday",
      status: "In Transit",
      color: "border-blue-500",
    },
  ];

  return (
    <div className="w-full space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-black text-start">
        My Impact Overview
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
        <div className="bg-white rounded-md p-5 border border-gray-100 min-h-[300px] flex flex-col items-start">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            <Award className="text-emerald-500" /> My Badges & Achievements
          </h3>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex flex-col items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                <Heart size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-700">
                Kind Soul
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100 text-gray-400 grayscale">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <Package size={24} />
              </div>
              <span className="text-xs font-bold text-blue-700">Food Hero</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Donate 5 more times to unlock "Food Hero" badge!
          </p>
        </div>

        <div className="bg-white rounded-md p-5 border border-gray-100 min-h-[300px]">
          <h3 className="text-lg font-semibold text-black mb-4 text-start">
            Recent Donations
          </h3>
          <div className="space-y-4">
            {recentDonations.map((donation, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-3 rounded-lg border-l-4 ${donation.color} bg-gray-50`}
              >
                <div className="pt-1">{donation.icon}</div>
                <div className="flex flex-col items-start">
                  <p className="text-gray-900 font-medium">{donation.title}</p>
                  <p className="text-xs text-gray-500">{donation.ngo}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600">
                      {donation.status}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {donation.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
