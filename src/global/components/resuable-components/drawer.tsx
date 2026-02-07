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
        base: `rounded-none w-full ${sizeClasses[size as keyof typeof sizeClasses] || "sm:max-w-md"} shadow-none thin-scrollbar`,
        backdrop: "bg-black/40 backdrop-blur-md",
        header: "border-b p-0",
        body: "p-0 overflow-hidden",
        footer: "border-t p-5",
      }}
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <DrawerContent
        className="thin-scrollbar"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {() => (
          <>
            <DrawerHeader className="px-6 py-6 flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <h2
                  className="text-[22px] font-black uppercase tracking-tight leading-[1.1]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {title}
                </h2>
                {subtitle && (
                  <span
                    className="text-[11px] font-black tracking-[0.25em] leading-none ml-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {subtitle}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {headerExtra}
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-slate-500/10 rounded-sm transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  <X size={18} />
                </button>
              </div>
            </DrawerHeader>

            <DrawerBody
              className="py-1 px-0 overflow-y-auto thin-scrollbar flex-1"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <div className="">{children}</div>
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
