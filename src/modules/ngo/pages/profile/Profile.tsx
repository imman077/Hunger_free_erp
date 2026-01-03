import { useState, useRef, useEffect } from "react";
import { Icon } from "../../../../global/components/resuable-components/Icon";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ReusableButton from "../../../../global/components/resuable-components/button";
import ResuableModal from "../../../../global/components/resuable-components/modal";

const NGOProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Green Harvest NGO",
    email: "contact@greenharvest.org",
    phone: "+1 555 123 4567",
    registrationId: "NGO-8823-XYZ-2025",
    location: "New York, NY",
    description:
      "Dedicated to reducing food waste and hunger by connecting local donors with those in need. Operating since 2018 with a network of over 200 volunteers.",
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const impactData = [
    {
      label: "Total Donations",
      val: "850",
      trend: "Received this year",
      color: "bg-[#22c55e]",
    },
    {
      label: "Beneficiaries",
      val: "2.4K",
      trend: "People helped",
      color: "bg-[#22c55e]",
    },
    {
      label: "Active Needs",
      val: "12",
      trend: "Current requests",
      color: "bg-blue-500",
    },
    {
      label: "Volunteers",
      val: "200+",
      trend: "Network size",
      color: "bg-purple-500",
    },
  ];

  const activities = [
    {
      title: "Donation Received",
      time: "2 hours ago",
      desc: "Received 50kg of rice from Hotel Grand.",
      type: "donation",
    },
    {
      title: "Need Fulfilled",
      time: "Yesterday",
      desc: "Baby Food & Formula request completed.",
      type: "milestone",
    },
    {
      title: "Profile Updated",
      time: "3 days ago",
      desc: "Updated contact information and location.",
      type: "update",
    },
  ];

  // Document Management State
  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Tax Exempt Certificate.pdf",
      type: "Tax Exempt Certificate",
      status: "VERIFIED",
      uploadedAt: new Date("2024-03-15"),
      aiFeedback: "Document validated with high confidence.",
    },
    {
      id: "2",
      name: "Operating License.pdf",
      type: "Operating License",
      status: "VERIFIED",
      uploadedAt: new Date("2024-03-10"),
      aiFeedback: "Entity active. License verified.",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleDeleteDoc = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleUploadDoc = (file: File, type: string) => {
    setIsModalOpen(false);
    setIsVerifying(true);

    const newDoc = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: type,
      status: "ANALYZING",
      uploadedAt: new Date(),
      aiFeedback: "Gemini is analyzing your document...",
    };

    setDocuments((prev) => [newDoc, ...prev]);

    // Simulate verification delay
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === newDoc.id
            ? {
                ...doc,
                status: "VERIFIED",
                aiFeedback: "Document verified successfully!",
              }
            : doc
        )
      );
      setIsVerifying(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="relative h-64 bg-[#15803d] overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full text-white">
            <div className="relative group">
              <div className="w-32 h-32 rounded-sm overflow-hidden border-2 border-white/50 group-hover:scale-105 transition-transform duration-300 bg-[#22c55e] flex items-center justify-center">
                <span className="text-5xl font-black text-white">GH</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#22c55e] text-white p-2 rounded-sm border-2 border-white">
                <Icon name="verified" className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left mb-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                <h1 className="text-3xl font-black tracking-tight">
                  {profile.name}
                </h1>
                <span className="px-3 py-1 bg-[#16a34a] rounded-sm text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  Certified Partner
                </span>
              </div>
              <p className="text-[#ecfdf5]/80 font-medium flex items-center justify-center md:justify-start gap-2">
                <Icon name="office" className="w-4 h-4" />
                {profile.location}
              </p>
            </div>

            <ReusableButton
              variant={isEditing ? "primary" : "ghost"}
              size="md"
              onClick={handleEditToggle}
              className={
                isEditing
                  ? ""
                  : "!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
              }
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </ReusableButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 pb-12">
        {/* Impact Cards */}
        <div className="mb-8">
          <ImpactCards data={impactData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white border border-gray-100 rounded-sm p-10">
              <h2 className="text-xl font-black text-gray-900 tracking-tight mb-10 flex items-center justify-start gap-3">
                <Icon name="id-card" className="w-5 h-5 text-[#22c55e]" />
                Organization Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                <div className="text-center md:text-center flex flex-col items-center">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Organization Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm text-center focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                    />
                  ) : (
                    <p className="text-gray-900 font-black text-lg">
                      {profile.name}
                    </p>
                  )}
                </div>

                <div className="text-center flex flex-col items-center">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Registration ID
                  </label>
                  <p className="text-gray-500 font-bold text-sm">
                    {profile.registrationId}
                  </p>
                </div>

                <div className="text-center flex flex-col items-center">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm text-center focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                    />
                  ) : (
                    <p className="text-gray-900 font-black text-lg">
                      {profile.email}
                    </p>
                  )}
                </div>

                <div className="text-center flex flex-col items-center">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-none text-center focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                    />
                  ) : (
                    <p className="text-gray-900 font-black text-lg">
                      {profile.phone}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 text-center flex flex-col items-center">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-none text-center focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                    />
                  ) : (
                    <p className="text-gray-900 font-black text-lg">
                      {profile.location}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 text-center flex flex-col items-center">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Organization Description
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profile.description}
                      onChange={(e) =>
                        setProfile({ ...profile, description: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm text-center focus:outline-none focus:ring-1 focus:ring-[#22c55e] resize-none"
                    />
                  ) : (
                    <p className="text-gray-900 font-black leading-relaxed max-w-2xl">
                      {profile.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Vault: Verification Documents UI */}
            <div className="bg-white rounded-sm shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/40 mt-8">
              <div className="p-7 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-sm bg-[#22c55e] flex items-center justify-center text-white shadow-md shadow-[#d1fae5]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="text-start">
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                      Documents
                    </h1>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Verification & Credentials
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center text-[9px] font-bold text-[#16a34a] bg-[#ecfdf5]/50 px-2.5 py-1.5 rounded-sm uppercase tracking-widest border border-[#d1fae5]/50">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#22c55e] mr-2 animate-pulse"></span>
                  Verified
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {documents.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-sm flex items-center justify-center mx-auto mb-4 text-slate-200">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700">
                      Storage empty
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5">
                      Upload a document to begin analysis.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <DocumentCard
                        key={doc.id}
                        doc={doc}
                        onDelete={handleDeleteDoc}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={isVerifying}
                    className="group relative inline-flex items-center justify-center px-8 py-3.5 font-bold text-slate-500 bg-white border border-slate-200 rounded-sm transition-all duration-300 hover:text-[#16a34a] hover:bg-[#ecfdf5] hover:border-[#d1fae5] hover:shadow-lg hover:shadow-[#ecfdf5] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 mr-2.5 group-hover:rotate-90 transition-transform duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="tracking-widest uppercase text-[10px]">
                      Add Document
                    </span>
                  </button>
                </div>
              </div>

              {/* <div className="px-8 py-4 bg-slate-50/30 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 font-medium">
                <p>Gemini AI Vision Powered</p>
                <div className="hidden sm:flex items-center space-x-3">
                  <a href="#" className="hover:text-slate-600">
                    Privacy
                  </a>
                  <span className="text-slate-200">•</span>
                  <a href="#" className="hover:text-slate-600">
                    Security
                  </a>
                </div>
              </div> */}
            </div>
          </div>

          <UploadModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpload={handleUploadDoc}
          />

          {isVerifying && (
            <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3.5 rounded-sm shadow-2xl flex items-center space-x-3 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="w-4 h-4 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-bold tracking-wide">
                Analyzing...
              </span>
            </div>
          )}

          {/* Right Column - Activity Timeline */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-sm p-10 sticky top-6">
              <h2 className="text-xl font-black text-gray-900 tracking-tight mb-10">
                Recent Activity
              </h2>

              <div className="space-y-12 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />
                {activities.map((activity, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#22c55e] border-2 border-white z-10" />
                    <div className="text-center">
                      <h3 className="font-black text-gray-900 text-sm mb-1 uppercase tracking-tight">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        {activity.desc}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-black">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for Vault UI ---

const DocumentCard = ({
  doc,
  onDelete,
}: {
  doc: any;
  onDelete: (id: string) => void;
}) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "bg-[#ecfdf5] text-[#16a34a] border-[#d1fae5]";
      case "REJECTED":
        return "bg-rose-50 text-rose-600 border-rose-100";
      case "ANALYZING":
        return "bg-blue-50 text-blue-600 border-blue-100 animate-pulse";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="group relative flex items-center justify-between p-4 bg-white border border-slate-100 rounded-sm transition-all duration-300 hover:shadow-md hover:shadow-slate-100/50 hover:border-[#d1fae5]">
      <div className="flex items-center space-x-4">
        <div
          className={`w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0 ${
            doc.status === "REJECTED" ? "bg-rose-50" : "bg-[#ecfdf5]"
          }`}
        >
          <svg
            className={`w-5 h-5 ${
              doc.status === "REJECTED" ? "text-rose-500" : "text-[#22c55e]"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="min-w-0 text-start">
          <h3 className="text-[15px] font-bold text-slate-800 leading-tight truncate">
            {doc.name}
          </h3>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest truncate max-w-[120px]">
              {doc.type}
            </span>
            <span className="text-slate-200">•</span>
            <span className="text-[10px] text-slate-400 font-medium">
              {new Date(doc.uploadedAt).toLocaleDateString()}
            </span>
          </div>
          {doc.aiFeedback && (
            <p className="text-[10px] text-slate-500 mt-1.5 italic line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">
              {doc.aiFeedback}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3 flex-shrink-0">
        <div
          className={`px-2.5 py-1 rounded-sm text-[9px] font-bold tracking-widest border ${getStatusStyles(
            doc.status
          )}`}
        >
          {doc.status}
        </div>

        <button
          onClick={() => onDelete(doc.id)}
          className="p-1.5 text-slate-300 hover:text-rose-500 transition-all rounded-sm hover:bg-rose-50 sm:opacity-0 group-hover:opacity-100"
          title="Remove"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const DOC_TYPES = [
  "Tax Exempt Certificate",
  "Operating License",
  "Certification",
  "Identity Proof",
  "Other",
];

const UploadModal = ({
  isOpen,
  onClose,
  onUpload,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, type: string) => void;
}) => {
  const [selectedType, setSelectedType] = useState(DOC_TYPES[0]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0], selectedType);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0], selectedType);
    }
  };

  return (
    <ResuableModal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="Add Document"
      subtitle="Select classification & upload"
      size="md"
      scrollBehavior="inside"
      classNames={{
        base: "!rounded-sm border border-white/20 shadow-2xl overflow-hidden !max-w-3xl !max-h-[85vh]",
        header: "px-6 py-4 !border-slate-50",
        body: "px-6 py-6 !bg-white custom-scrollbar",
        footer: "px-6 py-4 !bg-slate-50/80 !border-slate-100",
      }}
      // footerLeft={
      //   <div className="flex items-center space-x-4">
      //     <div className="flex -space-x-2.5">
      //       <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden text-slate-400 shadow-sm">
      //         <Icon name="user" className="w-4 h-4" />
      //       </div>
      //       <div className="w-9 h-9 rounded-full border-2 border-white bg-[#ecfdf5] flex items-center justify-center text-[#22c55e] shadow-sm">
      //         <Icon name="verified" className="w-4 h-4" />
      //       </div>
      //     </div>
      //     {/* <div className="text-start">
      //       <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
      //         AI Verification
      //       </span>
      //       <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none mt-1 inline-block">
      //         Powered by Gemini
      //       </span>
      //     </div> */}
      //   </div>
      // }
      footer={
        <button
          onClick={onClose}
          className="px-6 py-2.5 text-[10px] font-black text-slate-500 hover:text-slate-800 uppercase tracking-[0.2em] transition-all hover:bg-slate-100 rounded-sm"
        >
          Cancel
        </button>
      }
    >
      <div className="space-y-6">
        <section className="text-start">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Classification
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DOC_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-3 rounded-sm text-left text-xs font-black transition-all border flex items-center justify-between group/btn ${
                  selectedType === type
                    ? "border-[#22c55e] bg-[#ecfdf5] text-[#15803d] shadow-sm shadow-emerald-100"
                    : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200 hover:bg-white"
                }`}
              >
                <span className="truncate">{type}</span>
                {selectedType === type && (
                  <div className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="text-start">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            File Upload
          </label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`group relative border-2 border-dashed rounded-sm p-8 flex flex-col items-center justify-center transition-all duration-300 min-h-[180px] ${
              dragActive
                ? "border-[#22c55e] bg-[#ecfdf5] scale-[0.98] shadow-inner"
                : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100/50"
            }`}
          >
            <div
              className={`w-20 h-20 rounded-sm flex items-center justify-center mb-6 transition-all duration-500 ${
                dragActive
                  ? "bg-[#22c55e] text-white rotate-12 scale-110"
                  : "bg-white text-slate-300 shadow-sm group-hover:text-[#22c55e] group-hover:scale-110"
              }`}
            >
              <svg
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-slate-800">
                Drop file or browse
              </p>
              <p className="text-[10px] text-slate-400 mt-3 font-black uppercase tracking-[0.2em]">
                PDF, JPG, PNG • Max 10MB
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleChange}
              accept="image/*,application/pdf"
            />
          </div>
        </section>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </ResuableModal>
  );
};

export default NGOProfile;
