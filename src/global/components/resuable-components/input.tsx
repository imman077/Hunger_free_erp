import React from "react";

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
  align = "center",
}) => {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";

  return (
    <div className={`space-y-1.5 ${alignClass} ${className}`}>
      {label && (
        <label
          className="text-[10px] font-bold uppercase tracking-widest block px-1"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </label>
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
        className={`w-full border px-3 py-2.5 rounded-none text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 focus:border-[#22c55e] transition-all placeholder:text-neutral-500 ${alignClass}`}
      />
    </div>
  );
};

export default ResuableInput;
