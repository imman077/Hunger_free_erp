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
  inputClassName?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
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
  inputClassName = "",
  startContent,
  endContent,
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
                className="w-3.5 h-3.5 transition-colors cursor-help"
                style={{ color: "var(--text-muted)" }}
              />
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 min-w-[200px] max-w-[280px] p-3 backdrop-blur-sm text-[10px] font-medium leading-relaxed rounded-lg shadow-2xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all z-[10000] pointer-events-none whitespace-pre-line border text-left"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                {info}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent"
                  style={{ borderTopColor: "var(--bg-primary)" }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="relative flex items-center">
        {startContent && (
          <div className="absolute left-2.5 flex items-center pointer-events-none">
            {startContent}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={`w-full border py-2.5 rounded-sm text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#22c55e]/10 focus:border-[#22c55e] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${alignClass} ${inputClassName}`}
          style={{
            backgroundColor: inputClassName.includes("bg-")
              ? undefined
              : "var(--bg-secondary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
            paddingLeft: startContent ? "2rem" : "0.625rem",
            paddingRight: endContent ? "2.5rem" : "0.625rem",
            caretColor: "var(--color-emerald)",
          }}
        />
        {endContent && (
          <div className="absolute right-2.5 flex items-center pointer-events-none">
            {endContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResuableInput;
