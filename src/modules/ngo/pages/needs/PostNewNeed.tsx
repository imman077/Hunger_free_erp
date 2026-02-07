import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Users,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import ResuableDatePicker from "../../../../global/components/resuable-components/datepicker";
import ResuableTextarea from "../../../../global/components/resuable-components/textarea";
import ResuableModal from "../../../../global/components/resuable-components/modal";
import FileUploadSlot from "../../../../global/components/resuable-components/FileUploadSlot";

const PostNewNeed = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: "",
    unit: "units",
    urgency: "medium",
    description: "",
    requiredBy: "",
    beneficiaries: "",
    location: "",
    otherCategory: "",
    itemImage: null as File | null,
  });

  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [suggestionReason, setSuggestionReason] = useState("");
  const [suggestionCategoryName, setSuggestionCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categoryOptions = [
    { value: "food", label: "Food Items" },
    { value: "hygiene", label: "Hygiene Kits" },
    { value: "clothing", label: "Clothing" },
    { value: "medical", label: "Medical Supplies" },
    { value: "educational", label: "Educational Materials" },
    { value: "other", label: "Other" },
  ];

  const unitOptions = [
    { value: "units", label: "Units" },
    { value: "kg", label: "Kilograms (kg)" },
    { value: "packs", label: "Packs" },
    { value: "boxes", label: "Boxes" },
  ];

  const urgencyOptions = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" },
  ];

  const handleValueChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Need posted:", formData);
    alert("Need posted successfully!");
    navigate("/ngo/dashboard");
  };

  return (
    <div
      className="p-8 w-full mx-auto h-fit"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header Bar */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/ngo/dashboard")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-sm font-bold uppercase tracking-widest pt-0.5">
                Back
              </span>
            </button>
            <div className="h-10 w-px bg-gray-200 hidden sm:block" />
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none mb-1">
                Post New Need
              </h1>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-sm flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
              Form Active
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto space-y-10 pb-32"
      >
        {/* Card 01: Item Info */}
        <div
          className="border rounded-sm bg-white shadow-sm"
          style={{
            borderColor: "var(--border-color)",
          }}
        >
          <div className="border-b border-gray-100 p-8 flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-sm flex items-center justify-center text-[#22c55e]">
              <Package size={28} />
            </div>
            <div>
              <h2 className="text-2xl text-left font-black text-slate-800 tracking-tight">
                Item Details
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Specify what you need and how much
              </p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <ResuableInput
              label="Item Name"
              placeholder="e.g., Baby Food & Formula"
              value={formData.itemName}
              onChange={(value) => handleValueChange("itemName", value)}
              required
            />

            <div className="flex flex-col gap-1.5">
              <ResuableDropdown
                label="Category"
                options={categoryOptions}
                value={formData.category}
                onChange={(value) => handleValueChange("category", value)}
                placeholder="Select category"
              />
              <button
                type="button"
                onClick={() => setIsSuggestModalOpen(true)}
                className="self-start flex items-center gap-1.5 text-[9px] font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-[0.2em] px-1 hover:underline underline-offset-4 decoration-2"
              >
                Request Admin to add new category
              </button>
            </div>

            {formData.category === "other" && (
              <div className="md:col-span-2">
                <ResuableInput
                  label="Specify Category"
                  placeholder="Enter custom category"
                  value={formData.otherCategory}
                  onChange={(value) =>
                    handleValueChange("otherCategory", value)
                  }
                  required
                />
              </div>
            )}

            <ResuableInput
              label="Quantity"
              placeholder="e.g., 50"
              type="number"
              value={formData.quantity}
              onChange={(value) => handleValueChange("quantity", value)}
              required
            />

            <ResuableDropdown
              label="Unit"
              options={unitOptions}
              value={formData.unit}
              onChange={(value) => handleValueChange("unit", value)}
            />

            <ResuableDropdown
              label="Urgency Level"
              options={urgencyOptions}
              value={formData.urgency}
              onChange={(value) => handleValueChange("urgency", value)}
            />

            <ResuableDatePicker
              label="Required By"
              value={formData.requiredBy}
              onChange={(value) => handleValueChange("requiredBy", value)}
            />

            <div className="md:col-span-2">
              <FileUploadSlot
                label="Item Image"
                subtitle="Upload a sample photo of the item"
                value={formData.itemImage}
                onChange={(file) => handleValueChange("itemImage", file as any)}
                mandatory
                icon="camera"
                accept="image/*"
              />
            </div>
          </div>
        </div>

        {/* Card 02: Beneficiary Info */}
        <div
          className="border rounded-sm bg-white shadow-sm"
          style={{
            borderColor: "var(--border-color)",
          }}
        >
          <div className="border-b border-gray-100 p-8 flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-sm flex items-center justify-center text-slate-600">
              <Users size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Beneficiary Information
              </h2>
              <p className="text-xs text-left text-slate-500 font-medium">
                Who will benefit from this donation
              </p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 gap-8">
            <ResuableInput
              label="Beneficiaries"
              placeholder="e.g., Children & Youth, Senior Citizens"
              value={formData.beneficiaries}
              onChange={(value) => handleValueChange("beneficiaries", value)}
              required
            />

            <ResuableInput
              label="Distribution Location"
              placeholder="e.g., Community Center A, Shelter B"
              value={formData.location}
              onChange={(value) => handleValueChange("location", value)}
              required
            />

            <ResuableTextarea
              label="Additional Description"
              rows={5}
              placeholder="Provide any additional details about this need..."
              value={formData.description}
              onChange={(value) => handleValueChange("description", value)}
            />
          </div>
        </div>

        {/* System Intelligence Banner - Simplified */}
        <div className="relative overflow-hidden border border-slate-200 bg-white p-0 rounded-none shadow-sm flex items-stretch">
          <div className="flex-1 p-6 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-none flex items-center justify-center text-blue-600 shrink-0">
              <AlertCircle size={24} />
            </div>
            <div className="text-left">
              <div className="flex flex-col gap-1 mb-2">
                <h3 className="text-lg font-black text-blue-700 tracking-tight leading-tight">
                  Important Information
                </h3>
              </div>
              <p className="text-[13px] font-medium text-blue-600/80 leading-relaxed max-w-2xl">
                Donors will see your request immediately after you post it. We
                will send you notifications when someone shows interest. Please
                make sure all details are correct.
              </p>
            </div>
          </div>
          {/* Subtle background element */}
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none">
            <AlertCircle size={160} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <ResuableButton variant="primary" size="lg" type="submit">
            Post Need
          </ResuableButton>
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

              <div className="text-center space-y-3 z-10">
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

export default PostNewNeed;
