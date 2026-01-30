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
    xs: "sm:max-w-xs",
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
    full: "sm:max-w-full",
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={size as any}
      placement="right"
      backdrop="blur"
      hideCloseButton={true}
      classNames={{
        base: `bg-white rounded-none w-full ${sizeClasses[size as keyof typeof sizeClasses] || "sm:max-w-md"} shadow-none no-scrollbar`,
        backdrop: "bg-slate-900/40 backdrop-blur-md",
        header: "border-b border-slate-100 p-0",
        body: "p-0 overflow-hidden",
        footer: "border-t border-slate-100 p-5",
      }}
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <DrawerContent
        className="no-scrollbar"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {() => (
          <>
            <DrawerHeader className="flex flex-col gap-0.5 px-3 py-3.5">
              <div className="flex items-center justify-between">
                <h2
                  className="text-lg font-black uppercase tracking-tight"
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
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {subtitle}
                    </span>
                  )}
                  {headerExtra}
                </div>
              )}
            </DrawerHeader>

            <DrawerBody
              className="py-1 px-0 overflow-y-auto no-scrollbar flex-1"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <div className="py-5">{children}</div>
            </DrawerBody>

            {footer && (
              <DrawerFooter
                className="px-6 py-3.5 flex items-center justify-end gap-3"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
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
