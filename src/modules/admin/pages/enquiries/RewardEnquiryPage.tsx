import React, { useState } from "react";
import {
  MoveLeft,
  Gift,
  CheckCircle2,
  XCircle,
  Eye,
  User,
  History,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@heroui/react";
import ReusableTable from "../../../../global/components/resuable-components/table";
import { toast } from "sonner";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";

const RewardEnquiryPage = ({
  hideHeader = false,
}: {
  hideHeader?: boolean;
}) => {
  const navigate = useNavigate();
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Mock data for Reward Redemption Enquiries
  const [enquiries, setEnquiries] = useState([
    {
      id: "RWD-443",
      name: "Elite Membership",
      user: "Amit Sharma",
      userType: "Volunteer",
      points: "5,000",
      status: "Approval Required",
      time: "Yesterday",
      priority: "low",
      appliedDate: "Feb 17, 2026",
      category: "Lifestyle",
      userPointsBalance: "7,800",
    },
    {
      id: "RWD-450",
      name: "Jackpot Prize",
      user: "Green Harvest NGO",
      userType: "NGO",
      points: "15,000",
      status: "Awaiting Admin",
      time: "4 hours ago",
      priority: "high",
      appliedDate: "Feb 18, 2026",
      category: "Grant",
      userPointsBalance: "16,200",
    },
  ]);

  const columns = [
    { name: "REQ ID", uid: "id", sortable: true },
    { name: "REWARD ITEM", uid: "name", sortable: true },
    { name: "USER", uid: "user" },
    { name: "POINTS", uid: "points" },
    { name: "PRIORITY", uid: "priority" },
    { name: "TIME", uid: "time" },
    { name: "ACTION", uid: "actions" },
  ];

  const handleApprove = (id: string, name: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    toast.success(`Redemption for ${name} has been approved!`);
    setIsDrawerOpen(false);
  };

  const handleReject = (id: string, name: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    toast.error(`Redemption for ${name} was rejected. Points refunded.`);
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
              {item.category}
            </span>
          </div>
        );
      case "user":
        return (
          <div className="flex flex-col">
            <span
              className="font-bold text-xs"
              style={{ color: "var(--text-primary)" }}
            >
              {value}
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">
              {item.userType}
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
                Reward Claims
              </h1>
              <p
                className="text-[11px] font-black uppercase tracking-widest opacity-40"
                style={{ color: "var(--text-secondary)" }}
              >
                Benefit & Points Redemption Management
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Section */}
      <div className="w-full">
        <Tabs
          aria-label="Reward Enquiries"
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
            key="redemptions"
            title={
              <div className="flex items-center gap-2">
                <Gift size={14} />
                <span>Pending Claims</span>
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
            key="points"
            title={
              <div className="flex items-center gap-2">
                <TrendingUp size={14} />
                <span>Points Disputes</span>
              </div>
            }
          >
            <div className="mt-12 flex flex-col items-center justify-center p-20 opacity-30 border border-dashed rounded-3xl">
              <TrendingUp size={48} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                No Active Points Disputes
              </p>
            </div>
          </Tab>

          <Tab
            key="history"
            title={
              <div className="flex items-center gap-2">
                <History size={14} />
                <span>Settled Claims</span>
              </div>
            }
          >
            <div className="mt-12 flex flex-col items-center justify-center p-20 opacity-30 border border-dashed rounded-3xl">
              <History size={48} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                No History Records
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Detail Drawer */}
      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Claim Verification"
        subtitle={selectedEnquiry?.id}
        size="md"
      >
        {selectedEnquiry && (
          <div className="space-y-8 px-6 pb-20">
            {/* Reward Card */}
            <div
              className="p-6 rounded-2xl border bg-slate-500/5 text-center"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="w-20 h-20 rounded-2xl bg-hf-green/10 border border-hf-green/20 flex items-center justify-center text-hf-green mx-auto mb-4">
                <Gift size={32} />
              </div>
              <h3
                className="text-xl font-black uppercase tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {selectedEnquiry.name}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-hf-green mt-1 block">
                Points Cost: {selectedEnquiry.points}
              </span>
            </div>

            {/* User Info */}
            <div
              className="p-5 rounded-2xl border bg-slate-500/5"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs font-bold">{selectedEnquiry.user}</p>
                    <p className="text-[9px] font-black opacity-40 uppercase">
                      {selectedEnquiry.userType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black opacity-40 uppercase">
                    Points Balance
                  </p>
                  <p className="text-xs font-black text-hf-green">
                    {selectedEnquiry.userPointsBalance} pts
                  </p>
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
                <CheckCircle2 size={16} /> Approve Claim
              </button>
              <button
                onClick={() =>
                  handleReject(selectedEnquiry.id, selectedEnquiry.name)
                }
                className="px-6 py-4 border-2 border-red-500/20 text-red-500 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:bg-red-500/5 transition-colors"
              >
                <XCircle size={16} /> Deny Claim
              </button>
            </div>
          </div>
        )}
      </ResuableDrawer>
    </div>
  );
};

export default RewardEnquiryPage;
