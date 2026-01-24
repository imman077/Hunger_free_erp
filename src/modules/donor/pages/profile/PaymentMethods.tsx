import { useState } from "react";
import {
  Building2,
  QrCode,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  ShieldCheck,
  Landmark,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableModal from "../../../../global/components/resuable-components/modal";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";

interface BankAccount {
  id: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  isPrimary: boolean;
  isVerified: boolean;
}

interface UpiId {
  id: string;
  vpa: string;
  label: string;
  isPrimary: boolean;
  isVerified: boolean;
}

const PaymentMethods = () => {
  const [activeTab, setActiveTab] = useState<"bank" | "upi">("bank");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [methodType, setMethodType] = useState<"bank" | "upi">("bank");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Mock Data
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "HDFC BANK",
      accountHolder: "JOHN DOE",
      accountNumber: "**** **** 4590",
      ifscCode: "HDFC0001234",
      isPrimary: true,
      isVerified: true,
    },
    {
      id: "2",
      bankName: "ICICI BANK",
      accountHolder: "JOHN DOE",
      accountNumber: "**** **** 8821",
      ifscCode: "ICIC0005566",
      isPrimary: false,
      isVerified: false,
    },
  ]);

  const [upiIds, setUpiIds] = useState<UpiId[]>([
    {
      id: "1",
      vpa: "johndoe@okaxis",
      label: "PRIMARY UPI",
      isPrimary: true,
      isVerified: true,
    },
    {
      id: "2",
      vpa: "johndoe.hdfc@okicici",
      label: "SECONDARY UPI",
      isPrimary: false,
      isVerified: true,
    },
  ]);

  // Form States
  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    isPrimary: false,
  });

  const [upiForm, setUpiForm] = useState({
    vpa: "",
    label: "",
    isPrimary: false,
  });

  const handleAddBank = () => {
    setMethodType("bank");
    setBankForm({
      bankName: "",
      accountHolder: "",
      accountNumber: "",
      ifscCode: "",
      isPrimary: bankAccounts.length === 0,
    });
    setIsModalOpen(true);
  };

  const handleAddUpi = () => {
    setMethodType("upi");
    setUpiForm({
      vpa: "",
      label: "",
      isPrimary: upiIds.length === 0,
    });
    setIsModalOpen(true);
  };

  const saveBank = () => {
    const newBank: BankAccount = {
      id: Math.random().toString(36).substr(2, 9),
      ...bankForm,
      isVerified: false,
    };
    if (newBank.isPrimary) {
      setBankAccounts(
        [...bankAccounts, newBank].map((b) => ({
          ...b,
          isPrimary: b.id === newBank.id,
        })),
      );
    } else {
      setBankAccounts([...bankAccounts, newBank]);
    }
    setIsModalOpen(false);
    toast.success("Bank Account Added", {
      description: `${bankForm.bankName} has been linked.`,
    });
    setBankForm({
      bankName: "",
      accountHolder: "",
      accountNumber: "",
      ifscCode: "",
      isPrimary: false,
    });
  };

  const saveUpi = () => {
    const newUpi: UpiId = {
      id: Math.random().toString(36).substr(2, 9),
      ...upiForm,
      isVerified: true,
    };
    if (newUpi.isPrimary) {
      setUpiIds(
        [...upiIds, newUpi].map((u) => ({
          ...u,
          isPrimary: u.id === newUpi.id,
        })),
      );
    } else {
      setUpiIds([...upiIds, newUpi]);
    }
    setIsModalOpen(false);
    toast.success("UPI ID Linked", {
      description: `${upiForm.vpa} is now active.`,
    });
    setUpiForm({ vpa: "", label: "", isPrimary: false });
  };

  const deleteBank = (id: string) => {
    setBankAccounts(bankAccounts.filter((b: BankAccount) => b.id !== id));
    toast.error("Bank Account removed", {
      description: "The settlement vault has been disconnected.",
    });
  };

  const deleteUpi = (id: string) => {
    setUpiIds(upiIds.filter((u: UpiId) => u.id !== id));
    toast.error("UPI Identity removed", {
      description: "The virtual payment address has been unlinked.",
    });
  };

  const setPrimaryBank = (id: string) => {
    setBankAccounts(
      bankAccounts.map((b) => ({
        ...b,
        isPrimary: b.id === id,
      })),
    );
    toast.success("Primary Account Updated", {
      description: "Default settlement vault has been changed.",
    });
  };

  const setPrimaryUpi = (id: string) => {
    setUpiIds(
      upiIds.map((u) => ({
        ...u,
        isPrimary: u.id === id,
      })),
    );
    toast.success("Primary VPA Updated", {
      description: "Default virtual identifier changed.",
    });
  };

  const handleEditBank = (account: BankAccount) => {
    setMethodType("bank");
    setEditingId(account.id);
    setBankForm({
      bankName: account.bankName,
      accountHolder: account.accountHolder,
      accountNumber: account.accountNumber,
      ifscCode: account.ifscCode,
      isPrimary: account.isPrimary,
    });
    setIsEditDrawerOpen(true);
  };

  const handleEditUpi = (upi: UpiId) => {
    setMethodType("upi");
    setEditingId(upi.id);
    setUpiForm({
      vpa: upi.vpa,
      label: upi.label,
      isPrimary: upi.isPrimary,
    });
    setIsEditDrawerOpen(true);
  };

  const updateBank = () => {
    const updated = bankAccounts.map((b) =>
      b.id === editingId ? { ...b, ...bankForm } : b,
    );

    if (bankForm.isPrimary) {
      setBankAccounts(
        updated.map((b) => ({
          ...b,
          isPrimary: b.id === editingId,
        })),
      );
    } else {
      setBankAccounts(updated);
    }

    setIsEditDrawerOpen(false);
    toast.success("Account Updated", {
      description: "Changes have been saved successfully.",
    });
    setEditingId(null);
  };

  const updateUpi = () => {
    const updated = upiIds.map((u) =>
      u.id === editingId ? { ...u, ...upiForm } : u,
    );

    if (upiForm.isPrimary) {
      setUpiIds(
        updated.map((u) => ({
          ...u,
          isPrimary: u.id === editingId,
        })),
      );
    } else {
      setUpiIds(updated);
    }

    setIsEditDrawerOpen(false);
    toast.success("UPI Identity Modified", {
      description: "The internal identifier has been successfully updated.",
    });
    setEditingId(null);
  };

  return (
    <div
      className="p-6 md:p-8 min-h-screen space-y-6 max-w-[1400px] mx-auto"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-start space-y-2">
          <h1 className="text-4xl font-black tracking-tight uppercase text-slate-900 leading-none">
            Payment Methods
          </h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em]">
            Manage Payments
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab("bank")}
            className={`px-8 py-2.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === "bank"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Bank Accounts
          </button>
          <button
            onClick={() => setActiveTab("upi")}
            className={`px-8 py-2.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === "upi"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            UPI Identities
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="text-start">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">
              {activeTab === "bank" ? "Saved Accounts" : "Linked Virtual IDs"}
            </h2>
            <div className="w-12 h-1 bg-green-500 mt-2" />
          </div>
          <button
            onClick={activeTab === "bank" ? handleAddBank : handleAddUpi}
            className="group flex items-center gap-3 px-6 py-4 bg-[#22c55e] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-green-500/20"
          >
            <Plus
              size={16}
              strokeWidth={3}
              className="group-hover:rotate-90 transition-transform"
            />
            Add New {activeTab === "bank" ? "Method" : "VPA"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeTab === "bank"
            ? bankAccounts.map((account: BankAccount) => (
                <div
                  key={account.id}
                  className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm hover:shadow-md transition-all relative group"
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 bg-sky-50/50 border border-sky-100 flex items-center justify-center rounded-lg">
                      <Building2 className="text-sky-300" size={24} />
                    </div>
                    <div className="flex items-center gap-3">
                      {account.isPrimary ? (
                        <span className="px-2.5 py-1 bg-green-50 text-[#22c55e] text-[9px] font-black uppercase tracking-widest rounded-md border border-green-100">
                          Primary
                        </span>
                      ) : (
                        <button
                          onClick={() => setPrimaryBank(account.id)}
                          className="px-2.5 py-1 bg-sky-50 text-sky-500 text-[9px] font-black uppercase tracking-widest rounded-md border border-sky-100 hover:bg-sky-100 hover:text-sky-600 transition-all active:scale-95"
                        >
                          SET PRIMARY
                        </button>
                      )}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEditBank(account)}
                          className="p-1.5 text-slate-300 hover:text-slate-600 transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteBank(account.id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="mb-6 text-start">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none">
                      {account.bankName}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-2">
                      {account.accountHolder}
                    </p>
                  </div>

                  <div className="w-full h-px bg-slate-50 mb-5" />

                  {/* Details Container */}
                  <div className="flex items-start gap-9">
                    <div className="text-start space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        Account Number
                      </p>
                      <p className="text-[14px] font-black text-slate-900 tabular-nums tracking-wider leading-none">
                        {account.accountNumber}
                      </p>
                    </div>
                    <div className="text-start space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        IFSC Code
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="text-[14px] font-black text-slate-900 uppercase tracking-tight leading-none">
                          {account.ifscCode}
                        </p>

                        {/* Status Identifier */}
                        {account.isVerified ? (
                          <div className="flex items-center gap-1 text-[#22c55e]">
                            <CheckCircle2 size={13} strokeWidth={3} />
                            <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                              VERIFIED
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-500">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                              PENDING
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : upiIds.map((upi: UpiId) => (
                <div
                  key={upi.id}
                  className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm hover:shadow-md transition-all relative group flex items-start gap-5"
                >
                  <div className="w-16 h-16 bg-green-50/50 border border-green-100 flex items-center justify-center rounded-lg shrink-0">
                    <QrCode className="text-[#22c55e]" size={32} />
                  </div>

                  <div className="flex-1 text-start min-w-0 py-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                          {upi.label}
                        </p>
                        {upi.isPrimary ? (
                          <span className="px-2 py-0.5 bg-green-50 text-[#22c55e] text-[8px] font-black uppercase tracking-widest rounded-md border border-green-100">
                            Primary
                          </span>
                        ) : (
                          <button
                            onClick={() => setPrimaryUpi(upi.id)}
                            className="px-2.5 py-1 bg-sky-50 text-sky-500 text-[9px] font-black uppercase tracking-widest rounded-md border border-sky-100 hover:bg-sky-100 hover:text-sky-600 transition-all active:scale-95"
                          >
                            SET PRIMARY
                          </button>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 truncate uppercase tracking-tight">
                      {upi.vpa}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[#22c55e]">
                        <ShieldCheck size={16} strokeWidth={2.5} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Secure VPA
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEditUpi(upi)}
                          className="p-1.5 text-slate-300 hover:text-slate-600 transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteUpi(upi.id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty State */}
        {((activeTab === "bank" && bankAccounts.length === 0) ||
          (activeTab === "upi" && upiIds.length === 0)) && (
          <div className="py-32 flex flex-col items-center justify-center border border-slate-200 border-dashed rounded-sm bg-[#FAFAFA]/50">
            <div className="w-24 h-24 bg-white shadow-sm border border-slate-100 flex items-center justify-center rounded-3xl mb-8">
              <CreditCard className="text-slate-200" size={48} />
            </div>
            <h3 className="text-2xl font-black uppercase text-slate-800 tracking-tight">
              No Payment Vaults
            </h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">
              Initializing secure link for{" "}
              {activeTab === "bank" ? "Bank settlement" : "Instant UPI"}{" "}
              transfer
            </p>
          </div>
        )}
      </div>

      {/* Add New Modal */}
      <ResuableModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={methodType === "bank" ? "Add Bank Account" : "Link UPI ID"}
        subtitle={
          methodType === "bank"
            ? "Secure account for settlements"
            : "Virtual payment address link"
        }
        size="md"
        icon={
          methodType === "bank" ? (
            <Landmark size={20} />
          ) : (
            <Smartphone size={20} />
          )
        }
      >
        <div className="space-y-4">
          {methodType === "bank" ? (
            <div className="space-y-3">
              <ResuableInput
                label="Institution Name"
                placeholder="e.g. HDFC BANK"
                value={bankForm.bankName}
                onChange={(val) => setBankForm({ ...bankForm, bankName: val })}
                required
              />
              <ResuableInput
                label="Account Holder"
                placeholder="Legal Name as per Records"
                value={bankForm.accountHolder}
                onChange={(val) =>
                  setBankForm({ ...bankForm, accountHolder: val })
                }
                required
              />
              <ResuableInput
                label="Account Number"
                placeholder="Primary Settlement Account"
                value={bankForm.accountNumber}
                onChange={(val) =>
                  setBankForm({ ...bankForm, accountNumber: val })
                }
                required
              />
              <ResuableInput
                label="IFSC Identifier"
                placeholder="e.g. HDFC0001234"
                value={bankForm.ifscCode}
                onChange={(val) => setBankForm({ ...bankForm, ifscCode: val })}
                required
              />

              <div className="pt-4">
                <button
                  onClick={saveBank}
                  className="w-full py-3.5 bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-sm hover:opacity-90 transition-all shadow-xl shadow-green-500/10 active:scale-[0.98]"
                >
                  Add
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <ResuableInput
                label="VPA ADDRESS"
                placeholder="e.g. user@okaxis"
                value={upiForm.vpa}
                onChange={(val) => setUpiForm({ ...upiForm, vpa: val })}
                required
              />
              <ResuableInput
                label="Identity Label"
                placeholder="e.g. PRIMARY, BUSINESS"
                value={upiForm.label}
                onChange={(val) => setUpiForm({ ...upiForm, label: val })}
                required
              />
              <div className="pt-4">
                <button
                  onClick={saveUpi}
                  className="w-full py-3.5 bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-sm hover:opacity-90 transition-all shadow-xl shadow-green-500/10 active:scale-[0.98]"
                >
                  Link
                </button>
              </div>
            </div>
          )}
        </div>
      </ResuableModal>

      {/* Edit Drawer */}
      <ResuableDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        title={methodType === "bank" ? "Edit Bank Account" : "Edit UPI ID"}
        subtitle={
          methodType === "bank"
            ? "Update your bank details"
            : "Modify your virtual ID"
        }
        size="md"
      >
        <div className="space-y-4">
          {methodType === "bank" ? (
            <div className="space-y-3">
              <ResuableInput
                label="Institution Name"
                placeholder="e.g. HDFC BANK"
                value={bankForm.bankName}
                onChange={(val) => setBankForm({ ...bankForm, bankName: val })}
                required
              />
              <ResuableInput
                label="Account Holder"
                placeholder="Legal Name as per Records"
                value={bankForm.accountHolder}
                onChange={(val) =>
                  setBankForm({ ...bankForm, accountHolder: val })
                }
                required
              />
              <ResuableInput
                label="Account Number"
                placeholder="Primary Settlement Account"
                value={bankForm.accountNumber}
                onChange={(val) =>
                  setBankForm({ ...bankForm, accountNumber: val })
                }
                required
              />
              <ResuableInput
                label="IFSC Identifier"
                placeholder="e.g. HDFC0001234"
                value={bankForm.ifscCode}
                onChange={(val) => setBankForm({ ...bankForm, ifscCode: val })}
                required
              />

              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm">
                <input
                  type="checkbox"
                  id="primaryBank"
                  checked={bankForm.isPrimary}
                  onChange={(e) =>
                    setBankForm({ ...bankForm, isPrimary: e.target.checked })
                  }
                  className="w-4 h-4 accent-green-500"
                />
                <label
                  htmlFor="primaryBank"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-600 cursor-pointer"
                >
                  Set as Primary Settlement Vault
                </label>
              </div>

              <div className="pt-4">
                <button
                  onClick={updateBank}
                  className="w-full py-4 bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-sm hover:opacity-90 transition-all shadow-xl shadow-green-500/10 active:scale-[0.98]"
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <ResuableInput
                label="VPA ADDRESS"
                placeholder="e.g. user@okaxis"
                value={upiForm.vpa}
                onChange={(val) => setUpiForm({ ...upiForm, vpa: val })}
                required
              />
              <ResuableInput
                label="Identity Label"
                placeholder="e.g. PRIMARY, BUSINESS"
                value={upiForm.label}
                onChange={(val) => setUpiForm({ ...upiForm, label: val })}
                required
              />

              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm">
                <input
                  type="checkbox"
                  id="primaryUpi"
                  checked={upiForm.isPrimary}
                  onChange={(e) =>
                    setUpiForm({ ...upiForm, isPrimary: e.target.checked })
                  }
                  className="w-4 h-4 accent-green-500"
                />
                <label
                  htmlFor="primaryUpi"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-600 cursor-pointer"
                >
                  Set as Primary UPI Identity
                </label>
              </div>

              <div className="pt-4">
                <button
                  onClick={updateUpi}
                  className="w-full py-4 bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-sm hover:opacity-90 transition-all shadow-xl shadow-green-500/10 active:scale-[0.98]"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </ResuableDrawer>
    </div>
  );
};

export default PaymentMethods;
