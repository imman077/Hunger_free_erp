import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Package,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import FileUploadSlot from "../../../../global/components/resuable-components/FileUploadSlot";

const DONOR_PROOF_CONFIG: Record<
  string,
  { mandatory: string[]; optional: string[] }
> = {
  Event: {
    mandatory: ["Organizer ID Proof"],
    optional: ["Event Invitation / Booking Proof"],
  },
  Restaurant: {
    mandatory: ["FSSAI License", "Owner / Manager ID Proof"],
    optional: ["GST Certificate", "Trade License"],
  },
  Hotel: {
    mandatory: ["FSSAI License", "Authorized Person ID Proof"],
    optional: ["GST Certificate", "Fire Safety Certificate"],
  },
  Household: {
    mandatory: ["Individual ID Proof"],
    optional: ["Address Proof"],
  },
  Corporate: {
    mandatory: [
      "Company Registration Certificate (CIN / MSME)",
      "Authorized Person ID Proof",
    ],
    optional: ["GST Certificate", "FSSAI License"],
  },
};

const CreateDonor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    donorType: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
  });

  const [attachments, setAttachments] = useState<Record<string, File | null>>(
    {},
  );

  const handleAttachmentChange = (slot: string, file: File | null) => {
    setAttachments((prev) => ({
      ...prev,
      [slot]: file,
    }));
  };

  const donorTypes = [
    { value: "Restaurant", label: "Restaurant" },
    { value: "Hotel", label: "Hotel" },
    { value: "Household", label: "Household" },
    { value: "Event", label: "Event" },
    { value: "Corporate", label: "Corporate" },
  ];

  const handleValueChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear attachments when donor type changes to ensure correct files for correct labels
    if (name === "donorType") {
      setAttachments({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const config = DONOR_PROOF_CONFIG[formData.donorType];
    if (config) {
      const missingMandatory = config.mandatory.find((m) => !attachments[m]);
      if (missingMandatory) {
        alert(`Please upload the mandatory ${missingMandatory}.`);
        return;
      }
    } else {
      alert("Please select a Donor Type first.");
      return;
    }

    console.log("Donor created:", { ...formData, attachments });
    alert("Donor added successfully!");
    navigate("/admin/users/donors");
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
              onClick={() => navigate("/admin/users/donors")}
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all group shadow-sm"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
                color: "var(--text-muted)",
              }}
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div
              className="h-10 w-px hidden sm:block"
              style={{ backgroundColor: "var(--border-color)" }}
            />
            <div>
              <h1
                className="text-3xl md:text-5xl font-black tracking-tighter leading-none italic"
                style={{ color: "var(--text-primary)" }}
              >
                Create Donor
              </h1>
              <p
                className="text-[10px] font-bold mt-2 uppercase tracking-[0.3em]"
                style={{ color: "var(--text-muted)" }}
              >
                Administrator Console • Onboarding Flow
              </p>
            </div>
          </div>
          <div
            className="border px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span
              className="text-[10px] font-black uppercase tracking-widest pt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Secure Live Entry
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-6 pb-24"
      >
        {/* Card 01: Donor Profile */}
        <div
          className="border rounded-xl shadow-sm transition-all hover:shadow-md"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--bg-primary)",
          }}
        >
          <div
            className="border-b p-8 flex items-center gap-5"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-tertiary)",
            }}
          >
            <div
              className="w-14 h-14 border rounded-xl flex items-center justify-center text-[#22c55e] shadow-sm"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              <Package size={28} />
            </div>
            <div>
              <h2
                className="text-base font-black uppercase tracking-tighter leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                01. Donor Identity
              </h2>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                Primary Business Profile & Categorization
              </p>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ResuableInput
                label="Business / Donor Name"
                value={formData.businessName}
                onChange={(val) => handleValueChange("businessName", val)}
                required
                placeholder="e.g. Gourmet Bistro"
                align="left"
              />

              <ResuableDropdown
                label="Donor Type"
                value={formData.donorType}
                onChange={(val) => handleValueChange("donorType", val)}
                options={donorTypes}
                placeholder="Select Type"
                required
                align="left"
              />
            </div>

            <ResuableInput
              label="Contact Person"
              value={formData.contactPerson}
              onChange={(val) => handleValueChange("contactPerson", val)}
              required
              placeholder="e.g. Chef Antoine"
              align="left"
            />
          </div>
        </div>

        {/* Card 02: Contact & Location */}
        <div
          className="border rounded-xl shadow-sm transition-all hover:shadow-md"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--bg-primary)",
          }}
        >
          <div
            className="border-b p-8 flex items-center gap-5"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-tertiary)",
            }}
          >
            <div
              className="w-14 h-14 border rounded-xl flex items-center justify-center text-[#22c55e] shadow-sm"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              <MapPin size={28} />
            </div>
            <div>
              <h2
                className="text-base font-black uppercase tracking-tighter leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                02. Communication & Presence
              </h2>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                Contact details and physical operational address
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
                placeholder="contact@business.com"
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
              label="Full Office Address"
              value={formData.address}
              onChange={(val) => handleValueChange("address", val)}
              required
              placeholder="e.g. 123 Main St, City, Zip 12345"
              align="left"
            />
          </div>
        </div>

        <div
          className="border rounded-xl shadow-sm transition-all hover:shadow-md"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--bg-primary)",
          }}
        >
          <div
            className="border-b p-8 flex items-center gap-5"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-tertiary)",
            }}
          >
            <div
              className="w-14 h-14 border rounded-xl flex items-center justify-center text-blue-500 shadow-sm"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              <ShieldCheck size={28} />
            </div>
            <div>
              <h2
                className="text-base font-black uppercase tracking-tighter leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                03. Proof & Compliance
              </h2>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                Mandatory legal and business verification documents
              </p>
            </div>
          </div>

          <div className="p-10 space-y-10">
            {!formData.donorType ? (
              <div
                className="py-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500"
                style={{
                  borderColor: "var(--border-color)",
                  backgroundColor: "var(--bg-secondary)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full shadow-sm flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-muted)",
                  }}
                >
                  <ShieldCheck size={32} />
                </div>
                <h3
                  className="text-sm font-black uppercase tracking-widest"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Select Donor Type
                </h3>
                <p
                  className="text-[10px] font-bold mt-2 uppercase tracking-[0.2em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Requirements will appear dynamically
                </p>
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Mandatory Section */}
                {(() => {
                  const config = DONOR_PROOF_CONFIG[formData.donorType];
                  const allMandatoryFilled = config?.mandatory.every(
                    (m) => !!attachments[m],
                  );

                  return (
                    <div className="relative">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm border transition-all duration-500 ${
                              allMandatoryFilled
                                ? "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }`}
                          >
                            <ShieldCheck size={20} />
                          </div>
                          <div>
                            <h3
                              className="text-[11px] font-black uppercase tracking-[0.2em] leading-none"
                              style={{ color: "var(--text-primary)" }}
                            >
                              Mandatory Documentation
                            </h3>
                            <p
                              className={`text-[9px] font-bold mt-1.5 uppercase tracking-widest opacity-80 transition-colors duration-500 ${
                                allMandatoryFilled
                                  ? "text-[#22c55e]"
                                  : "text-red-400"
                              }`}
                            >
                              {allMandatoryFilled
                                ? "All required documents uploaded"
                                : "Compulsory for Account Verification"}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full border transition-all duration-500 ${
                            allMandatoryFilled
                              ? "bg-[#22c55e]/10 border-[#22c55e]/20"
                              : "bg-red-500/10 border-red-500/20"
                          }`}
                        >
                          <span
                            className={`text-[9px] font-black uppercase tracking-widest ${
                              allMandatoryFilled
                                ? "text-[#22c55e]"
                                : "text-red-500"
                            }`}
                          >
                            {allMandatoryFilled ? "Completed" : "Required"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {config.mandatory.map((label) => (
                          <FileUploadSlot
                            key={label}
                            label={label}
                            value={attachments[label] || null}
                            onChange={(file) =>
                              handleAttachmentChange(label, file)
                            }
                            mandatory
                            icon={
                              label.toLowerCase().includes("id") ||
                              label.toLowerCase().includes("proof")
                                ? "shield"
                                : "file"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Decorative Divider */}
                <div className="flex items-center gap-4">
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "var(--border-color)" }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--border-dark)" }}
                  />
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "var(--border-color)" }}
                  />
                </div>

                {/* Optional Section */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e] shadow-sm border border-[#22c55e]/20">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h3
                          className="text-[11px] font-black uppercase tracking-[0.2em] leading-none"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Additional Verification
                        </h3>
                        <p
                          className="text-[9px] font-bold mt-1.5 uppercase tracking-widest"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Optional / Supporting Proofs
                        </p>
                      </div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: "var(--bg-tertiary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <span
                        className="text-[9px] font-black uppercase tracking-widest"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Optional
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DONOR_PROOF_CONFIG[formData.donorType].optional.map(
                      (label) => (
                        <FileUploadSlot
                          key={label}
                          label={label}
                          value={attachments[label] || null}
                          onChange={(file) =>
                            handleAttachmentChange(label, file)
                          }
                          subtitle="Optional"
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Bar (Fixed) */}
        <div
          className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t p-6 z-[200] shadow-[0_-15px_50px_rgba(0,0,0,0.05)]"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--bg-primary)",
            opacity: 0.95,
          }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-end">
            <div className="flex items-center gap-8">
              <ResuableButton
                variant="ghost"
                onClick={() => navigate("/admin/users/donors")}
                className="font-black text-[11px] uppercase tracking-[0.2em] hover:text-red-500 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                Discard Entry
              </ResuableButton>
              <ResuableButton
                type="submit"
                variant="dark"
                className="min-w-[260px] h-[58px] !bg-[#22c55e] hover:!bg-[#1ea34a] !rounded-xl shadow-xl shadow-[#22c55e]/20 transition-all active:scale-[0.98] border border-[#22c55e]/20"
                startContent={<CheckCircle size={22} />}
              >
                <span className="text-[12px] font-black uppercase tracking-[0.2em]">
                  Finalize & Register
                </span>
              </ResuableButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDonor;
