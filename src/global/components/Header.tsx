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
  AlertCircleIcon,
  InfoIcon,
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
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const getNotificationIcon = (iconType: string) => {
    switch (iconType) {
      case "check":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "alert":
        return <AlertCircleIcon className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-gray-500" />;
    }
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
          "fixed top-0 right-0 h-20 bg-white shadow z-40 flex items-center justify-between px-6 transition-all duration-300 " +
          (expanded ? "md:left-50" : "md:left-20") +
          " left-0 right-0"
        }
      >
        {/* Left section - Mobile menu and title */}
        <div className="flex items-center">
          {/* MOBILE HAMBURGER (visible only < md) */}
          <div className="md:hidden mr-4">
            <IconButton onClick={() => setMobileDrawerOpen(true)}>
              <MenuIcon color="black" />
            </IconButton>
          </div>

          {/* Title - Visible on all screens */}
          <p className="text-black text-2xl font-semibold">
            Welcome Back, Admin
          </p>
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
              <BellIcon color="black" className="h-6 w-6" />
            </Badge>
          </IconButton>

          {/* Avatar Dropdown Trigger */}
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
                    width: "160px",
                    maxWidth: "160px",
                    boxShadow: 3,
                    "@media (max-width: 640px)": {
                      width: "140px",
                      maxWidth: "140px",
                      "& .MuiMenuItem-root": {
                        fontSize: "0.875rem",
                        minHeight: "40px",
                        padding: "8px 12px",
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
                    fontSize: "0.875rem",
                    minHeight: "36px",
                    "@media (max-width: 640px)": {
                      minHeight: "40px",
                      fontSize: "0.875rem",
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
        </div>
      </header>

      {/* ---------------- NOTIFICATION DRAWER ---------------- */}
      <Drawer
        anchor="right"
        open={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "420px",
            "@media (max-width: 640px)": {
              width: "100%",
              maxWidth: "100%",
            },
          },
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>
              <p className="text-sm text-gray-500">
                {getUnreadCount()} unread messages
              </p>
            </div>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md bg-gray-100"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <BellIcon className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notifications
                </h3>
                <p className="text-gray-500">
                  You're all caught up! Check back later for updates.
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      notification.isRead
                        ? "bg-white border-gray-200"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4
                            className={`text-sm font-medium ${
                              notification.isRead
                                ? "text-gray-900"
                                : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600 bg-gray-100 transition-colors"
                          >
                            <XIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {formatDistanceToNow(notification.time, {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Drawer>

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
