import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Package, MapPin } from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import ResuableDatePicker from "../../../../global/components/resuable-components/datepicker";
import ResuableTimePicker from "../../../../global/components/resuable-components/TimePicker";

const CreateDonation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    unit: "kg",
    description: "",
    pickupAddress: "",
    pickupDate: "",
    pickupTime: "",
    contactPhone: "",
  });

  const foodCategories = [
    { value: "fresh-produce", label: "Fresh Produce" },
    { value: "cooked-meals", label: "Cooked Meals" },
    { value: "packaged-food", label: "Packaged Food" },
    { value: "bakery-items", label: "Bakery Items" },
    { value: "dairy-products", label: "Dairy Products" },
    { value: "other", label: "Other" },
  ];

  const unitOptions = [
    { value: "kg", label: "Kilograms (kg)" },
    { value: "portions", label: "Portions" },
    { value: "items", label: "Items" },
    { value: "liters", label: "Liters" },
  ];

  const handleValueChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation submitted:", formData);
    // Mocking success
    alert("Donation submitted successfully!");
    navigate("/donor/donations");
  };

  return (
    <div
      className="p-6 w-full mx-auto min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header Bar */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/donor/donations")}
              className="flex items-center gap-2 transition-colors group"
              style={{ color: "var(--text-secondary)" }}
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
              <h1
                className="text-4xl font-black tracking-tighter leading-none mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Create Donation
              </h1>
            </div>
          </div>
          <div className="bg-[#ecfdf5] border border-[#d1fae5] px-4 py-2 rounded-none flex items-center gap-3">
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
        {/* Card 01: Food Info */}
        <div
          className="border rounded-none"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div
            className="border-b p-6 flex items-center gap-4 rounded-t-none"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-12 h-12 bg-[#ecfdf5] border border-[#d1fae5] rounded-none flex items-center justify-center text-[#16a34a]">
              <Package size={24} />
            </div>
            <div>
              <h2
                className="text-sm font-black uppercase tracking-tighter leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                01. Food Specifications
              </h2>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mt-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Technical details about your donation
              </p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ResuableDropdown
                label="Food Category *"
                value={formData.foodType}
                onChange={(val) => handleValueChange("foodType", val)}
                options={foodCategories}
                placeholder="Select Category Type"
                align="left"
              />

              <div className="grid grid-cols-2 gap-6">
                <ResuableInput
                  label="Quantity *"
                  type="number"
                  value={formData.quantity}
                  onChange={(val) => handleValueChange("quantity", val)}
                  required
                  placeholder="0"
                  align="left"
                />
                <ResuableDropdown
                  label="Unit *"
                  value={formData.unit}
                  onChange={(val) => handleValueChange("unit", val)}
                  options={unitOptions}
                  placeholder="Select"
                  align="left"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className="text-[10px] font-bold uppercase tracking-widest block px-1"
                style={{ color: "var(--text-muted)" }}
              >
                Detailed Description / Instructions
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
                placeholder="List allergens, storage instructions, or specific handling needs..."
                className="w-full border p-5 rounded-none text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 focus:border-[#22c55e] transition-all min-h-[140px] resize-none"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Card 02: Logistics */}
        <div
          className="border rounded-none"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div
            className="border-b p-6 flex items-center gap-4 rounded-t-none"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-12 h-12 bg-[#ecfdf5] border border-[#d1fae5] rounded-none flex items-center justify-center text-[#16a34a]">
              <MapPin size={24} />
            </div>
            <div>
              <h2
                className="text-sm font-black uppercase tracking-tighter leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                02. Pickup Logistics
              </h2>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mt-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Coordination and collection data
              </p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <ResuableInput
              label="Full Pickup Address *"
              value={formData.pickupAddress}
              onChange={(val) => handleValueChange("pickupAddress", val)}
              required
              placeholder="e.g. Block A, Community Hub, Main St, Zip 12345"
              align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <ResuableDatePicker
                label="Pickup Date *"
                value={formData.pickupDate}
                onChange={(val) => handleValueChange("pickupDate", val)}
                align="left"
              />

              <ResuableTimePicker
                label="Collection Time *"
                value={formData.pickupTime}
                onChange={(val) => handleValueChange("pickupTime", val)}
                required
              />

              <ResuableInput
                label="Emergency Contact *"
                type="tel"
                value={formData.contactPhone}
                onChange={(val) => handleValueChange("contactPhone", val)}
                required
                placeholder="+1 (000) 000-0000"
                align="left"
              />
            </div>
          </div>
        </div>

        {/* Action Bar (Fixed) */}
        <div
          className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t p-6 z-[200]"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
            opacity: 0.9,
          }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-end gap-6">
            <ResuableButton
              variant="ghost"
              onClick={() => navigate("/donor/donations")}
              className="text-gray-500 font-bold uppercase tracking-widest"
            >
              Discard Entry
            </ResuableButton>
            <ResuableButton
              type="submit"
              variant="dark"
              className="min-w-[280px] h-[52px] !bg-[#16a34a] hover:!bg-[#15803d]"
              startContent={<CheckCircle size={20} />}
            >
              <span className="text-xs font-black uppercase tracking-widest">
                Confirm Contribution
              </span>
            </ResuableButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDonation;
