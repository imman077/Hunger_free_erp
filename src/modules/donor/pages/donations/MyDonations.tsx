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
      pickupAddress: "123 Green Avenue, Garden City, GC 5001",
      deliveryAddress: "Hope Shelter Main Hall, NGO Block, GC 5005",
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
      pickupAddress: "456 Royal Kitchens, North Square, GC 5002",
      deliveryAddress: "Community Kitchen B, Hope Avenue, GC 5010",
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
                onActionClick={() => handleDetailsClick(donation)}
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

      {/* Donation Details Drawer */}
      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Donation Intelligence"
        subtitle={`Tracking ID: #DON-${selectedDonation?.id}00${selectedDonation?.id}`}
        size="md"
      >
        {selectedDonation && (
          <div className="space-y-6 pb-10">
            {/* Hero Section */}
            <div className="bg-white p-5 rounded-md border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-black tracking-tighter text-slate-900">
                    {selectedDonation.foodType}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-[#22c55e]/10 text-[#22c55e] text-[9px] font-black uppercase tracking-widest rounded-sm border border-[#22c55e]/20">
                      {selectedDonation.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      • {selectedDonation.quantity}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-slate-50 rounded-md flex items-center justify-center border border-slate-100">
                  <Package className="text-[#22c55e]" size={24} />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                {selectedDonation.description}
              </p>
            </div>

            {/* Tracking Timeline */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Clock size={14} className="text-[#22c55e]" />
                Live Tracking Activity
              </h4>
              <div className="relative space-y-4 before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-slate-100">
                {selectedDonation.timeline.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-4 pl-1"
                  >
                    <div
                      className={`z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 bg-white ${item.completed ? "border-[#22c55e]" : "border-slate-200"}`}
                    >
                      {item.completed && (
                        <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                      )}
                    </div>
                    <div className="flex flex-1 justify-between items-center bg-white p-2.5 rounded-md border border-slate-100 shadow-sm hover:border-[#22c55e]/30 transition-all">
                      <div>
                        <p
                          className={`text-[11px] font-black uppercase tracking-wider ${item.completed ? "text-slate-900" : "text-slate-400"}`}
                        >
                          {item.status}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">
                          {item.date}
                        </p>
                      </div>
                      <span className="text-[10px] font-black text-[#22c55e] tabular-nums">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pickup & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-md border border-slate-100 bg-white space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <MapPin size={14} className="text-[#22c55e]" />
                  Pickup Point
                </div>
                <p className="text-[11px] font-bold text-slate-700 leading-relaxed">
                  {selectedDonation.pickupAddress}
                </p>
              </div>
              <div className="p-5 rounded-md border border-slate-100 bg-white space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <Building2 size={14} className="text-blue-500" />
                  Delivery Point
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                    {selectedDonation.ngo}
                  </p>
                  <p className="text-[11px] font-bold text-slate-700 leading-relaxed">
                    {selectedDonation.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Volunteer Section */}
            {selectedDonation.volunteer && (
              <div className="p-6 rounded-md border border-slate-100 bg-slate-50/50 space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Assigned Personnel
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#22c55e] font-black text-xl shadow-sm">
                      {selectedDonation.volunteer.name.charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[12px] font-black text-slate-900 uppercase">
                        {selectedDonation.volunteer.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <Star
                            className="fill-yellow-400 text-yellow-400"
                            size={12}
                          />
                          {selectedDonation.volunteer.rating}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <Phone size={12} />
                          {selectedDonation.volunteer.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2.5 rounded-full bg-white border border-slate-100 text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-all shadow-sm">
                    <Phone size={16} />
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
