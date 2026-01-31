import { useState } from "react";
import { toast } from "sonner";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import FilePreviewModal from "../../../../global/components/resuable-components/FilePreviewModal";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import { INITIAL_TIERS } from "../../../../global/constants/milestone_config";
import {
  ShieldCheck,
  User,
  Phone,
  Mail,
  Building2,
  FileText,
  BadgeCheck,
  Globe,
  Wallet,
  MapPin,
  Award,
  MessageSquare,
  Send,
  AlertCircle,
  Eye,
  Download,
  Edit,
} from "lucide-react";

/**
 * @module DonorProfile
 * @description Clean, professional Donor Profile with a focus on perfect alignment and readable hierarchy.
 */
const DonorProfile = () => {
  const [activeTab, setActiveTab] = useState("identity");
  const [isRequestDrawerOpen, setIsRequestDrawerOpen] = useState(false);
  const [requestCategory, setRequestCategory] = useState<string | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  // Document Preview State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const CATEGORIES_CONFIG: Record<
    string,
    { label: string; icon: any; fields: string[] }
  > = {
    contact: {
      label: "Contact Info",
      icon: <User size={16} />,
      fields: [
        "Manager Name",
        "Primary Email",
        "Phone Number",
        "Address Details",
      ],
    },
    legal: {
      label: "Legal Details",
      icon: <Building2 size={16} />,
      fields: [
        "Legal Name",
        "Website Link",
        "Registration ID",
        "Entity Type",
        "Tax Identifier",
      ],
    },
    payout: {
      label: "Payout System",
      icon: <Wallet size={16} />,
      fields: [
        "Bank Account",
        "Primary UPI ID",
        "Branch / IFSC",
        "Payout Schedule",
      ],
    },
    other: {
      label: "General Help",
      icon: <AlertCircle size={16} />,
      fields: ["UI Improvement", "Feature Request", "System Doubt", "Other"],
    },
  };

  const toggleField = (field: string) => {
    setSelectedFields((prev) => {
      const isSelecting = !prev.includes(field);
      const entry = `${field.toUpperCase()}: `;

      if (isSelecting) {
        setRequestMessage((curr) => {
          if (curr.includes(`${field.toUpperCase()}:`)) return curr;
          return curr ? `${curr}\n${entry}` : entry;
        });
      } else {
        setRequestMessage((curr) => {
          return curr
            .split("\n")
            .filter((line) => !line.includes(`${field.toUpperCase()}:`))
            .join("\n")
            .trim();
        });
      }
      return isSelecting ? [...prev, field] : prev.filter((f) => f !== field);
    });
  };

  const handleSubmit = () => {
    const newId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setRequestId(newId);
    setIsSubmitted(true);
  };

  const resetSupportHub = () => {
    setIsSubmitted(false);
    setRequestCategory(null);
    setSelectedFields([]);
    setRequestId("");
    setRequestMessage("");
  };

  const switchCategory = (id: string | null) => {
    setRequestCategory(id);
    setSelectedFields([]);
    setRequestMessage("");
  };

  const profile = {
    businessName: "Grand Regal Hotel",
    businessType: "Hospitality / 5-Star Hotel",
    registrationId: "REG-99203348",
    taxId: "GST-IN-122930",
    name: "Johnathan Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "Chennai, TN",
    memberSince: "January 2025",
    verificationLevel: "Verified Level III",
    completion: 85,
    bankName: "HDFC Bank",
    accountNumber: "**** 8890",
    upiId: "grandregal@okaxis",
    branch: "Anna Nagar, Chennai",
  };

  const handleViewDocument = (doc: any) => {
    setSelectedFile({
      url: doc.url || "/HungerFree Doc.pdf",
      name: doc.name,
    });
    setIsPreviewOpen(true);
  };

  const handleDownloadDocument = async (doc: any) => {
    const url = doc.url || "/HungerFree Doc.pdf";

    const promise = fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${doc.name.replace(/\s+/g, "_")}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      });

    toast.promise(promise, {
      loading: `Preparing ${doc.name} for download...`,
      success: `${doc.name} downloaded successfully!`,
      error: "Failed to download document. Please try again.",
    });
  };

  const currentPoints = 24500;
  const currentTier =
    INITIAL_TIERS.find((t) => currentPoints >= t.pointsRequired) ||
    INITIAL_TIERS[0];

  const profileStats = [
    {
      label: "Account Status",
      val: "Active",
      trend: "Operational",
      color: "bg-emerald-500",
    },
    {
      label: "Verification",
      val: "Level III",
      trend: "Fully Verified",
      color: "bg-emerald-500",
    },
    {
      label: "Current Tier",
      val: currentTier.name,
      trend: "View Benefits",
      color: "bg-emerald-500",
    },
    {
      label: "Profile Finish",
      val: "85%",
      trend: "Upload Pending",
      color: "bg-slate-500",
    },
  ];

  // Alignment Helpers
  const labelText = "text-[10px] font-black text-slate-400 tracking-[0.1em]";
  const valueText = "text-sm font-bold text-slate-800 tracking-tight";
  const rowItem = "flex items-center gap-3 w-full";
  const sectionGap = "space-y-6";

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col pb-20 font-sans">
      {/* 1. CLEAN HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-28 h-28 rounded-lg border border-slate-200 p-1 bg-white shadow-sm overflow-hidden flex items-center justify-center">
              <img
                src="/hotel_logo1.jpg"
                alt="Logo"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-black tracking-widest rounded-md border border-green-100 flex items-center gap-1.5">
                  <ShieldCheck size={12} /> {profile.verificationLevel}
                </span>
                <span className="text-slate-400 text-[10px] font-bold tracking-widest">
                  Reg Id: {profile.registrationId}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none">
                {profile.businessName}
              </h1>
              <p className="text-slate-500 font-bold text-xs tracking-widest">
                {profile.businessType}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <ResuableButton
              variant="primary"
              onClick={() => {
                resetSupportHub();
                setIsRequestDrawerOpen(true);
              }}
              className="w-full md:w-auto px-8 h-12 rounded-md shadow-sm text-white text-[10px] font-black tracking-widest flex items-center gap-2"
            >
              <ShieldCheck size={16} />
              Request Information Update
            </ResuableButton>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 md:px-8 mt-10 space-y-10">
        {/* 2. STATS GRID */}
        <section>
          <ImpactCards
            data={profileStats}
            orientation="horizontal"
            className="w-full"
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: ENTITY INFORMATION */}
          <aside className="lg:col-span-4 w-full">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden text-start lg:h-[440px] flex flex-col">
              <div className="h-[56px] px-6 bg-slate-50/50 border-b border-slate-100 flex items-center">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <User size={14} className="text-[#22c55e]" /> Contact Details
                </h3>
              </div>
              <div className="p-6 flex-grow overflow-y-auto thin-scrollbar flex flex-col gap-6">
                {/* Primary Contact */}
                <div className="space-y-4">
                  <p className={labelText}>Primary Manager</p>
                  <div className="space-y-2">
                    <div className={rowItem}>
                      <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                        <User size={14} />
                      </div>
                      <span className={valueText}>{profile.name}</span>
                    </div>
                    <div className={rowItem}>
                      <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                        <Mail size={14} />
                      </div>
                      <span
                        className={`${valueText} lowercase decoration-slate-200`}
                      >
                        {profile.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary Contact */}
                <div className="pt-4 border-t border-slate-50 space-y-3">
                  <p className={labelText}>Alternate Contact</p>
                  <div className={rowItem}>
                    <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                      <Phone size={14} />
                    </div>
                    <span className={valueText}>+91 8374653321</span>
                  </div>
                </div>

                {/* Registered Address */}
                <div className="pt-4 border-t border-slate-50 space-y-3">
                  <p className={labelText}>Registered Address</p>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center text-[#22c55e] shrink-0">
                      <MapPin size={14} />
                    </div>
                    <p className="text-[13px] font-bold text-slate-700 leading-relaxed tracking-tight">
                      123 Grand Street, Central District,
                      <br />
                      Chennai, Tamil Nadu, 600001
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: BUSINESS DETAILS */}
          <section className="lg:col-span-8 w-full">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm lg:h-[440px] flex flex-col">
              {/* TABS HEADER: LOCKED HEIGHT FOR PERFECT ALIGNMENT */}
              <div className="h-[56px] px-6 bg-slate-50/50 border-b border-slate-100 flex items-center">
                <div className="flex items-center gap-1 p-1 bg-slate-200/40 rounded-lg">
                  {[
                    { id: "identity", label: "Business Details" },
                    { id: "documents", label: "Verification Vault" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${
                        activeTab === tab.id
                          ? "bg-white text-[#22c55e] shadow-sm border border-slate-100"
                          : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/20"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-7 text-start flex-grow overflow-y-auto thin-scrollbar flex flex-col">
                {activeTab === "identity" && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    {/* SECTION 1: BUSINESS INTELLIGENCE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                      {[
                        {
                          label: "Legal Name",
                          val: `${profile.businessName} Private Limited`,
                          icon: <Building2 size={14} />,
                          span: true,
                          isVerified: true,
                        },
                        {
                          label: "Website",
                          val: "www.grandregal.com",
                          icon: <Globe size={14} />,
                          link: true,
                        },
                        {
                          label: "Registration ID",
                          val: profile.registrationId,
                          icon: <FileText size={14} />,
                        },
                        {
                          label: "Entity Type",
                          val: "Premium Corporate Donor",
                          icon: <Award size={14} />,
                        },
                        {
                          label: "Tax Identifier",
                          val: profile.taxId,
                          icon: <BadgeCheck size={14} />,
                        },
                      ].map((field, i) => (
                        <div
                          key={i}
                          className={`space-y-2 ${field.span ? "md:col-span-2" : ""}`}
                        >
                          <p className={labelText}>{field.label}</p>
                          <div className="flex items-center gap-3 bg-slate-50/50 p-2.5 rounded-md border border-slate-100 hover:border-slate-200 transition-colors">
                            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-white border border-slate-100 text-slate-400">
                              {field.icon}
                            </div>
                            <span
                              className={`${valueText} text-[13px] flex items-center gap-2`}
                            >
                              {field.val}
                              {field.isVerified && (
                                <BadgeCheck
                                  size={14}
                                  className="text-emerald-500"
                                />
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SECTION 2: PAYOUT INTELLIGENCE (WITH HEADING) */}
                    <div className="pt-6 border-t border-slate-100 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#22c55e] border border-emerald-100 shadow-sm">
                          <Wallet size={16} />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                            Payment Details
                          </h4>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                            Your verified bank and UPI accounts
                          </span>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-blue-50/50 rounded-md border border-blue-100">
                          <ShieldCheck size={10} className="text-blue-500" />
                          <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">
                            Verified & Active
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                        {[
                          {
                            label: "Bank Account",
                            val: `${profile.bankName} (***8890)`,
                            icon: <Building2 size={14} />,
                            isSecure: true,
                          },
                          {
                            label: "Primary UPI",
                            val: profile.upiId,
                            icon: <Wallet size={14} />,
                            isSecure: true,
                          },
                        ].map((field, i) => (
                          <div key={i} className="space-y-2">
                            <p className={labelText}>{field.label}</p>
                            <div className="flex items-center gap-3 bg-slate-50/50 p-2.5 rounded-md border border-slate-100 hover:border-slate-200 transition-colors">
                              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-white border border-slate-100 text-slate-400">
                                {field.icon}
                              </div>
                              <span
                                className={`${valueText} text-[13px] flex items-center gap-2`}
                              >
                                {field.val}
                                <ShieldCheck
                                  size={14}
                                  className="text-blue-500"
                                />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <p className={labelText}>Documents</p>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          name: "Business License",
                          status: "Verified",
                          date: "Jan 12, 2025",
                          url: "/HungerFree Doc.pdf",
                        },
                        {
                          name: "Tax Registration",
                          status: "Verified",
                          date: "Jan 12, 2025",
                          url: "/HungerFree Doc.pdf",
                        },
                        {
                          name: "Food Safety Cert",
                          status: "In Review",
                          date: "Pending",
                          url: "/HungerFree Doc.pdf",
                        },
                      ].map((doc, i) => (
                        <div
                          key={i}
                          className="group flex items-center justify-between p-3 bg-slate-50/50 border border-slate-100 rounded-md hover:bg-white hover:border-emerald-200 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                              <FileText size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                                {doc.name}
                              </p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase">
                                Updated: {doc.date}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border transition-colors ${
                                doc.status === "Verified"
                                  ? "bg-green-50 text-green-600 border-green-100"
                                  : "bg-amber-50 text-amber-600 border-amber-100"
                              }`}
                            >
                              {doc.status}
                            </span>

                            <div className="flex items-center gap-0.5 pl-3 border-l border-slate-200">
                              <button
                                onClick={() => handleViewDocument(doc)}
                                title="Quick View"
                                className="p-1.5 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition-all active:scale-90"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={() => handleDownloadDocument(doc)}
                                title="Download Document"
                                className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all active:scale-90"
                              >
                                <Download size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* PAGE FOOTER: GLOBAL ADMIN CONTROL NOTICE */}
        <div className="p-5 bg-amber-50/50 rounded-lg border border-amber-100 flex items-center gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-2.5 bg-white rounded-md border border-amber-200 shadow-inner shrink-0">
            <ShieldCheck size={18} className="text-amber-500" />
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-left uppercase tracking-[0.2em] text-amber-900">
              Security Note
            </h4>
            <p className="text-[11px] font-bold text-amber-800/80 leading-relaxed tracking-tight">
              To keep your account safe, changes to Bank or Legal details need
              admin approval. Most requests are reviewed within 24 hours.
            </p>
          </div>
        </div>
      </main>

      {/* SUPPORT & COMPLIANCE DRAWER */}
      <ResuableDrawer
        isOpen={isRequestDrawerOpen}
        onClose={() => setIsRequestDrawerOpen(false)}
        title="Support & Compliance Hub"
        subtitle="Manage secure inquiries and information update requests"
        size="md"
      >
        <div className="p-8 h-full flex flex-col">
          {isSubmitted ? (
            /* SUCCESS FEEDBACK VIEW */
            <div className="flex-grow flex flex-col items-center justify-center space-y-6 animate-in zoom-in-95 fade-in duration-500">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center animate-bounce duration-1000">
                  <BadgeCheck size={40} className="text-[#22c55e]" />
                </div>
                <div className="absolute top-0 right-0 w-5 h-5 bg-[#22c55e] border-4 border-white rounded-full flex items-center justify-center">
                  <ShieldCheck size={8} className="text-white" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">
                  Request Dispatched
                </h3>
                <p className="text-xs font-bold text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                  Your verification request has been successfully sent to the
                  compliance admin.
                </p>
              </div>

              <div className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Reference ID
                    </span>
                    <span className="text-[11px] font-black text-slate-900 font-mono">
                      {requestId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Estimated Review
                    </span>
                    <span className="text-[11px] font-black text-[#22c55e]">
                      12 - 24 Hours
                    </span>
                  </div>
                </div>

                {/* Message Summary Receipt */}
                <div className="pt-3 border-t border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                      Message Sent
                    </span>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="flex items-center gap-1 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all"
                      title="Edit Message"
                    >
                      <Edit size={10} />
                      Edit
                    </button>
                  </div>
                  <div className="max-h-28 overflow-y-auto thin-scrollbar p-3 bg-white/50 border border-slate-200/50 rounded-lg">
                    <pre className="text-[10px] font-bold text-slate-600 whitespace-pre-wrap leading-relaxed">
                      {requestMessage || "No additional message provided."}
                    </pre>
                  </div>
                </div>
              </div>

              <ResuableButton
                variant="primary"
                className="w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]"
                onClick={() => {
                  setIsRequestDrawerOpen(false);
                  resetSupportHub();
                }}
              >
                Return to Dashboard
              </ResuableButton>
            </div>
          ) : (
            /* ACTIVE FORM VIEW */
            <div className="space-y-6 flex-grow">
              {/* Header Note */}
              <div className="flex items-start gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                <div className="p-1.5 bg-white rounded-md border border-blue-200 shrink-0">
                  <MessageSquare size={14} className="text-blue-500" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-blue-900">
                    Direct Compliance Channel
                  </h4>
                  <p className="text-[10px] font-bold text-blue-800/70 leading-relaxed tracking-tight">
                    For security reasons, changing legal identifiers or payout
                    methods requires manual validation by our auditing team.
                  </p>
                </div>
              </div>

              {!requestCategory ? (
                /* CATEGORY GRID VIEW */
                <div className="space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                    What do you need help with?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(CATEGORIES_CONFIG).map(([id, item]) => (
                      <button
                        key={id}
                        onClick={() => switchCategory(id)}
                        className="flex flex-col items-center justify-center h-28 bg-white border border-slate-100 rounded-xl hover:border-[#22c55e]/50 hover:bg-slate-50 transition-all group shadow-sm active:scale-95"
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#22c55e] transition-colors mb-2">
                          {item.icon}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 text-center px-3">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* SUB-FIELD SELECTION VIEW */
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Select fields to update:
                    </p>
                    <button
                      onClick={() => switchCategory(null)}
                      className="text-[8px] font-black uppercase tracking-widest text-[#22c55e] hover:underline"
                    >
                      Change Category
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES_CONFIG[requestCategory].fields.map((field) => {
                      const isSelected = selectedFields.includes(field);
                      return (
                        <button
                          key={field}
                          onClick={() => toggleField(field)}
                          className={`w-full h-9 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border text-center truncate ${
                            isSelected
                              ? "bg-[#22c55e] text-white border-[#22c55e] shadow-md shadow-emerald-500/20"
                              : "bg-white text-slate-500 border-slate-100 hover:border-slate-300"
                          }`}
                        >
                          {field}
                        </button>
                      );
                    })}
                  </div>

                  {/* Message Area */}
                  <div className="space-y-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Request Details & Inquiries
                    </p>
                    <div className="relative group">
                      <textarea
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        placeholder={
                          selectedFields.length > 0
                            ? `Please describe the changes for: ${selectedFields.join(
                                ", ",
                              )}`
                            : "Please provide more details about your request..."
                        }
                        className="w-full h-32 p-4 bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] text-xs font-bold text-slate-800 placeholder:text-slate-400 resize-none transition-all thin-scrollbar"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Action */}
              <div className="pt-2">
                <ResuableButton
                  variant="primary"
                  disabled={!requestCategory}
                  className={`w-full h-10 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg transition-all ${
                    requestCategory
                      ? "shadow-emerald-500/20"
                      : "opacity-50 grayscale cursor-not-allowed"
                  }`}
                  onClick={handleSubmit}
                >
                  Submit Verification Request
                </ResuableButton>
                <p className="text-center mt-3 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                  Standard review time: 12 - 24 business hours
                </p>
              </div>
            </div>
          )}
        </div>
      </ResuableDrawer>

      <FilePreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        file={selectedFile?.url || null}
        fileName={selectedFile?.name}
      />
    </div>
  );
};

export default DonorProfile;
