import React, { useState } from "react";
import {
  MoveLeft,
  Users,
  CheckCircle2,
  XCircle,
  Eye,
  Mail,
  Phone,
  MapPin,
  ClipboardList,
  Target,
  CreditCard,
  Gift,
  Settings2,
  UserCog,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@heroui/react";
import ReusableTable from "../../../../global/components/resuable-components/table";
import { toast } from "sonner";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import DocumentPreviewModal from "../../../../global/components/resuable-components/DocumentPreviewModal";

const DonorEnquiryPage = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const navigate = useNavigate();
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<{
    name: string;
    type: string;
    issuer?: string;
  } | null>(null);

  // Mock data for Donor Registration/Verification Enquiries
  const [enquiries, setEnquiries] = useState([
    {
      id: "DON-201",
      name: "Global Tech Corp",
      type: "Corporate",
      email: "csr@globaltech.com",
      phone: "+91 88776 65544",
      city: "Bangalore",
      status: "Pending Verification",
      time: "1 hour ago",
      priority: "high",
      appliedDate: "Feb 18, 2026",
      taxId: "PAN-CVB1234F",
    },
    {
      id: "DON-205",
      name: "Dr. Sarah Smith",
      type: "Individual",
      email: "sarah.smith@email.com",
      phone: "+91 77665 54433",
      city: "Chennai",
      status: "Pending Verification",
      time: "5 hours ago",
      priority: "medium",
      appliedDate: "Feb 18, 2026",
      taxId: "PAN-SHK9988G",
    },
  ]);

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "DONOR NAME", uid: "name", sortable: true },
    { name: "TYPE", uid: "type" },
    { name: "LOCATION", uid: "city" },
    { name: "PRIORITY", uid: "priority" },
    { name: "APPLIED", uid: "time" },
    { name: "ACTION", uid: "actions" },
  ];

  const handleApprove = (id: string, name: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    toast.success(`${name} has been verified and onboarded!`);
    setIsDrawerOpen(false);
  };

  const handleReject = (id: string, name: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    toast.error(`${name} verification has been rejected.`);
    setIsDrawerOpen(false);
  };

  const renderCell = (item: any, columnKey: React.Key) => {
    const value = item[columnKey as string];

    switch (columnKey) {
      case "id":
        return (
          <span className="font-black text-[10px] tracking-widest text-slate-400">
            {value}
          </span>
        );
      case "name":
        return (
          <div className="flex flex-col">
            <span
              className="font-bold text-sm tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {value}
            </span>
            <span
              className="text-[10px] font-bold opacity-50 uppercase tracking-widest"
              style={{ color: "var(--text-secondary)" }}
            >
              ID: {item.taxId}
            </span>
          </div>
        );
      case "priority":
        return (
          <span
            className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
              value === "high"
                ? "bg-red-500/10 border-red-500/20 text-red-500"
                : value === "medium"
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-500"
            }`}
          >
            {value}
          </span>
        );
      case "actions":
        return (
          <button
            onClick={() => {
              setSelectedEnquiry(item);
              setIsDrawerOpen(true);
            }}
            className="p-2 hover:bg-hf-green/10 rounded-lg text-hf-green transition-colors group"
          >
            <Eye
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        );
      default:
        return (
          <span
            className="text-xs font-bold"
            style={{ color: "var(--text-secondary)" }}
          >
            {value}
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-8 p-4 md:p-8">
      {/* Header */}
      {!hideHeader && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
            style={{ color: "var(--text-primary)" }}
          >
            <MoveLeft size={14} /> Back to Dashboard
          </button>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1
                className="text-3xl font-black uppercase tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Donor Enquiries
              </h1>
              <p
                className="text-[11px] font-black uppercase tracking-widest opacity-40"
                style={{ color: "var(--text-secondary)" }}
              >
                Onboarding & Compliance Management
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Section */}
      <div className="w-full">
        <Tabs
          aria-label="Donor Enquiries"
          variant="underlined"
          classNames={{
            base: "w-full",
            tabList:
              "gap-8 w-full relative rounded-none p-0 border-b border-[var(--border-color)]",
            cursor: "w-full bg-hf-green h-0.5",
            tab: "max-w-fit px-0 h-12",
            tabContent:
              "group-data-[selected=true]:text-hf-green font-black uppercase tracking-widest text-[10px]",
          }}
        >
          <Tab
            key="onboarding"
            title={
              <div className="flex items-center gap-2">
                <Target size={14} />
                <span>New Donors</span>
                <span className="px-1.5 py-0.5 rounded bg-hf-green/10 text-hf-green text-[8px] ml-1">
                  {enquiries.length}
                </span>
              </div>
            }
          >
            <div
              className="mt-6 rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              <ReusableTable
                data={enquiries}
                columns={columns}
                renderCell={renderCell}
              />
            </div>
          </Tab>

          <Tab
            key="rewards"
            title={
              <div className="flex items-center gap-2">
                <Gift size={14} />
                <span>Rewards Pending</span>
              </div>
            }
          >
            <div className="mt-12 flex flex-col items-center justify-center p-20 opacity-30 border border-dashed rounded-3xl">
              <Gift size={48} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                No Donor Reward Claims
              </p>
            </div>
          </Tab>

          <Tab
            key="payments"
            title={
              <div className="flex items-center gap-2">
                <CreditCard size={14} />
                <span>Payments Pending</span>
              </div>
            }
          >
            <div className="mt-12 flex flex-col items-center justify-center p-20 opacity-30 border border-dashed rounded-3xl">
              <CreditCard size={48} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                No High-Value Payment Flags
              </p>
            </div>
          </Tab>

          <Tab
            key="dropdowns"
            title={
              <div className="flex items-center gap-2">
                <Settings2 size={14} />
                <span>Dropdown Requests</span>
              </div>
            }
          >
            <div className="mt-12 flex flex-col items-center justify-center p-20 opacity-30 border border-dashed rounded-3xl">
              <Settings2 size={48} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                No Master Option Requests
              </p>
            </div>
          </Tab>

          <Tab
            key="profile"
            title={
              <div className="flex items-center gap-2">
                <UserCog size={14} />
                <span>Profile Changes</span>
              </div>
            }
          >
            <div className="mt-12 flex flex-col items-center justify-center p-20 opacity-30 border border-dashed rounded-3xl">
              <UserCog size={48} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                No Donor Profile Update Requests
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Detail Drawer */}
      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Donor Verification"
        subtitle={selectedEnquiry?.id}
        size="md"
      >
        {selectedEnquiry && (
          <div className="space-y-8 px-6 pb-20">
            {/* Donor Card */}
            <div
              className="p-6 rounded-2xl border bg-slate-500/5 text-center"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="w-20 h-20 rounded-full bg-hf-green/10 border border-hf-green/20 flex items-center justify-center text-hf-green mx-auto mb-4">
                <Users size={40} />
              </div>
              <h3
                className="text-2xl font-black uppercase tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {selectedEnquiry.name}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-hf-green mt-1 block">
                {selectedEnquiry.type} Profile
              </span>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-4">
                <h4
                  className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30"
                  style={{ color: "var(--text-primary)" }}
                >
                  Contact Details
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl border"
                    style={{
                      borderColor: "var(--border-color)",
                      backgroundColor: "var(--bg-secondary)",
                    }}
                  >
                    <Mail size={16} className="text-slate-400" />
                    <span
                      className="text-xs font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedEnquiry.email}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl border"
                    style={{
                      borderColor: "var(--border-color)",
                      backgroundColor: "var(--bg-secondary)",
                    }}
                  >
                    <Phone size={16} className="text-slate-400" />
                    <span
                      className="text-xs font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedEnquiry.phone}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl border"
                    style={{
                      borderColor: "var(--border-color)",
                      backgroundColor: "var(--bg-secondary)",
                    }}
                  >
                    <MapPin size={16} className="text-slate-400" />
                    <span
                      className="text-xs font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedEnquiry.city}, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Document Review Section */}
              <div className="space-y-4 pt-4">
                <h4
                  className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30"
                  style={{ color: "var(--text-primary)" }}
                >
                  Verify Documents
                </h4>
                <div className="space-y-3">
                  <div
                    className="p-4 rounded-2xl border border-dashed flex items-center justify-between"
                    style={{
                      borderColor: "var(--border-color)",
                      backgroundColor: "var(--bg-secondary)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center">
                        <ClipboardList size={20} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">
                          {selectedEnquiry.type === "Corporate"
                            ? "CSR Policy / Certificate"
                            : "ID Proof (PAN/Aadhar)"}
                        </p>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">
                          {selectedEnquiry.type === "Corporate"
                            ? "Business Compliance"
                            : "KYC Document"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setPreviewDoc({
                            name:
                              selectedEnquiry.type === "Corporate"
                                ? "CSR Policy / Certificate"
                                : "ID Proof (PAN/Aadhar)",
                            type:
                              selectedEnquiry.type === "Corporate"
                                ? "Business Compliance"
                                : "KYC Document",
                            issuer:
                              selectedEnquiry.type === "Corporate"
                                ? "Ministry of Corporate Affairs"
                                : "UIDAI / Income Tax Dept.",
                          })
                        }
                        className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-hf-green hover:bg-hf-green/10 transition-colors cursor-pointer"
                      >
                        View
                      </button>
                      <span className="opacity-20 text-xs">|</span>
                      <button
                        onClick={() =>
                          setPreviewDoc({
                            name:
                              selectedEnquiry.type === "Corporate"
                                ? "CSR Policy / Certificate"
                                : "ID Proof (PAN/Aadhar)",
                            type:
                              selectedEnquiry.type === "Corporate"
                                ? "Business Compliance"
                                : "KYC Document",
                            issuer:
                              selectedEnquiry.type === "Corporate"
                                ? "Ministry of Corporate Affairs"
                                : "UIDAI / Income Tax Dept.",
                          })
                        }
                        className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-500/10 hover:text-hf-green transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download size={11} /> PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4
                  className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30"
                  style={{ color: "var(--text-primary)" }}
                >
                  Compliance Information
                </h4>
                <div
                  className="p-4 rounded-xl border bg-slate-500/5"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Tax ID / PAN
                    </span>
                    <span className="text-xs font-bold font-mono">
                      {selectedEnquiry.taxId}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="flex gap-3 pt-8 border-t border-dashed"
              style={{ borderColor: "var(--border-color)" }}
            >
              <button
                onClick={() =>
                  handleApprove(selectedEnquiry.id, selectedEnquiry.name)
                }
                className="flex-1 py-4 bg-hf-green text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-lg shadow-hf-green/20"
              >
                <CheckCircle2 size={16} /> Verify Donor
              </button>
              <button
                onClick={() =>
                  handleReject(selectedEnquiry.id, selectedEnquiry.name)
                }
                className="px-6 py-4 border-2 border-red-500/20 text-red-500 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:bg-red-500/5 transition-colors"
              >
                <XCircle size={16} /> Reject
              </button>
            </div>
          </div>
        )}
      </ResuableDrawer>

      {/* Document Preview Modal */}
      {previewDoc && (
        <DocumentPreviewModal
          isOpen={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
          documentName={previewDoc.name}
          documentType={previewDoc.type}
          issuer={previewDoc.issuer}
          issuedDate="Feb 2026"
        />
      )}
    </div>
  );
};

export default DonorEnquiryPage;
