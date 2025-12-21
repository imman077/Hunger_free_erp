import React, { useState } from "react";
import { Modal, ModalContent } from "@heroui/react";
import { Icon } from "./Icon";

interface ResuableModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: React.ReactNode;
  subtitle?: string;
  badge?: string;
  status?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  footerLeft?: React.ReactNode;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  backdrop?: "opaque" | "blur" | "transparent";
  scrollBehavior?: "normal" | "inside" | "outside";
  placement?:
    | "auto"
    | "top"
    | "bottom"
    | "center"
    | "top-center"
    | "bottom-center";
  hideCloseButton?: boolean;
  radius?: "none" | "sm" | "md" | "lg";
  className?: string;
  classNames?: {
    wrapper?: string;
    backdrop?: string;
    base?: string;
    header?: string;
    body?: string;
    footer?: string;
    closeButton?: string;
  };
  onClose?: () => void;
  headerContent?: React.ReactNode;
  // Trending Specific Props
  data?: any;
  showTrendingLayout?: boolean;
}

const ResuableModal: React.FC<ResuableModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  subtitle,
  badge,
  status,
  icon,
  children,
  footer,
  footerLeft,
  size = "md",
  backdrop = "blur",
  scrollBehavior = "normal",
  placement = "center",
  hideCloseButton = false,
  radius = "sm",
  className = "",
  classNames = {},
  onClose,
  headerContent,
  data,
  showTrendingLayout = false,
}) => {
  const [activeTab, setActiveTab] = useState<"Profile" | "History">("Profile");

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    onOpenChange(false);
  };

  // Trending Data from Props
  const displayName = title || data?.partner;
  const displayId = data?.id;
  const joinDate = data?.date;
  const email = data?.email;
  const phone = data?.phone;
  const history = data?.history || [];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={showTrendingLayout ? "4xl" : size}
      backdrop={backdrop}
      scrollBehavior={scrollBehavior}
      placement={placement}
      hideCloseButton={true}
      radius="none"
      className={className}
      classNames={{
        backdrop: `!fixed !inset-0 !w-screen !h-screen bg-slate-900/50 backdrop-blur-md ${
          classNames.backdrop || ""
        }`,
        base: `!border-none !outline-none !ring-0 !ring-transparent bg-white shadow-2xl overflow-hidden rounded-sm ${
          showTrendingLayout ? "max-w-[850px] !h-[680px]" : ""
        } ${classNames.base || ""}`,
        body: `p-0 ${classNames.body || ""}`,
        wrapper: `!fixed !inset-0 z-[9999] flex items-center justify-center ${
          classNames.wrapper || ""
        }`,
      }}
    >
      <ModalContent className="p-0 bg-transparent border-none outline-none ring-0 focus:outline-none focus-visible:outline-none">
        {(onCloseInternal) => (
          <div className="flex flex-col w-full bg-white overflow-hidden rounded-sm border-none outline-none">
            {/* Header */}
            <div
              className={`flex-shrink-0 px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-white z-20 ${
                classNames.header || ""
              }`}
            >
              <div className="flex items-center gap-4">
                {icon && (
                  <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-slate-50 border border-slate-100 text-slate-400">
                    {icon}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight truncate max-w-[400px]">
                      {displayName}
                    </h2>
                    {(badge || (showTrendingLayout && !badge)) && (
                      <span className="px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-sm uppercase">
                        {badge || "Partner"}
                      </span>
                    )}
                    {(status || (showTrendingLayout && !status)) && (
                      <div className="flex items-center gap-1.5 ml-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {status || "Live"}
                        </span>
                      </div>
                    )}
                  </div>
                  {subtitle && (
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
                {headerContent}
              </div>
              {!hideCloseButton && (
                <button
                  onClick={() => {
                    handleClose();
                    onCloseInternal();
                  }}
                  className={`p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-sm transition-all ${
                    classNames.closeButton || ""
                  }`}
                >
                  <Icon name="close" className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Body */}
            <div
              className={`flex-1 overflow-y-auto p-6 no-scrollbar bg-[#fafbfc] min-h-[150px] ${
                classNames.body || ""
              }`}
            >
              {showTrendingLayout ? (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-slate-100 rounded-sm flex justify-between items-start shadow-sm">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          Partner ID
                        </span>
                        <p className="text-lg font-black text-slate-800">
                          {displayId}
                        </p>
                      </div>
                      <Icon name="stack" className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="p-4 bg-white border border-slate-100 rounded-sm flex justify-between items-start shadow-sm">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          Last Sync
                        </span>
                        <p className="text-lg font-black text-slate-800">
                          {joinDate}
                        </p>
                      </div>
                      <Icon
                        name="calendar"
                        className="w-4 h-4 text-slate-300"
                      />
                    </div>
                  </div>

                  {activeTab === "Profile" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-left-4 duration-400">
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
                          Identity
                        </h3>
                        <div className="p-8 bg-white border border-slate-100 rounded-sm shadow-sm flex flex-col items-center">
                          <div className="w-24 h-24 rounded-sm bg-slate-50 mb-6 border border-slate-100 flex items-center justify-center relative">
                            <Icon
                              name="donations"
                              className="w-10 h-10 text-slate-200"
                            />
                          </div>
                          <div className="w-full space-y-3">
                            <div className="flex items-center gap-3 py-2 border-b border-slate-50">
                              <Icon
                                name="mail"
                                className="w-4 h-4 text-slate-400"
                              />
                              <span className="text-xs font-bold text-slate-600 truncate">
                                {email}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 py-2 border-b border-slate-50">
                              <Icon
                                name="phone"
                                className="w-4 h-4 text-slate-400"
                              />
                              <span className="text-xs font-bold text-slate-600">
                                {phone}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 py-2">
                              <Icon
                                name="office"
                                className="w-4 h-4 text-slate-400"
                              />
                              <span className="text-xs font-bold text-slate-600 truncate">
                                {displayName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
                          Metrics
                        </h3>
                        <div className="p-8 bg-white border border-slate-100 rounded-sm shadow-sm flex flex-col">
                          <div className="text-center mb-6">
                            <p className="text-5xl font-black text-slate-800 tracking-tighter">
                              {data?.activeLedgers || 0}
                            </p>
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest mt-1 block">
                              Active Ledgers
                            </span>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-[9px] font-bold text-slate-800 border-b border-slate-100 pb-2 uppercase">
                              Log Events
                            </h4>
                            <div className="relative pl-5 space-y-6">
                              <div className="absolute left-[5px] top-1 bottom-1 w-px bg-slate-100" />
                              {(data?.logEvents || []).map(
                                (event: any, idx: number) => (
                                  <div key={idx} className="relative">
                                    <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-sm bg-emerald-500" />
                                    <p className="text-[11px] font-bold text-slate-800 leading-none">
                                      {event.title}
                                    </p>
                                    <p className="text-[9px] text-slate-400 font-medium uppercase mt-0.5">
                                      {event.date}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-400">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
                        Transaction History
                      </h3>
                      <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden text-left">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                                ID
                              </th>
                              <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                                Date
                              </th>
                              <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                                Asset
                              </th>
                              <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">
                                Audit
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {history.map((item: any) => (
                              <tr
                                key={item.id}
                                className="hover:bg-slate-50 transition-colors"
                              >
                                <td className="px-6 py-3.5">
                                  <span className="text-[10px] font-bold text-slate-400">
                                    {item.id}
                                  </span>
                                </td>
                                <td className="px-6 py-3.5">
                                  <span className="text-[11px] font-bold text-slate-800">
                                    {item.date}
                                  </span>
                                </td>
                                <td className="px-6 py-3.5">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                                    {item.type}
                                  </span>
                                </td>
                                <td className="px-6 py-3.5 text-center">
                                  <div
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[8px] font-black uppercase border ${
                                      item.status === "Verified"
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                        : "bg-rose-50 text-rose-700 border-rose-100"
                                    }`}
                                  >
                                    {item.status}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-100 p-1 rounded-sm flex items-center h-12 border border-slate-200 shadow-inner">
                    <button
                      onClick={() => setActiveTab("Profile")}
                      className={`flex-1 h-full rounded-sm text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeTab === "Profile"
                          ? "bg-white text-slate-800 shadow-sm border border-slate-100"
                          : "text-slate-400 hover:text-slate-500"
                      }`}
                    >
                      System Profile
                    </button>
                    <button
                      onClick={() => setActiveTab("History")}
                      className={`flex-1 h-full rounded-sm text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeTab === "History"
                          ? "bg-white text-slate-800 shadow-sm border border-slate-100"
                          : "text-slate-400 hover:text-slate-500"
                      }`}
                    >
                      Ledger Audit
                    </button>
                  </div>
                </div>
              ) : (
                children
              )}
            </div>

            {/* Footer */}
            {(footer || footerLeft || showTrendingLayout) && (
              <div
                className={`flex-shrink-0 px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white z-20 ${
                  classNames.footer || ""
                }`}
              >
                <div className="flex-1">
                  {footerLeft ||
                    (showTrendingLayout && (
                      <button className="px-4 py-2 border border-slate-200 rounded-sm text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all">
                        Export JSON
                      </button>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                  {footer || (
                    <button
                      onClick={() => {
                        handleClose();
                        onCloseInternal();
                      }}
                      className="px-8 py-2 bg-slate-900 text-white rounded-sm text-[9px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md active:scale-95"
                    >
                      {showTrendingLayout ? "Close Portal" : "Close"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResuableModal;
