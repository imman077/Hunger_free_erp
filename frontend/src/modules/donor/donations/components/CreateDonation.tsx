import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Package, MapPin, Heart } from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import ResuableDatePicker from "../../../../global/components/resuable-components/datepicker";
import ResuableTimePicker from "../../../../global/components/resuable-components/TimePicker";
import FileUploadSlot from "../../../../global/components/resuable-components/FileUploadSlot";

import { donationService } from "../api/donations.api";
import { toast } from "sonner";

const CreateDonation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const needId = searchParams.get("need_id");
  const ngoId = searchParams.get("ngo_id");
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    foodCategory: "",
    quantity: "",
    unit: "kg",
    description: "",
    expiryDate: "",
    expiryTime: "",
    pickupAddress: "",
    contactPhone: "",
    foodPhoto: null as File | null,
  });

  const foodCategories = [
    { value: "Fresh Produce", label: "Fresh Produce" },
    { value: "Cooked Meals", label: "Cooked Meals" },
    { value: "Packaged Food", label: "Packaged Food" },
    { value: "Bakery Items", label: "Bakery Items" },
    { value: "Dairy Products", label: "Dairy Products" },
    { value: "Other", label: "Other" },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Prepare FormData (required for file uploads)
      const submitData = new FormData();

      // 2. Map frontend state names to backend model naming conventions
      submitData.append("food_category", formData.foodCategory);
      submitData.append("food_items", formData.description);
      submitData.append("quantity", formData.quantity);
      submitData.append("unit", formData.unit);
      submitData.append("pickup_address", formData.pickupAddress);
      submitData.append("contact_phone", formData.contactPhone);

      if (needId) {
        submitData.append("related_need", needId);
      }
      if (ngoId) {
          submitData.append("assigned_ngo", ngoId);
      }

      // 3. Construct the full expiry_time (ISO format: YYYY-MM-DDTHH:MM:SSZ)
      if (formData.expiryDate && formData.expiryTime) {
        const combinedDateTime = `${formData.expiryDate}T${formData.expiryTime}`;
        submitData.append("expiry_time", combinedDateTime);
      }

      // 4. Append the image file if it exists
      if (formData.foodPhoto) {
        submitData.append("image", formData.foodPhoto);
      }

      // 5. Submit to server
      await donationService.createDonation(submitData);

      toast.success("Donation submitted successfully!");
      navigate("/donor/donations");
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit donation. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-3 sm:p-4 lg:p-5 pb-10 w-full mx-auto min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header Bar */}
      <div className="max-w-5xl mx-auto mb-8 sm:mb-12 px-1 sm:px-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/donor/donations")}
            className="flex items-center gap-2 transition-colors group w-fit"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] pt-0.5">
              Back
            </span>
          </button>

          {/* Desktop Divider */}
          <div className="hidden sm:block h-10 w-px bg-[var(--border-color)] opacity-60" />

          {/* Title Section */}
          <div className="min-w-0">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              Create Donation
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mt-2 block sm:hidden">
              Contribution Portal
            </p>
          </div>
        </div>
      </div>

      {needId && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-md border border-green-500/20 bg-green-500/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                  <Heart size={20} fill="currentColor" />
              </div>
              <div>
                  <h3 className="text-xs font-black uppercase tracking-tight text-green-600">Responding to NGO Need</h3>
                  <p className="text-[10px] font-medium text-green-700/80 uppercase tracking-widest mt-0.5">Your donation will be directly prioritized for this organization's request.</p>
              </div>
          </div>
      )}

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
                value={formData.foodCategory}
                onChange={(val) => handleValueChange("foodCategory", val)}
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
          </div>

          <div className="p-5 sm:p-8 space-y-8 bg-[var(--bg-secondary)]/30 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ResuableDatePicker
                    label="Expiry Date"
                    value={formData.expiryDate}
                    required
                    onChange={(val) => handleValueChange("expiryDate", val)}
                    align="left"
                  />

                  <ResuableTimePicker
                    label="Expiry Time"
                    value={formData.expiryTime}
                    onChange={(val) => handleValueChange("expiryTime", val)}
                    required
                    align="left"
                  />
              </div>
          </div>

          <div className="p-5 sm:p-8 space-y-8">
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

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
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
              disabled={loading}
              className="w-full sm:min-w-[240px] h-[52px] !bg-[#16a34a] hover:!bg-[#15803d] !rounded-md shadow-lg shadow-green-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              startContent={loading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : <CheckCircle size={20} />}
            >
              <span className="text-[11px] font-black uppercase tracking-widest">
                {loading ? "Submitting..." : "Confirm Donation"}
              </span>
            </ResuableButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDonation;
