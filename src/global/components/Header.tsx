"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import {
  BellIcon,
  HomeIcon,
  UsersIcon,
  HeartIcon,
  ChartBarIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  CheckCircleIcon,
  TrashIcon,
} from "lucide-react";
import { useSidebar } from "../contexts/SidebarContext";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { formatDistanceToNow } from "date-fns";

/* ---------------- MUI Styled Badge ---------------- */
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#22c55e",
    color: "#22c55e",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

interface HeaderItemProps {
  icon: React.ReactNode;
  label: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-4 px-4 py-2 cursor-pointer text-gray-900 hover:text-green-600">
      <span className="flex items-center justify-center h-10 w-10">{icon}</span>
      <span className="text-base font-medium">{label}</span>
    </div>
  );
};

// Professional Notification Data
const notificationData = [
  {
    id: 1,
    type: "success",
    title: "New Donation Received",
    message: "John Doe donated $500 to the Food Drive campaign",
    time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
    icon: "check",
  },
  {
    id: 2,
    type: "warning",
    title: "Low Inventory Alert",
    message: "Food supplies running low in Downtown Shelter",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    icon: "alert",
  },
  {
    id: 3,
    type: "info",
    title: "New Volunteer Registered",
    message: "Sarah Wilson signed up as a volunteer",
    time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    icon: "info",
  },
  {
    id: 4,
    type: "success",
    title: "Campaign Goal Reached",
    message: "Winter Food Drive reached 120% of its target",
    time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    icon: "check",
  },
  {
    id: 5,
    type: "warning",
    title: "Delivery Delay",
    message: "Scheduled delivery to Northside Shelter delayed by 2 hours",
    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    icon: "alert",
  },
  {
    id: 6,
    type: "info",
    title: "System Update",
    message: "Monthly maintenance completed successfully",
    time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: true,
    icon: "info",
  },
];

const Header: React.FC = () => {
  const { expanded } = useSidebar();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = () => {
    console.log("Bell icon clicked!");
    setNotificationDrawerOpen(true);
  };

  const getUnreadCount = () => {
    return notifications.filter((notification) => !notification.isRead).length;
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <>
      <header
        className={
          "fixed top-0 right-0 h-20 shadow z-40 flex items-center justify-between px-6 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] " +
          (expanded ? "md:left-[260px]" : "md:left-[70px]") + // Increased to match new sidebar width
          " left-0 right-0"
        }
        style={{
          backgroundColor: "var(--bg-primary)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {/* Left section - Mobile menu and title */}
        <div className="flex items-center">
          {/* MOBILE HAMBURGER (visible only < md) */}
          <div className="md:hidden mr-4">
            <IconButton onClick={() => setMobileDrawerOpen(true)}>
              <MenuIcon color="black" />
            </IconButton>
          </div>

          {/* Image - Visible on all screens */}
          <img
            src="/HungerFree.svg"
            className="h-14 w-auto object-contain animate-in fade-in slide-in-from-left-4 duration-500 filter drop-shadow-sm"
            alt="HungerFree Logo"
          />
        </div>

        {/* Right section - Notifications and avatar */}
        <div className="flex flex-row gap-8 items-center">
          {/* Bell Notification */}
          <IconButton
            onClick={handleNotificationClick}
            sx={{
              padding: "8px",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
          >
            <Badge
              badgeContent={getUnreadCount()}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#22c55e",
                  color: "white",
                  fontSize: "0.75rem",
                  height: "18px",
                  minWidth: "18px",
                },
              }}
            >
              <BellIcon
                className="h-6 w-6"
                style={{ color: "var(--text-primary)" }}
              />
            </Badge>
          </IconButton>

          {/* Avatar Dropdown Trigger - Shown when sidebar is collapsed */}
          {!expanded && (
            <div>
              <div onClick={handleAvatarClick} className="cursor-pointer z-50">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt="User"
                    src="https://mui.com/static/images/avatar/1.jpg"
                    sx={{
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                    }}
                  />
                </StyledBadge>
              </div>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      width: "180px",
                      maxWidth: "180px",
                      boxShadow: 3,
                      "@media (max-width: 640px)": {
                        width: "160px",
                        maxWidth: "160px",
                        "& .MuiMenuItem-root": {
                          fontSize: "0.95rem",
                          minHeight: "44px",
                          padding: "10px 14px",
                        },
                      },
                    },
                  },
                }}
                disableScrollLock={false}
                MenuListProps={{
                  sx: {
                    padding: "4px 0",
                    "& .MuiMenuItem-root": {
                      fontSize: "0.95rem",
                      minHeight: "40px",
                      "@media (max-width: 640px)": {
                        minHeight: "44px",
                        fontSize: "0.95rem",
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: "red" }}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </header>

      {/* ---------------- NOTIFICATION DRAWER ---------------- */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[380px] z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          notificationDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--bg-primary)",
          boxShadow: "var(--shadow-lg)",
          borderLeft: "1px solid var(--border-color)",
        }}
      >
        {/* HEADER SECTION */}
        <div className="p-5 pb-0 flex flex-col gap-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3
                className="text-base font-extrabold tracking-tight leading-none mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Notifications
              </h3>
              <div className="flex items-center gap-1.5">
                {getUnreadCount() > 0 ? (
                  <>
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-hf-green animate-pulse"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                    <span
                      className="text-[10px] font-black uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {getUnreadCount()} Active
                    </span>
                  </>
                ) : (
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No New Messages
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setNotificationDrawerOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl transition-all border"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <XIcon className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* UTILITY ACTION BAR */}
          <div className="flex items-center justify-between py-1">
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setNotifications((prev) =>
                    prev.map((n) => ({ ...n, isRead: true }))
                  );
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200/60 rounded-lg text-xs font-black text-slate-600 hover:text-hf-green tracking-wider transition-all"
              >
                <CheckCircleIcon
                  className="w-3 h-3 text-hf-green"
                  style={{ color: "#22c55e" }}
                />
                Mark as Read
              </button>
              <button
                onClick={clearAllNotifications}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200/60 rounded-lg text-xs font-black text-slate-600 hover:text-rose-500 tracking-wider transition-all"
              >
                <TrashIcon className="w-3 h-3" />
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="h-3 bg-gradient-to-b from-white to-transparent shrink-0 z-10" />

        {/* NOTIFICATION FEED */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-5 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <BellIcon className="h-16 w-16 text-slate-200 mb-4" />
              <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">
                No notifications
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`group relative flex gap-3.5 p-3 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${!n.isRead ? "shadow-sm" : "opacity-60 grayscale-[0.3]"}`}
                style={{
                  backgroundColor: n.isRead
                    ? "var(--bg-secondary)"
                    : "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                {/* Type/Priority Vertical Pillar */}
                <div
                  className={`w-0.5 rounded-full shrink-0 ${
                    n.type === "success"
                      ? "bg-hf-green"
                      : n.type === "warning"
                      ? "bg-amber-500"
                      : "bg-blue-500"
                  }`}
                  style={
                    n.type === "success" ? { backgroundColor: "#22c55e" } : {}
                  }
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span
                      className={`text-[7px] font-black uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-md ${
                        n.type === "success"
                          ? "bg-hf-green text-white"
                          : n.type === "warning"
                          ? "bg-amber-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                      style={
                        n.type === "success"
                          ? { backgroundColor: "#22c55e" }
                          : {}
                      }
                    >
                      {n.type === "success" ? "SYSTEM" : n.type.toUpperCase()}
                    </span>
                  </div>

                  <h4
                    className="text-[13px] font-bold mb-0.5 group-hover:text-hf-green transition-colors leading-snug truncate"
                    style={
                      {
                        "--hover-color": "#22c55e",
                        color: "var(--text-primary)",
                      } as React.CSSProperties
                    }
                  >
                    {n.title}
                  </h4>
                  <p
                    className="text-[11px] font-medium leading-tight"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {n.message}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                      <button className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 text-white rounded-md text-[8px] font-black uppercase tracking-widest hover:bg-black transition-all">
                        Review
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(n.id);
                        }}
                        className="p-1 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <TrashIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <span
                      className="text-[9px] font-semibold tabular-nums"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {formatDistanceToNow(n.time, { addSuffix: false })}
                    </span>
                  </div>
                </div>

                {!n.isRead && (
                  <div className="absolute top-3 right-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-hf-green shadow-sm shadow-hf-green/50"
                      style={{ backgroundColor: "#8aaf98ff" }}
                    />
                  </div>
                )}
              </div>
            ))
          )}

          {notifications.length > 0 && (
            <div className="py-6 text-center">
              <div className="w-8 h-[2px] bg-slate-100 mx-auto rounded-full mb-3" />
              <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">
                End of registry
              </p>
            </div>
          )}
        </div>

        {/* Backdrop for closing */}
        {notificationDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/5 z-[-1] cursor-default"
            onClick={() => setNotificationDrawerOpen(false)}
          />
        )}
      </div>

      {/* ---------------- MOBILE LEFT DRAWER ---------------- */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "75%",
            maxWidth: "250px",
          },
        }}
      >
        <div className="p-2">
          <div className="flex items-start justify-start py-3">
            <img
              alt="Hunger Free"
              src="/Icon2.svg"
              className="h-16 w-20 transition-all duration-300"
            />
          </div>

          <nav className="flex flex-col mt-3 space-y-2 w-full">
            <HeaderItem
              icon={<HomeIcon className="h-6 w-6" />}
              label="Dashboard"
            />
            <HeaderItem
              icon={<UsersIcon className="h-6 w-6" />}
              label="Users"
            />
            <HeaderItem
              icon={<HeartIcon className="h-6 w-6" />}
              label="Donations"
            />
            <HeaderItem
              icon={<BellIcon className="h-6 w-6" />}
              label="Alerts"
            />
            <HeaderItem
              icon={<ChartBarIcon className="h-6 w-6" />}
              label="Analytics"
            />
            <HeaderItem
              icon={<SettingsIcon className="h-6 w-6" />}
              label="Settings"
            />
          </nav>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
