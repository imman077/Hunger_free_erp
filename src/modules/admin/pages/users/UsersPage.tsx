import { useState, useMemo, useCallback } from "react";
import { Building, Sparkles, RotateCcw } from "lucide-react";
import { Avatar } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/react";
import { Filter, X, ChevronDown, Plus } from "lucide-react";
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
    name: "Hotel Grand",
    role: "Donor",
    status: "Active",
    date: "Dec 1, 2023",
    userId: "USR-00789",
    joinedDate: "3/15/2022",
    lastLogin: "2024-07-28",
    lastLoginTime: "10:30 AM",
    totalPoints: 1250,
    email: "hotel.grand@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 90210",
    organization: "Global Charity Foundation",
    location: "California, USA",
    badges: ["Restaurant", "Verified"],
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
    name: "Hope Foundation",
    role: "NGO",
    status: "Active",
    date: "Nov 28, 2023",
    userId: "USR-00790",
    joinedDate: "11/28/2023",
    lastLogin: "2024-07-27",
    lastLoginTime: "2:15 PM",
    totalPoints: 890,
    email: "contact@hopefoundation.org",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Metro City, NY 10001",
    organization: "Hope Foundation",
    location: "New York, USA",
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
    name: "Raj Kumar",
    role: "Volunteer",
    status: "New",
    date: "Dec 15, 2023",
    userId: "USR-00791",
    joinedDate: "12/15/2023",
    lastLogin: "2024-07-26",
    lastLoginTime: "9:00 AM",
    totalPoints: 320,
    email: "raj.kumar@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Elm St, Townsville, TX 75001",
    organization: "Independent Volunteer",
    location: "Texas, USA",
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
    email: "admin@hungerfreeerp.com",
    phone: "+1 (555) 111-2222",
    address: "Admin Office, HQ Building",
    organization: "Hunger Free ERP",
    location: "Headquarters",
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
    name: "Green Earth Trust",
    role: "NGO",
    status: "Pending",
    date: "Dec 10, 2023",
    userId: "USR-00793",
    joinedDate: "12/10/2023",
    lastLogin: "2024-07-25",
    lastLoginTime: "3:45 PM",
    totalPoints: 150,
    email: "info@greenearthtrust.org",
    phone: "+1 (555) 333-4444",
    address: "321 Green Blvd, Eco City, WA 98001",
    organization: "Green Earth Trust",
    location: "Washington, USA",
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
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter States
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const toggleFilter = (filterType: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType]
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
      { name: "Actions", uid: "actions", sortable: false },
    ],
    []
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

  const openUserModal = useCallback((user: UserItem) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  // Render cell function for the MAIN user table
  const renderCell = useCallback(
    (user: UserItem, columnKey: React.Key) => {
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
            <div
              className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-slate-50/50 border border-slate-100 w-fit min-w-0 cursor-pointer hover:bg-hf-green/5 hover:border-hf-green/20 transition-all group"
              onClick={() => openUserModal(user)}
            >
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
            <span
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              {String(cellValue)}
            </span>
          );
      }
    },
    [openUserModal]
  );

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
      <Dropdown placement="bottom-end">
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
    <>
      <div
        className="w-full space-y-6 p-6 min-h-screen"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            User Management
          </h1>
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
            "actions",
          ]}
          actionConfig={{
            showView: true,
            onView: openUserModal,
            showApprove: true,
            showDeactivate: true,
            onApprove: (user) => console.log("Approve", user),
            onDeactivate: (user) => console.log("Deactivate", user),
          }}
        />
      </div>

      {/* User Details Drawer - Standardized to Donor Template */}
      <Drawer
        isOpen={isModalOpen}
        onClose={closeModal}
        hideCloseButton={true}
        placement="right"
        classNames={{
          base: "w-[400px] !max-w-[400px] overflow-y-scroll scrollbar-hide",
          backdrop: "bg-black/50",
        }}
      >
        <DrawerContent
          className="no-scrollbar"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {() => (
            <>
              {selectedUser && (
                <>
                  <DrawerHeader
                    className="flex flex-col gap-1 no-scrollbar border-b px-6 py-4"
                    style={{ borderBottomColor: "var(--border-color)" }}
                  >
                    <div className="flex items-center justify-between">
                      <h2
                        className="text-xl font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        User Details
                      </h2>
                      <Button
                        isIconOnly
                        variant="light"
                        onPress={closeModal}
                        size="sm"
                        className="hover:bg-slate-100 transition-colors rounded-full h-8 w-8 min-w-0"
                      >
                        <X size={20} className="text-slate-400" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Account Overview
                      </span>
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor:
                            selectedUser.status === "Active"
                              ? "rgba(34, 197, 94, 0.1)"
                              : selectedUser.status === "New"
                              ? "rgba(59, 130, 246, 0.1)"
                              : "rgba(234, 179, 8, 0.1)",
                          color:
                            selectedUser.status === "Active"
                              ? "#22c55e"
                              : selectedUser.status === "New"
                              ? "#3b82f6"
                              : "#eab308",
                          border: `1px solid ${
                            selectedUser.status === "Active"
                              ? "rgba(34, 197, 94, 0.2)"
                              : selectedUser.status === "New"
                              ? "rgba(59, 130, 246, 0.2)"
                              : "rgba(234, 179, 8, 0.2)"
                          }`,
                        }}
                      >
                        {selectedUser.status}
                      </span>
                    </div>
                  </DrawerHeader>

                  <DrawerBody className="px-6 py-4 space-y-6 overflow-y-auto no-scrollbar">
                    {/* Role-aware Gradient Overview Card */}
                    {(() => {
                      const roleGradients: Record<string, string> = {
                        Donor:
                          "linear-gradient(to right, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1))",
                        NGO: "linear-gradient(to right, rgba(79, 70, 229, 0.1), rgba(99, 102, 241, 0.1))",
                        Volunteer:
                          "linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))",
                      };
                      const roleBorderColors: Record<string, string> = {
                        Donor: "rgba(245, 158, 11, 0.2)",
                        NGO: "rgba(79, 70, 229, 0.2)",
                        Volunteer: "rgba(16, 185, 129, 0.2)",
                      };
                      const roleAvatarColors: Record<string, string> = {
                        Donor: "bg-gradient-to-br from-amber-400 to-orange-600",
                        NGO: "bg-gradient-to-br from-indigo-400 to-blue-600",
                        Volunteer:
                          "bg-gradient-to-br from-emerald-400 to-green-600",
                      };
                      const roleLabelColors: Record<string, string> = {
                        Donor: "text-amber-600",
                        NGO: "text-indigo-600",
                        Volunteer: "text-emerald-600",
                      };

                      const currentGradient =
                        roleGradients[selectedUser.role] ||
                        "linear-gradient(to right, rgba(148, 163, 184, 0.1), rgba(203, 213, 225, 0.1))";
                      const currentBorder =
                        roleBorderColors[selectedUser.role] ||
                        "rgba(148, 163, 184, 0.2)";
                      const currentAvatarBg =
                        roleAvatarColors[selectedUser.role] || "bg-slate-400";
                      const currentLabelColor =
                        roleLabelColors[selectedUser.role] || "text-slate-600";

                      return (
                        <div
                          className="p-4 rounded-lg border"
                          style={{
                            background: currentGradient,
                            borderColor: currentBorder,
                          }}
                        >
                          <div className="flex items-center gap-4">
                            {selectedUser.avatar ? (
                              <Avatar
                                src={selectedUser.avatar as any}
                                name={selectedUser.name}
                                className="w-12 h-12 text-lg shadow-md"
                                showFallback
                              />
                            ) : (
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md ${currentAvatarBg}`}
                              >
                                {selectedUser.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                            )}
                            <div>
                              <h3
                                className="font-bold text-lg leading-tight"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {selectedUser.name}
                              </h3>
                              <p
                                className={`text-xs font-semibold uppercase tracking-widest mt-1 ${currentLabelColor}`}
                              >
                                {selectedUser.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="p-3 rounded-lg border text-center"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          borderColor: "var(--border-color)",
                        }}
                      >
                        <p
                          className="text-[10px] font-black uppercase tracking-widest mb-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Total Points
                        </p>
                        <p
                          className="text-lg font-black"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {selectedUser.totalPoints?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div
                        className="p-3 rounded-lg border text-center"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          borderColor: "var(--border-color)",
                        }}
                      >
                        <p
                          className="text-[10px] font-black uppercase tracking-widest mb-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Donations
                        </p>
                        <p
                          className="text-lg font-black"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {selectedUser.donationsMade || 0}
                        </p>
                      </div>
                    </div>

                    {/* Contact Information Section */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        {/* Email */}
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-slate-600 text-sm">📧</span>
                          </div>
                          <div>
                            <div
                              className="text-[10px] font-black uppercase tracking-widest"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Email Address
                            </div>
                            <div
                              className="text-sm font-bold break-all"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {selectedUser.email}
                            </div>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-slate-600 text-sm">📱</span>
                          </div>
                          <div>
                            <div
                              className="text-[10px] font-black uppercase tracking-widest"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Phone Number
                            </div>
                            <div
                              className="text-sm font-bold"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {selectedUser.phone}
                            </div>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-slate-600 text-sm">📍</span>
                          </div>
                          <div>
                            <div
                              className="text-[10px] font-black uppercase tracking-widest"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Physical Address
                            </div>
                            <div
                              className="text-sm font-bold leading-relaxed"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {selectedUser.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Details */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Account Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p
                            className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            User ID
                          </p>
                          <p
                            className="text-xs font-bold"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {selectedUser.userId}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            Joined Date
                          </p>
                          <p
                            className="text-xs font-bold"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {selectedUser.joinedDate}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            Last Login
                          </p>
                          <p
                            className="text-xs font-bold"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {selectedUser.lastLogin}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            Avg Rating
                          </p>
                          <p
                            className="text-xs font-bold"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            ⭐ {selectedUser.avgRating}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Recent Activity
                      </h3>
                      <div className="space-y-2">
                        {selectedUser.recentActivity.map((item, index) => (
                          <div
                            key={index}
                            className="p-3 rounded border flex items-center justify-between group hover:border-hf-green/20 transition-colors"
                            style={{
                              backgroundColor: "var(--bg-secondary)",
                              borderColor: "var(--border-color)",
                            }}
                          >
                            <div className="min-w-0 pr-2">
                              <p
                                className="text-xs font-bold truncate"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {item.action}
                              </p>
                              <p
                                className="text-[10px] font-medium"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {item.time}
                              </p>
                            </div>
                            <div className="shrink-0">
                              {item.icon === "donate" ? (
                                <Sparkles
                                  size={14}
                                  className="text-emerald-500"
                                />
                              ) : item.icon === "update" ? (
                                <RotateCcw
                                  size={14}
                                  className="text-blue-500"
                                />
                              ) : (
                                <Building
                                  size={14}
                                  className="text-slate-400"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Final Actions Area */}
                    <div className="pt-4 flex gap-2">
                      <Button
                        className="flex-1 bg-hf-green text-white font-black text-xs uppercase tracking-widest h-12 rounded-sm shadow-lg shadow-emerald-500/20"
                        style={{ backgroundColor: "#22c55e" }}
                      >
                        Export Profile
                      </Button>
                      <Button
                        variant="flat"
                        className="flex-1 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest h-12 rounded-sm"
                        onPress={closeModal}
                      >
                        Close
                      </Button>
                    </div>
                  </DrawerBody>
                </>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UsersPage;
