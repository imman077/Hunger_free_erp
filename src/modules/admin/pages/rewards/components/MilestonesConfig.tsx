import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Package,
  Zap,
  Flame,
  Users as UsersIcon,
} from "lucide-react";
import { useDisclosure } from "@heroui/react";
import ResuableModal from "../../../../../global/components/resuable-components/modal";
import ResuableInput from "../../../../../global/components/resuable-components/input";
import ResuableDropdown from "../../../../../global/components/resuable-components/dropdown";
import ResuableTabs from "../../../../../global/components/resuable-components/tabs";
import { toast } from "sonner";
import ResuableButton from "../../../../../global/components/resuable-components/button";
import {
  INITIAL_MILESTONES as DEFAULT_MILESTONES,
  getIcon,
} from "../../../../../global/constants/milestone_config";

const INITIAL_MILESTONES = DEFAULT_MILESTONES;

const getRequirementOptions = (category: string) => {
  const options = [
    { value: "points", label: "Points" },
    { value: "streaks", label: "Streaks" },
  ];

  if (category === "donors") {
    options.unshift({ value: "donations", label: "Donations" });
  } else if (category === "ngos") {
    options.unshift({ value: "deliveries", label: "KG Food Saved" });
  } else if (category === "volunteers") {
    options.unshift({ value: "deliveries", label: "Deliveries" });
  }

  return options;
};

const categoryOptions = [
  { value: "donors", label: "Donors" },
  { value: "ngos", label: "NGOs" },
  { value: "volunteers", label: "Volunteers" },
];

const MilestonesConfig: React.FC = () => {
  const [milestones, setMilestones] = useState(INITIAL_MILESTONES);
  const [activeCategory, setActiveCategory] = useState("donors");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingMilestone, setEditingMilestone] = useState<any>(null);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();
  const [newMilestone, setNewMilestone] = useState({
    name: "",
    desc: "",
    requirementType: "donations",
    threshold: 0,
    icon: "Award",
    category: "donors",
  });

  const handleAddMilestone = () => {
    if (!newMilestone.name || !newMilestone.desc) {
      toast.error("Please fill in all required fields");
      return;
    }

    const id = Date.now();
    setMilestones((prev) => [...prev, { ...newMilestone, id, active: true }]);
    toast.success(`Successfully added ${newMilestone.name} milestone`);
    onAddOpenChange();
    setNewMilestone({
      name: "",
      desc: "",
      requirementType: "donations",
      threshold: 0,
      icon: "Award",
      category: "donors",
    });
  };

  const handleEditOpen = (milestone: any) => {
    setEditingMilestone({ ...milestone });
    onOpen();
  };

  const handleUpdateMilestone = () => {
    if (!editingMilestone) return;
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === editingMilestone.id ? { ...editingMilestone } : m,
      ),
    );
    toast.success(`Successfully updated ${editingMilestone.name}`);
    onOpenChange();
  };

  const toggleActive = (id: number) => {
    const milestone = milestones.find((m) => m.id === id);
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m)),
    );
    toast.success(
      `${milestone?.name} ${milestone?.active ? "disabled" : "enabled"}`,
    );
  };

  const deleteMilestone = (id: number) => {
    const milestone = milestones.find((m) => m.id === id);
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    toast.success(`Deleted milestone "${milestone?.name}"`);
  };

  return (
    <div className="space-y-8 pb-6 text-start">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h1
            className="text-4xl font-black tracking-tight uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            Impact Milestones
          </h1>
          <p className="text-slate-500 font-semibold mt-1">
            Define and manage badges rewarded for user achievements
          </p>
        </div>
        <ResuableButton
          variant="primary"
          className="rounded-sm h-12 px-8 font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-emerald-500/10 !bg-[#22c55e] text-white"
          onClick={onAddOpen}
        >
          <Plus size={16} className="mr-2" /> CREATE NEW MILESTONE
        </ResuableButton>
      </div>

      <div className="flex flex-col gap-6">
        <ResuableTabs
          tabs={[
            {
              label: "Donor Milestones",
              value: "donors",
              count: milestones.filter((m) => m.category === "donors").length,
              showCount: true,
            },
            {
              label: "NGO Milestones",
              value: "ngos",
              count: milestones.filter((m) => m.category === "ngos").length,
              showCount: true,
            },
            {
              label: "Volunteer Milestones",
              value: "volunteers",
              count: milestones.filter((m) => m.category === "volunteers")
                .length,
              showCount: true,
            },
          ]}
          activeTab={activeCategory}
          onTabChange={setActiveCategory}
          activeColor="#22c55e"
        />

        <div className="space-y-12">
          {(() => {
            const sections = {
              donors: [
                {
                  type: "donations",
                  label: "Donation Milestones",
                  color: "blue",
                  Icon: Package,
                },
                {
                  type: "points",
                  label: "Point Milestones",
                  color: "emerald",
                  Icon: Zap,
                },
                {
                  type: "streaks",
                  label: "Streak Milestones",
                  color: "orange",
                  Icon: Flame,
                },
                {
                  type: "others",
                  label: "Community & Others",
                  color: "purple",
                  Icon: UsersIcon,
                },
              ],
              ngos: [
                {
                  type: "deliveries",
                  label: "Food Rescue Milestones",
                  color: "blue",
                  Icon: Package,
                },
                {
                  type: "points",
                  label: "Point Milestones",
                  color: "emerald",
                  Icon: Zap,
                },
                {
                  type: "streaks",
                  label: "Streak Milestones",
                  color: "orange",
                  Icon: Flame,
                },
              ],
              volunteers: [
                {
                  type: "deliveries",
                  label: "Delivery Milestones",
                  color: "blue",
                  Icon: Package,
                },
                {
                  type: "points",
                  label: "Point Milestones",
                  color: "emerald",
                  Icon: Zap,
                },
                {
                  type: "streaks",
                  label: "Streak Milestones",
                  color: "orange",
                  Icon: Flame,
                },
              ],
            };

            const activeSections =
              sections[activeCategory as keyof typeof sections] || [];

            return activeSections.map((section) => {
              const sectionMilestones = milestones.filter((m) => {
                if (m.category !== activeCategory) return false;

                if (activeCategory === "donors") {
                  if (section.type === "others") {
                    return (
                      !["donations", "points", "streaks"].includes(
                        m.requirementType || "",
                      ) ||
                      ["Community Glue", "Local Guardian"].includes(
                        m.name || "",
                      )
                    );
                  }
                  if (
                    section.type === "donations" &&
                    ["Community Glue", "Local Guardian"].includes(m.name)
                  )
                    return false;
                }

                return m.requirementType === section.type;
              });

              if (sectionMilestones.length === 0) return null;

              return (
                <div key={section.type} className="space-y-8">
                  <div className="relative pt-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-sm border border-slate-100/50">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-sm bg-[#22c55e] flex items-center justify-center border border-emerald-500 shadow-md shadow-emerald-500/10 transition-all duration-300`}
                        >
                          <section.Icon
                            className="text-white"
                            size={20}
                            strokeWidth={2.5}
                          />
                        </div>
                        <div className="flex flex-col text-start">
                          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 leading-none">
                            {section.label}
                          </h2>
                          <p
                            className={`text-[10px] font-bold mt-2 text-slate-400 uppercase tracking-widest`}
                          >
                            {sectionMilestones.length} ACTIVE BADGES
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sectionMilestones.map((milestone) => (
                      <MilestoneCard
                        key={milestone.id}
                        milestone={milestone}
                        handleEditOpen={handleEditOpen}
                        toggleActive={toggleActive}
                        deleteMilestone={deleteMilestone}
                      />
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      <ResuableModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Edit Milestone"
        subtitle="Update achievement rules and display details"
        size="md"
        footer={
          <div className="flex items-center gap-3">
            <ResuableButton
              variant="ghost"
              onClick={() => onOpenChange()}
              className="font-black uppercase tracking-[0.2em] text-[10px] px-8 h-9 border border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </ResuableButton>
            <ResuableButton
              variant="primary"
              onClick={handleUpdateMilestone}
              className="font-black uppercase tracking-[0.2em] text-[10px] px-10 h-9 !bg-[#22c55e] text-white shadow-lg shadow-emerald-500/10 hover:!bg-emerald-600 active:scale-[0.98]"
            >
              Save Changes
            </ResuableButton>
          </div>
        }
      >
        <div className="space-y-6">
          <ResuableInput
            label="Milestone Name"
            placeholder="e.g. Impact Champion"
            value={editingMilestone?.name || ""}
            onChange={(val) =>
              setEditingMilestone((prev: any) => ({
                ...prev,
                name: val,
              }))
            }
          />
          <ResuableInput
            label="Description"
            placeholder="Describe how to earn this badge"
            value={editingMilestone?.desc || ""}
            onChange={(val) =>
              setEditingMilestone((prev: any) => ({
                ...prev,
                desc: val,
              }))
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <ResuableDropdown
              label="Category"
              value={editingMilestone?.category}
              options={categoryOptions}
              onChange={(val) =>
                setEditingMilestone((prev: any) => ({
                  ...prev,
                  category: val,
                }))
              }
            />
            <ResuableInput
              label="Points"
              type="number"
              value={String(editingMilestone?.threshold || "")}
              onChange={(val) =>
                setEditingMilestone((prev: any) => ({
                  ...prev,
                  threshold: Number(val),
                }))
              }
            />
          </div>
          <div className="grid grid-cols-1">
            <ResuableDropdown
              label="Requirement Type"
              value={editingMilestone?.requirementType}
              options={getRequirementOptions(editingMilestone?.category)}
              onChange={(val) =>
                setEditingMilestone((prev: any) => ({
                  ...prev,
                  requirementType: val,
                }))
              }
            />
          </div>
        </div>
      </ResuableModal>

      <ResuableModal
        isOpen={isAddOpen}
        onOpenChange={onAddOpenChange}
        title="New Milestone Entry"
        subtitle="Define a new badge achievement for the ecosystem"
        size="md"
        footer={
          <div className="flex items-center gap-3">
            <ResuableButton
              variant="ghost"
              onClick={() => onAddOpenChange()}
              className="font-black uppercase tracking-[0.2em] text-[10px] px-8 h-9 border border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </ResuableButton>
            <ResuableButton
              variant="primary"
              onClick={handleAddMilestone}
              className="font-black uppercase tracking-[0.2em] text-[10px] px-10 h-9 !bg-[#22c55e] text-white shadow-lg shadow-emerald-500/10 hover:!bg-emerald-600 active:scale-[0.98]"
            >
              Create Milestone
            </ResuableButton>
          </div>
        }
      >
        <div className="space-y-8">
          <div className="space-y-6">
            <ResuableInput
              label="Milestone Name"
              placeholder="e.g. Master Donor"
              value={newMilestone.name}
              onChange={(val) =>
                setNewMilestone({ ...newMilestone, name: val })
              }
            />
            <ResuableInput
              label="Description"
              placeholder="e.g. Consistently donated for 12 months"
              value={newMilestone.desc}
              onChange={(val) =>
                setNewMilestone({ ...newMilestone, desc: val })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <ResuableDropdown
                label="Category"
                value={newMilestone.category}
                options={categoryOptions}
                onChange={(val) =>
                  setNewMilestone({ ...newMilestone, category: val })
                }
              />
              <ResuableInput
                label="Threshold"
                type="number"
                placeholder="0"
                value={String(newMilestone.threshold || "")}
                onChange={(val) =>
                  setNewMilestone({
                    ...newMilestone,
                    threshold: Number(val),
                  })
                }
              />
            </div>
            <div className="grid grid-cols-1">
              <ResuableDropdown
                label="Requirement Type"
                value={newMilestone.requirementType}
                options={getRequirementOptions(newMilestone.category)}
                onChange={(val) =>
                  setNewMilestone({
                    ...newMilestone,
                    requirementType: val,
                  })
                }
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                Display Icon
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  "Heart",
                  "Package",
                  "Trophy",
                  "Zap",
                  "Target",
                  "Award",
                  "Shield",
                  "Crown",
                  "Star",
                  "Flame",
                  "Globe",
                  "ZapOff",
                  "Users",
                ].map((iconName) => {
                  const IconComp = getIcon(iconName);
                  return (
                    <button
                      key={iconName}
                      onClick={() =>
                        setNewMilestone({
                          ...newMilestone,
                          icon: iconName,
                        })
                      }
                      className={`flex flex-col items-center justify-center p-3 rounded-sm border transition-all gap-2 ${
                        newMilestone.icon === iconName
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm shadow-emerald-500/10"
                          : "bg-slate-50/50 border-slate-100 text-slate-400 hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <IconComp
                        size={18}
                        strokeWidth={newMilestone.icon === iconName ? 2.5 : 2}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ResuableModal>
    </div>
  );
};

// Extracted MilestoneCard for cleaner grouping
const MilestoneCard = ({
  milestone,
  handleEditOpen,
  toggleActive,
  deleteMilestone,
}: any) => {
  const MilestoneIcon = getIcon(milestone.icon || "Award");
  return (
    <div
      className={`group relative p-6 rounded-sm border transition-all duration-300 ${
        !milestone.active
          ? "bg-slate-50/50 border-dashed border-slate-200 opacity-60"
          : "bg-white border-slate-200/60 hover:border-emerald-500/30 shadow-none hover:bg-slate-50/20"
      }`}
    >
      {(() => {
        const getRequirementUnit = () => {
          const type = milestone.requirementType;
          const category = milestone.category;

          if (type === "donations") return "Donations";
          if (type === "deliveries") {
            return category === "ngos" ? "KG Saved" : "Deliveries";
          }
          if (type === "points") return "Points";
          if (type === "streaks") return "Days";
          return type;
        };
        const unit = getRequirementUnit();

        return (
          <>
            {/* Action pill - absolute positioned for cleaner card layout */}
            <div className="absolute top-6 right-6 flex items-center gap-1 bg-white border border-slate-100 rounded-full p-1 opacity-0 group-hover:opacity-100 z-10">
              <button
                className="p-1.5 rounded-full hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 transition-colors"
                onClick={() => handleEditOpen(milestone)}
                title="Edit Policy"
              >
                <Edit2 size={11} />
              </button>
              <button
                className={`p-1.5 rounded-full hover:bg-emerald-50 transition-colors ${
                  milestone.active ? "text-emerald-500" : "text-slate-400"
                }`}
                onClick={() => toggleActive(milestone.id)}
                title={
                  milestone.active ? "Pause Visibility" : "Restore Visibility"
                }
              >
                {milestone.active ? <Eye size={11} /> : <EyeOff size={11} />}
              </button>
              <div className="w-px h-3 bg-slate-200 mx-0.5" />
              <button
                className="p-1.5 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                onClick={() => deleteMilestone(milestone.id)}
                title="Decommission"
              >
                <Trash2 size={11} />
              </button>
            </div>

            <div className="flex flex-col h-full">
              {/* Header Section */}
              <div className="mb-6 flex flex-col gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                    milestone.active
                      ? "bg-gradient-to-br from-[#22c55e] to-[#16a34a] border border-emerald-400/20"
                      : "bg-slate-200 border-slate-300 text-slate-400"
                  }`}
                >
                  <MilestoneIcon size={24} strokeWidth={2.5} />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-emerald-600 transition-colors">
                    {milestone.name}
                  </h3>
                  <div className="flex items-start gap-2 max-w-[90%]">
                    <div
                      className={`mt-1 h-2.5 w-0.5 shrink-0 rounded-full ${milestone.active ? "bg-emerald-500" : "bg-slate-300"}`}
                    />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] leading-normal line-clamp-2">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Footer Section */}
              <div className="mt-auto grid grid-cols-[1fr_1px_1fr] items-center pt-4 border-t border-slate-100/60 -mx-6 -mb-6 bg-slate-50/50 rounded-b-sm">
                <div className="flex flex-col items-center px-4 pb-4">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-70">
                    Threshold
                  </span>
                  <div className="flex items-center gap-1.5 min-h-[18px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-black text-slate-800 tabular-nums tracking-tight">
                      {milestone.threshold.toLocaleString()}
                      <span className="ml-1 text-[9px] text-emerald-600 font-bold">
                        {unit}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-200/50 mb-4" />

                <div className="flex flex-col items-center px-4 pb-4">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-70">
                    System
                  </span>
                  <div
                    className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border min-h-[18px] flex items-center justify-center ${
                      milestone.active
                        ? "bg-emerald-100/50 text-emerald-600 border-emerald-200/50"
                        : "bg-slate-200/50 text-slate-500 border-slate-300/50"
                    }`}
                  >
                    {milestone.active ? "Enabled" : "Locked"}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default MilestonesConfig;
