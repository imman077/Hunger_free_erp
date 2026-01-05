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
      statusColor: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center px-2">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight text-start"
            style={{ color: "var(--text-primary)" }}
          >
            My Donations
          </h1>
          <p
            className="text-sm font-medium mt-1 text-start"
            style={{ color: "var(--text-secondary)" }}
          >
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
            <h2
              className="text-[10px] font-black uppercase tracking-[0.2em] mb-4"
              style={{ color: "var(--text-muted)" }}
            >
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
        <div
          className="mt-8 border border-dashed p-16 flex flex-col items-center justify-center"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div
            className="w-16 h-16 border rounded-none flex items-center justify-center mb-6"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            <Package size={28} style={{ color: "var(--text-muted)" }} />
          </div>
          <h3
            className="text-xl font-black tracking-tight uppercase mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            No Donations Yet
          </h3>
          <p
            className="text-xs font-bold text-center max-w-sm leading-relaxed uppercase tracking-tight mb-8"
            style={{ color: "var(--text-muted)" }}
          >
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
