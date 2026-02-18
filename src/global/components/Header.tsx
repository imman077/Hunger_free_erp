import { useState } from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { BellIcon, CheckCheck, User, LogOut, Settings } from "lucide-react";
import { useSidebar } from "../contexts/SidebarContext";
import { formatDistanceToNow } from "date-fns";
import ThemeToggle from "./ThemeToggle";
import {
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "./resuable-components/Icon";

/* ---------------- Interfaces ---------------- */

interface Notification {
  id: number;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  time: Date;
  isRead: boolean;
  icon: string;
  avatar?: string;
  user?: string;
}

// Professional Notification Data
const notificationData: Notification[] = [
  {
    id: 1,
    type: "success",
    user: "Isaiah Rivera",
    avatar: "https://i.pravatar.cc/150?u=1",
    title: "has registered",
    message: "New donation profile created successfully",
    time: new Date(Date.now() - 2 * 60 * 1000),
    isRead: false,
    icon: "check",
  },
  {
    id: 2,
    type: "info",
    user: "Samuel Young",
    avatar: "https://i.pravatar.cc/150?u=2",
    title: "has registered",
    message: "New volunteer application received",
    time: new Date(Date.now() - 20 * 60 * 1000),
    isRead: false,
    icon: "info",
  },
  {
    id: 3,
    type: "warning",
    user: "Christian Brooks",
    avatar: "https://i.pravatar.cc/150?u=3",
    title: "request for KYC verifications",
    message: "Supporting documents pending review",
    time: new Date(Date.now() - 60 * 60 * 1000),
    isRead: true,
    icon: "alert",
  },
  {
    id: 4,
    type: "success",
    user: "Levi Collins",
    avatar: "https://i.pravatar.cc/150?u=4",
    title: "has registered",
    message: "NGO partnership verified",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    icon: "check",
  },
  {
    id: 5,
    type: "info",
    user: "Isabella Anderson",
    avatar: "https://i.pravatar.cc/150?u=5",
    title: "has registered",
    message: "Donor account active",
    time: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: false,
    icon: "info",
  },
];

const Header = () => {
  const { expanded, setMobileOpen } = useSidebar();
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [notificationExpanded, setNotificationExpanded] = useState(false);
  const [notifications, setNotifications] = useState(notificationData);
  const [selectedTab, setSelectedTab] = useState<any>("all");

  const handleNotificationClick = () => {
    setNotificationDrawerOpen(true);
  };

  const getUnreadCount = () => {
    return notifications.filter((notification) => !notification.isRead).length;
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  return (
    <>
      <header
        className={
          "fixed top-0 right-0 h-16 md:h-20 z-40 flex items-center justify-between px-3 md:px-6 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] border-b " +
          (expanded ? "left-0 md:left-[260px]" : "left-0 md:left-[70px]")
        }
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Left section - hamburger on mobile only */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border transition-all"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-primary)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

        {/* Right section - Notifications and avatar */}
        <div className="flex flex-row gap-2 md:gap-3 items-center">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          {/* Bell Notification */}
          <IconButton
            onClick={handleNotificationClick}
            sx={{
              padding: "0",
              width: { xs: "36px", md: "44px" },
              height: { xs: "36px", md: "44px" },
              backgroundColor: "var(--bg-tertiary)",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "var(--bg-hover)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Badge
              overlap="circular"
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#3b82f6",
                  top: 2,
                  right: 2,
                  border: "2px solid white",
                },
              }}
            >
              <BellIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </Badge>
          </IconButton>

          {/* Vertical Separator - hidden on mobile */}
          <div className="hidden sm:block h-8 w-px bg-slate-100 dark:bg-slate-800" />

          {/* Avatar Profile */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex items-center gap-1.5 md:gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar
                  alt="User"
                  src="https://mui.com/static/images/avatar/1.jpg"
                  sx={{
                    width: { xs: 32, md: 40 },
                    height: { xs: 32, md: 40 },
                    borderRadius: "full",
                    border: "2px solid white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                />
                <Icon
                  name="chevron-down"
                  className="hidden sm:block w-3.5 h-3.5 text-slate-400"
                />
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile actions"
              variant="flat"
              classNames={{
                base: "p-1 min-w-[200px] border rounded-xl shadow-2xl",
              }}
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
              itemClasses={{
                base: [
                  "rounded-lg",
                  "text-slate-500",
                  "transition-all",
                  "data-[hover=true]:bg-slate-100",
                  "dark:data-[hover=true]:bg-slate-800",
                  "data-[hover=true]:text-emerald-500",
                  "py-2.5",
                  "px-3",
                ],
              }}
            >
              <DropdownItem
                key="profile-header"
                className="h-14 gap-2 opacity-100 pointer-events-none mb-1 border-b border-dashed border-slate-100 dark:border-slate-800 rounded-none pb-3"
              >
                <div className="flex flex-col">
                  <p className="text-xs font-black uppercase tracking-widest text-[#22c55e]">
                    Logged in as
                  </p>
                  <p className="font-bold text-sm text-[var(--text-primary)]">
                    Admin Hub
                  </p>
                </div>
              </DropdownItem>
              <DropdownItem
                key="view-profile"
                startContent={<User size={18} />}
                className="font-semibold text-sm"
              >
                View Profile
              </DropdownItem>
              <DropdownItem
                key="settings"
                startContent={<Settings size={18} />}
                className="font-semibold text-sm"
              >
                Account Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger font-semibold text-sm mt-1 pt-3 border-t border-dashed border-slate-100 dark:border-slate-800 rounded-none"
                startContent={<LogOut size={18} />}
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>

      {/* ---------------- NOTIFICATION CENTER (CUSTOM POPOVER) ---------------- */}
      {notificationDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => {
              setNotificationDrawerOpen(false);
              setNotificationExpanded(false);
            }}
          />

          {/* Notification Popover */}
          <div
            className={`fixed z-[9999] mt-20 right-4 top-0 rounded-xl border shadow-[0_32px_120px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden transition-all duration-300 ${
              notificationExpanded
                ? "w-[calc(100vw-32px)] md:w-[800px] h-[calc(100vh-120px)] md:right-8"
                : "w-[calc(100vw-32px)] md:w-[420px] h-[620px] max-h-[85vh] md:right-12"
            }`}
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 px-6 py-5 flex items-center justify-between border-b"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              <span
                className="font-bold text-xl"
                style={{ color: "var(--text-primary)" }}
              >
                Notifications
              </span>
              <button
                onClick={() => {
                  setNotificationDrawerOpen(false);
                  setNotificationExpanded(false);
                }}
                className="p-1.5 hover:opacity-70 rounded-sm transition-all"
                style={{ color: "var(--text-muted)" }}
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div
              className="flex-shrink-0 px-6 py-2"
              style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <div
                className="border p-1 rounded-lg"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <Tabs
                  variant="light"
                  size="sm"
                  fullWidth
                  selectedKey={selectedTab}
                  onSelectionChange={setSelectedTab}
                  classNames={{
                    tabList:
                      "gap-0 items-center h-9 p-0 shadow-none bg-transparent",
                    cursor: "shadow-sm rounded-md border",
                    tab: "h-full",
                    tabContent:
                      "group-data-[selected=true]:!text-[var(--text-primary)] !text-[var(--text-secondary)] font-bold text-[11px] uppercase tracking-widest",
                  }}
                >
                  <Tab key="all" title="All" />
                  <Tab
                    key="unread"
                    title={
                      <div className="flex items-center gap-2">
                        <span className="!text-inherit">Unread</span>
                        <span
                          className={`${getUnreadCount() > 0 ? "bg-[#3b82f6] text-white" : "bg-slate-200 text-slate-500"} text-[10px] px-2 py-0.5 rounded-full font-black min-w-[20px] text-center`}
                        >
                          {getUnreadCount() > 9 ? "9+" : getUnreadCount()}
                        </span>
                      </div>
                    }
                  />
                </Tabs>
              </div>
            </div>

            {/* Notification List - Scrollable */}
            <div
              className={`flex-1 overflow-y-auto thin-scrollbar px-2 py-4 ${notificationExpanded ? "grid grid-cols-1 md:grid-cols-2 gap-2" : "space-y-1.5"}`}
            >
              {notifications.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-20 opacity-20"
                  style={{ color: "var(--text-primary)" }}
                >
                  <BellIcon size={40} className="stroke-[1] mb-4" />
                  <p className="text-sm font-bold">No notifications</p>
                </div>
              ) : (
                notifications
                  .filter((n) => {
                    if (selectedTab === "unread") return !n.isRead;
                    return true;
                  })
                  .map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setNotifications((prev) =>
                          prev.map((item) =>
                            item.id === n.id ? { ...item, isRead: true } : item,
                          ),
                        );
                      }}
                      className={`group relative mx-2 px-4 py-3 transition-all duration-200 cursor-pointer flex items-center gap-4 rounded-xl border
                        ${
                          !n.isRead
                            ? "bg-emerald-500/5 border-emerald-500/10 shadow-[0_2px_12px_-3px_rgba(34,197,94,0.1)]"
                            : "bg-transparent border-transparent hover:bg-slate-500/5 hover:border-slate-500/10"
                        }`}
                    >
                      {/* Avatar */}
                      <div className="shrink-0">
                        <Avatar
                          src={n.avatar}
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "14px",
                            border: "2px solid var(--bg-primary)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          }}
                        />
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0 pr-6">
                        <p className="text-[13px] leading-snug">
                          <span
                            className="font-bold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {n.user || "System"}
                          </span>{" "}
                          <span
                            className="font-medium"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {n.title}
                          </span>
                        </p>
                        <p
                          className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-40"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {formatDistanceToNow(n.time, { addSuffix: true })}
                        </p>
                      </div>

                      {/* Unread Indicator Dot */}
                      {!n.isRead && (
                        <div className="w-1.5 h-6 rounded-full bg-emerald-500 shrink-0" />
                      )}
                    </div>
                  ))
              )}
            </div>

            {/* Footer - Fixed at Bottom */}
            <div
              className="flex-shrink-0 p-4 border-t grid grid-cols-2 gap-3"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              <button
                onClick={markAllAsRead}
                className="flex items-center justify-center gap-2 h-11 border rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-sm active:scale-95"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <CheckCheck size={16} className="text-emerald-500" />
                Mark Read
              </button>
              <button
                onClick={() => setNotificationExpanded(!notificationExpanded)}
                className="h-11 border rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-sm active:scale-95"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                {notificationExpanded ? "Show Less" : "View All"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ---------------- MOBILE LEFT DRAWER REMOVED (HANDLED BY SIDEBAR) ---------------- */}
      <div />
    </>
  );
};

export default Header;
