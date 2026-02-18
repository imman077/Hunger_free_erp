import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Eye,
  Loader2,
  Plus,
  Package,
  ClipboardList,
} from "lucide-react";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ReusableTable, {
  TableChip,
} from "../../../../global/components/resuable-components/table";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";

interface DistributionRecord {
  id: number;
  item: string;
  category: string;
  quantity: string;
  unit: string;
  location: string;
  date: string;
  expiryDate: string;
  status: "Dispatched" | "In Transit" | "Delivered";
  urgency: "High" | "Normal";
  condition: "Excellent" | "Good" | "Critical";
  notes?: string;
}

const NGOInventory = () => {
  const navigate = useNavigate();
  const inventoryStats = [
    {
      label: "Grains & Rice",
      val: "420kg",
      trend: "Good Stock",
      color: "bg-[#22c55e]",
    },
    {
      label: "Hygiene Kits",
      val: "150 units",
      trend: "Low Stock",
      color: "bg-blue-500",
    },
    {
      label: "Fresh Food",
      val: "85kg",
      trend: "Expires Soon",
      color: "bg-orange-500",
    },
    {
      label: "Medical Gear",
      val: "940 units",
      trend: "Well stocked",
      color: "bg-purple-500",
    },
  ];

  const distributionData: DistributionRecord[] = [
    {
      id: 1,
      item: "Rice Packs",
      category: "Grains & Rice",
      quantity: "50",
      unit: "kg",
      location: "Community Center A",
      date: "28 Dec, 2025",
      expiryDate: "2026-06-15",
      status: "Delivered",
      urgency: "Normal",
      condition: "Excellent",
      notes: "Stored in dry section, Block 1",
    },
    {
      id: 2,
      item: "Canned Soup",
      category: "Basic Essentials",
      quantity: "120",
      unit: "units",
      location: "Soup Kitchen B",
      date: "27 Dec, 2025",
      expiryDate: "2026-03-10",
      status: "In Transit",
      urgency: "High",
      condition: "Good",
    },
    {
      id: 3,
      item: "Hygiene Kits",
      category: "Medical Supplies",
      quantity: "30",
      unit: "units",
      location: "Shelter C",
      date: "26 Dec, 2025",
      expiryDate: "2026-12-01",
      status: "Dispatched",
      urgency: "Normal",
      condition: "Excellent",
    },
    {
      id: 4,
      item: "Drinking Water",
      category: "Beverages",
      quantity: "200",
      unit: "liters",
      location: "Crisis Zone 4",
      date: "29 Dec, 2025",
      expiryDate: "2026-01-20",
      status: "Dispatched",
      urgency: "High",
      condition: "Critical",
      notes: "Needs immediate distribution",
    },
  ];

  const [selectedRecord, setSelectedRecord] =
    useState<DistributionRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editFormData, setEditFormData] = useState({
    quantity: "",
    status: "" as any,
  });

  const handleViewDetails = (record: DistributionRecord) => {
    setSelectedRecord(record);
    setEditFormData({
      quantity: record.quantity,
      status: record.status,
    });
    setIsEditing(false);
    setIsDrawerOpen(true);
  };

  const handleUpdateStock = () => {
    setIsUpdating(true);
    // Simulate API transmission
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Inventory parameters synchronized", {
        description: `Stock level for ${selectedRecord?.item} has been updated.`,
      });
      setIsDrawerOpen(false);
    }, 1500);
  };

  const filteredData = distributionData;

  return (
    <div className="w-full space-y-4 max-w-[1600px] mx-auto bg-transparent">
      {/* User Friendly Header */}
      <div className="px-8">
        <div className="relative">
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-4">
            <div className="text-start space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-hf-green/20 text-hf-green text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm border border-hf-green/30">
                  Current Stock
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                Inventory
              </h1>
            </div>
            <ResuableButton
              variant="primary"
              className="flex items-center gap-2.5 px-6 py-3.5 bg-hf-green hover:bg-hf-green/90 text-white rounded-xl transition-all active:scale-95 shadow-lg shadow-hf-green/10"
              onClick={() => navigate("/ngo/inventory/add")}
            >
              <Plus size={16} className="text-white" />
              <span className="text-[11px] font-black uppercase tracking-[0.15em] pt-0.5">
                Add Item
              </span>
            </ResuableButton>
          </div>
        </div>
      </div>

      {/* Analytics Hub */}
      <div className="px-8">
        <ImpactCards data={inventoryStats} className="gap-3 md:gap-4" />
      </div>

      {/* Main Records (Standard Layout) */}
      <div className="px-8 pb-10">
        <ReusableTable
          data={filteredData}
          enableSearch={true}
          enableFilters={false}
          columns={[
            {
              name: "Item Details",
              uid: "item",
              sortable: true,
              align: "start",
            },
            { name: "Category", uid: "category", sortable: true },
            { name: "Quantity", uid: "quantity", sortable: false },
            { name: "Condition", uid: "condition", sortable: true },
            { name: "Expiry", uid: "expiryDate", sortable: true },
            { name: "Status", uid: "status", sortable: true },
            { name: "Urgency", uid: "urgency", sortable: true },
            { name: "Actions", uid: "actions", sortable: false },
          ]}
          renderCell={(record: DistributionRecord, columnKey: React.Key) => {
            switch (columnKey) {
              case "item":
                return (
                  <div className="py-2 text-left">
                    <TableChip
                      text={record.item}
                      initials={record.item.substring(0, 1)}
                      iconClassName="bg-hf-green text-white border-hf-green/40 border transition-colors duration-300"
                    />
                  </div>
                );
              case "category":
                return (
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--color-emerald)",
                    }}
                  >
                    {record.category}
                  </span>
                );
              case "quantity":
                return (
                  <div className="space-y-1">
                    <span
                      className="font-black text-[13px] tracking-tight tabular-nums"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {record.quantity}
                    </span>
                    <span
                      className="text-[9px] font-black uppercase block tracking-widest pl-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {record.unit}
                    </span>
                  </div>
                );
              case "condition":
                return (
                  <div className="flex flex-col items-center justify-center">
                    <span
                      className="text-[9px] font-black uppercase tracking-tighter"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {record.condition}
                    </span>
                  </div>
                );
              case "expiryDate":
                return (
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-bold font-mono uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {record.expiryDate}
                    </span>
                  </div>
                );
              case "status":
                return (
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full border flex items-center gap-1.5 w-fit shadow-sm"
                    style={{
                      backgroundColor:
                        record.status === "Delivered"
                          ? "rgba(16, 185, 129, 0.15)"
                          : record.status === "In Transit"
                            ? "rgba(59, 130, 246, 0.15)"
                            : "rgba(148, 163, 184, 0.15)",
                      borderColor:
                        record.status === "Delivered"
                          ? "rgba(16, 185, 129, 0.3)"
                          : record.status === "In Transit"
                            ? "rgba(59, 130, 246, 0.3)"
                            : "rgba(148, 163, 184, 0.3)",
                      color:
                        record.status === "Delivered"
                          ? "#4ade80"
                          : record.status === "In Transit"
                            ? "#60a5fa"
                            : "var(--text-muted)",
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          record.status === "Delivered"
                            ? "#4ade80"
                            : record.status === "In Transit"
                              ? "#60a5fa"
                              : "var(--text-muted)",
                      }}
                    />
                    {record.status}
                  </span>
                );
              case "urgency":
                return (
                  <span
                    className="text-[9px] font-black uppercase px-2.5 py-1 rounded-md border tracking-wider shadow-sm"
                    style={{
                      backgroundColor:
                        record.urgency === "High"
                          ? "rgba(239, 68, 68, 0.15)"
                          : "rgba(148, 163, 184, 0.15)",
                      borderColor:
                        record.urgency === "High"
                          ? "rgba(239, 68, 68, 0.3)"
                          : "rgba(148, 163, 184, 0.3)",
                      color:
                        record.urgency === "High"
                          ? "#f87171"
                          : "var(--text-secondary)",
                    }}
                  >
                    {record.urgency}
                  </span>
                );
              case "actions":
                return (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        handleViewDetails(record);
                      }}
                      className="!bg-transparent transition-all min-w-0 h-8 w-8"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Eye size={14} />
                    </Button>
                  </div>
                );

              default:
                return (
                  <span
                    className="text-xs font-medium whitespace-nowrap px-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {String(record[columnKey as keyof DistributionRecord])}
                  </span>
                );
            }
          }}
        />
      </div>

      {/* Stock Update Drawer */}
      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={() => !isUpdating && setIsDrawerOpen(false)}
        title="Item Details"
      >
        {selectedRecord && (
          <div className="space-y-8 p-6">
            {/* Branded Item Hero */}
            <div
              className="p-6 rounded-3xl flex items-center gap-6 relative overflow-hidden border"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Package size={80} className="text-hf-green" />
              </div>
              <div className="w-16 h-16 bg-hf-green rounded-2xl shadow-sm border border-hf-green/40 flex items-center justify-center text-3xl font-black text-white relative z-10 uppercase">
                {selectedRecord.item.substring(0, 1)}
              </div>
              <div className="space-y-1 relative z-10">
                <h4
                  className="text-xl font-black uppercase tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedRecord.item}
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <p
                    className="text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-widest px-2.5 py-1 rounded-md border"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <MapPin size={10} className="text-hf-green" />
                    {selectedRecord.location}
                  </p>
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                      color: "var(--color-emerald)",
                    }}
                  >
                    {selectedRecord.category}
                  </span>
                </div>
              </div>
            </div>

            {!isEditing ? (
              /* Detail View: Information Rich Summary */
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-2xl space-y-1 border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <span
                      className="text-[9px] font-black uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Quantity
                    </span>
                    <p
                      className="text-xl font-black"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedRecord.quantity}{" "}
                      <span
                        className="text-xs font-bold uppercase"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {selectedRecord.unit}
                      </span>
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-2xl space-y-1 border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <span
                      className="text-[9px] font-black uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Item Condition
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          selectedRecord.condition === "Excellent"
                            ? "bg-emerald-500"
                            : selectedRecord.condition === "Good"
                              ? "bg-blue-500"
                              : "bg-red-500"
                        }`}
                      />
                      <p
                        className="text-[13px] font-black uppercase tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedRecord.condition}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <ClipboardList size={12} className="text-hf-green" />
                    More Information
                  </div>
                  <div
                    className="border rounded-2xl divide-y overflow-hidden"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div
                      className="p-4 flex items-center justify-between border-b"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Expiry Date
                      </span>
                      <span
                        className="text-[11px] font-black flex items-center gap-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <Calendar size={12} className="text-[#22c55e]" />
                        {selectedRecord.expiryDate}
                      </span>
                    </div>
                    <div
                      className="p-4 flex items-center justify-between border-b"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Current Status
                      </span>
                      <TableChip
                        text={selectedRecord.status}
                        iconClassName={
                          selectedRecord.status === "Delivered"
                            ? "bg-emerald-500"
                            : selectedRecord.status === "In Transit"
                              ? "bg-blue-500"
                              : "bg-slate-400"
                        }
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Notes
                      </span>
                      <p
                        className="text-[12px] font-medium italic leading-relaxed p-3 rounded-xl border border-dashed"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          borderColor: "var(--border-color)",
                          color: "var(--text-primary)",
                        }}
                      >
                        "{selectedRecord.notes}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <ResuableButton
                    variant="primary"
                    className="w-full py-4 rounded-2xl bg-hf-green hover:bg-hf-green/90 shadow-lg shadow-hf-green/10"
                    onClick={() => setIsEditing(true)}
                  >
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      Edit Item Details
                    </span>
                  </ResuableButton>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-full py-3 text-[11px] font-black uppercase tracking-widest transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Edit View: Adjustment Controls */
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between px-1">
                  <h5
                    className="text-[10px] font-black uppercase tracking-[0.3em]"
                    style={{ color: "var(--color-emerald)" }}
                  >
                    Update Information
                  </h5>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-[9px] font-black uppercase tracking-widest underline underline-offset-4 transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Back to Details
                  </button>
                </div>

                <div
                  className="grid grid-cols-1 gap-6 p-6 rounded-3xl border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <ResuableInput
                    label="Adjust Quantity"
                    value={editFormData.quantity}
                    onChange={(val) =>
                      setEditFormData({ ...editFormData, quantity: val })
                    }
                    placeholder={`e.g. ${selectedRecord.quantity}`}
                    required
                    endContent={
                      <span
                        className="text-[10px] font-black uppercase tracking-widest pr-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {selectedRecord.unit}
                      </span>
                    }
                  />

                  <ResuableDropdown
                    label="Update Status"
                    options={[
                      { value: "Dispatched", label: "Dispatched" },
                      { value: "In Transit", label: "In Transit" },
                      { value: "Delivered", label: "Delivered" },
                    ]}
                    value={editFormData.status}
                    onChange={(val) =>
                      setEditFormData({ ...editFormData, status: val as any })
                    }
                  />

                  <div
                    className="p-4 rounded-2xl border flex items-start gap-4"
                    style={{
                      backgroundColor: "rgba(59, 130, 246, 0.12)",
                      borderColor: "rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    <p
                      className="text-[11px] font-bold leading-relaxed"
                      style={{ color: "#60a5fa" }}
                    >
                      Updating records will trigger a notification to the
                      destination location and update the live distribution log.
                    </p>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <ResuableButton
                    variant="primary"
                    className="w-full py-4 rounded-2xl bg-hf-green hover:bg-hf-green/90"
                    disabled={isUpdating}
                    onClick={handleUpdateStock}
                  >
                    {isUpdating ? (
                      <div className="flex items-center gap-3">
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </ResuableButton>
                  <ResuableButton
                    variant="ghost"
                    className="w-full py-4 rounded-2xl"
                    disabled={isUpdating}
                    onClick={() => setIsEditing(false)}
                  >
                    Discard Changes
                  </ResuableButton>
                </div>
              </div>
            )}
          </div>
        )}
      </ResuableDrawer>
    </div>
  );
};

export default NGOInventory;
