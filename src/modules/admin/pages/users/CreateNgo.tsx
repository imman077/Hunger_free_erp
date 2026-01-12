import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Building2,
  MapPin,
  ShieldCheck,
  Users,
  X,
  Eye,
  Download,
} from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import FileUploadSlot from "../../../../global/components/resuable-components/FileUploadSlot";
import FilePreviewModal from "../../../../global/components/resuable-components/FilePreviewModal";

interface CategoryField {
  label: string;
  type: "text" | "dropdown";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface CategoryConfig {
  details: { mandatory: CategoryField[]; optional: CategoryField[] };
  proofs: { mandatory: string[]; optional: string[] };
}

const NGO_CONFIG: Record<string, CategoryConfig> = {
  "Children & Youth": {
    details: {
      mandatory: [
        {
          label: "Care Type",
          type: "dropdown",
          options: [
            { value: "Orphanage", label: "Orphanage" },
            { value: "School", label: "School" },
            { value: "Shelter", label: "Shelter" },
          ],
        },
        { label: "Approximate Number of Children", type: "text" },
      ],
      optional: [
        { label: "Age Group", type: "text", placeholder: "eg: 0 - 18 years" },
      ],
    },
    proofs: {
      mandatory: ["Child Care Institution / School Registration Certificate"],
      optional: ["Student ID Summary (masked)", "Facility Photos"],
    },
  },
  "Senior Citizens": {
    details: {
      mandatory: [
        {
          label: "Facility Type",
          type: "dropdown",
          options: [
            { value: "Old Age Home", label: "Old Age Home" },
            { value: "Day Care", label: "Day Care" },
          ],
        },
        { label: "Approximate Number of Seniors", type: "text" },
      ],
      optional: [
        { label: "Age Group", type: "text", placeholder: "eg: 60+ years" },
      ],
    },
    proofs: {
      mandatory: ["Old Age Home Registration Certificate"],
      optional: ["Medical Support Letter", "Facility Photos"],
    },
  },
  "Local Communities": {
    details: {
      mandatory: [
        { label: "Community / Area Name", type: "text" },
        { label: "Approximate Number of Beneficiaries", type: "text" },
      ],
      optional: [
        {
          label: "Community Type",
          type: "dropdown",
          options: [
            { value: "Urban", label: "Urban" },
            { value: "Rural", label: "Rural" },
          ],
        },
      ],
    },
    proofs: {
      mandatory: ["Community Verification Letter"],
      optional: ["Area Photos", "BPL / Ration Card Summary"],
    },
  },
  "Stray Animals": {
    details: {
      mandatory: [
        {
          label: "Care Type",
          type: "dropdown",
          options: [
            { value: "Shelter", label: "Shelter" },
            { value: "Rescue", label: "Rescue" },
            { value: "Feeding Point", label: "Feeding Point" },
          ],
        },
        { label: "Approximate Number of Animals", type: "text" },
      ],
      optional: [
        {
          label: "Animal Type",
          type: "dropdown",
          options: [
            { value: "Dogs", label: "Dogs" },
            { value: "Cats", label: "Cats" },
            { value: "Cattle", label: "Cattle" },
            { value: "Others", label: "Others" },
          ],
        },
      ],
    },
    proofs: {
      mandatory: ["Animal Welfare / Shelter Registration Certificate"],
      optional: ["Municipality / Veterinary Letter", "Shelter Photos"],
    },
  },
  "Low-Income Communities": {
    details: {
      mandatory: [
        { label: "Area Name / Location", type: "text" },
        { label: "Approximate Number of Beneficiaries", type: "text" },
      ],
      optional: [{ label: "Nature of Support", type: "text" }],
    },
    proofs: {
      mandatory: ["Community Verification Letter"],
      optional: ["BPL / Ration Card Summary", "Area Photos"],
    },
  },
};

const CreateNgo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({
    ngoName: "",
    orgType: "",
    registrationNo: "",
    address: "",
    email: "",
    website: "",
    about: "",
    representativeName: "",
    mobile: "",
    altMobile: "",
    designation: "",
    beneficiaries: "",
  });

  const [toggles, setToggles] = useState({
    // NGO Details
    showEmail: false,
    showWebsite: false,
    showAbout: false,
    // Rep Details
    showAltMobile: false,
    showDesignation: false,
    // Proofs
    showProofOptional: false,
    // Category Details
    showCategoryOptional: false,
    showCategoryProofOptional: false,
  });

  const [attachments, setAttachments] = useState<
    Record<string, File | File[] | null>
  >({});

  const [previewFile, setPreviewFile] = useState<{
    file: File | string | null;
    name: string;
  } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (file: File | string, name: string) => {
    setPreviewFile({ file, name });
    setIsPreviewOpen(true);
  };

  const handleDownloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    // Cleanup immediately after download
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const handleAttachmentChange = (
    slot: string,
    value: File | File[] | null
  ) => {
    setAttachments((prev) => ({
      ...prev,
      [slot]: value,
    }));
  };

  const beneficiaryTypes = [
    { value: "Children & Youth", label: "Children & Youth" },
    { value: "Senior Citizens", label: "Senior Citizens" },
    { value: "Local Communities", label: "Local Communities" },
    { value: "Stray Animals", label: "Stray Animals" },
    { value: "Low-Income Communities", label: "Low-Income Communities" },
  ];

  const handleValueChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear attachments when beneficiary type changes to ensure correct files
    if (name === "beneficiaries") {
      setAttachments({});
    }
  };

  const toggleSection = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. NGO Global Mandatory Validation
    const globalFields = [
      "ngoName",
      "orgType",
      "registrationNo",
      "address",
      "representativeName",
      "mobile",
    ];
    for (const field of globalFields) {
      if (!formData[field]) {
        alert(
          `Please fill the mandatory field: ${field
            .replace(/([A-Z])/g, " $1")
            .trim()}`
        );
        return;
      }
    }

    // 2. Global Mandatory Proofs
    const globalProofs = [
      "NGO Registration Certificate",
      "Authorized Representative ID Proof",
    ];
    for (const proof of globalProofs) {
      if (!attachments[proof]) {
        alert(`Please upload the mandatory proof: ${proof}`);
        return;
      }
    }

    // 3. Category Specific Validation
    const config = NGO_CONFIG[formData.beneficiaries];
    if (config) {
      // Details
      for (const field of config.details.mandatory) {
        if (!formData[field.label]) {
          alert(`Please fill the mandatory category detail: ${field.label}`);
          return;
        }
      }
      // Proofs
      for (const proof of config.proofs.mandatory) {
        if (!attachments[proof]) {
          alert(`Please upload the mandatory category proof: ${proof}`);
          return;
        }
      }
    } else {
      alert("Please select a Beneficiary Category and fill required details.");
      return;
    }

    console.log("NGO created:", { ...formData, attachments });
    alert("NGO registered successfully!");
    navigate("/admin/users/ngos");
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
              onClick={() => navigate("/admin/users/ngos")}
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
                Register NGO
              </h1>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.3em]">
                Administrator Console • NGO Onboarding
              </p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pt-0.5">
              Secure Registration
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-6 pb-24"
      >
        {/* Card 01: NGO Details */}
        <div
          className="border rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="border-b p-8 flex items-center gap-5 bg-slate-50/30"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-[#22c55e] shadow-sm">
              <Building2 size={28} />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-tighter leading-none text-slate-800">
                01. NGO Identity
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-slate-400">
                Official Entity Details & High-Level Info
              </p>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ResuableInput
                label="NGO / Organization Name"
                value={formData.ngoName}
                onChange={(val) => handleValueChange("ngoName", val)}
                required
                placeholder="e.g. Hope Foundation"
                align="left"
              />

              <ResuableDropdown
                label="Organization Type"
                value={formData.orgType}
                onChange={(val) => handleValueChange("orgType", val)}
                options={[
                  { value: "Trust", label: "Trust" },
                  { value: "Society", label: "Society" },
                  { value: "Section 8", label: "Section 8 Company" },
                ]}
                placeholder="Select Type"
                required
                align="left"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ResuableInput
                label="Registration Number"
                value={formData.registrationNo}
                onChange={(val) => handleValueChange("registrationNo", val)}
                required
                placeholder="REG-XXXX-XXXX"
                align="left"
              />

              <ResuableInput
                label="Full Address (Area, City, State, Pincode)"
                value={formData.address}
                onChange={(val) => handleValueChange("address", val)}
                required
                placeholder="e.g. 1st Floor, Charity Plaza, Mumbai, 400001"
                align="left"
              />
            </div>

            {/* Optional NGO Details */}
            <div className="space-y-6 pt-6 border-t border-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Email Toggle */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Email ID
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSection("showEmail")}
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                        toggles.showEmail
                          ? "bg-red-50 text-red-500 border-red-100"
                          : "bg-emerald-50 text-hf-green border-emerald-100"
                      }`}
                    >
                      {toggles.showEmail ? "Remove" : "+ Add"}
                    </button>
                  </div>
                  {toggles.showEmail && (
                    <ResuableInput
                      label=""
                      value={formData.email}
                      onChange={(val) => handleValueChange("email", val)}
                      placeholder="info@ngo.org"
                      align="left"
                      type="email"
                    />
                  )}
                </div>

                {/* Website Toggle */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Website / Social
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSection("showWebsite")}
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                        toggles.showWebsite
                          ? "bg-red-50 text-red-500 border-red-100"
                          : "bg-emerald-50 text-hf-green border-emerald-100"
                      }`}
                    >
                      {toggles.showWebsite ? "Remove" : "+ Add"}
                    </button>
                  </div>
                  {toggles.showWebsite && (
                    <ResuableInput
                      label=""
                      value={formData.website}
                      onChange={(val) => handleValueChange("website", val)}
                      placeholder="https://ngo.org"
                      align="left"
                    />
                  )}
                </div>

                {/* About Toggle */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Description
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSection("showAbout")}
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                        toggles.showAbout
                          ? "bg-red-50 text-red-500 border-red-100"
                          : "bg-emerald-50 text-hf-green border-emerald-100"
                      }`}
                    >
                      {toggles.showAbout ? "Remove" : "+ Add"}
                    </button>
                  </div>
                  {toggles.showAbout && (
                    <ResuableInput
                      label=""
                      value={formData.about}
                      onChange={(val) => handleValueChange("about", val)}
                      placeholder="Short bio..."
                      align="left"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 02: Representative Details */}
        <div
          className="border rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="border-b p-8 flex items-center gap-5 bg-slate-50/30"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-[#22c55e] shadow-sm">
              <Users size={28} />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-tighter leading-none text-slate-800">
                02. Authorized Representative
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-slate-400">
                Primary Contact Person & Accountability
              </p>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ResuableInput
                label="Authorized Representative Name"
                value={formData.representativeName}
                onChange={(val) => handleValueChange("representativeName", val)}
                required
                placeholder="e.g. Dr. Samuel Smith"
                align="left"
              />

              <ResuableInput
                label="Mobile Number"
                value={formData.mobile}
                onChange={(val) => handleValueChange("mobile", val)}
                required
                placeholder="+91 XXXXX XXXXX"
                align="left"
                type="tel"
              />
            </div>

            {/* Optional Rep Details */}
            <div className="space-y-6 pt-6 border-t border-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Alt Mobile Toggle */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Alt Mobile
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSection("showAltMobile")}
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                        toggles.showAltMobile
                          ? "bg-red-50 text-red-500 border-red-100"
                          : "bg-emerald-50 text-hf-green border-emerald-100"
                      }`}
                    >
                      {toggles.showAltMobile ? "Remove" : "+ Add"}
                    </button>
                  </div>
                  {toggles.showAltMobile && (
                    <ResuableInput
                      label=""
                      value={formData.altMobile}
                      onChange={(val) => handleValueChange("altMobile", val)}
                      placeholder="Alternate number"
                      align="left"
                      type="tel"
                    />
                  )}
                </div>

                {/* Designation Toggle */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Designation
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSection("showDesignation")}
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                        toggles.showDesignation
                          ? "bg-red-50 text-red-500 border-red-100"
                          : "bg-emerald-50 text-hf-green border-emerald-100"
                      }`}
                    >
                      {toggles.showDesignation ? "Remove" : "+ Add"}
                    </button>
                  </div>
                  {toggles.showDesignation && (
                    <ResuableInput
                      label=""
                      value={formData.designation}
                      onChange={(val) => handleValueChange("designation", val)}
                      placeholder="e.g. Director"
                      align="left"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 03: Proof Documents */}
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
                03. Proof Documents
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-slate-400">
                Global Compliance & Validity Documents
              </p>
            </div>
          </div>

          <div className="p-10 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FileUploadSlot
                label="NGO Registration Certificate"
                value={
                  (attachments["NGO Registration Certificate"] as File) || null
                }
                onChange={(file) =>
                  handleAttachmentChange("NGO Registration Certificate", file)
                }
                mandatory
              />
              <FileUploadSlot
                label="Authorized Representative ID Proof"
                value={
                  (attachments["Authorized Representative ID Proof"] as File) ||
                  null
                }
                onChange={(file) =>
                  handleAttachmentChange(
                    "Authorized Representative ID Proof",
                    file
                  )
                }
                mandatory
              />
            </div>

            {/* Optional Global Proofs */}
            <div className="space-y-6 pt-6 border-t border-slate-50">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Optional Proofs
                </h3>
                <button
                  type="button"
                  onClick={() => toggleSection("showProofOptional")}
                  className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all ${
                    toggles.showProofOptional
                      ? "bg-red-50 text-red-500 border-red-100"
                      : "bg-emerald-50 text-hf-green border-emerald-100"
                  }`}
                >
                  {toggles.showProofOptional
                    ? "Hide Optional"
                    : "Show Optional"}
                </button>
              </div>

              {toggles.showProofOptional && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-300">
                  <FileUploadSlot
                    label="Government Affiliation / Support Letter"
                    value={
                      (attachments[
                        "Government Affiliation / Support Letter"
                      ] as File) || null
                    }
                    onChange={(file) =>
                      handleAttachmentChange(
                        "Government Affiliation / Support Letter",
                        file
                      )
                    }
                  />
                  {/* Array Photos for Facility */}
                  <div className="space-y-4">
                    <FileUploadSlot
                      label="NGO Activity / Facility Photos"
                      value={null}
                      onChange={(file) => {
                        if (file) {
                          const current =
                            (attachments[
                              "NGO Activity / Facility Photos"
                            ] as File[]) || [];
                          handleAttachmentChange(
                            "NGO Activity / Facility Photos",
                            [...current, file]
                          );
                        }
                      }}
                      subtitle="Upload Multiple"
                    />
                    {(attachments["NGO Activity / Facility Photos"] as File[])
                      ?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {(
                          attachments[
                            "NGO Activity / Facility Photos"
                          ] as File[]
                        ).map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 group/photo"
                          >
                            <span className="text-[9px] font-bold text-slate-500 truncate max-w-[80px]">
                              {f.name}
                            </span>
                            <div className="flex items-center gap-1 opacity-0 group-hover/photo:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => handlePreview(f, f.name)}
                                className="text-slate-400 hover:text-[#22c55e] transition-colors"
                                title="View Photo"
                              >
                                <Eye size={10} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDownloadFile(f)}
                                className="text-slate-400 hover:text-blue-500 transition-colors"
                                title="Download Photo"
                              >
                                <Download size={10} />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const next = (
                                    attachments[
                                      "NGO Activity / Facility Photos"
                                    ] as File[]
                                  ).filter((_, idx) => idx !== i);
                                  handleAttachmentChange(
                                    "NGO Activity / Facility Photos",
                                    next
                                  );
                                }}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                                title="Remove Photo"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 04: Beneficiary Category Details */}
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
                04. Beneficiary Focus
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-slate-400">
                Specific details based on target group
              </p>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <ResuableDropdown
              label="Select Beneficiary Category"
              value={formData.beneficiaries}
              onChange={(val) => handleValueChange("beneficiaries", val)}
              options={beneficiaryTypes}
              placeholder="Select Category"
              required
              align="left"
            />

            {!formData.beneficiaries ? (
              <div className="py-20 border-2 border-dashed border-slate-50 rounded-xl bg-slate-50/30 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  Choose a category to provide specific details
                </p>
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
                {/* Category Details */}
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {NGO_CONFIG[formData.beneficiaries].details.mandatory.map(
                      (field) =>
                        field.type === "dropdown" ? (
                          <ResuableDropdown
                            key={field.label}
                            label={field.label}
                            value={formData[field.label] || ""}
                            onChange={(val) =>
                              handleValueChange(field.label, val)
                            }
                            options={field.options || []}
                            placeholder={
                              field.placeholder || `Select ${field.label}`
                            }
                            required
                            align="left"
                          />
                        ) : (
                          <ResuableInput
                            key={field.label}
                            label={field.label}
                            value={formData[field.label] || ""}
                            onChange={(val) =>
                              handleValueChange(field.label, val)
                            }
                            placeholder={
                              field.placeholder || `Enter ${field.label}`
                            }
                            required
                            align="left"
                          />
                        )
                    )}
                  </div>

                  <div className="space-y-6 pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Non-Mandatory Details
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleSection("showCategoryOptional")}
                        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                          toggles.showCategoryOptional
                            ? "bg-red-50 text-red-500 border-red-100"
                            : "bg-emerald-50 text-hf-green border-emerald-100"
                        }`}
                      >
                        {toggles.showCategoryOptional ? "Remove" : "+ Add"}
                      </button>
                    </div>
                    {toggles.showCategoryOptional && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-top-2">
                        {NGO_CONFIG[
                          formData.beneficiaries
                        ].details.optional.map((field) =>
                          field.type === "dropdown" ? (
                            <ResuableDropdown
                              key={field.label}
                              label={field.label}
                              value={formData[field.label] || ""}
                              onChange={(val) =>
                                handleValueChange(field.label, val)
                              }
                              options={field.options || []}
                              placeholder={
                                field.placeholder || `Select ${field.label}`
                              }
                              align="left"
                            />
                          ) : (
                            <ResuableInput
                              key={field.label}
                              label={field.label}
                              value={formData[field.label] || ""}
                              onChange={(val) =>
                                handleValueChange(field.label, val)
                              }
                              placeholder={
                                field.placeholder || `Enter ${field.label}`
                              }
                              align="left"
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Proofs */}
                <div className="space-y-8 pt-10 border-t-2 border-dashed border-slate-100">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
                    <CheckCircle size={14} className="text-hf-green" />
                    Category Specific Proofs
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {NGO_CONFIG[formData.beneficiaries].proofs.mandatory.map(
                      (label) => (
                        <FileUploadSlot
                          key={label}
                          label={label}
                          value={(attachments[label] as File) || null}
                          onChange={(file) =>
                            handleAttachmentChange(label, file)
                          }
                          mandatory
                        />
                      )
                    )}
                  </div>

                  <div className="space-y-6 pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Optional Supporting Docs
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          toggleSection("showCategoryProofOptional")
                        }
                        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                          toggles.showCategoryProofOptional
                            ? "bg-red-50 text-red-500 border-red-100"
                            : "bg-emerald-50 text-hf-green border-emerald-100"
                        }`}
                      >
                        {toggles.showCategoryProofOptional
                          ? "Hide Optional"
                          : "Show Optional"}
                      </button>
                    </div>
                    {toggles.showCategoryProofOptional && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95">
                        {NGO_CONFIG[formData.beneficiaries].proofs.optional.map(
                          (label) => (
                            <div key={label} className="space-y-4">
                              <FileUploadSlot
                                label={label}
                                value={
                                  label.includes("Photos") ||
                                  label.includes("Summary")
                                    ? null
                                    : (attachments[label] as File) || null
                                }
                                onChange={(file) => {
                                  if (file) {
                                    if (
                                      label.includes("Photos") ||
                                      label.includes("Summary")
                                    ) {
                                      const current =
                                        (attachments[label] as File[]) || [];
                                      handleAttachmentChange(label, [
                                        ...current,
                                        file,
                                      ]);
                                    } else {
                                      handleAttachmentChange(label, file);
                                    }
                                  }
                                }}
                                subtitle={
                                  label.includes("Photos") ||
                                  label.includes("Summary")
                                    ? "Upload Multiple"
                                    : "Optional"
                                }
                              />
                              {(label.includes("Photos") ||
                                label.includes("Summary")) &&
                                (attachments[label] as File[])?.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {(attachments[label] as File[]).map(
                                      (f, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 group/photo"
                                        >
                                          <span className="text-[9px] font-bold text-slate-500 truncate max-w-[80px]">
                                            {f.name}
                                          </span>
                                          <div className="flex items-center gap-1 opacity-0 group-hover/photo:opacity-100 transition-opacity">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handlePreview(f, f.name)
                                              }
                                              className="text-slate-400 hover:text-[#22c55e] transition-colors"
                                              title="View Photo"
                                            >
                                              <Eye size={10} />
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleDownloadFile(f)
                                              }
                                              className="text-slate-400 hover:text-blue-500 transition-colors"
                                              title="Download Photo"
                                            >
                                              <Download size={10} />
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const next = (
                                                  attachments[label] as File[]
                                                ).filter((_, idx) => idx !== i);
                                                handleAttachmentChange(
                                                  label,
                                                  next
                                                );
                                              }}
                                              className="text-slate-400 hover:text-red-500 transition-colors"
                                              title="Remove Photo"
                                            >
                                              <X size={10} />
                                            </button>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                onClick={() => navigate("/admin/users/ngos")}
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
                  Register NGO
                </span>
              </ResuableButton>
            </div>
          </div>
        </div>
      </form>
      <FilePreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        file={previewFile?.file || null}
        fileName={previewFile?.name}
      />
    </div>
  );
};

export default CreateNgo;
