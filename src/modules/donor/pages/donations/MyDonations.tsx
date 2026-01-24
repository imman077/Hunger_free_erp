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
      statusColor: "text-green-600 bg-green-50",
    },
  ];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 px-1">
        <div className="text-start space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-none">
            My Donations
          </h1>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
            Track and manage your community contributions
          </p>
        </div>
        <button
          onClick={() => navigate("/donor/donations/create")}
          className="px-8 py-4 bg-[#22c55e] text-white rounded-md text-[11px] font-black uppercase tracking-widest hover:bg-[#16a34a] transition-all flex items-center gap-3 active:scale-95 shadow-lg shadow-green-500/20"
        >
          <Package size={18} />
          Create New Donation
        </button>
      </div>

      {/* Donation History */}
      {donationHistory.length > 0 ? (
        <div className="space-y-10 max-w-5xl mx-auto w-full">
          <div className="text-center relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-slate-100/60"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#f8fafc] px-6 text-[11px] font-black uppercase tracking-[0.5em] text-[#22c55e]">
                Recent Contributions
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {donationHistory.map((donation) => (
              <DonationActivityCard
                key={donation.id}
                icon={<Package size={24} />}
                title={donation.foodType}
                subtitle={`${donation.quantity} • ${donation.ngo}`}
                status={donation.status}
                date={donation.date}
                actionLabel="Details"
                onActionClick={() => {}}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="mt-8 border border-dashed p-16 flex flex-col items-center justify-center rounded-md bg-white shadow-sm"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="w-16 h-16 border rounded-md flex items-center justify-center mb-6 bg-slate-50 shadow-inner"
            style={{ borderColor: "var(--border-color)" }}
          >
            <Package size={28} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-black tracking-tighter uppercase mb-2 text-slate-800">
            No Donations Yet
          </h3>
          <p className="text-[11px] font-bold text-center max-w-sm leading-relaxed uppercase tracking-widest mb-8 text-slate-400">
            Start sharing surplus food with the community.
          </p>
          <button
            onClick={() => navigate("/donor/donations/create")}
            className="px-10 py-4 bg-[#22c55e] text-white rounded-md text-[11px] font-black uppercase tracking-[0.25em] hover:bg-[#16a34a] transition-all active:scale-95 shadow-lg shadow-green-500/20"
          >
            Start Your Journey
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
