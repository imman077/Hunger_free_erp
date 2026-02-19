import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Package, MapPin } from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import ResuableDatePicker from "../../../../global/components/resuable-components/datepicker";
import ResuableTimePicker from "../../../../global/components/resuable-components/TimePicker";
import FileUploadSlot from "../../../../global/components/resuable-components/FileUploadSlot";

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
    foodPhoto: null as File | null,
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

  const handleValueChange = (name: string, value: string | File | null) => {
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
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate("/donor/donations")}
              className="flex items-center gap-2 transition-colors group shrink-0"
              style={{ color: "var(--text-secondary)" }}
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest pt-0.5">
                Back
              </span>
            </button>
            <div className="h-8 w-px bg-[var(--border-color)]" />
            <div className="min-w-0">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter leading-none truncate"
                style={{ color: "var(--text-primary)" }}
              >
                Create Donation
              </h1>
            </div>
          </div>
          <div
            className="self-start sm:self-center border px-4 py-1.5 rounded-lg flex items-center gap-2.5 shadow-sm"
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.08)",
              borderColor: "rgba(34, 197, 94, 0.2)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
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
          className="border rounded-md shadow-sm"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--bg-primary)",
          }}
        >
          <div
            className="border-b p-5 sm:p-7 flex items-center gap-4"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div
              className="w-12 h-12 border rounded-xl flex items-center justify-center shadow-sm shrink-0"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.08)",
                borderColor: "rgba(34, 197, 94, 0.15)",
                color: "#22c55e",
              }}
            >
              <Package size={24} />
            </div>
            <div>
              <h2
                className="text-xs sm:text-sm font-black uppercase tracking-tight leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                01. Food Specifications
              </h2>
              <p
                className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1.5 opacity-40"
                style={{ color: "var(--text-secondary)" }}
              >
                Technical details about your donation
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8 space-y-8">
            {/* Photo Upload Section */}
            <div
              className="pb-4 border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <FileUploadSlot
                label="Food Item Photo"
                value={formData.foodPhoto}
                onChange={(file: File | null) =>
                  handleValueChange("foodPhoto", file)
                }
                subtitle="High-quality image for better verification"
                icon="camera"
                mandatory
              />
            </div>

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
              <label
                className="text-[10px] font-black uppercase tracking-[0.2em] block px-1"
                style={{ color: "var(--text-muted)" }}
              >
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
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Card 02: Logistics */}
        <div
          className="border rounded-md shadow-sm"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--bg-primary)",
          }}
        >
          <div
            className="border-b p-5 sm:p-7 flex items-center gap-4"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div
              className="w-12 h-12 border rounded-xl flex items-center justify-center shadow-sm shrink-0"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.08)",
                borderColor: "rgba(34, 197, 94, 0.15)",
                color: "#22c55e",
              }}
            >
              <MapPin size={24} />
            </div>
            <div>
              <h2
                className="text-xs sm:text-sm font-black uppercase tracking-tight leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                02. Pickup Logistics
              </h2>
              <p
                className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1.5 opacity-40"
                style={{ color: "var(--text-secondary)" }}
              >
                Coordination and collection data
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8 space-y-8">
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
          className="fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t p-6 z-[200] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="max-w-5xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-end gap-4 sm:gap-6">
            <ResuableButton
              variant="ghost"
              onClick={() => navigate("/donor/donations")}
              className="w-full sm:w-auto font-black text-[11px] uppercase tracking-[0.2em] hover:text-red-500 transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              Discard Entry
            </ResuableButton>
            <ResuableButton
              type="submit"
              variant="dark"
              className="w-full sm:min-w-[240px] h-[52px] !bg-[#16a34a] hover:!bg-[#15803d] !rounded-md shadow-lg shadow-green-500/20 transition-all active:scale-95"
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
