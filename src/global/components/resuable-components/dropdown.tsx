import React, { useState, useRef, useEffect } from "react";
import { Icon } from "./Icon";

// --- Types ---
export interface DropdownOption {
  value: string;
  label: string;
}

export interface ResuableDropdownProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  minWidth?: number | string;
  align?: "left" | "center" | "right";
  info?: string | React.ReactNode;
}

// --- ResuableDropdown Component ---
const ResuableDropdown: React.FC<ResuableDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select Option",
  className = "",
  disabled = false,
  required = false,
  minWidth,
  align = "left",
  info,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Check if dropdown should open upward based on available space
  useEffect(() => {
    if (isOpen && dropdownRef.current && menuRef.current) {
      const buttonRect = dropdownRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      // Open upward if there's not enough space below but enough space above
      if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  return (
    <div className={`w-full ${alignClass} ${className}`}>
      {label && (
        <div
          className={`flex items-center gap-1.5 mb-1 px-1 ${
            align === "center" ? "justify-center" : ""
          } ${align === "right" ? "justify-end" : ""}`}
        >
          <label
            className="text-[10px] font-bold uppercase tracking-widest block"
            style={{ color: "var(--text-muted)" }}
          >
            {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
          </label>
          {info && (
            <div className="group/info relative flex items-center">
              <Icon
                name="info"
                className="w-3.5 h-3.5 text-slate-300 hover:text-[#22c55e] transition-colors cursor-help"
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 min-w-[200px] max-w-[280px] p-3 bg-slate-900/95 backdrop-blur-sm text-white text-[10px] font-medium leading-relaxed rounded-lg shadow-2xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all z-[10000] pointer-events-none whitespace-pre-line border border-white/10 text-left">
                {info}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-900/95" />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            minWidth,
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)",
            borderColor: "var(--border-color)",
          }}
          className={`w-full flex items-center justify-between border px-3 py-2.5 rounded-none text-xs font-semibold transition-all ${
            isOpen ? "ring-1 ring-[#22c55e]" : ""
          } ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          } ${alignClass}`}
        >
          <span className={`flex-1 truncate ${alignClass}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span
            className={`transition-transform duration-200 ${
              isOpen && !openUpward
                ? "rotate-180"
                : isOpen && openUpward
                  ? ""
                  : ""
            }`}
            style={{ color: isOpen ? "#22c55e" : "var(--text-muted)" }}
          >
            <Icon name="chevron-down" className="w-4 h-4" />
          </span>
        </button>

        {isOpen && (
          <div
            ref={menuRef}
            className={`absolute left-0 right-0 border rounded-none z-[9999] max-h-60 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200 ${
              openUpward ? "bottom-full mb-1" : "top-full mt-1"
            }`}
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`relative w-full px-4 py-3 text-xs font-semibold transition-all border-b last:border-none flex items-center justify-center group ${alignClass}`}
                style={{
                  borderBottomColor: "var(--border-color)",
                  backgroundColor:
                    value === opt.value ? "#22c55e" : "transparent",
                  color:
                    value === opt.value ? "white" : "var(--text-secondary)",
                }}
              >
                <span className="truncate">{opt.label}</span>
                {value === opt.value && (
                  <div className="absolute right-4 flex items-center h-full top-0">
                    <Icon
                      name="check-circle"
                      className="w-3.5 h-3.5 text-white"
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResuableDropdown;
