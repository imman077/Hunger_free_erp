import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Info,
  Heart,
  Building2,
  Users,
} from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import { toast } from "sonner";
import ResuableButton from "../../../../global/components/resuable-components/button";

import { useRewards } from "../hooks/useRewards";

const RewardsConfig: React.FC = () => {
  const { catalog, actions } = useRewards();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingItem, setEditingItem] = useState<{
    category: keyof typeof catalog;
    data: any;
  } | null>(null);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();
  const [newItem, setNewItem] = useState({
    name: "",
    val: "",
    pts: 0,
    description: "",
    category: "donor" as keyof typeof catalog,
  });

  const handleAddReward = () => {
    if (!newItem.name || !newItem.val) {
      toast.error("Please fill in all required fields");
      return;
    }

    const id = Date.now();
    actions.addReward(newItem.category, { ...newItem, id, active: true });

    onAddOpenChange();
    setNewItem({
      name: "",
      val: "",
      pts: 0,
      description: "",
      category: "donor",
    });
  };

  const handleEditOpen = (category: keyof typeof catalog, item: any) => {
    setEditingItem({ category, data: { ...item } });
    onOpen();
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    actions.updateReward(
      editingItem.category,
      editingItem.data.id,
      editingItem.data,
    );
    onOpenChange();
  };

  const toggleActive = (category: keyof typeof catalog, id: number) => {
    actions.toggleActive(category, id);
  };

  const deleteItem = (category: keyof typeof catalog, id: number) => {
    actions.deleteReward(category, id);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-6 text-start">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5 max-w-2xl">
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            Reward Catalog
          </h1>
          <p
            className="text-[12px] sm:text-[13px] font-medium mt-0.5 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Manage and define items available for point redemption
          </p>
        </div>
        <ResuableButton
          variant="primary"
          className="w-full sm:w-auto !bg-[#22c55e] hover:!bg-emerald-600 px-6 sm:px-8 font-black uppercase tracking-widest text-[10px] text-white h-11 sm:h-9 shadow-sm"
          onClick={onAddOpen}
        >
          <Plus size={16} className="mr-2" /> Add New Reward
        </ResuableButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {[
          {
            id: "donor",
            label: "Donor Rewards",
            icon: Heart,
            color: "emerald",
            items: catalog.donor,
          },
          {
            id: "ngo",
            label: "NGO Rewards",
            icon: Building2,
            color: "blue",
            items: catalog.ngo,
          },
          {
            id: "volunteer",
            label: "Volunteer Rewards",
            icon: Users,
            color: "purple",
            items: catalog.volunteer,
          },
        ].map((stakeholder) => {
          // Group items by tag
          const grouped = stakeholder.items.reduce((acc: any, item) => {
            const tag = item.tag || "Other";
            if (!acc[tag]) acc[tag] = [];
            acc[tag].push(item);
            return acc;
          }, {});

          return (
            <div
              key={stakeholder.id}
              className="rounded-none border shadow-sm flex flex-col h-[600px] sm:h-[750px]"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              {/* Stakeholder Header */}
              <div
                className="p-5 border-b flex items-center gap-3"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div
                  className={`w-10 h-10 rounded-sm flex items-center justify-center border shadow-sm`}
                  style={{
                    backgroundColor: `var(--bg-${stakeholder.color}-muted)`,
                    color: `var(--color-${stakeholder.color})`,
                    borderColor: `var(--border-${stakeholder.color}-muted)`,
                  }}
                >
                  <stakeholder.icon size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4
                    className="text-[13px] font-black uppercase tracking-[0.15em] leading-none"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stakeholder.label}
                  </h4>
                  <p
                    className="text-[9px] font-bold uppercase tracking-widest mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stakeholder.items.length} ACTIVE ITEMS
                  </p>
                </div>
              </div>

              {/* Grouped Rewards List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pt-6">
                {Object.entries(grouped).map(([tag, items]: [string, any]) => (
                  <div key={tag} className="space-y-4">
                    {/* Sub-Category Label */}
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {tag} REWARDS
                      </span>
                      <div
                        className="h-px w-full"
                        style={{ backgroundColor: "var(--border-color)" }}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      {items.map((item: any) => (
                        <RewardCard
                          key={item.id}
                          item={item}
                          onToggle={() =>
                            toggleActive(stakeholder.id as any, item.id)
                          }
                          onDelete={() =>
                            deleteItem(stakeholder.id as any, item.id)
                          }
                          onEdit={() =>
                            handleEditOpen(stakeholder.id as any, item)
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Reward Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        classNames={{
          backdrop: "bg-[rgba(15,23,42,0.8)] backdrop-blur-sm",
          base: "border rounded-none max-w-[420px] w-full mx-4",
          header: "border-b p-5 pr-14",
          body: "p-6 py-8",
          footer: "border-t p-4 px-6 gap-3",
          closeButton: "top-5 right-5 transition-colors",
        }}
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-start">
                <h4
                  className="text-lg font-black uppercase tracking-widest"
                  style={{ color: "var(--text-primary)" }}
                >
                  Edit Reward Item
                </h4>
                <p
                  className="text-[9px] font-bold uppercase tracking-widest leading-none mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Update reward details and point requirements
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6 py-2">
                  <ResuableInput
                    label="Reward Name"
                    placeholder="Enter reward name"
                    value={editingItem?.data.name || ""}
                    onChange={(val) =>
                      setEditingItem((prev: any) => ({
                        ...prev,
                        data: { ...prev.data, name: val },
                      }))
                    }
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ResuableInput
                      label="Value / Description"
                      placeholder="e.g. ₹5,000"
                      value={editingItem?.data.val || ""}
                      onChange={(val) =>
                        setEditingItem((prev: any) => ({
                          ...prev,
                          data: { ...prev.data, val: val },
                        }))
                      }
                    />
                    <ResuableInput
                      label="Points Required"
                      type="number"
                      placeholder="Enter points"
                      value={String(editingItem?.data.pts || "")}
                      onChange={(val) =>
                        setEditingItem((prev: any) => ({
                          ...prev,
                          data: { ...prev.data, pts: Number(val) },
                        }))
                      }
                    />
                  </div>
                  <ResuableInput
                    label="Internal Explanation (Admin Only)"
                    placeholder="Describe how this helps the NGO..."
                    value={editingItem?.data.description || ""}
                    onChange={(val) =>
                      setEditingItem((prev: any) => ({
                        ...prev,
                        data: { ...prev.data, description: val },
                      }))
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter className="flex-col sm:flex-row">
                <ResuableButton
                  variant="ghost"
                  onClick={onClose}
                  className="w-full sm:w-auto font-black uppercase tracking-[0.2em] text-[10px] px-8 h-9 border order-2 sm:order-1"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--text-muted)",
                  }}
                >
                  Cancel
                </ResuableButton>
                <ResuableButton
                  variant="primary"
                  onClick={handleUpdateItem}
                  className="w-full sm:w-auto font-black uppercase tracking-[0.2em] text-[10px] px-10 h-9 !bg-[#22c55e] text-white shadow-lg shadow-emerald-500/10 hover:!bg-emerald-600 active:scale-[0.98] order-1 sm:order-2"
                >
                  Save Changes
                </ResuableButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Add New Reward Modal */}
      <Modal
        isOpen={isAddOpen}
        onOpenChange={onAddOpenChange}
        placement="center"
        backdrop="blur"
        classNames={{
          backdrop: "bg-[rgba(15,23,42,0.8)] backdrop-blur-sm",
          base: "border rounded-none max-w-[440px] w-full mx-4",
          header: "border-b p-5 pr-14",
          body: "p-6 py-8",
          footer: "border-t p-4 px-6 gap-3",
          closeButton: "top-5 right-5 transition-colors",
        }}
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-start">
                <h4
                  className="text-lg font-black uppercase tracking-widest"
                  style={{ color: "var(--text-primary)" }}
                >
                  New Reward Entry
                </h4>
                <p
                  className="text-[9px] font-bold uppercase tracking-widest leading-none mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Define a new item for the redemption catalog
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-8">
                  {/* Category Selection */}
                  <div className="space-y-3">
                    <label
                      className="text-[10px] font-black uppercase tracking-widest px-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Target Category
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          id: "donor",
                          label: "Donor",
                          icon: Heart,
                          color: "emerald",
                        },
                        {
                          id: "ngo",
                          label: "NGO",
                          icon: Building2,
                          color: "blue",
                        },
                        {
                          id: "volunteer",
                          label: "Volunteer",
                          icon: Users,
                          color: "purple",
                        },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() =>
                            setNewItem({ ...newItem, category: cat.id as any })
                          }
                          className={`flex flex-col items-center justify-center p-3 rounded-sm border transition-all gap-2 ${
                            newItem.category === cat.id
                              ? `shadow-sm shadow-${cat.color}-500/10`
                              : ""
                          }`}
                          style={{
                            backgroundColor:
                              newItem.category === cat.id
                                ? `var(--bg-${cat.color}-muted)`
                                : "var(--bg-secondary)",
                            borderColor:
                              newItem.category === cat.id
                                ? `var(--border-${cat.color}-muted)`
                                : "var(--border-color)",
                            color:
                              newItem.category === cat.id
                                ? `var(--color-${cat.color})`
                                : "var(--text-muted)",
                          }}
                        >
                          <cat.icon
                            size={16}
                            strokeWidth={newItem.category === cat.id ? 2.5 : 2}
                          />
                          <span className="text-[8px] font-black uppercase tracking-widest">
                            {cat.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <ResuableInput
                      label="Reward Name"
                      placeholder="e.g. Amazon Voucher"
                      value={newItem.name}
                      onChange={(val) => setNewItem({ ...newItem, name: val })}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ResuableInput
                        label="Value Detail"
                        placeholder="₹1,000 / 128GB"
                        value={newItem.val}
                        onChange={(val) => setNewItem({ ...newItem, val })}
                      />
                      <ResuableInput
                        label="Points Required"
                        type="number"
                        placeholder="0"
                        value={String(newItem.pts || "")}
                        onChange={(val) =>
                          setNewItem({ ...newItem, pts: Number(val) })
                        }
                      />
                    </div>
                    <ResuableInput
                      label="Internal Explanation (Admin Only)"
                      placeholder="e.g. For food, rescue kits, or school supplies"
                      value={newItem.description}
                      onChange={(val) =>
                        setNewItem({ ...newItem, description: val })
                      }
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex-col sm:flex-row">
                <ResuableButton
                  variant="ghost"
                  onClick={onClose}
                  className="w-full sm:w-auto font-black uppercase tracking-[0.2em] text-[10px] px-8 h-9 border order-2 sm:order-1"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--text-muted)",
                  }}
                >
                  Cancel
                </ResuableButton>
                <ResuableButton
                  variant="primary"
                  onClick={handleAddReward}
                  className="w-full sm:w-auto font-black uppercase tracking-[0.2em] text-[10px] px-10 h-9 !bg-[#22c55e] text-white shadow-lg shadow-emerald-500/10 hover:!bg-emerald-600 active:scale-[0.98] order-1 sm:order-2"
                >
                  Create Reward
                </ResuableButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

const RewardCard: React.FC<{
  item: any;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}> = ({ item, onToggle, onDelete, onEdit }) => (
  <div
    className={`p-4 sm:p-6 border transition-all duration-300 flex flex-col gap-4 sm:gap-5 relative min-h-[100px] sm:min-h-[110px] rounded-none ${
      !item.active
        ? "border-dashed"
        : "shadow-[0_2px_18px_-4px_rgba(0,0,0,0.03)]"
    }`}
    style={{
      backgroundColor: "var(--bg-primary)",
      borderColor: "var(--border-color)",
    }}
  >
    {/* Header: Title, Tags & Icons */}
    <div className="flex items-start justify-between gap-3 sm:gap-4">
      <div className="flex flex-col gap-2 sm:gap-3 flex-1 text-start min-w-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <h5
            className={`font-black text-[15px] sm:text-[17px] leading-[1.15] tracking-tight max-w-[200px] truncate sm:whitespace-normal`}
            style={{
              color: item.active ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            {item.name}
          </h5>
          <div className="flex items-center gap-1.5 h-fit pt-0.5">
            <span
              className="text-[8px] font-black border px-2 py-0.5 rounded-[1px] uppercase tracking-widest whitespace-nowrap"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
                color: "var(--text-muted)",
              }}
            >
              {item.tag || "REWARD"}
            </span>
            {!item.active && (
              <span className="text-[8px] font-black text-red-400 bg-red-100/10 border border-red-500/20 px-2 py-0.5 rounded-[1px] uppercase tracking-widest whitespace-nowrap">
                HIDDEN
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0 sm:gap-0.5 shrink-0 -mt-1">
        <button
          onClick={onEdit}
          className="p-1.5 sm:p-1.5 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <Edit2 size={14} strokeWidth={1.5} />
        </button>
        <button
          onClick={onToggle}
          className={`p-1.5 sm:p-1.5 transition-colors ${
            item.active ? "text-emerald-500" : ""
          }`}
          style={{ color: item.active ? undefined : "var(--text-muted)" }}
        >
          {item.active ? (
            <Eye size={14} strokeWidth={1.5} />
          ) : (
            <EyeOff size={14} strokeWidth={1.5} />
          )}
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 sm:p-1.5 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <Trash2 size={14} strokeWidth={1.5} className="hover:text-red-500" />
        </button>
      </div>
    </div>

    {/* Detail Info: Value | Points */}
    <div className="flex flex-col gap-3 pt-1 text-start">
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
        <p
          className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em]"
          style={{ color: "var(--text-muted)" }}
        >
          {item.val}
        </p>
        <div
          className="hidden sm:block h-4 w-[2px]"
          style={{ backgroundColor: "var(--border-color)" }}
        />
        <p
          className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em]"
          style={{ color: "var(--text-muted)" }}
        >
          {item.pts.toLocaleString()} PTS
        </p>

        {(item.description || item.details) && (
          <Tooltip
            content={
              <div className="px-1 py-2 min-w-[180px]">
                {item.details ? (
                  <div className="space-y-3">
                    {item.details.map((d: any, i: number) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#22c55e]">
                          {d.group}
                        </span>
                        <span
                          className="text-[10px] font-bold leading-tight"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {d.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    className="text-[10px] font-bold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            }
            className="rounded-sm"
            style={{
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
            }}
            closeDelay={0}
          >
            <button
              className="w-5 h-5 rounded-full border flex items-center justify-center hover:text-[#22c55e] hover:border-[#22c55e]/30 transition-all ml-auto sm:ml-auto"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
                color: "var(--text-muted)",
              }}
            >
              <Info size={10} strokeWidth={3} />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  </div>
);

export default RewardsConfig;
