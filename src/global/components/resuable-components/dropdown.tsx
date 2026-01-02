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
    <div
      className={`space-y-1.5 relative ${alignClass} ${className}`}
      ref={dropdownRef}
    >
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-1">
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        style={{ minWidth }}
        className={`w-full flex items-center justify-between bg-slate-50 border px-3 py-2.5 rounded-none text-xs font-semibold transition-all ${
          isOpen
            ? "border-[#22c55e] ring-1 ring-[#22c55e] text-slate-900"
            : "border-slate-200 text-slate-800"
        } ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${alignClass}`}
      >
        <span className={`flex-1 truncate ${alignClass}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Icon
          name="chevron-down"
          className={`w-4 h-4 text-slate-400 transition-transform ${
            isOpen ? "rotate-180 text-[#22c55e]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-none z-[100] max-h-60 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`w-full px-4 py-3 text-xs font-semibold transition-all border-b border-slate-50 last:border-none flex items-center justify-center gap-3 group ${
                value === opt.value
                  ? "bg-[#22c55e] text-white"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-[#22c55e]"
              } ${alignClass}`}
            >
              <span className="flex-1 truncate">{opt.label}</span>
              {value === opt.value && (
                <Icon name="check-circle" className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResuableDropdown;
