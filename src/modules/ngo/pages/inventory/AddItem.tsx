import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Package,
  ClipboardList,
  Save,
  Check,
  Loader2,
} from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import ResuableModal from "../../../../global/components/resuable-components/modal";
import ResuableTextarea from "../../../../global/components/resuable-components/textarea";
import { ResuableDatePicker } from "../../../../global/components/resuable-components/datepicker";
import { toast } from "sonner";

const AddItem = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Perishable",
    quantity: "",
    unit: "kg",
    expiryDate: "",
    location: "",
    condition: "Excellent",
    notes: "",
    otherCategory: "",
  });

  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [suggestionCategoryName, setSuggestionCategoryName] = useState("");
  const [suggestionReason, setSuggestionReason] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    { value: "Perishable", label: "Fresh/Perishable" },
    { value: "Grains", label: "Grains & Rice" },
    { value: "Essentials", label: "Basic Essentials" },
    { value: "Medical", label: "Medical Supplies" },
    { value: "Beverages", label: "Beverages" },
    { value: "other", label: "Other" },
  ];

  const units = [
    { value: "kg", label: "Kilograms (kg)" },
    { value: "units", label: "Individual Units" },
    { value: "packs", label: "Pre-packed Packs" },
    { value: "liters", label: "Liters (L)" },
    { value: "boxes", label: "Bulk Boxes" },
  ];

  useEffect(() => {
    if (formData.expiryDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expiry = new Date(formData.expiryDate);
      expiry.setHours(0, 0, 0, 0);

      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let autoCondition = "Excellent";
      if (diffDays <= 7) {
        autoCondition = "Critical";
      } else if (diffDays <= 30) {
        autoCondition = "Good";
      }

      setFormData((prev) => ({ ...prev, condition: autoCondition }));
    }
  }, [formData.expiryDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Item successfully synchronized with inventory", {
        description: `${formData.name} has been added to the database.`,
      });
      navigate("/ngo/inventory");
    }, 1500);
  };

  return (
    <div className="w-full space-y-8 max-w-[1000px] mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Tactical Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50 pb-8">
        <div className="space-y-1">
          <button
            onClick={() => navigate("/ngo/inventory")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#22c55e] transition-colors mb-4"
          >
            <ChevronLeft size={14} className="text-[#22c55e]" />
            Back to Inventory
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10 border border-emerald-100/50">
              <Package size={24} className="text-[#22c55e]" />
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">
              Add New <span className="text-[#22c55e]">Item</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm self-start md:self-center">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">
              System Status
            </span>
            <span className="text-[11px] font-black text-[#22c55e] uppercase tracking-wider">
              Online
            </span>
          </div>
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-white shadow-sm shadow-[#22c55e]/20" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping opacity-20" />
          </div>
        </div>
      </div>

      {/* Main Intelligent Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left Column: Essential Data */}
        <div className="lg:col-span-12 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-50 opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity" />

            <div className="relative space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                <ClipboardList size={20} className="text-[#22c55e]" />
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
                  Item Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <ResuableInput
                  label="Item Name"
                  placeholder="e.g. Organic Brown Rice"
                  value={formData.name}
                  onChange={(val) => setFormData({ ...formData, name: val })}
                  required
                />

                <div className="relative">
                  <ResuableDropdown
                    label="Item Category"
                    options={categories}
                    value={formData.category}
                    onChange={(val) =>
                      setFormData({ ...formData, category: val })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setIsSuggestModalOpen(true)}
                    className="flex items-center gap-1.5 text-[8px] font-black text-[#22c55e] hover:text-[#1da850] transition-colors uppercase tracking-[0.2em] px-1 mt-1.5 hover:underline underline-offset-4 decoration-2"
                  >
                    Request new category from admin
                  </button>
                </div>

                {formData.category === "other" && (
                  <div className="md:col-span-2">
                    <ResuableInput
                      label="Specify Classification"
                      placeholder="Enter custom classification"
                      value={formData.otherCategory}
                      onChange={(val) =>
                        setFormData({ ...formData, otherCategory: val })
                      }
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <ResuableInput
                    label="Quantity"
                    placeholder="0.00"
                    type="number"
                    value={formData.quantity}
                    onChange={(val) =>
                      setFormData({ ...formData, quantity: val })
                    }
                    required
                  />
                  <ResuableDropdown
                    label="Unit"
                    options={units}
                    value={formData.unit}
                    onChange={(val) => setFormData({ ...formData, unit: val })}
                  />
                </div>

                <ResuableDatePicker
                  label="Expiry Date"
                  value={formData.expiryDate}
                  onChange={(val) =>
                    setFormData({ ...formData, expiryDate: val })
                  }
                />

                <ResuableInput
                  label="Storage Location"
                  placeholder="e.g. Block A, Cold Storage"
                  value={formData.location}
                  onChange={(val) =>
                    setFormData({ ...formData, location: val })
                  }
                />

                <div className="relative">
                  <ResuableInput
                    label="Item Condition"
                    value={
                      formData.condition === "Excellent"
                        ? "Excellent Condition"
                        : formData.condition === "Good"
                          ? "Good/Standard"
                          : "Critical/Expires Soon"
                    }
                    onChange={() => {}}
                    disabled
                    placeholder="Wating for date selection..."
                    className="opacity-75 cursor-not-allowed"
                    endContent={
                      formData.expiryDate && (
                        <span className="text-[7px] font-black uppercase tracking-widest text-[#22c55e] bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 mr-2">
                          Auto Calculated
                        </span>
                      )
                    }
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                <ResuableTextarea
                  label="Additional Notes"
                  placeholder="Add any extra details or instructions here..."
                  value={formData.notes}
                  onChange={(val) => setFormData({ ...formData, notes: val })}
                  rows={4}
                />
              </div>

              {/* Action Hub */}
              <div className="flex items-center justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate("/ngo/inventory")}
                  className="px-8 py-3.5 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <ResuableButton
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2.5 px-10 py-4 bg-[#22c55e] text-white rounded-2xl shadow-xl shadow-emerald-500/10 hover:bg-[#1da850] transition-all active:scale-95 ${
                    isSubmitting ? "opacity-70" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check size={16} className="text-white" />
                  )}
                  <span className="text-[11px] font-black uppercase tracking-[0.15em] pt-0.5">
                    {isSubmitting ? "Saving..." : "Save Item"}
                  </span>
                </ResuableButton>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Suggest Category Modal */}
      <ResuableModal
        isOpen={isSuggestModalOpen}
        onOpenChange={setIsSuggestModalOpen}
        title="Category Suggestion"
        footer={
          !isSuccess && (
            <div className="flex items-center justify-end gap-3">
              <ResuableButton
                variant="ghost"
                size="sm"
                disabled={isSubmitting}
                onClick={() => {
                  setIsSuggestModalOpen(false);
                  setSuggestionReason("");
                  setSuggestionCategoryName("");
                }}
              >
                Cancel
              </ResuableButton>
              <ResuableButton
                variant="primary"
                size="sm"
                disabled={isSubmitting || !suggestionCategoryName}
                onClick={() => {
                  setIsSubmitting(true);
                  // Simulate system transmission
                  setTimeout(() => {
                    setIsSubmitting(false);
                    setIsSuccess(true);
                    // Automatic reset and close
                    setTimeout(() => {
                      setIsSuccess(false);
                      setIsSuggestModalOpen(false);
                      setSuggestionReason("");
                      setSuggestionCategoryName("");
                    }, 2500);
                  }, 1500);
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  "Submit Request"
                )}
              </ResuableButton>
            </div>
          )
        }
      >
        <div className="space-y-6 py-4">
          {isSuccess ? (
            <div className="relative flex flex-col items-center justify-center py-16 animate-in fade-in zoom-in duration-500 overflow-hidden">
              <div className="relative mb-8">
                {/* Outer decorative ring */}
                <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-20 scale-150" />
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-green-500/20">
                  <Check className="text-white" size={32} strokeWidth={3} />
                </div>
              </div>

              <div className="text-center space-y-3 z-10 px-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-green-600 leading-none mb-1">
                  Sent
                </h3>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                  Request Sent!
                </h2>
                <p className="text-[13px] font-medium text-slate-500 max-w-[320px] leading-relaxed mx-auto">
                  We've received your suggestion for{" "}
                  <span className="text-slate-900 font-bold px-1.5 py-0.5 bg-slate-100 rounded-sm">
                    {suggestionCategoryName}
                  </span>{" "}
                  and our team will review it soon.
                </p>
              </div>

              {/* Automatic dismissal indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
                <div className="h-full bg-green-500 animate-[progress-shrink_2.5s_linear_forwards]" />
              </div>

              <p className="absolute bottom-4 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                Closing automatically...
              </p>

              <style>{`
                @keyframes progress-shrink {
                  from { width: 100%; }
                  to { width: 0%; }
                }
              `}</style>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <ResuableInput
                  label="Category name"
                  placeholder="e.g., Organic Fertilizers"
                  value={suggestionCategoryName}
                  onChange={setSuggestionCategoryName}
                  required
                />
              </div>

              <div className="space-y-2">
                <ResuableTextarea
                  value={suggestionReason}
                  onChange={setSuggestionReason}
                  label="Why should we add this?"
                  placeholder="Briefly describe the importance of this category..."
                  rows={3}
                />
              </div>

              <p className="text-[10px] font-medium text-slate-400 italic">
                * Our administrators will review this request and update the
                global list if approved.
              </p>
            </>
          )}
        </div>
      </ResuableModal>
    </div>
  );
};

export default AddItem;
