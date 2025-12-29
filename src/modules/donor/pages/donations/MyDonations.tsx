import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";

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
          className="px-6 py-2.5 bg-emerald-500 text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center gap-3 active:scale-95"
        >
          <Package size={16} />
          Donate Now
        </button>
      </div>

      {/* Donation History */}
      {donationHistory.length > 0 ? (
        <div className="mt-8 space-y-4">
          <div className="px-2">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Recent Activity
            </h2>
          </div>
          {donationHistory.map((donation) => (
            <div
              key={donation.id}
              className="bg-white rounded-sm border border-slate-100 p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-sm flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                    <Package
                      className="text-slate-300 group-hover:text-emerald-500 transition-colors"
                      size={24}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg tracking-tight">
                      {donation.foodType}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {donation.quantity}
                      </p>
                      <div className="w-1 h-1 bg-slate-200 rounded-full" />
                      <p className="text-xs font-bold text-slate-400">
                        To: {donation.ngo}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center justify-end gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-sm ${
                        donation.status === "Collected"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }`}
                    />
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest ${
                        donation.status === "Collected"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {donation.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 bg-white rounded-sm border border-dashed border-slate-200 p-20 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-sm flex items-center justify-center mb-6">
            <Package className="text-slate-200" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">
            No Donations Yet
          </h3>
          <p className="text-slate-400 text-sm font-medium text-center max-w-sm mt-2 leading-relaxed">
            Your generous contributions will appear here once you start sharing
            surplus food with the community.
          </p>
          <button
            onClick={() => navigate("/donor/donations/create")}
            className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
