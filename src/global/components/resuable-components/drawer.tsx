import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { X } from "lucide-react";

interface ResuableDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
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
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onClose}
      size={size as any}
      placement="right"
      backdrop="blur"
      radius="none"
      hideCloseButton
      classNames={{
        base: "bg-white border-l border-slate-200",
        backdrop: "bg-slate-900/40 backdrop-blur-md",
        header: "border-b border-slate-100 p-0",
        body: "p-0",
        footer: "border-t border-slate-100 p-6",
      }}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1 px-6 py-4">
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
              {(subtitle || headerExtra) && (
                <div className="flex items-center justify-between">
                  {subtitle && (
                    <span
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400"
                    >
                      {subtitle}
                    </span>
                  )}
                  {headerExtra}
                </div>
              )}
            </DrawerHeader>

            <DrawerBody className="p-6 overflow-y-auto scrollbar-hide" style={{ backgroundColor: "var(--bg-secondary)" }}>
              {children}
            </DrawerBody>

            {footer && (
              <DrawerFooter className="px-6 py-4 flex items-center justify-end gap-3" style={{ backgroundColor: "var(--bg-primary)" }}>
                {footer}
              </DrawerFooter>
            )}
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ResuableDrawer;
