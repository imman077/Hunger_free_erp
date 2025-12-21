import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

// --- Types ---
export interface DropdownOption {
  value: string;
  label: string;
}

export interface ResuableDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  minWidth?: number;
  disabled?: boolean;
}

// --- ResuableDropdown Component ---
const ResuableDropdown: React.FC<ResuableDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select",
  minWidth = 140,
  disabled = false,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small">
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        disabled={disabled}
        sx={{
          minWidth: minWidth,
          height: "38px",
          fontSize: "14px",
          backgroundColor: "white",
          borderRadius: "4px",
          border: "1px solid #e5e7eb",
          boxShadow: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
          "& .MuiSelect-icon": {
            boxShadow: "none",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              boxShadow: "none",
              border: "1px solid #e5e7eb",
              marginTop: "4px",
              borderRadius: "4px",
            },
          },
        }}
      >
        {placeholder && (
          <MenuItem value="" sx={{ fontSize: "14px" }}>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ fontSize: "14px" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ResuableDropdown;
