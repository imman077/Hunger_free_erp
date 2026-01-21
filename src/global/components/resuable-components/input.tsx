import React from "react";
import { Icon } from "./Icon";

interface ResuableInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  align?: "left" | "center" | "right";
  info?: string | React.ReactNode;
}

const ResuableInput: React.FC<ResuableInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  disabled = false,
  required = false,
  align = "left",
  info,
}) => {
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
            className="text-[8px] font-black uppercase tracking-widest block"
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
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
          color: "var(--text-primary)",
        }}
        className={`w-full border px-2.5 py-2 rounded-none text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 focus:border-[#22c55e] transition-all placeholder:text-neutral-500 ${alignClass}`}
      />
    </div>
  );
};

export default ResuableInput;
