import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, MapPin, Clock, Building2, Phone, Info } from "lucide-react";
import DonationActivityCard from "../../../../global/components/resuable-components/DonationActivityCard";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";

interface DonationDetail {
  id: number;
  foodType: string;
  quantity: string;
  ngo: string;
  date: string;
  status: string;
  pickupAddress: string;
  deliveryAddress: string;
  description: string;
  volunteer?: {
    name: string;
    phone: string;
    rating: string;
  };
  timeline: {
    status: string;
    date: string;
    time: string;
    completed: boolean;
  }[];
}

const MyDonations = () => {
  const navigate = useNavigate();
  const [selectedDonation, setSelectedDonation] =
    useState<DonationDetail | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const donationHistory: DonationDetail[] = [
    {
      id: 1,
      foodType: "Fresh Vegetables & Fruits",
      quantity: "15 kg",
      ngo: "Green Harvest NGO",
      date: "Dec 27, 2024",
      status: "Collected",
      pickupAddress: "123, Anna Salai, Heritage Town, Puducherry 605001",
      deliveryAddress: "Hope Shelter Main Hall, Mission Street, Pondy 605001",
      description:
        "Organic seasonal vegetables including carrots, spinach, and apples. Freshly packed from the morning harvest.",
      volunteer: {
        name: "Suresh Kumar",
        phone: "+91 98765 43210",
        rating: "4.8",
      },
      timeline: [
        {
          status: "Donation Created",
          date: "Dec 27, 2024",
          time: "09:00 AM",
          completed: true,
        },
        {
          status: "Volunteer Assigned",
          date: "Dec 27, 2024",
          time: "10:30 AM",
          completed: true,
        },
        {
          status: "Pickup Completed",
          date: "Dec 27, 2024",
          time: "11:45 AM",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Dec 27, 2024",
          time: "12:00 PM",
          completed: false,
        },
        {
          status: "Delivered",
          date: "Dec 27, 2024",
          time: "--:--",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      foodType: "Cooked Meals",
      quantity: "10 portions",
      ngo: "Hope Shelter",
      date: "Dec 25, 2024",
      status: "In Transit",
      pickupAddress: "456, Goubert Avenue, Rock Beach, Pondicherry 605001",
      deliveryAddress: "Community Kitchen B, White Town, Puducherry 605001",
      description:
        "Hot meals consisting of Rice, Dal, and Mixed Vegetable curry. Prepared and packed within 2 hours.",
      volunteer: {
        name: "Anjali Sharma",
        phone: "+91 87654 32109",
        rating: "4.9",
      },
      timeline: [
        {
          status: "Donation Created",
          date: "Dec 25, 2024",
          time: "06:00 PM",
          completed: true,
        },
        {
          status: "Volunteer Assigned",
          date: "Dec 25, 2024",
          time: "06:15 PM",
          completed: true,
        },
        {
          status: "Pickup Completed",
          date: "Dec 25, 2024",
          time: "07:00 PM",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Dec 25, 2024",
          time: "07:15 PM",
          completed: true,
        },
        {
          status: "Delivered",
          date: "Dec 25, 2024",
          time: "--:--",
          completed: false,
        },
      ],
    },
  ];

  const handleDetailsClick = (donation: DonationDetail) => {
    setSelectedDonation(donation);
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="text-start space-y-2">
          <h1
            className="text-4xl md:text-5xl font-black tracking-tighter leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            My Donations
          </h1>
          <p
            className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-40"
            style={{ color: "var(--text-secondary)" }}
          >
            Track and manage your community contributions
          </p>
        </div>
        <button
          onClick={() => navigate("/donor/donations/create")}
          className="w-full sm:w-auto px-8 py-4 bg-[#22c55e] text-white rounded-md text-[11px] font-black uppercase tracking-widest hover:bg-[#16a34a] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-green-500/20"
        >
          <Package size={18} />
          Create New Donation
        </button>
      </div>

      {/* Donation History */}
      {donationHistory.length > 0 ? (
        <div className="space-y-6 w-full">
          <div className="text-left relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-slate-100/60"></div>
            </div>
            <div className="relative flex justify-start">
              <span
                className="pr-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#22c55e]"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
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
                onActionClick={() => handleDetailsClick(donation)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="mt-8 border border-dashed p-16 flex flex-col items-center justify-center rounded-md shadow-sm"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div
            className="w-16 h-16 border rounded-md flex items-center justify-center mb-6 shadow-inner"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-primary)",
            }}
          >
            <Package
              size={28}
              style={{ color: "var(--text-muted)" }}
              className="opacity-30"
            />
          </div>
          <h3
            className="text-2xl font-black tracking-tighter uppercase mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            No Donations Yet
          </h3>
          <p
            className="text-[11px] font-bold text-center max-w-sm leading-relaxed uppercase tracking-widest mb-8"
            style={{ color: "var(--text-muted)" }}
          >
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

      {/* Donation Details Drawer */}
      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Donation Intelligence"
        subtitle={`Tracking ID: #DON-${selectedDonation?.id}00${selectedDonation?.id}`}
        size="md"
      >
        {selectedDonation && (
          <div className="space-y-8 p-4 sm:p-6 lg:p-8">
            {/* Hero Section */}
            <div
              className="p-6 rounded-2xl border shadow-sm space-y-4"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <h3
                    className="text-2xl font-black tracking-tight leading-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedDonation.foodType}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#22c55e]/10 text-[#22c55e] text-[9px] font-black uppercase tracking-widest rounded-lg border border-[#22c55e]/20">
                      {selectedDonation.status}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest opacity-40"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      • {selectedDonation.quantity}
                    </span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 bg-hf-green/10 border-hf-green/20">
                  <Package className="text-hf-green" size={28} />
                </div>
              </div>

              <p
                className="text-xs font-semibold leading-relaxed opacity-60"
                style={{ color: "var(--text-secondary)" }}
              >
                {selectedDonation.description}
              </p>
            </div>

            {/* Tracking Timeline */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Clock size={14} className="text-[#22c55e]" />
                Live Tracking Activity
              </h4>
              <div className="relative space-y-4 before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-[var(--border-color)]">
                {selectedDonation.timeline.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-4 pl-1"
                  >
                    <div
                      className={`z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${item.completed ? "border-[#22c55e]" : "border-[var(--border-color)]"}`}
                      style={{ backgroundColor: "var(--bg-primary)" }}
                    >
                      {item.completed && (
                        <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                      )}
                    </div>
                    <div
                      className="flex flex-1 justify-between items-center gap-3 p-2.5 rounded-md border shadow-sm hover:border-[#22c55e]/30 transition-all min-w-0"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <div className="min-w-0">
                        <p
                          className={`text-[11px] font-black uppercase tracking-wider truncate mb-0.5`}
                          style={{
                            color: item.completed
                              ? "var(--text-primary)"
                              : "var(--text-muted)",
                          }}
                        >
                          {item.status}
                        </p>
                        <p
                          className="text-[9px] font-bold uppercase"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {item.date}
                        </p>
                      </div>
                      <span className="text-[10px] font-black text-[#22c55e] tabular-nums shrink-0">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pickup & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="p-6 rounded-2xl border space-y-4"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-hf-green">
                  <MapPin size={16} />
                  Pickup Point
                </div>
                <p
                  className="text-xs font-bold leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedDonation.pickupAddress}
                </p>
              </div>
              <div
                className="p-6 rounded-2xl border space-y-4"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
                  <Building2 size={16} />
                  Delivery Point
                </div>
                <div className="space-y-1.5">
                  <h5
                    className="text-xs font-black uppercase tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedDonation.ngo}
                  </h5>
                  <p
                    className="text-[11px] font-bold leading-relaxed opacity-60"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {selectedDonation.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Volunteer Section */}
            {selectedDonation.volunteer && (
              <div
                className="p-6 rounded-2xl border space-y-6"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
                  Assigned Personnel
                </h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className="w-14 h-14 rounded-2xl border flex items-center justify-center text-hf-green font-black text-2xl shadow-sm shrink-0 bg-[var(--bg-primary)]"
                      style={{
                        borderColor: "var(--border-color)",
                      }}
                    >
                      {selectedDonation.volunteer.name.charAt(0)}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p
                        className="text-sm font-black uppercase tracking-tight truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedDonation.volunteer.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        <span className="text-[10px] font-bold text-hf-green flex items-center gap-1.5">
                          <Star
                            className="fill-yellow-400 text-yellow-400"
                            size={12}
                          />
                          {selectedDonation.volunteer.rating}
                        </span>
                        <span
                          className="text-[10px] font-bold opacity-50 flex items-center gap-1.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <Phone size={12} />
                          {selectedDonation.volunteer.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-6 py-3 rounded-xl border border-hf-green text-hf-green font-black uppercase tracking-widest text-[10px] hover:bg-hf-green hover:text-white transition-all shadow-sm active:scale-95 flex items-center justify-center gap-3 bg-[var(--bg-primary)]">
                    <Phone size={16} />
                    Call Volunteer
                  </button>
                </div>
              </div>
            )}

            {/* Info Note */}
            <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-md border border-blue-100/50">
              <Info className="text-blue-500 shrink-0" size={16} />
              <p className="text-[10px] font-medium text-blue-700 leading-relaxed italic">
                Your donation is currently being tracked by our Intelligence
                System. Live updates are provided by our field volunteers using
                the HungerFree Mobile App.
              </p>
            </div>
          </div>
        )}
      </ResuableDrawer>
    </div>
  );
};

// Supporting Icons missing in imports
const Star = ({ className, size, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default MyDonations;
