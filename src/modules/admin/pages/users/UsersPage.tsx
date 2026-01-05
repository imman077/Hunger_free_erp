import { useState, useMemo, useCallback } from "react";
import { Mail, Phone, Building, Globe } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tabs as MuiTabs,
  Tab as MuiTab,
  Button,
  ThemeProvider,
  TextField,
  Chip as MuiChip,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import theme from "../../../../global/utils/theme";
import CustomTabs, {
  type Tab,
} from "../../../../global/components/resuable-components/tabs";
import ResuableTable from "../../../../global/components/resuable-components/table";
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

const TABS: Tab[] = [
  { label: "All", value: "All", count: USERS.length, showCount: true },
  { label: "Donors", value: "Donors" },
  { label: "NGOs", value: "NGOs" },
  { label: "Volunteers", value: "Volunteers" },
  { label: "Admins", value: "Admins" },
];

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("Profile Details");

  // HeroUI Column definitions
  const columns: ColumnDef[] = useMemo(
    () => [
      { name: "Image", uid: "avatar", sortable: false },
      { name: "User", uid: "name", sortable: true },
      { name: "Role", uid: "role", sortable: true },
      { name: "Type", uid: "type", sortable: true },
      { name: "Status", uid: "status", sortable: true },
      { name: "Join Date", uid: "date", sortable: true },
      { name: "Email", uid: "email", sortable: true },
      { name: "Phone", uid: "phone" },
      { name: "Location", uid: "location", sortable: true },
      { name: "Points", uid: "totalPoints", sortable: true },
      { name: "Actions", uid: "actions", sortable: false },
    ],
    []
  );

  // Filter users based on active tab
  const filteredUsers = useMemo(() => {
    if (activeTab === "All") return USERS;
    const typeMap: Record<string, string> = {
      Donors: "Donor",
      NGOs: "NGO",
      Volunteers: "Volunteer",
      Admins: "Admin",
    };
    return USERS.filter((user) => user.type === typeMap[activeTab]);
  }, [activeTab]);

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
        case "avatar":
          return (
            <div className="flex justify-center">
              <img
                src={`https://i.pravatar.cc/150?u=${user.id}`}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => openUserModal(user)}
              />
            </div>
          );
        case "name":
          return (
            <div
              className="flex flex-col add new-pointer"
              onClick={() => openUserModal(user)}
            >
              <span
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {user.name}
              </span>
            </div>
          );
        case "role":
          const roleColors: Record<string, string> = {
            Donor: "bg-blue-100 text-blue-800",
            NGO: "bg-purple-100 text-purple-800",
            Volunteer: "bg-green-100 text-green-800",
            Admin: "bg-red-100 text-red-800",
          };
          return (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block ${
                roleColors[user.role] || "bg-gray-100 text-gray-800"
              }`}
            >
              {user.role}
            </span>
          );
        case "type":
          return (
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {user.organization}
            </span>
          );
        case "status":
          const statusColors: Record<string, string> = {
            Active: "bg-green-100 text-green-800",
            New: "bg-blue-100 text-blue-800",
            Pending: "bg-yellow-100 text-yellow-800",
          };
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusColors[user.status] || "bg-gray-100 text-gray-800"
              }`}
            >
              {user.status}
            </span>
          );
        case "totalPoints":
          return (
            <span style={{ color: "var(--text-primary)" }}>
              {cellValue as number}
            </span>
          );
        default:
          return (
            <span style={{ color: "var(--text-secondary)" }}>
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

        {/* Custom Tabs */}
        <CustomTabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mt-6"
        />

        {/* Users Table - Generic HeroUI Table */}
        <ResuableTable
          data={filteredUsers}
          columns={columns}
          renderCell={renderCell}
          initialVisibleColumns={[
            "avatar",
            "name",
            "role",
            "status",
            "date",
            "email",
            "phone",
            "location",
            "totalPoints",
            "actions",
          ]}
          onAddNew={() => console.log("Add new clicked")}
          actionConfig={{
            showView: true,
            showMessage: true,
            showApprove: true,
            showDeactivate: true,
            // onView: handleViewProfile,
            onMessage: (donor) => console.log("Message", donor),
            onApprove: (donor) => console.log("Approve", donor),
            onDeactivate: (donor) => console.log("Deactivate", donor),
          }}
        />
      </div>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <ThemeProvider theme={theme}>
          <Dialog
            open={isModalOpen}
            onClose={closeModal}
            maxWidth="lg"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                maxHeight: "90vh",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
              },
            }}
          >
            <DialogTitle sx={{ borderBottom: "1px solid var(--border-color)" }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{ color: "var(--text-primary)" }}
                  >
                    {selectedUser.name}
                  </Typography>
                  <MuiChip
                    label={selectedUser.role}
                    color="primary"
                    size="small"
                  />
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          selectedUser.status === "Active"
                            ? "success.main"
                            : selectedUser.status === "New"
                            ? "info.main"
                            : "warning.main",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-muted)" }}
                    >
                      {selectedUser.status}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={closeModal}
                  size="small"
                  sx={{ color: "var(--text-secondary)" }}
                >
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ borderColor: "var(--border-color)" }}>
              <MuiTabs
                value={modalTab}
                onChange={(_, newValue) => setModalTab(newValue)}
                sx={{
                  mb: 3,
                  "& .MuiTab-root": { color: "var(--text-muted)" },
                  "& .Mui-selected": { color: "#22c55e !important" },
                  "& .MuiTabs-indicator": { backgroundColor: "#22c55e" },
                }}
              >
                <MuiTab value="Profile Details" label="Profile Details" />
                <MuiTab value="Donation History" label="Donation History" />
              </MuiTabs>

              {modalTab === "Profile Details" ? (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap={3}
                >
                  {/* User ID Card */}
                  <Card
                    sx={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "var(--text-muted)" }}
                        >
                          User ID
                        </Typography>
                        <Box
                          p={1}
                          sx={{ bgcolor: "var(--bg-primary)", borderRadius: 2 }}
                        >
                          <Building
                            style={{
                              color: "var(--text-muted)",
                              width: 20,
                              height: 20,
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography
                        variant="h4"
                        mt={1}
                        sx={{ color: "var(--text-primary)" }}
                      >
                        {selectedUser.userId}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Joined Date Card */}
                  <Card
                    sx={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "var(--text-muted)" }}
                        >
                          Joined Date
                        </Typography>
                        <Box
                          p={1}
                          sx={{ bgcolor: "var(--bg-primary)", borderRadius: 2 }}
                        >
                          <Globe
                            style={{
                              color: "var(--text-muted)",
                              width: 20,
                              height: 20,
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography
                        variant="h4"
                        mt={1}
                        sx={{ color: "var(--text-primary)" }}
                      >
                        {selectedUser.joinedDate}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Profile Card */}
                  <Card
                    sx={{
                      gridColumn: "span 1",
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h3"
                        gutterBottom
                        sx={{ color: "var(--text-primary)" }}
                      >
                        Profile
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={3}
                      >
                        <Box
                          sx={{
                            width: 96,
                            height: 96,
                            bgcolor: "primary.light",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "primary.main",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            mb: 2,
                          }}
                        >
                          {selectedUser.name.charAt(0)}
                        </Box>
                      </Box>

                      <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Mail
                            style={{
                              color: "var(--text-muted)",
                              width: 20,
                              height: 20,
                            }}
                          />
                          <Typography sx={{ color: "var(--text-secondary)" }}>
                            {selectedUser.email}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Phone
                            style={{
                              color: "var(--text-muted)",
                              width: 20,
                              height: 20,
                            }}
                          />
                          <Typography sx={{ color: "var(--text-secondary)" }}>
                            {selectedUser.phone}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Building
                            style={{
                              color: "var(--text-muted)",
                              width: 20,
                              height: 20,
                            }}
                          />
                          <Typography sx={{ color: "var(--text-secondary)" }}>
                            {selectedUser.organization}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Overview Card */}
                  <Card
                    sx={{
                      gridColumn: "span 1",
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h3"
                        gutterBottom
                        sx={{ color: "var(--text-primary)" }}
                      >
                        Overview
                      </Typography>

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={4}
                      >
                        <Typography variant="h2" sx={{ color: "#22c55e" }}>
                          {selectedUser.donationsMade}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "var(--text-muted)" }}
                        >
                          Donations Made
                        </Typography>
                      </Box>

                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "var(--text-primary)" }}
                      >
                        Recent Events
                      </Typography>

                      {/* Timeline (unchanged) */}
                      <Box sx={{ position: "relative" }}>
                        <Box
                          sx={{
                            position: "absolute",
                            left: 6,
                            top: 0,
                            bottom: 0,
                            width: 2,
                            bgcolor: "var(--border-color)",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {/* Timeline items omitted for brevity as they are unchanged */}
                          {selectedUser.miniTimeline.map((item) => (
                            <Box
                              key={item.event}
                              sx={{
                                display: "flex",
                                gap: 2,
                                position: "relative",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: "50%",
                                  bgcolor: "primary.main",
                                  mt: 0.5,
                                  zIndex: 1,
                                }}
                              />
                              <Box>
                                <Typography
                                  variant="body2"
                                  fontWeight="medium"
                                  sx={{ color: "var(--text-primary)" }}
                                >
                                  {item.event}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "var(--text-muted)" }}
                                >
                                  {item.date}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ) : (
                <Card
                  sx={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={3}
                    >
                      <Typography
                        variant="h3"
                        sx={{ color: "var(--text-primary)" }}
                      >
                        Donation History
                      </Typography>
                      <Box display="flex" gap={1} alignItems="center">
                        <TextField
                          type="date"
                          size="small"
                          defaultValue="2025-10-01"
                          sx={{
                            width: 150,
                            "& .MuiInputBase-input": {
                              color: "var(--text-primary)",
                            },
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "var(--text-muted)" }}
                        >
                          to
                        </Typography>
                        <TextField
                          type="date"
                          size="small"
                          defaultValue="2025-12-31"
                          sx={{
                            width: 150,
                            "& .MuiInputBase-input": {
                              color: "var(--text-primary)",
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Table for donation history using Global ResuableTable */}
                    <ResuableTable
                      data={[
                        {
                          date: "11/20/2025",
                          donationId: "DON-10234",
                          type: "Prepared",
                          item: "50 meals",
                          quantity: "50 meals",
                          location: "Central Kitchen",
                          status: "Completed",
                          notes: "Delivered on time",
                        },
                        {
                          date: "10/15/2025",
                          donationId: "DON-09821",
                          type: "Canned Goods",
                          item: "Vegetables & Soup",
                          quantity: "100 cans",
                          location: "North Warehouse",
                          status: "Verified",
                          notes: "-",
                        },
                      ]}
                      columns={[
                        { uid: "date", name: "Date", sortable: true },
                        {
                          uid: "donationId",
                          name: "Donation ID",
                          sortable: true,
                        },
                        { uid: "type", name: "Type", sortable: true },
                        { uid: "item", name: "Item/Description" },
                        { uid: "quantity", name: "Quantity" },
                        { uid: "location", name: "Location", sortable: true },
                        { uid: "status", name: "Status", sortable: true },
                        { uid: "notes", name: "Notes" },
                      ]}
                      renderCell={(item: any, columnKey: React.Key) => {
                        const val = item[columnKey as string];
                        if (columnKey === "status") {
                          const color =
                            val === "Completed"
                              ? "success"
                              : val === "Verified"
                              ? "info"
                              : "default";
                          // Using MUI Chip for consistency within MUI Dialog, though wrapper is HeroUI Table.
                          // It works as it renders as HTML.
                          return (
                            <MuiChip
                              label={val}
                              color={color as any}
                              size="small"
                            />
                          );
                        }
                        return (
                          <span style={{ color: "var(--text-secondary)" }}>
                            {val}
                          </span>
                        );
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </DialogContent>

            <DialogActions
              sx={{ borderTop: "1px solid var(--border-color)", p: 2 }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-color)",
                  "&:hover": { borderColor: "#22c55e", color: "#22c55e" },
                }}
              >
                Export Profile
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      )}
    </>
  );
};

export default UsersPage;
