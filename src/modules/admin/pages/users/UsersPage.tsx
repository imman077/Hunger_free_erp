import { useState, useMemo, useCallback } from "react";
import { Building, Filter, X, ChevronDown, Plus } from "lucide-react";
import { Avatar } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
// No change needed here, just ensuring I don't break the import block
import ReusableTable from "../../../../global/components/resuable-components/table";
import type { ColumnDef } from "../../../../global/components/resuable-components/table";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";

// User type for this page (unchanged)
interface UserItem {
  id: number;
  name: string;
  role: string;
  status: string;
  date: string;
  userId: string;
  joinedDate: string;
  lastLogin: string;
  lastLoginTime: string;
  totalPoints: number;
  email: string;
  phone: string;
  address: string;
  organization: string;
  location: string;
  badges: string[];
  donationsMade: number;
  itemsDonated: number;
  avgRating: number;
  recentActivity: { action: string; time: string; icon: string }[];
  miniTimeline: { event: string; date: string }[];
  avatar?: string;
  [key: string]: unknown;
}

const USERS: UserItem[] = [
  // ... (Keeping exact same data as before)
  {
    id: 1,
    name: "ITC Grand Chola",
    role: "Donor",
    status: "Active",
    date: "Dec 1, 2023",
    userId: "USR-00789",
    joinedDate: "3/15/2022",
    lastLogin: "2024-07-28",
    lastLoginTime: "10:30 AM",
    totalPoints: 1250,
    email: "grandchola@itc.in",
    phone: "+91-44-2220-0000",
    address: "63, Mount Road, Guindy, Chennai, Tamil Nadu 600032",
    organization: "ITC Hotels",
    location: "Tamil Nadu, India",
    badges: ["Hotel", "Verified"],
    donationsMade: 7,
    itemsDonated: 25,
    avgRating: 4.8,
    recentActivity: [
      {
        action: "Donated 50 food items to local shelter.",
        time: "2 hours ago",
        icon: "donate",
      },
      {
        action: "Updated contact information.",
        time: "1 day ago",
        icon: "update",
      },
      { action: "Viewed donation history.", time: "3 days ago", icon: "view" },
    ],
    miniTimeline: [{ event: "Account created", date: "3/15/2022" }],
  },
  {
    id: 2,
    name: "CRY India",
    role: "NGO",
    status: "Active",
    date: "Nov 28, 2023",
    userId: "USR-00790",
    joinedDate: "11/28/2023",
    lastLogin: "2024-07-27",
    lastLoginTime: "2:15 PM",
    totalPoints: 890,
    email: "contact@cryindia.org",
    phone: "+91-22-2306-3651",
    address: "189/A, Anand Estate, Sane Guruji Marg, Mumbai, MH 400011",
    organization: "CRY - Child Rights and You",
    location: "Maharashtra, India",
    badges: ["NGO", "Verified"],
    donationsMade: 12,
    itemsDonated: 45,
    avgRating: 4.9,
    recentActivity: [
      {
        action: "Received 100 food items.",
        time: "5 hours ago",
        icon: "donate",
      },
      {
        action: "Updated profile information.",
        time: "2 days ago",
        icon: "update",
      },
    ],
    miniTimeline: [{ event: "Account created", date: "11/28/2023" }],
  },
  {
    id: 3,
    name: "Raj Kumar Singh",
    role: "Volunteer",
    status: "New",
    date: "Dec 15, 2023",
    userId: "USR-00791",
    joinedDate: "12/15/2023",
    lastLogin: "2024-07-26",
    lastLoginTime: "9:00 AM",
    totalPoints: 320,
    email: "raj.singh@gmail.com",
    phone: "+91-98765-11223",
    address: "H-24, Civil Lines, Jaipur, Rajasthan 302006",
    organization: "Independent Volunteer",
    location: "Rajasthan, India",
    badges: ["Volunteer"],
    donationsMade: 3,
    itemsDonated: 8,
    avgRating: 4.5,
    recentActivity: [
      {
        action: "Volunteered at food drive.",
        time: "1 day ago",
        icon: "donate",
      },
    ],
    miniTimeline: [{ event: "Account created", date: "12/15/2023" }],
  },
  {
    id: 4,
    name: "Admin One",
    role: "Admin",
    status: "Active",
    date: "Jan 5, 2023",
    userId: "USR-00792",
    joinedDate: "1/5/2023",
    lastLogin: "2024-07-28",
    lastLoginTime: "8:00 AM",
    totalPoints: 5000,
    email: "admin@hungerfreeindia.com",
    phone: "+91-11-2345-6789",
    address: "Connaught Place, New Delhi, Delhi 110001",
    organization: "Hunger Free India",
    location: "Delhi, India",
    badges: ["Admin", "Verified"],
    donationsMade: 0,
    itemsDonated: 0,
    avgRating: 5.0,
    recentActivity: [
      { action: "Managed user accounts.", time: "30 mins ago", icon: "update" },
    ],
    miniTimeline: [{ event: "Account created", date: "1/5/2023" }],
  },
  {
    id: 5,
    name: "Nanhi Kali",
    role: "NGO",
    status: "Pending",
    date: "Dec 10, 2023",
    userId: "USR-00793",
    joinedDate: "12/10/2023",
    lastLogin: "2024-07-25",
    lastLoginTime: "3:45 PM",
    totalPoints: 150,
    email: "support@nanhikali.org",
    phone: "+91-22-2491-0668",
    address: "K.C. Mahindra Education Trust, Worli, Mumbai, MH 400018",
    organization: "Project Nanhi Kali",
    location: "Maharashtra, India",
    badges: ["NGO"],
    donationsMade: 2,
    itemsDonated: 5,
    avgRating: 4.2,
    recentActivity: [
      {
        action: "Submitted verification documents.",
        time: "1 week ago",
        icon: "update",
      },
    ],
    miniTimeline: [{ event: "Account created", date: "12/10/2023" }],
  },
];

const ROLE_OPTIONS = ["Donor", "NGO", "Volunteer", "Admin"];
const STATUS_OPTIONS = ["Active", "New", "Pending"];

const UsersPage = () => {
  // Filter States
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const toggleFilter = (filterType: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType],
    );
    if (filterType === "role") setRoleFilter("all");
    if (filterType === "status") setStatusFilter("all");
  };

  // HeroUI Column definitions
  const columns: ColumnDef[] = useMemo(
    () => [
      { name: "User", uid: "name", sortable: true, align: "start" },
      { name: "Role", uid: "role", sortable: true },
      { name: "Type", uid: "type", sortable: true },
      { name: "Status", uid: "status", sortable: true, align: "center" },
      { name: "Join Date", uid: "date", sortable: true },
      { name: "Email", uid: "email", sortable: true },
      { name: "Phone", uid: "phone" },
      { name: "Location", uid: "location", sortable: true },
      { name: "Points", uid: "totalPoints", sortable: true },
    ],
    [],
  );

  // Filter users based on role and status
  const filteredUsers = useMemo(() => {
    return USERS.filter((user) => {
      const matchRole =
        !activeFilters.includes("role") ||
        roleFilter === "all" ||
        user.role === roleFilter;
      const matchStatus =
        !activeFilters.includes("status") ||
        statusFilter === "all" ||
        user.status === statusFilter;
      return matchRole && matchStatus;
    });
  }, [activeFilters, roleFilter, statusFilter]);

  // Render cell function for the MAIN user table
  const renderCell = useCallback((user: UserItem, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserItem];

    switch (columnKey) {
      case "name":
        const roleAvatarColors: Record<string, string> = {
          Donor: "bg-gradient-to-br from-amber-400 to-orange-600",
          NGO: "bg-gradient-to-br from-indigo-400 to-blue-600",
          Volunteer: "bg-gradient-to-br from-emerald-400 to-green-600",
        };
        const avatarBg = roleAvatarColors[user.role] || "bg-slate-400";

        return (
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-slate-50/50 border border-slate-100 w-fit min-w-0 group">
            {user.avatar ? (
              <Avatar
                src={user.avatar as any}
                name={user.name}
                className="w-7 h-7 text-[10px] shrink-0"
                showFallback
              />
            ) : (
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0 ${avatarBg}`}
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
            <span
              className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-hf-green transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {user.name}
            </span>
          </div>
        );
      case "role":
        const roleColors: Record<string, string> = {
          Donor: "bg-amber-50 text-amber-600 border-amber-100",
          NGO: "bg-indigo-50 text-indigo-600 border-indigo-100",
          Volunteer: "bg-emerald-50 text-emerald-600 border-emerald-100",
        };
        return (
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              roleColors[user.role] ||
              "bg-gray-50 text-gray-600 border-gray-100"
            }`}
          >
            {user.role.toUpperCase()}
          </span>
        );
      case "type":
        return (
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {user.organization}
          </span>
        );
      case "status":
        const statusColors: Record<string, string> = {
          Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
          New: "bg-blue-50 text-blue-600 border-blue-100",
          Pending: "bg-amber-50 text-amber-600 border-amber-100",
        };
        return (
          <div className="flex items-center justify-center gap-1.5 w-full">
            {/* <span
                className={`w-1.5 h-1.5 rounded-full ${
                  user.status === "Active"
                    ? "bg-emerald-500"
                    : user.status === "New"
                    ? "bg-blue-500"
                    : "bg-amber-500"
                }`}
              /> */}
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                statusColors[user.status] ||
                "bg-gray-50 text-gray-600 border-gray-100"
              }`}
            >
              {user.status.toUpperCase()}
            </span>
          </div>
        );
      case "phone":
        return (
          <span
            className="text-xs whitespace-nowrap"
            style={{ color: "var(--text-secondary)" }}
          >
            {String(cellValue)}
          </span>
        );
      case "totalPoints":
        const pointsColors: Record<string, string> = {
          Donor: "text-emerald-600",
          NGO: "text-indigo-600",
          Volunteer: "text-emerald-600",
        };
        return (
          <span
            className={`font-black text-xs ${
              pointsColors[user.role] || "text-slate-600"
            }`}
          >
            {cellValue as number}
          </span>
        );
      default:
        return (
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {String(cellValue)}
          </span>
        );
    }
  }, []);

  const userStats = [
    {
      label: "Total Users",
      val: "1,245",
      trend: "All registered users",
      color: "bg-[#22c55e]",
    },
    {
      label: "Active Users",
      val: "1,100",
      trend: "Currently active on platform",
      color: "bg-[#22c55e]",
    },
    {
      label: "New Users",
      val: "45",
      trend: "Joined in the last 30 days",
      color: "bg-[#22c55e]",
    },
  ];

  const additionalFilters = (
    <div className="flex items-center gap-2 flex-wrap">
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Button
            variant="flat"
            className="border border-slate-200 bg-white rounded-sm h-10 px-4 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-none"
            style={{ backgroundColor: "white" }}
            startContent={<Filter size={14} className="text-slate-400" />}
            endContent={<Plus size={14} className="text-slate-400" />}
          >
            ADD FILTER
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Add Filter Options"
          onAction={(key) => toggleFilter(key as string)}
          items={[
            { key: "role", label: "Role", icon: <Building size={14} /> },
            { key: "status", label: "Status", icon: <Filter size={14} /> },
          ]}
          classNames={{
            base: "bg-white border border-slate-200 rounded-sm min-w-[180px] p-1",
          }}
          itemClasses={{
            base: [
              "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
              "data-[hover=true]:bg-slate-50 data-[hover=true]:text-hf-green",
              "rounded-sm",
              "px-3",
              "py-2.5",
              "transition-colors duration-200",
            ].join(" "),
          }}
        >
          {(item: any) => (
            <DropdownItem
              key={item.key}
              isDisabled={activeFilters.includes(item.key)}
              startContent={item.icon}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>

      {activeFilters.includes("role") && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              className="border border-emerald-100 bg-emerald-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-hf-green hover:bg-emerald-100 transition-all shadow-none"
              endContent={<ChevronDown size={14} />}
            >
              ROLE: {roleFilter.toUpperCase()}
              <div
                className="ml-2 hover:bg-emerald-200 rounded-full p-0.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter("role");
                }}
              >
                <X size={12} />
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Role Filter Choices"
            selectionMode="single"
            selectedKeys={[roleFilter]}
            onSelectionChange={(keys) =>
              setRoleFilter(Array.from(keys)[0] as string)
            }
            items={[
              { key: "all", label: "All Roles" },
              ...ROLE_OPTIONS.map((role) => ({ key: role, label: role })),
            ]}
            classNames={{
              base: "bg-white border border-slate-200 rounded-sm min-w-[160px] p-1",
            }}
            itemClasses={{
              base: [
                "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                "data-[hover=true]:bg-slate-50 data-[hover=true]:text-hf-green",
                "data-[selected=true]:bg-emerald-50 data-[selected=true]:text-hf-green",
                "rounded-sm",
                "px-3",
                "py-2.5",
                "transition-colors duration-200",
              ].join(" "),
              selectedIcon: "text-hf-green w-4 h-4 ml-auto",
            }}
          >
            {(item: any) => (
              <DropdownItem key={item.key}>{item.label}</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      )}

      {activeFilters.includes("status") && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              className="border border-blue-100 bg-blue-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-blue-600 hover:bg-blue-100 transition-all shadow-none"
              endContent={<ChevronDown size={14} />}
            >
              STATUS: {statusFilter.toUpperCase()}
              <div
                className="ml-2 hover:bg-blue-200 rounded-full p-0.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter("status");
                }}
              >
                <X size={12} />
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Status Filter Choices"
            selectionMode="single"
            selectedKeys={[statusFilter]}
            onSelectionChange={(keys) =>
              setStatusFilter(Array.from(keys)[0] as string)
            }
            items={[
              { key: "all", label: "All Statuses" },
              ...STATUS_OPTIONS.map((status) => ({
                key: status,
                label: status,
              })),
            ]}
            classNames={{
              base: "bg-white border border-slate-200 rounded-sm min-w-[160px] p-1",
            }}
            itemClasses={{
              base: [
                "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                "data-[hover=true]:bg-slate-50 data-[hover=true]:text-hf-green",
                "data-[selected=true]:bg-emerald-50 data-[selected=true]:text-hf-green",
                "rounded-sm",
                "px-3",
                "py-2.5",
                "transition-colors duration-200",
              ].join(" "),
              selectedIcon: "text-hf-green w-4 h-4 ml-auto",
            }}
          >
            {(item: any) => (
              <DropdownItem key={item.key}>{item.label}</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );

  return (
    <div
      className="w-full space-y-6 p-6 min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div className="w-full flex-col items-center justify-between text-left">
        <h1
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          User Management
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          Manage and track all system users and their roles
        </p>
      </div>

      {/* Stats Cards */}
      <ImpactCards data={userStats} />

      {/* Users Table - Generic HeroUI Table */}
      <ReusableTable
        data={filteredUsers}
        columns={columns}
        renderCell={renderCell}
        variant="compact"
        enableFilters={false}
        additionalFilters={additionalFilters}
        initialVisibleColumns={[
          "name",
          "role",
          "status",
          "date",
          "phone",
          "totalPoints",
        ]}
      />
    </div>
  );
};

export default UsersPage;
