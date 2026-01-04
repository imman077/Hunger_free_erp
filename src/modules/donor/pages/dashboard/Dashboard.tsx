import { Heart, Package, Clock, Award } from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import DonationActivityCard from "../../../../global/components/resuable-components/DonationActivityCard";

const DonorDashboard = () => {
  const stats = [
    {
      title: "Total Donations",
      value: "342",
      change: "+12 this week",
      changeColor: "text-green-600",
    },
    {
      title: "Impact Points",
      value: "24,500",
      change: "Diamond Tier",
      changeColor: "text-blue-600",
    },
    {
      title: "Trees Planted",
      value: "45",
      change: "Your Forest",
      changeColor: "text-emerald-600",
    },
    {
      title: "Available Points",
      value: "8,200",
      change: "Redeem for Cash",
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
            ? "bg-[#22c55e]"
            : item.changeColor.includes("blue")
            ? "bg-blue-500"
            : "bg-orange-500",
        }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-none border border-gray-100 p-8 min-h-[300px] flex flex-col relative group/ach">
          <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2 relative z-10 tracking-tighter uppercase px-1">
            <Award className="text-[#22c55e] w-4 h-4" /> Impact Milestones
          </h3>

          <div className="flex flex-wrap gap-6 relative z-10 flex-1">
            {[
              {
                name: "Kind Soul",
                status: "Unlocked",
                color: "emerald",
                icon: <Heart size={32} />,
                unlocked: true,
              },
              {
                name: "Food Hero",
                status: "Locked",
                color: "blue",
                icon: <Package size={32} />,
                unlocked: false,
              },
            ].map((badge, i) => (
              <div
                key={i}
                className={`group/badge relative p-8 rounded-none border transition-all duration-500 cursor-default min-w-[200px] flex flex-col items-center gap-5
                ${
                  badge.unlocked
                    ? badge.color === "emerald"
                      ? "bg-white border-[#d1fae5] hover:border-emerald-200"
                      : "bg-white border-blue-100 hover:border-blue-200"
                    : "bg-gray-50 border-gray-100 grayscale opacity-60"
                }
              `}
              >
                <div
                  className={`w-16 h-16 rounded-none flex items-center justify-center transition-all duration-500 group-hover/badge:scale-105
                  ${
                    badge.unlocked
                      ? badge.color === "emerald"
                        ? "bg-[#22c55e] text-white"
                        : "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }
                `}
                >
                  {badge.icon}
                </div>
                <div className="text-center">
                  <span className="block text-xs font-black text-gray-900 tracking-tight mb-2">
                    {badge.name}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-none border
                    ${
                      badge.unlocked
                        ? "bg-[#d1fae5] text-[#15803d] border-emerald-200"
                        : "bg-gray-100 text-gray-400 border-gray-200"
                    }
                  `}
                  >
                    {badge.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 relative z-10 p-4 bg-[#ecfdf5] rounded-none border border-[#d1fae5]">
            <p className="text-xs text-emerald-800 font-bold flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse" />
              Donate 5 more times to unlock{" "}
              <span className="underline decoration-emerald-200">
                Food Hero
              </span>{" "}
              badge!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-none border border-gray-100 p-6 flex flex-col relative group/donations">
          <h3 className="text-sm font-black text-gray-900 mb-6 tracking-tighter uppercase text-start px-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#22c55e]" /> Recent Activity
          </h3>

          <div className="space-y-3 relative z-10 flex-1">
            {recentDonations.map((donation, index) => (
              <DonationActivityCard
                key={index}
                icon={donation.icon}
                title={donation.title}
                subtitle={donation.ngo}
                status={donation.status}
                date={donation.time}
                compact={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
