import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  User,
  MapPin,
  Car,
  ShieldCheck,
} from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import FileUploadSlot from "../../../../global/components/resuable-components/FileUploadSlot";

const CreateVolunteer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zone: "",
    vehicleType: "",
    licenseNo: "",
  });

  const [attachments, setAttachments] = useState<Record<string, File | null>>(
    {}
  );

  const handleAttachmentChange = (slot: string, file: File | null) => {
    setAttachments((prev) => ({
      ...prev,
      [slot]: file,
    }));
  };

  const zones = [
    { value: "North", label: "North Zone" },
    { value: "South", label: "South Zone" },
    { value: "East", label: "East Zone" },
    { value: "West", label: "West Zone" },
    { value: "Central", label: "Central Zone" },
  ];

  const vehicleTypes = [
    { value: "Two Wheeler", label: "Two Wheeler" },
    { value: "Four Wheeler", label: "Four Wheeler" },
    { value: "HCV", label: "Heavy Commercial Vehicle" },
    { value: "None", label: "No Vehicle" },
  ];

  const handleValueChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!attachments["Government ID Proof"]) {
      alert("Please upload a mandatory Identity Proof.");
      return;
    }

    if (formData.vehicleType !== "None" && !attachments["Driving License"]) {
      alert("Please upload your Driving License for vehicle operations.");
      return;
    }

    console.log("Volunteer created:", { ...formData, attachments });
    alert("Volunteer registered successfully!");
    navigate("/admin/users/volunteers");
  };

  return (
    <div
      className="p-8 md:p-10 w-full mx-auto min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header Bar */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("/admin/users/volunteers")}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-[#22c55e] hover:border-[#22c55e]/30 transition-all group shadow-sm"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div className="h-10 w-px bg-slate-200 hidden sm:block" />
            <div>
              <h1
                className="text-3xl md:text-5xl font-black tracking-tighter leading-none italic"
                style={{ color: "var(--text-primary)" }}
              >
                Add Volunteer
              </h1>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.3em]">
                Administrator Console • Volunteer Onboarding
              </p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pt-0.5">
              Live Enrollment
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-6 pb-24"
      >
        {/* Card 01: Personal Profile */}
        <div
          className="border rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="border-b p-8 flex items-center gap-5 bg-slate-50/30"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-[#22c55e] shadow-sm">
              <User size={28} />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-tighter leading-none text-slate-800">
                01. Personal Identity
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-slate-400">
                Full Name and Operational Zone
              </p>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ResuableInput
                label="Full Name"
                value={formData.name}
                onChange={(val) => handleValueChange("name", val)}
                required
                placeholder="e.g. John Doe"
                align="left"
              />

              <ResuableDropdown
                label="Assigned Zone"
                value={formData.zone}
                onChange={(val) => handleValueChange("zone", val)}
                options={zones}
                placeholder="Select Zone"
                required
                align="left"
              />
            </div>
          </div>
        </div>

        {/* Card 02: Contact & Location */}
        <div
          className="border rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="border-b p-8 flex items-center gap-5 bg-slate-50/30"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-[#22c55e] shadow-sm">
              <MapPin size={28} />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-tighter leading-none text-slate-800">
                02. Communication Details
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-slate-400">
                Contact information and residence address
              </p>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ResuableInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(val) => handleValueChange("email", val)}
                required
                placeholder="john.doe@example.com"
                align="left"
              />

              <ResuableInput
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(val) => handleValueChange("phone", val)}
                required
                placeholder="+1 (000) 000-0000"
                align="left"
              />
            </div>

            <ResuableInput
              label="Permanent Residence Address"
              value={formData.address}
              onChange={(val) => handleValueChange("address", val)}
              required
              placeholder="e.g. 123 Skyview Apt, City"
              align="left"
            />
          </div>
        </div>

        {/* Card 03: Vehicle & License */}
        <div
          className="border rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="border-b p-8 flex items-center gap-5 bg-slate-50/30"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-[#22c55e] shadow-sm">
              <Car size={28} />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-tighter leading-none text-slate-800">
                03. Logistics Capability
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-slate-400">
                Vehicle details for delivery and pickups
              </p>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ResuableDropdown
                label="Vehicle Type"
                value={formData.vehicleType}
                onChange={(val) => handleValueChange("vehicleType", val)}
                options={vehicleTypes}
                placeholder="Select Vehicle"
                required
                align="left"
              />

              <ResuableInput
                label="Driving License Number"
                value={formData.licenseNo}
                onChange={(val) => handleValueChange("licenseNo", val)}
                required={formData.vehicleType !== "None"}
                placeholder="ABC-XXXX-XXXX"
                align="left"
                disabled={formData.vehicleType === "None"}
              />
            </div>
          </div>
        </div>

        {/* Card 04: Compliance Documents */}
        <div
          className="border rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="border-b p-8 flex items-center gap-5 bg-slate-50/30"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-tighter leading-none text-slate-800">
                04. Verification Documents
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-slate-400">
                Mandatory identity and licensing proofs
              </p>
            </div>
          </div>

          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FileUploadSlot
                label="Government ID Proof"
                value={attachments["Government ID Proof"] || null}
                onChange={(file) =>
                  handleAttachmentChange("Government ID Proof", file)
                }
                mandatory
                icon="shield"
              />

              <FileUploadSlot
                label="Driving License"
                value={attachments["Driving License"] || null}
                onChange={(file) =>
                  handleAttachmentChange("Driving License", file)
                }
                mandatory={formData.vehicleType !== "None"}
                icon="file"
                subtitle={
                  formData.vehicleType === "None"
                    ? "Not Required"
                    : "Required for Drivers"
                }
              />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div
          className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t p-6 z-[200] shadow-[0_-15px_50px_rgba(0,0,0,0.05)]"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-end">
            <div className="flex items-center gap-8">
              <ResuableButton
                variant="ghost"
                onClick={() => navigate("/admin/users/volunteers")}
                className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] hover:text-red-500 transition-colors"
              >
                Cancel Entry
              </ResuableButton>
              <ResuableButton
                type="submit"
                variant="dark"
                className="min-w-[260px] h-[58px] !bg-[#22c55e] hover:!bg-[#1ea34a] !rounded-xl shadow-xl shadow-[#22c55e]/20 transition-all active:scale-[0.98] border border-[#22c55e]/20"
                startContent={<CheckCircle size={22} />}
              >
                <span className="text-[12px] font-black uppercase tracking-[0.2em]">
                  Register Volunteer
                </span>
              </ResuableButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateVolunteer;
