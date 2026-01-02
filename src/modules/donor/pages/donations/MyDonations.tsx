import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import DonationActivityCard from "../../../../global/components/resuable-components/DonationActivityCard";

const MyDonations = () => {
  const navigate = useNavigate();

  const donationHistory = [
    {
      id: 1,
      foodType: "Fresh Vegetables & Fruits",
      quantity: "15 kg",
      ngo: "Green Harvest NGO",
      date: "Dec 27, 2024",
      status: "Collected",
      statusColor: "text-green-600 bg-green-50",
    },
    {
      id: 2,
      foodType: "Cooked Meals",
      quantity: "10 portions",
      ngo: "Hope Shelter",
      date: "Dec 25, 2024",
      status: "In Transit",
      statusColor: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight text-start">
            My Donations
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1 text-start">
            Track and manage your community contributions.
          </p>
        </div>
        <button
          onClick={() => navigate("/donor/donations/create")}
          className="px-6 py-2.5 bg-[#22c55e] text-white rounded-none text-[10px] font-black uppercase tracking-widest hover:bg-[#16a34a] transition-all flex items-center gap-3 active:scale-95"
        >
          <Package size={16} />
          Donate Now
        </button>
      </div>

      {/* Donation History */}
      {donationHistory.length > 0 ? (
        <div className="mt-8 space-y-4 w-full">
          <div className="px-2">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
              All Contributions
            </h2>
          </div>
          {donationHistory.map((donation) => (
            <DonationActivityCard
              key={donation.id}
              icon={<Package size={24} />}
              title={donation.foodType}
              subtitle={`${donation.quantity} • ${donation.ngo}`}
              status={donation.status}
              date={donation.date}
              actionLabel="View Impact"
              onActionClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 bg-white rounded-none border border-dashed border-gray-100 p-16 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-none flex items-center justify-center mb-6">
            <Package className="text-gray-200" size={28} />
          </div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase mb-1">
            No Donations Yet
          </h3>
          <p className="text-gray-400 text-xs font-bold text-center max-w-sm leading-relaxed uppercase tracking-tight mb-8">
            Start sharing surplus food with the community.
          </p>
          <button
            onClick={() => navigate("/donor/donations/create")}
            className="px-8 py-3 bg-[#22c55e] text-white rounded-none text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#16a34a] transition-all active:scale-95"
          >
            Start Journey
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
