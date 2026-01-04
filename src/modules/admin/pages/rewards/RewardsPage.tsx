import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Tabs from "../../../../global/components/resuable-components/tabs";

const RewardsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("redemptions")
    ? "redemptions"
    : location.pathname.includes("catalog")
    ? "catalog"
    : "points";

  const tabs = [
    { label: "Points & Tiers", value: "points" },
    { label: "Redemption Center", value: "redemptions" },
    { label: "Reward Catalog", value: "catalog" },
  ];

  const handleTabChange = (value: string) => {
    navigate(`/admin/rewards/${value}`);
  };

  return (
    <div className="p-10 w-full mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700 text-start">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Rewards Management
          </h1>
          <p className="text-slate-500 font-semibold mt-2">
            Configure point systems, tiers, and manage user redemptions.
          </p>
        </div>
      </header>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        variant="default"
      />

      <div className="mt-8 transition-all duration-500">
        <Outlet />
      </div>
    </div>
  );
};

export default RewardsPage;
