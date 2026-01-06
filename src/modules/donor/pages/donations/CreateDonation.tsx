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
      className="p-8 md:p-10 w-full mx-auto min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header Bar */}
      <div className="max-w-5xl mx-auto mb-8">
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
              <span className="text-[11px] font-black uppercase tracking-widest pt-0.5">
                Back
              </span>
            </button>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <h1
                className="text-3xl md:text-4xl font-black tracking-tighter leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                Create Donation
              </h1>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-md flex items-center gap-2.5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest">
              Live Entry
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-6 pb-24"
      >
        {/* Card 01: Food Info */}
        <div
          className="border rounded-md bg-white shadow-sm"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="border-b p-7 flex items-center gap-4"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-md flex items-center justify-center text-[#16a34a] shadow-sm">
              <Package size={24} />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-tighter leading-none text-slate-800">
                01. Food Specifications
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-1.5 text-slate-400">
                Technical details about your donation
              </p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ResuableDropdown
                label="Food Category"
                value={formData.foodType}
                onChange={(val) => handleValueChange("foodType", val)}
                options={foodCategories}
                placeholder="Select Type"
                required
                align="left"
              />

              <ResuableInput
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(val) => handleValueChange("quantity", val)}
                required
                placeholder="0"
                align="left"
              />

              <ResuableDropdown
                label="Unit"
                value={formData.unit}
                onChange={(val) => handleValueChange("unit", val)}
                options={unitOptions}
                placeholder="Unit"
                required
                align="left"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] block px-1 text-slate-400">
                Description & Handling Instructions
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
                placeholder="List allergens, storage, or handling needs..."
                className="w-full border p-6 rounded-md text-[13px] font-semibold focus:outline-none focus:ring-4 focus:ring-[#22c55e]/5 focus:border-[#22c55e] transition-all min-h-[140px] resize-none"
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
          className="border rounded-md bg-white shadow-sm"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="border-b p-7 flex items-center gap-4"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-md flex items-center justify-center text-[#16a34a] shadow-sm">
              <MapPin size={24} />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-tighter leading-none text-slate-800">
                02. Pickup Logistics
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-1.5 text-slate-400">
                Coordination and collection data
              </p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <ResuableInput
              label="Full Pickup Address"
              value={formData.pickupAddress}
              onChange={(val) => handleValueChange("pickupAddress", val)}
              required
              placeholder="e.g. Block A, Community Hub, Zip 12345"
              align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ResuableDatePicker
                label="Pickup Date"
                value={formData.pickupDate}
                required
                onChange={(val) => handleValueChange("pickupDate", val)}
                align="left"
              />

              <ResuableTimePicker
                label="Collection Time"
                value={formData.pickupTime}
                onChange={(val) => handleValueChange("pickupTime", val)}
                required
                align="left"
              />

              <ResuableInput
                label="Contact Phone"
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
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t p-6 z-[200] shadow-[0_-10px_40px_rgba(0,0,0,0.04)]"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-end gap-6">
            <ResuableButton
              variant="ghost"
              onClick={() => navigate("/donor/donations")}
              className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] hover:text-red-500 transition-colors"
            >
              Discard Entry
            </ResuableButton>
            <ResuableButton
              type="submit"
              variant="dark"
              className="min-w-[240px] h-[52px] !bg-[#16a34a] hover:!bg-[#15803d] !rounded-md shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              startContent={<CheckCircle size={20} />}
            >
              <span className="text-[11px] font-black uppercase tracking-widest">
                Confirm Donation
              </span>
            </ResuableButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDonation;
