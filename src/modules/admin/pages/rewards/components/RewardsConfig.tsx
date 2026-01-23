import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  IndianRupee,
  Plane,
  Sparkles,
  X,
} from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import ResuableInput from "../../../../../global/components/resuable-components/input";
import { toast } from "sonner";
import ResuableButton from "../../../../../global/components/resuable-components/button";

const INITIAL_CATALOG = {
  cash: [
    { id: 1, name: "Quick Cash", val: "₹1,000", pts: 600, active: true },
    { id: 2, name: "Cash Bonus", val: "₹2,500", pts: 1200, active: true },
    { id: 3, name: "Big Win", val: "₹5,000", pts: 2500, active: true },
    { id: 4, name: "Mega Prize", val: "₹10,000", pts: 5000, active: true },
    { id: 5, name: "Grand Prize", val: "₹50,000", pts: 20000, active: true },
    { id: 6, name: "Legend Prize", val: "₹1,00,000", pts: 35000, active: true },
  ],
  tours: [
    { id: 7, name: "Goa Beach Trip", val: "3D/2N", pts: 8000, active: true },
    { id: 8, name: "Thailand", val: "6D/5N", pts: 35000, active: false },
    { id: 9, name: "Europe Hub", val: "10D/9N", pts: 75000, active: true },
  ],
  youth: [
    { id: 10, name: "PS5 Console", val: "Digital", pts: 18000, active: true },
    { id: 11, name: "iPhone 15", val: "128GB", pts: 35000, active: true },
    { id: 12, name: "MacBook Pro", val: "M3 Chip", pts: 45000, active: true },
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
    category: "cash" as keyof typeof INITIAL_CATALOG,
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
    setNewItem({ name: "", val: "", pts: 0, category: "cash" });
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
    <div className="space-y-8 pb-6 text-start">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h1
            className="text-2xl font-black tracking-tight uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            Reward Catalog
          </h1>
          <p className="text-[12px] font-semibold text-slate-500 mt-0.5">
            Manage and define items available for point redemption
          </p>
        </div>
        <ResuableButton
          variant="primary"
          className="!bg-[#22c55e] hover:!bg-emerald-600 px-6 font-black uppercase tracking-widest text-[10px] text-white h-9"
          onClick={onAddOpen}
        >
          <Plus size={16} className="mr-2" /> Add New Reward
        </ResuableButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Prizes Box */}
        <div className="bg-slate-50/40 p-5 rounded-sm border border-slate-200/50 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200/50 pb-4">
            <div className="w-9 h-9 bg-emerald-50 rounded-sm flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100/50">
              <IndianRupee size={18} strokeWidth={2.5} />
            </div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800">
              Cash Prizes
            </h4>
          </div>
          <div className="flex flex-col gap-3">
            {catalog.cash.map((item) => (
              <RewardCard
                key={item.id}
                item={item}
                onToggle={() => toggleActive("cash", item.id)}
                onDelete={() => deleteItem("cash", item.id)}
                onEdit={() => handleEditOpen("cash", item)}
              />
            ))}
          </div>
        </div>

        {/* Tour Packages Box */}
        <div className="bg-slate-50/40 p-5 rounded-sm border border-slate-200/50 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200/50 pb-4">
            <div className="w-9 h-9 bg-blue-50 rounded-sm flex items-center justify-center text-blue-500 shadow-sm border border-blue-100/50">
              <Plane size={18} strokeWidth={2.5} />
            </div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800">
              Tour Packages
            </h4>
          </div>
          <div className="flex flex-col gap-3">
            {catalog.tours.map((item) => (
              <RewardCard
                key={item.id}
                item={item}
                onToggle={() => toggleActive("tours", item.id)}
                onDelete={() => deleteItem("tours", item.id)}
                onEdit={() => handleEditOpen("tours", item)}
              />
            ))}
          </div>
        </div>

        {/* Youth & Tech Box */}
        <div className="bg-slate-50/40 p-5 rounded-sm border border-slate-200/50 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200/50 pb-4">
            <div className="w-9 h-9 bg-purple-50 rounded-sm flex items-center justify-center text-purple-500 shadow-sm border border-purple-100/50">
              <Sparkles size={18} strokeWidth={2.5} />
            </div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800">
              Youth & Tech
            </h4>
          </div>
          <div className="flex flex-col gap-3">
            {catalog.youth.map((item) => (
              <RewardCard
                key={item.id}
                item={item}
                onToggle={() => toggleActive("youth", item.id)}
                onDelete={() => deleteItem("youth", item.id)}
                onEdit={() => handleEditOpen("youth", item)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Edit Reward Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        closeButton={
          <button className="absolute left-6 top-6 text-slate-400 hover:text-slate-600 transition-colors z-50 focus:outline-none">
            <X size={18} />
          </button>
        }
        classNames={{
          backdrop: "bg-slate-900/40 backdrop-blur-sm",
          base: "border border-slate-200/50 bg-white rounded-none max-w-[420px] w-full mx-4",
          header: "border-b border-slate-100 p-5 pl-14",
          body: "p-6 py-8",
          footer: "border-t border-slate-100 p-4 px-6 gap-3",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-start">
                <h4 className="text-lg font-black uppercase tracking-widest text-slate-900">
                  Edit Reward Item
                </h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
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
                  <div className="grid grid-cols-2 gap-4">
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
                </div>
              </ModalBody>
              <ModalFooter>
                <ResuableButton
                  variant="ghost"
                  onClick={onClose}
                  className="font-black uppercase tracking-[0.2em] text-[10px] px-8 h-9 border border-slate-200 text-slate-500 hover:bg-slate-50"
                >
                  Cancel
                </ResuableButton>
                <ResuableButton
                  variant="primary"
                  onClick={handleUpdateItem}
                  className="font-black uppercase tracking-[0.2em] text-[10px] px-10 h-9 !bg-[#22c55e] text-white shadow-lg shadow-emerald-500/10 hover:!bg-emerald-600 active:scale-[0.98]"
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
        closeButton={
          <button className="absolute left-6 top-6 text-slate-400 hover:text-slate-600 transition-colors z-50 focus:outline-none">
            <X size={18} />
          </button>
        }
        classNames={{
          backdrop: "bg-slate-900/40 backdrop-blur-sm",
          base: "border border-slate-200/50 bg-white rounded-none max-w-[440px] w-full mx-4",
          header: "border-b border-slate-100 p-5 pl-14",
          body: "p-6 py-8",
          footer: "border-t border-slate-100 p-4 px-6 gap-3",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-start">
                <h4 className="text-lg font-black uppercase tracking-widest text-slate-900">
                  New Reward Entry
                </h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                  Define a new item for the redemption catalog
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-8">
                  {/* Category Selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                      Target Category
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          id: "cash",
                          label: "Cash",
                          icon: IndianRupee,
                          color: "emerald",
                        },
                        {
                          id: "tours",
                          label: "Tours",
                          icon: Plane,
                          color: "blue",
                        },
                        {
                          id: "youth",
                          label: "Tech",
                          icon: Sparkles,
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
                              ? `bg-${cat.color}-50 border-${cat.color}-200 text-${cat.color}-600 shadow-sm shadow-${cat.color}-500/10`
                              : "bg-slate-50/50 border-slate-100 text-slate-400 hover:bg-slate-50 hover:border-slate-200"
                          }`}
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
                    <div className="grid grid-cols-2 gap-4">
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
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <ResuableButton
                  variant="ghost"
                  onClick={onClose}
                  className="font-black uppercase tracking-[0.2em] text-[10px] px-8 h-9 border border-slate-200 text-slate-500 hover:bg-slate-50"
                >
                  Cancel
                </ResuableButton>
                <ResuableButton
                  variant="primary"
                  onClick={handleAddReward}
                  className="font-black uppercase tracking-[0.2em] text-[10px] px-10 h-9 !bg-[#22c55e] text-white shadow-lg shadow-emerald-500/10 hover:!bg-emerald-600 active:scale-[0.98]"
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
    className={`p-5 px-6 border rounded-sm flex items-center justify-between group transition-all duration-300 h-[88px] ${
      !item.active
        ? "opacity-60 border-dashed bg-slate-50/50"
        : "bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)]"
    }`}
    style={{
      borderColor: !item.active
        ? "var(--border-color)"
        : "rgba(226, 232, 240, 0.8)",
    }}
  >
    <div className="text-start space-y-1">
      <div className="flex items-center gap-2">
        <p className="font-bold text-[14px] text-slate-900 leading-tight">
          {item.name}
        </p>
        {!item.active && (
          <span className="text-[7px] font-black text-slate-400 bg-slate-100/80 px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider border border-slate-200/50">
            Disabled
          </span>
        )}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center">
        {item.val} <span className="mx-2 text-slate-200">|</span>{" "}
        {item.pts.toLocaleString()} PTS
      </p>
    </div>
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
      <button
        className="p-2 rounded-full hover:bg-blue-50 text-slate-300 hover:text-blue-500 transition-colors"
        onClick={onEdit}
      >
        <Edit2 size={13} />
      </button>
      <button
        className={`p-2 rounded-full hover:bg-emerald-50 transition-colors ${item.active ? "text-emerald-500" : "text-slate-300 hover:text-emerald-500"}`}
        onClick={onToggle}
      >
        {item.active ? <Eye size={13} /> : <EyeOff size={13} />}
      </button>
      <button
        className="p-2 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
        onClick={onDelete}
      >
        <Trash2 size={13} />
      </button>
    </div>
  </div>
);

export default RewardsConfig;
