import React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs, { Dayjs } from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface ResuableTimePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

// Create a custom theme with emerald green as primary color
const emeraldTheme = createTheme({
  palette: {
    primary: {
      main: "#22c55e", // emerald-500
      light: "#4ade80", // emerald-400
      dark: "#16a34a", // emerald-600
    },
  },
});

const ResuableTimePicker: React.FC<ResuableTimePickerProps> = ({
  label,
  value,
  onChange,
  className = "",
  required = false,
}) => {
  const handleTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format("HH:mm"));
    }
  };

  return (
    <ThemeProvider theme={emeraldTheme}>
      <div className={`space-y-1.5 ${className}`}>
        {label && (
          <label
            className="text-[10px] font-bold uppercase tracking-widest block px-1"
            style={{ color: "var(--text-muted)" }}
          >
            {label} {required && "*"}
          </label>
        )}
        <TimePicker
          value={value ? dayjs(value, "HH:mm") : null}
          onChange={handleTimeChange}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
              required: required,
              sx: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: "0px",
                  fontSize: "11px !important",
                  fontWeight: "600 !important",
                  color: "var(--text-primary)",
                  fontFamily: "inherit !important",
                  height: "42px !important",
                  "& fieldset": {
                    borderColor: "var(--border-color)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--border-color)",
                    opacity: 0.8,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#22c55e", // emerald-500
                    borderWidth: "1px",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "8px 12px !important",
                  fontSize: "11px !important",
                  fontWeight: "600 !important",
                  fontFamily: "inherit !important",
                  lineHeight: "1 !important",
                  height: "auto !important",
                },
                "& .MuiInputAdornment-root": {
                  "& .MuiIconButton-root": {
                    padding: "4px",
                    "& svg": {
                      fontSize: "14px !important",
                      width: "14px",
                      height: "14px",
                    },
                  },
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "14px !important",
                  width: "14px !important",
                  height: "14px !important",
                },
              },
            },
            actionBar: {
              actions: ["cancel", "accept"],
            },
            digitalClockSectionItem: {
              sx: {
                "&.Mui-selected": {
                  backgroundColor: "#22c55e !important",
                  color: "#ffffff !important",
                },
              },
            },
          }}
          sx={{
            // Clock hand and selected time colors
            "& .MuiClockPointer-root": {
              backgroundColor: "#22c55e !important",
            },
            "& .MuiClockPointer-thumb": {
              backgroundColor: "#22c55e !important",
              borderColor: "#22c55e !important",
            },
            "& .MuiClock-pin": {
              backgroundColor: "#22c55e !important",
            },
            "& .MuiClockNumber-root.Mui-selected": {
              backgroundColor: "#22c55e !important",
              color: "#ffffff !important",
            },
            // AM/PM buttons and arrows
            "& .MuiPickersArrowSwitcher-button": {
              color: "#22c55e !important",
            },
            "& .MuiTimeClock-arrowSwitcher button": {
              color: "#22c55e !important",
            },
            "& .MuiIconButton-root": {
              color: "#22c55e",
            },
            // Action buttons (OK, CANCEL)
            "& .MuiButton-root": {
              color: "#22c55e !important",
              fontWeight: "600 !important",
              fontSize: "11px !important",
            },
            "& .MuiButton-text": {
              color: "#22c55e !important",
            },
            // AM/PM toggle buttons
            "& .MuiToggleButton-root": {
              color: "var(--text-muted)",
              fontSize: "11px !important",
              "&.Mui-selected": {
                backgroundColor: "#22c55e !important",
                color: "#ffffff !important",
                "&:hover": {
                  backgroundColor: "#16a34a !important",
                },
              },
            },
            // Paper/Popover background
            "& .MuiPaper-root": {
              backgroundColor: "var(--bg-primary) !important",
              backgroundImage: "none !important",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary) !important",
            },
            // Clock face
            "& .MuiClock-root": {
              backgroundColor: "var(--bg-secondary) !important",
            },
            // Clock numbers
            "& .MuiClockNumber-root": {
              color: "var(--text-primary) !important",
            },
            // Typography
            "& .MuiTypography-root": {
              color: "var(--text-primary) !important",
            },
            // Digital clock items
            "& .MuiMultiSectionDigitalClock-root": {
              backgroundColor: "var(--bg-primary) !important",
              "& .Mui-selected": {
                backgroundColor: "#22c55e !important",
                color: "#ffffff !important",
              },
              "& .MuiMenuItem-root": {
                color: "var(--text-primary) !important",
                "&:hover": {
                  backgroundColor: "var(--bg-secondary) !important",
                },
              },
            },
            // AM/PM section in mobile
            "& .MuiTimePickerToolbar-amPmSelection": {
              "& .MuiButtonBase-root": {
                color: "var(--text-primary) !important",
              },
            },
            // Ensure all MUI primary colors use emerald
            "& .MuiTypography-root.Mui-selected": {
              color: "#22c55e !important",
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default ResuableTimePicker;
