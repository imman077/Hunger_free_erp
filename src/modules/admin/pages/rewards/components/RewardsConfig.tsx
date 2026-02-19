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
import ResuableInput from "../../../../../global/components/resuable-components/input";
import { toast } from "sonner";
import ResuableButton from "../../../../../global/components/resuable-components/button";

const INITIAL_CATALOG = {
  donor: [
    // Cash
    {
      id: 1,
      name: "Quick Cash",
      val: "₹1,000",
      pts: 600,
      active: true,
      tag: "Cash",
    },
    {
      id: 2,
      name: "Cash Bonus",
      val: "₹2,500",
      pts: 1200,
      active: true,
      tag: "Cash",
    },
    {
      id: 3,
      name: "Big Win",
      val: "₹5,000",
      pts: 2500,
      active: true,
      tag: "Cash",
    },
    {
      id: 4,
      name: "Mega Prize",
      val: "₹10,000",
      pts: 5000,
      active: true,
      tag: "Cash",
    },
    // Travel
    {
      id: 5,
      name: "Goa Beach Trip",
      val: "3D/2N, Flights + Hotel",
      pts: 8000,
      active: true,
      tag: "Travel",
    },
    {
      id: 6,
      name: "Rajasthan Heritage",
      val: "4D/3N Luxury Stay",
      pts: 18000,
      active: true,
      tag: "Travel",
    },
    {
      id: 7,
      name: "International - Thailand",
      val: "6D/5N Full Package",
      pts: 35000,
      active: false,
      tag: "Travel",
    },
    // Tech
    {
      id: 8,
      name: "Gaming Console",
      val: "PS5 or Xbox Series X",
      pts: 18000,
      active: true,
      tag: "Tech",
    },
    {
      id: 9,
      name: "iPhone 15 Pro Max",
      val: "Latest Apple Flagship",
      pts: 35000,
      active: false,
      tag: "Tech",
    },
    {
      id: 10,
      name: "MacBook Pro",
      val: "M3 Chip Edition",
      pts: 45000,
      active: false,
      tag: "Tech",
    },
  ],
  ngo: [
    // Grants
    {
      id: 101,
      name: "Operations Fund",
      val: "₹5,000",
      pts: 1000,
      active: true,
      tag: "Grant",
      description: "Quick cash for electricity, water, and basic office bills.",
    },
    {
      id: 102,
      name: "Growth Fund",
      val: "₹15,000",
      pts: 2500,
      active: true,
      tag: "Grant",
    },
    {
      id: 103,
      name: "Impact Fund",
      val: "₹30,000",
      pts: 5000,
      active: true,
      tag: "Grant",
    },
    {
      id: 104,
      name: "Expansion Fund",
      val: "₹75,000",
      pts: 10000,
      active: true,
      tag: "Grant",
    },
    // Mega
    {
      id: 105,
      name: "Mega Grant",
      val: "₹1,50,000",
      pts: 20000,
      active: true,
      tag: "Mega",
    },
    {
      id: 106,
      name: "Super Grant",
      val: "₹3,00,000",
      pts: 35000,
      active: true,
      tag: "Mega",
    },
    {
      id: 107,
      name: "National NGO Award",
      val: "Cash + Recognition",
      pts: 50000,
      active: false,
      tag: "Mega",
    },
    // Social
    {
      id: 108,
      name: "Direct Relief Grant",
      val: "Essential aid for 100+ lives",
      pts: 5000,
      active: true,
      tag: "Aid",
      description: "Essential relief supplies.",
      details: [
        { group: "Youth", text: "School kits & nutrition packs" },
        { group: "Animals", text: "Pet food & rescue equipment" },
        { group: "Communities", text: "Groceries & basic clothing" },
      ],
    },
    {
      id: 109,
      name: "Field Operation Fund",
      val: "Specialized medical/rescue camp",
      pts: 15000,
      active: true,
      tag: "Aid",
      description: "Medical or rescue field work.",
      details: [
        { group: "Youth", text: "Vaccinations & vitamin distribution" },
        { group: "Animals", text: "Sterilization & mobile clinic" },
        { group: "Communities", text: "Sugar, BP & health screenings" },
      ],
    },
    {
      id: 110,
      name: "Logistics Grant",
      val: "Electronic Van for Mission Mobility",
      pts: 25000,
      active: false,
      tag: "Aid",
      description: "Transportation support.",
      details: [
        { group: "Youth", text: "Transporting kids to events" },
        { group: "Animals", text: "Rescue Ambulance service" },
        { group: "Communities", text: "Mobile Food Bank delivery" },
      ],
    },
  ],
  volunteer: [
    // Cash
    {
      id: 201,
      name: "Fuel Money",
      val: "₹1,000",
      pts: 500,
      active: true,
      tag: "Cash",
    },
    {
      id: 202,
      name: "Cash Bonus",
      val: "₹2,500",
      pts: 1000,
      active: true,
      tag: "Cash",
    },
    {
      id: 203,
      name: "Performance Bonus",
      val: "₹5,000",
      pts: 2000,
      active: true,
      tag: "Cash",
    },
    {
      id: 204,
      name: "Elite Bonus",
      val: "₹10,000",
      pts: 4500,
      active: true,
      tag: "Cash",
    },
    // Travel
    {
      id: 205,
      name: "Weekend Getaway",
      val: "Nearby station",
      pts: 3000,
      active: true,
      tag: "Tour",
    },
    {
      id: 206,
      name: "Goa Beach Trip",
      val: "3D/2N Pakcage",
      pts: 8000,
      active: true,
      tag: "Tour",
    },
    {
      id: 207,
      name: "International - Dubai",
      val: "5D/4N Package",
      pts: 28000,
      active: false,
      tag: "Tour",
    },
    // Youth
    {
      id: 208,
      name: "IPL Match Tickets",
      val: "2 Tickets",
      pts: 3500,
      active: true,
      tag: "Event",
    },
    {
      id: 209,
      name: "Gaming Console",
      val: "PS5 or Xbox",
      pts: 18000,
      active: false,
      tag: "Tech",
    },
    {
      id: 210,
      name: "iPhone 15 Pro Max",
      val: "Latest Model",
      pts: 35000,
      active: false,
      tag: "Tech",
    },
  ],
};

const RewardsConfig: React.FC = () => {
  const [catalog, setCatalog] = useState(INITIAL_CATALOG);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingItem, setEditingItem] = useState<{
    category: keyof typeof INITIAL_CATALOG;
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
    category: "donor" as keyof typeof INITIAL_CATALOG,
  });

  const handleAddReward = () => {
    if (!newItem.name || !newItem.val) {
      toast.error("Please fill in all required fields");
      return;
    }

    const id = Date.now();
    setCatalog((prev) => ({
      ...prev,
      [newItem.category]: [
        ...prev[newItem.category],
        { ...newItem, id, active: true },
      ],
    }));

    toast.success(`Successfully added ${newItem.name} to catalog`);
    onAddOpenChange();
    setNewItem({
      name: "",
      val: "",
      pts: 0,
      description: "",
      category: "donor",
    });
  };

  const handleEditOpen = (
    category: keyof typeof INITIAL_CATALOG,
    item: any,
  ) => {
    setEditingItem({ category, data: { ...item } });
    onOpen();
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    setCatalog((prev) => ({
      ...prev,
      [editingItem.category]: prev[editingItem.category].map((item: any) =>
        item.id === editingItem.data.id ? { ...editingItem.data } : item,
      ),
    }));

    toast.success(`Successfully updated ${editingItem.data.name}`);
    onOpenChange();
  };

  const toggleActive = (category: keyof typeof INITIAL_CATALOG, id: number) => {
    const item = catalog[category].find((i) => i.id === id);
    setCatalog((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    }));
    toast.success(`${item?.name} ${item?.active ? "disabled" : "enabled"}`);
  };

  const deleteItem = (category: keyof typeof INITIAL_CATALOG, id: number) => {
    const item = catalog[category].find((i) => i.id === id);
    setCatalog((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }));
    toast.success(`Deleted "${item?.name}" from catalog`);
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
