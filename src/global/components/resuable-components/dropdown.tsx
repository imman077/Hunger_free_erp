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
  align = "center",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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
        <label
          className="text-[10px] font-bold uppercase tracking-widest block mb-1 px-1"
          style={{ color: "var(--text-muted)" }}
        >
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
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
              isOpen ? "rotate-180" : ""
            }`}
            style={{ color: isOpen ? "#22c55e" : "var(--text-muted)" }}
          >
            <Icon name="chevron-down" className="w-4 h-4" />
          </span>
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-1 border rounded-none z-[9999] max-h-60 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200"
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
                className={`w-full px-4 py-3 text-xs font-semibold transition-all border-b last:border-none flex items-center justify-center gap-3 group ${alignClass}`}
                style={{
                  borderBottomColor: "var(--border-color)",
                  backgroundColor:
                    value === opt.value ? "#22c55e" : "transparent",
                  color:
                    value === opt.value ? "white" : "var(--text-secondary)",
                }}
              >
                <span className="flex-1 truncate">{opt.label}</span>
                {value === opt.value && (
                  <Icon
                    name="check-circle"
                    className="w-3.5 h-3.5 text-white"
                  />
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
