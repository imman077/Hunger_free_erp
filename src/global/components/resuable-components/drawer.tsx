import React from "react";
import { X } from "lucide-react";

interface ResuableDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  headerExtra?: React.ReactNode;
}

const ResuableDrawer: React.FC<ResuableDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
  headerExtra,
}) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-[400px]",
    xl: "max-w-xl",
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full ${sizeClasses[size]} w-full bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-out flex flex-col overflow-y-auto scrollbar-hide`}
        style={{
          borderLeft: "1px solid var(--border-color)",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 px-6 py-3 border-b flex flex-col gap-1"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderBottomColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-xl font-black uppercase tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-sm transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={18} />
            </button>
          </div>
          {subtitle && (
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {subtitle}
              </span>
              {headerExtra}
            </div>
          )}
        </div>

        {/* Body */}
        <div
          className="flex-1 overflow-y-auto px-6 py-3 space-y-4 scrollbar-hide"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="flex-shrink-0 px-6 py-4 border-t flex items-center justify-end gap-3"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderTopColor: "var(--border-color)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default ResuableDrawer;
