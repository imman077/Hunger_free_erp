import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Users, AlertCircle } from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import ResuableDatePicker from "../../../../global/components/resuable-components/datepicker";

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
  });

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
    <div className="p-6 w-full mx-auto bg-gray-50/50 min-h-screen">
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
          <div className="bg-[#ecfdf5] border border-[#d1fae5] px-4 py-2 rounded-sm flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest">
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
        <div className="bg-white border border-gray-100 rounded-sm">
          <div className="border-b border-gray-100 p-6 flex items-center gap-4 rounded-t-none">
            <div className="w-12 h-12 bg-[#ecfdf5] border border-[#d1fae5] rounded-sm flex items-center justify-center text-[#16a34a]">
              <Package size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Item Details
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Specify what you need and how much
              </p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResuableInput
              label="Item Name"
              placeholder="e.g., Baby Food & Formula"
              value={formData.itemName}
              onChange={(value) => handleValueChange("itemName", value)}
              required
            />

            <ResuableDropdown
              label="Category"
              options={categoryOptions}
              value={formData.category}
              onChange={(value) => handleValueChange("category", value)}
              placeholder="Select category"
            />

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
          </div>
        </div>

        {/* Card 02: Beneficiary Info */}
        <div className="bg-white border border-gray-100 rounded-sm">
          <div className="border-b border-gray-100 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-sm flex items-center justify-center text-blue-600">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Beneficiary Information
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Who will benefit from this donation
              </p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 gap-6">
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Description
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent resize-none"
                rows={4}
                placeholder="Provide any additional details about this need..."
                value={formData.description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-sm flex items-center gap-2">
          <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-blue-900 mb-1">
              Important Information
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              Once posted, this need will be visible to all donors in the
              network. You'll receive notifications when donors express interest
              in fulfilling this need. Make sure all information is accurate and
              up-to-date.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <ResuableButton
            variant="ghost"
            size="lg"
            onClick={() => navigate("/ngo/dashboard")}
            type="button"
          >
            Cancel
          </ResuableButton>
          <ResuableButton variant="primary" size="lg" type="submit">
            Post Need
          </ResuableButton>
        </div>
      </form>
    </div>
  );
};

export default PostNewNeed;
