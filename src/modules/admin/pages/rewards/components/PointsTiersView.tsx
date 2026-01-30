import React, { useState } from "react";
import {
  Gem,
  Wallet,
  Users,
  Settings,
  RotateCcw,
  Plus,
  X,
  ShieldCheck,
  Save,
  Search,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";
import { toast } from "sonner";
import ResuableModal from "../../../../../global/components/resuable-components/modal";

import type { ColumnDef } from "../../../../../global/components/resuable-components/table";
import ReusableTable from "../../../../../global/components/resuable-components/table";
import { ImpactCards } from "../../../../../global/components/resuable-components/ImpactCards";
import ResuableInput from "../../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../../global/components/resuable-components/button";
import ResuableDrawer from "../../../../../global/components/resuable-components/drawer";
import { INITIAL_TIERS as DEFAULT_TIERS } from "../../../../../global/constants/milestone_config";

const INITIAL_TIERS = DEFAULT_TIERS;

const tierColumns: ColumnDef[] = [
  { name: "TIER NAME", uid: "name", sortable: true, align: "start" },
  {
    name: "UPGRADE THRESHOLD",
    uid: "pointsRequired",
    sortable: true,
    align: "center",
  },
  { name: "POINT RANGE", uid: "range", sortable: false, align: "center" },
  { name: "EARNING BONUS", uid: "bonus", sortable: true, align: "center" },
  { name: "ACTIONS", uid: "actions", sortable: false, align: "center" },
];

const PointsTiersView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tiers, setTiers] = useState(INITIAL_TIERS);
  const [newTier, setNewTier] = useState({
    name: "",
    minPoints: "",
    maxPoints: "",
    bonus: "",
    perks: "",
  });

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [previewTier, setPreviewTier] = useState<string>("Beginner");
  const [isTierEditMode, setIsTierEditMode] = useState(false);
  const [editableTierName, setEditableTierName] = useState("");
  const [editableTierRange, setEditableTierRange] = useState("");
  const [editableTierBonus, setEditableTierBonus] = useState("");
  const [editableTierPerks, setEditableTierPerks] = useState("");

  const [baseRates, setBaseRates] = useState({
    donor: { first: "300", perKg: "25", milestone: "600" },
    volunteer: { delivery: "150", streak: "500", emergency: "1000" },
    ngo: { accept: "50", waste: "10", impact: "500" },
  });

  const rewardsImpactMetrics = [
    {
      label: "Active Points Hub",
      val: "8.4M",
      trend: "+15%",
      color: "bg-[#22c55e]",
    },
    {
      label: "Reward Value Dist.",
      val: "₹4.2L",
      trend: "+22%",
      color: "bg-[#22c55e]",
    },
    {
      label: "Redemption Rate",
      val: "68%",
      trend: "+5%",
      color: "bg-[#22c55e]",
    },
    {
      label: "Global Multiplier",
      val: "3.0X",
      trend: "Active",
      color: "bg-[#22c55e]",
    },
  ];

  const sortedTiers = [...tiers].sort(
    (a, b) => a.pointsRequired - b.pointsRequired,
  );

  const handleAddTier = () => {
    if (!newTier.name || !newTier.minPoints || !newTier.bonus) {
      toast.error("Please fill in required fields (Name, Min Points, Bonus)");
      return;
    }

    const range = newTier.maxPoints
      ? `${newTier.minPoints} - ${newTier.maxPoints}`
      : `${newTier.minPoints}+`;

    const tierToAdd = {
      name: newTier.name,
      range,
      pointsRequired: parseInt(newTier.minPoints, 10) || 0,
      bonus: newTier.bonus.endsWith("%") ? newTier.bonus : `${newTier.bonus}%`,
      perks: newTier.perks || "No perks defined",
      color: "#64748b", // Default slate color for new tiers
    };

    setTiers([...tiers, tierToAdd]);
    setNewTier({
      name: "",
      minPoints: "",
      maxPoints: "",
      bonus: "",
      perks: "",
    });
    toast.success(`Tier "${newTier.name}" added successfully!`);
    setIsModalOpen(false);
  };

  const handleViewTier = (tier: any) => {
    setSelectedTier(tier);
    setEditableTierName(tier.name);
    setEditableTierRange(tier.range);
    setEditableTierBonus(tier.bonus);
    setEditableTierPerks(tier.perks);
    setIsTierEditMode(false);
    onDrawerOpen();
  };

  const handleDeleteTier = (tier: any) => {
    setTiers(tiers.filter((t) => t.name !== tier.name));
    toast.success(`Tier "${tier.name}" deleted successfully!`);
  };

  const handleUpdateTier = () => {
    if (!selectedTier) return;

    const updatedTiers = tiers.map((t) =>
      t.name === selectedTier.name
        ? {
            ...t,
            name: editableTierName,
            range: editableTierRange,
            bonus: editableTierBonus,
            perks: editableTierPerks,
          }
        : t,
    );

    setTiers(updatedTiers);
    setSelectedTier({
      ...selectedTier,
      name: editableTierName,
      range: editableTierRange,
      bonus: editableTierBonus,
      perks: editableTierPerks,
    });
    setIsTierEditMode(false);
    toast.success("Tier updated successfully!");
  };

  const closeDrawer = () => {
    setIsTierEditMode(false);
    onDrawerClose();
  };

  const renderTierCell = (tier: any, columnKey: React.Key) => {
    const value = tier[columnKey as string];
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 w-fit min-w-0">
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                tier.name === "Legend"
                  ? "bg-emerald-500 animate-pulse"
                  : tier.name === "Platinum" || tier.name === "Diamond"
                    ? "bg-blue-500"
                    : "bg-slate-400"
              }`}
            />
            <span
              className="font-bold text-[11px] whitespace-nowrap truncate max-w-[140px] pr-1"
              style={{ color: "var(--text-primary)" }}
            >
              {tier.name}
            </span>
          </div>
        );
      case "pointsRequired":
        return (
          <span className="font-black text-slate-800 text-xs tabular-nums bg-slate-100 px-3 py-1 rounded-sm">
            {tier.pointsRequired.toLocaleString()} PTS
          </span>
        );
      case "bonus":
        return (
          <span className="font-black text-emerald-600 text-xs tabular-nums">
            +{value}
          </span>
        );
      default:
        return (
          <span className="text-slate-500 font-bold text-[11px] whitespace-nowrap px-1">
            {value}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-6 text-start">
      <div className="flex flex-col gap-0.5">
        <h1
          className="text-4xl font-black tracking-tight uppercase"
          style={{ color: "var(--text-primary)" }}
        >
          Rewards Dashboard
        </h1>
        <p className="text-slate-500 font-semibold mt-1">
          Configure point systems, tiers, and manage user redemptions
        </p>
      </div>

      <ImpactCards data={rewardsImpactMetrics} />

      {/* Reward Tiers Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50/50 border border-slate-100/50 rounded-sm">
              <Users className="text-slate-400" size={20} />
            </div>
            <div className="flex flex-col text-start">
              <h4
                className="font-black text-xl tracking-tight uppercase leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                Reward Tiers
              </h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">
                Manage user thresholds and benefits
              </p>
            </div>
          </div>
          <ResuableButton
            variant="primary"
            className="rounded-sm h-12 px-8 font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-sm"
            onClick={() => setIsModalOpen(true)}
            startContent={<Plus size={16} />}
          >
            Add New Tier
          </ResuableButton>
        </div>
        <ReusableTable
          data={sortedTiers}
          columns={tierColumns}
          renderCell={renderTierCell}
          actionConfig={{
            showView: true,
            showDelete: true,
            onView: handleViewTier,
            onDelete: handleDeleteTier,
          }}
          enableSorting={false}
        />
      </div>

      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="Tier Details"
        subtitle="System Tier Identifier"
        size="md"
      >
        {selectedTier && (
          <div className="space-y-4 px-3 sm:px-6">
            <>
              {/* Hero Section */}
              <div className="relative pb-6 border-b border-slate-100">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-24 h-24 mb-4 group transition-transform duration-500 hover:scale-105">
                    <div className="w-full h-full p-1.5 rounded-sm bg-blue-50 border border-blue-100/50">
                      <div className="w-full h-full rounded-sm bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-sm overflow-hidden uppercase italic">
                        {selectedTier.name.slice(0, 2)}
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-3 max-w-sm">
                    <div className="space-y-0.5 w-full flex flex-col items-center">
                      <h3 className="text-2xl font-black text-slate-900 leading-[1.05] tracking-tight">
                        {selectedTier.name}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        LOYALTY LEVEL
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-sm border border-blue-100 shadow-sm">
                  <div className="text-[9px] font-black text-blue-600/70 uppercase tracking-[0.2em] mb-1">
                    Point Range
                  </div>
                  <div className="text-sm font-black text-blue-700">
                    {selectedTier.range}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-sm border border-emerald-100 shadow-sm">
                  <div className="text-[9px] font-black text-emerald-600/70 uppercase tracking-[0.2em] mb-1">
                    Earning Bonus
                  </div>
                  <div className="text-sm font-black text-emerald-700">
                    {selectedTier.bonus}
                  </div>
                </div>
              </div>

              {/* Configuration Section */}
              <section className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm shrink-0">
                    <Settings size={16} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                      Configuration
                    </h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                      Tier Properties & Benefits
                    </p>
                  </div>
                </div>

                {isTierEditMode ? (
                  <div className="bg-white p-2.5 rounded-sm border border-slate-200 shadow-sm space-y-2.5">
                    <ResuableInput
                      label="Tier Name"
                      value={editableTierName}
                      onChange={setEditableTierName}
                      placeholder="e.g. Bronze, Gold"
                    />
                    <ResuableInput
                      label="Point Range"
                      value={editableTierRange}
                      onChange={setEditableTierRange}
                      placeholder="e.g. 500 - 1000"
                    />
                    <ResuableInput
                      label="Earning Bonus"
                      value={editableTierBonus}
                      onChange={setEditableTierBonus}
                      placeholder="e.g. 10%"
                    />
                    <ResuableInput
                      label="Perks & Benefits"
                      value={editableTierPerks}
                      onChange={setEditableTierPerks}
                      placeholder="Detailed perks..."
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {[
                      {
                        Icon: Gem,
                        label: "Tier Name",
                        value: selectedTier.name,
                        color: "blue",
                        bg: "bg-blue-50/50",
                      },
                      {
                        Icon: Search,
                        label: "Point Range",
                        value: selectedTier.range,
                        color: "indigo",
                        bg: "bg-indigo-50/50",
                      },
                      {
                        Icon: Wallet,
                        label: "Bonus Multiplier",
                        value: selectedTier.bonus,
                        color: "emerald",
                        bg: "bg-emerald-50/50",
                      },
                      {
                        Icon: ShieldCheck,
                        label: "Perks & Benefits",
                        value: selectedTier.perks,
                        color: "purple",
                        bg: "bg-purple-50/50",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-[#22c55e] hover:bg-slate-50/30 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-sm ${item.bg} flex items-center justify-center text-${item.color}-600 shrink-0 group-hover:scale-105 transition-transform duration-500`}
                          >
                            <item.Icon size={16} strokeWidth={2.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 leading-none">
                              {item.label}
                            </p>
                            <p className="text-[11px] font-black text-slate-800 leading-tight truncate uppercase tracking-tight mt-1">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Actions Area */}
              <div className="pt-2 flex gap-2">
                {isTierEditMode ? (
                  <>
                    <ResuableButton
                      variant="secondary"
                      onClick={() => setIsTierEditMode(false)}
                      className="flex-1 !px-6 !py-3 !text-[10px] !font-black !text-slate-400 hover:!text-slate-600 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 !rounded-sm !border !border-slate-200"
                      startContent={<RotateCcw size={14} />}
                    >
                      Cancel
                    </ResuableButton>
                    <ResuableButton
                      variant="primary"
                      className="flex-1 !bg-[#22c55e] hover:!bg-[#1ea34a] !text-white !font-black !px-4 !py-3 !text-[10px] uppercase tracking-widest !rounded-sm shadow-lg shadow-[#22c55e]/20"
                      onClick={handleUpdateTier}
                    >
                      <Save size={14} />
                      Update Details
                    </ResuableButton>
                  </>
                ) : (
                  <ResuableButton
                    variant="primary"
                    className="flex-1 !bg-[#22c55e] hover:!bg-[#1ea34a] !text-white !font-black !px-4 !py-3 !text-[10px] uppercase tracking-widest !rounded-sm shadow-lg shadow-[#22c55e]/20"
                    onClick={() => setIsTierEditMode(true)}
                  >
                    <Settings size={14} />
                    Edit Profile
                  </ResuableButton>
                )}
              </div>
            </>
          </div>
        )}
      </ResuableDrawer>

      {/* Configuration Section */}
      <div
        className="rounded-sm border p-6 shadow-sm"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-slate-50 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#22c55e] rounded-sm shadow-sm">
              <Settings className="text-white" size={20} />
            </div>
            <div className="flex flex-col text-start">
              <h4
                className="text-xl font-black tracking-tight uppercase leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                Ultra Reward Base Rates
              </h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">
                Configure ecosystem multipliers and rewards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">
              Select Tier:
            </p>
            <select
              value={previewTier}
              onChange={(e) => setPreviewTier(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-sm px-3 py-1.5 text-[11px] font-black uppercase text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#22c55e] cursor-pointer"
            >
              {tiers.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donor Points */}
          <div className="p-6 border border-slate-100 rounded-sm bg-slate-50/20 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-1 h-6 bg-blue-500 rounded-full" />
              <h5
                className="font-black text-[13px] uppercase tracking-widest"
                style={{ color: "var(--text-primary)" }}
              >
                Donors
              </h5>
            </div>
            <div className="space-y-6">
              {isEditing ? (
                <>
                  <ResuableInput
                    label="First Donation"
                    value={baseRates.donor.first}
                    onChange={(val) =>
                      setBaseRates({
                        ...baseRates,
                        donor: { ...baseRates.donor, first: val },
                      })
                    }
                    align="left"
                  />
                  <ResuableInput
                    label="Per KG Food"
                    value={baseRates.donor.perKg}
                    onChange={(val) =>
                      setBaseRates({
                        ...baseRates,
                        donor: { ...baseRates.donor, perKg: val },
                      })
                    }
                    align="left"
                  />
                  <ResuableInput
                    label="Milestone Bonus"
                    value={baseRates.donor.milestone}
                    onChange={(val) =>
                      setBaseRates({
                        ...baseRates,
                        donor: { ...baseRates.donor, milestone: val },
                      })
                    }
                    align="left"
                  />
                </>
              ) : (
                <>
                  {[
                    { label: "First Donation", val: baseRates.donor.first },
                    { label: "Per KG Food", val: baseRates.donor.perKg },
                    {
                      label: "Milestone Bonus",
                      val: baseRates.donor.milestone,
                    },
                  ].map((field, idx) => {
                    const currentTierBonus =
                      tiers.find((t) => t.name === previewTier)?.bonus || "0%";
                    const bonusVal = parseInt(
                      currentTierBonus.replace("%", ""),
                      10,
                    );
                    const basePoints = parseInt(field.val, 10);
                    const multipliedPoints = Math.floor(
                      basePoints * (1 + bonusVal / 100),
                    );

                    return (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b border-slate-200/40 pb-3 group"
                      >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] group-hover:text-slate-600 transition-colors">
                          {field.label}
                        </p>
                        <div className="text-right">
                          <p
                            className={`text-sm font-black tabular-nums ${bonusVal > 0 ? "text-emerald-500" : "text-slate-900"}`}
                          >
                            {multipliedPoints} PTS
                          </p>
                          {bonusVal > 0 && (
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">
                              Base: {basePoints} + {bonusVal}%
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          {/* Volunteer Points */}
          <div className="p-6 border border-slate-100 rounded-sm bg-slate-50/20 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-1 h-6 bg-emerald-500 rounded-full" />
              <h5
                className="font-black text-[13px] uppercase tracking-widest"
                style={{ color: "var(--text-primary)" }}
              >
                Volunteers
              </h5>
            </div>
            <div className="space-y-6">
              {isEditing ? (
                <>
                  <ResuableInput
                    label="Per Delivery"
                    value={baseRates.volunteer.delivery}
                    onChange={(val) =>
                      setBaseRates({
                        ...baseRates,
                        volunteer: { ...baseRates.volunteer, delivery: val },
                      })
                    }
                    align="left"
                  />
                  <ResuableInput
                    label="Weekly Streak"
                    value={baseRates.volunteer.streak}
                    onChange={(val) =>
                      setBaseRates({
                        ...baseRates,
                        volunteer: { ...baseRates.volunteer, streak: val },
                      })
                    }
                    align="left"
                  />
                  <ResuableInput
                    label="Emergency Bonus"
                    value={baseRates.volunteer.emergency}
                    onChange={(val) =>
                      setBaseRates({
                        ...baseRates,
                        volunteer: { ...baseRates.volunteer, emergency: val },
                      })
                    }
                    align="left"
                  />
                </>
              ) : (
                <>
                  {[
                    {
                      label: "Per Delivery",
                      val: baseRates.volunteer.delivery,
                    },
                    { label: "Weekly Streak", val: baseRates.volunteer.streak },
                    {
                      label: "Emergency Bonus",
                      val: baseRates.volunteer.emergency,
                    },
                  ].map((field, idx) => {
                    const currentTierBonus =
                      tiers.find((t) => t.name === previewTier)?.bonus || "0%";
                    const bonusVal = parseInt(
                      currentTierBonus.replace("%", ""),
                      10,
                    );
                    const basePoints = parseInt(field.val, 10);
                    const multipliedPoints = Math.floor(
                      basePoints * (1 + bonusVal / 100),
                    );

                    return (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b border-slate-200/40 pb-3 group"
                      >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] group-hover:text-slate-600 transition-colors">
                          {field.label}
                        </p>
                        <div className="text-right">
                          <p
                            className={`text-sm font-black tabular-nums ${bonusVal > 0 ? "text-emerald-500" : "text-slate-900"}`}
                          >
                            {multipliedPoints} PTS
                          </p>
                          {bonusVal > 0 && (
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">
                              Base: {basePoints} + {bonusVal}%
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          {/* NGO Points */}
          <div className="p-6 border border-slate-100 rounded-sm bg-slate-50/20 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-1 h-6 bg-amber-500 rounded-full" />
              <h5
                className="font-black text-[13px] uppercase tracking-widest"
                style={{ color: "var(--text-primary)" }}
              >
                NGOs
              </h5>
            </div>
            <div className="space-y-6">
              {isEditing ? (
                <>
                  <ResuableInput
                    label="Request Approval Points"
                    value={baseRates.ngo.accept}
                    onChange={(val) =>
                      setBaseRates({
                        ...baseRates,
                        ngo: { ...baseRates.ngo, accept: val },
                      })
                    }
                    align="left"
                  />
                  <ResuableInput
                    label="Waste Handling Points"
                    value={baseRates.ngo.waste}
                    onChange={(val) =>
                      setBaseRates({
                        ...baseRates,
                        ngo: { ...baseRates.ngo, waste: val },
                      })
                    }
                    align="left"
                  />
                  <ResuableInput
                    label="Impact Bonus"
                    value={baseRates.ngo.impact}
                    onChange={(val) =>
                      setBaseRates({
                        ...baseRates,
                        ngo: { ...baseRates.ngo, impact: val },
                      })
                    }
                    align="left"
                  />
                </>
              ) : (
                <>
                  {[
                    {
                      label: "Request Approval Points",
                      val: baseRates.ngo.accept,
                    },
                    {
                      label: "Waste Handling Points",
                      val: baseRates.ngo.waste,
                    },
                    { label: "Impact Bonus", val: baseRates.ngo.impact },
                  ].map((field, idx) => {
                    const currentTierBonus =
                      tiers.find((t) => t.name === previewTier)?.bonus || "0%";
                    const bonusVal = parseInt(
                      currentTierBonus.replace("%", ""),
                      10,
                    );
                    const basePoints = parseInt(field.val, 10);
                    const multipliedPoints = Math.floor(
                      basePoints * (1 + bonusVal / 100),
                    );

                    return (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b border-slate-200/40 pb-3 group"
                      >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] group-hover:text-slate-600 transition-colors">
                          {field.label}
                        </p>
                        <div className="text-right">
                          <p
                            className={`text-sm font-black tabular-nums ${bonusVal > 0 ? "text-emerald-500" : "text-slate-900"}`}
                          >
                            {multipliedPoints} PTS
                          </p>
                          {bonusVal > 0 && (
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">
                              Base: {basePoints} + {bonusVal}%
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <ResuableButton
            variant="primary"
            onClick={() => {
              if (isEditing) {
                toast.success("Ecosystem Rates Updated Successfully!");
                setIsEditing(false);
              } else {
                setIsEditing(true);
              }
            }}
            className="w-full sm:w-auto !bg-[#22c55e] hover:!bg-emerald-600 px-10 font-black uppercase tracking-widest text-[11px] text-white h-11 transition-all active:scale-95"
          >
            {isEditing ? "Save Ecosystem Rates" : "Update Ecosystem Rates"}
          </ResuableButton>
        </div>
      </div>

      {/* Modal for Adding New Tier */}
      <ResuableModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Create New Reward Tier"
        subtitle="Define thresholds and benefits"
        size="md"
        footer={
          <>
            <ResuableButton
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 font-black uppercase tracking-widest text-[10px]"
            >
              Cancel
            </ResuableButton>
            <ResuableButton
              variant="primary"
              onClick={handleAddTier}
              className="flex-1 !bg-[#22c55e] hover:!bg-emerald-600 font-black uppercase tracking-widest text-[10px] text-white"
            >
              Save Tier
            </ResuableButton>
          </>
        }
      >
        <div className="space-y-6">
          <ResuableInput
            label="Tier Name"
            placeholder="e.g. Platinum Elite"
            value={newTier.name}
            onChange={(val) => setNewTier({ ...newTier, name: val })}
          />
          <div className="grid grid-cols-2 gap-4">
            <ResuableInput
              label="Min Points"
              placeholder="0"
              value={newTier.minPoints}
              onChange={(val) => setNewTier({ ...newTier, minPoints: val })}
            />
            <ResuableInput
              label="Max Points (Optional)"
              placeholder="Leaving empty means '+'"
              value={newTier.maxPoints}
              onChange={(val) => setNewTier({ ...newTier, maxPoints: val })}
            />
          </div>
          <ResuableInput
            label="Earning Bonus (%)"
            placeholder="e.g. 15"
            value={newTier.bonus}
            onChange={(val) => setNewTier({ ...newTier, bonus: val })}
          />
          <ResuableInput
            label="Tier Perks"
            placeholder="e.g. Priority Support, Exclusive Events"
            value={newTier.perks}
            onChange={(val) => setNewTier({ ...newTier, perks: val })}
          />
        </div>
      </ResuableModal>
    </div>
  );
};

export default PointsTiersView;
