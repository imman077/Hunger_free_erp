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
}) => {
  return (
    <div className={`space-y-1.5 text-center ${className}`}>
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
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
        className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-sm text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 focus:border-[#22c55e] transition-all text-center placeholder:text-slate-300"
      />
    </div>
  );
};

export default ResuableInput;
