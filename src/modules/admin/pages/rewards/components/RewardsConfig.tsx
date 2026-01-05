import React from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Shield,
  Eye,
  EyeOff,
  IndianRupee,
  Plane,
  Sparkles,
} from "lucide-react";
import ResuableButton from "../../../../../global/components/resuable-components/button";

const REWARDS_CATALOG = {
  cash: [
    { id: 1, name: "Quick Cash", val: "₹1,000", pts: 600, active: true },
    { id: 2, name: "Cash Bonus", val: "₹2,500", pts: 1200, active: true },
    { id: 3, name: "Grand Prize", val: "₹50,000", pts: 20000, active: true },
    { id: 4, name: "Legend Prize", val: "₹1,00,000", pts: 35000, active: true },
  ],
  tours: [
    { id: 5, name: "Goa Trip", val: "3D/2N", pts: 8000, active: true },
    { id: 6, name: "Thailand", val: "6D/5N", pts: 35000, active: false },
    { id: 7, name: "Europe Hub", val: "10D/9N", pts: 75000, active: true },
  ],
  youth: [
    { id: 8, name: "PS5 Console", val: "Digital", pts: 18000, active: true },
    { id: 9, name: "iPhone 15", val: "128GB", pts: 35000, active: true },
  ],
};

const RewardsConfig: React.FC = () => {
  return (
    <div className="space-y-12 pb-10">
      <header className="flex items-center justify-between">
        <div className="text-start">
          <h3
            className="text-2xl font-black uppercase tracking-tighter"
            style={{ color: "var(--text-primary)" }}
          >
            Reward Catalog Management
          </h3>
          <p
            className="font-medium text-sm italic"
            style={{ color: "var(--text-secondary)" }}
          >
            Define what users can buy with their hard-earned points
          </p>
        </div>
        <ResuableButton variant="dark" className="!bg-slate-900 px-8">
          <Plus size={18} className="mr-2" /> Add New Reward
        </ResuableButton>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cash Prizes */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2 bg-emerald-50 rounded-sm text-emerald-600">
              <IndianRupee size={20} />
            </div>
            <h4 className="font-black uppercase tracking-widest text-slate-800">
              Cash Prizes
            </h4>
          </div>
          <div className="space-y-3">
            {REWARDS_CATALOG.cash.map((item) => (
              <RewardCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Tour Packages */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2 bg-blue-50 rounded-sm text-blue-600">
              <Plane size={20} />
            </div>
            <h4 className="font-black uppercase tracking-widest text-slate-800">
              Tour Packages
            </h4>
          </div>
          <div className="space-y-3">
            {REWARDS_CATALOG.tours.map((item) => (
              <RewardCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Youth & Tech */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2 bg-purple-50 rounded-sm text-purple-600">
              <Sparkles size={20} />
            </div>
            <h4 className="font-black uppercase tracking-widest text-slate-800">
              Youth & Tech
            </h4>
          </div>
          <div className="space-y-3">
            {REWARDS_CATALOG.youth.map((item) => (
              <RewardCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* High Value Security Lock */}
      <div className="bg-slate-50 border border-slate-200 border-dashed p-8 rounded-sm flex items-center gap-6">
        <div className="p-4 bg-white rounded-full border border-slate-200 shadow-sm">
          <Shield className="text-slate-400" size={32} />
        </div>
        <div className="text-start flex-1">
          <h5
            className="font-black uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            High-Value Validation
          </h5>
          <p
            className="text-xs font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Rewards above ₹50,000 require secondary admin approval and manual
            KYC verification of the recipient.
          </p>
        </div>
        <ResuableButton
          variant="ghost"
          className="text-[10px] font-black uppercase"
        >
          Edit Security Rules
        </ResuableButton>
      </div>
    </div>
  );
};

const RewardCard: React.FC<{ item: any }> = ({ item }) => (
  <div
    className={`p-4 border rounded-sm flex items-center justify-between group transition-all ${
      !item.active && "opacity-60 border-dashed"
    }`}
    style={{
      backgroundColor: item.active
        ? "var(--bg-primary)"
        : "var(--bg-secondary)",
      borderColor: "var(--border-color)",
    }}
  >
    <div className="text-start">
      <div className="flex items-center gap-2">
        <p
          className="font-black text-sm leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {item.name}
        </p>
        {!item.active && (
          <span className="text-[8px] font-black text-slate-400 border border-slate-200 px-1 rounded-sm uppercase">
            Disabled
          </span>
        )}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {item.val} • {item.pts.toLocaleString()} PTS
      </p>
    </div>
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-blue-500 transition-colors">
        <Edit2 size={14} />
      </button>
      <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-emerald-500 transition-colors">
        {item.active ? <Eye size={14} /> : <EyeOff size={14} />}
      </button>
      <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-colors">
        <Trash2 size={14} />
      </button>
    </div>
  </div>
);

export default RewardsConfig;
