import { useState, useMemo, useCallback } from "react";
import { RefreshCcw, CheckCircle, Sparkles } from "lucide-react";
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
import ERPGridTable from "../../../../global/components/resuable-components/table";
import type { ColumnDef } from "../../../../global/components/resuable-components/table";

// User type for this page (unchanged)
interface UserItem {
  id: number;
  name: string;
  type: string;
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
    type: "Donor",
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
    type: "NGO",
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
    type: "Volunteer",
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
    type: "Admin",
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
    type: "NGO",
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
      { name: "User", uid: "name", sortable: true },
      { name: "Type", uid: "type", sortable: true },
      { name: "Status", uid: "status", sortable: true },
      { name: "Join Date", uid: "date", sortable: true },
      { name: "Email", uid: "email", sortable: true },
      { name: "Phone", uid: "phone" },
      { name: "Location", uid: "location", sortable: true },
      { name: "Points", uid: "totalPoints", sortable: true },
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
        case "name":
          return (
            <div
              className="flex items-center gap-3 py-1 cursor-pointer"
              onClick={() => openUserModal(user)}
            >
              <img
                src={`https://i.pravatar.cc/150?u=${user.id}`}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">{user.name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            </div>
          );
        case "type":
          const typeColors: Record<string, string> = {
            Donor: "bg-blue-100 text-blue-800",
            NGO: "bg-purple-100 text-purple-800",
            Volunteer: "bg-green-100 text-green-800",
            Admin: "bg-red-100 text-red-800",
          };
          return (
            <div className="flex flex-col gap-1">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block w-fit ${
                  typeColors[user.type] || "bg-gray-100 text-gray-800"
                }`}
              >
                {user.type}
              </span>
              <span className="text-xs text-gray-500">{user.organization}</span>
            </div>
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
          return <span>{cellValue as number}</span>;
        default:
          return <span>{String(cellValue)}</span>; // Ensure valid JSX
      }
    },
    [openUserModal]
  );

  return (
    <>
      <div className="w-full space-y-6 p-6">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            User Management
          </h1>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 text-black sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* Total Users */}
          <div className="bg-white p-6 rounded-md shadow-sm flex flex-col relative">
            <RefreshCcw
              size={18}
              className="absolute top-4 right-4 text-gray-400"
            />
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-3xl font-semibold mt-2">1,245</p>
            <p className="text-gray-400 text-sm mt-1">All registered users</p>
          </div>

          {/* Active Users */}
          <div className="bg-white p-6 rounded-md shadow-sm flex flex-col relative">
            <CheckCircle
              size={18}
              className="absolute top-4 right-4 text-gray-400"
            />
            <h2 className="text-sm text-gray-500">Active Users</h2>
            <p className="text-3xl font-semibold mt-2">1,100</p>
            <p className="text-gray-400 text-sm mt-1">
              Currently active on platform
            </p>
          </div>

          {/* New Users */}
          <div className="bg-white p-6 rounded-md shadow-sm flex flex-col relative">
            <Sparkles
              size={18}
              className="absolute top-4 right-4 text-gray-400"
            />
            <h2 className="text-sm text-gray-500">New Users</h2>
            <p className="text-3xl font-semibold mt-2">45</p>
            <p className="text-gray-400 text-sm mt-1">
              Joined in the last 30 days
            </p>
          </div>
        </div>

        {/* Custom Tabs */}
        <CustomTabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mt-6"
        />

        {/* Users Table - Generic HeroUI Table */}
        <ERPGridTable
          data={filteredUsers}
          columns={columns}
          renderCell={renderCell}
          onAddNew={() => console.log("Add new clicked")}
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
              sx: { borderRadius: 3, maxHeight: "90vh" },
            }}
          >
            <DialogTitle>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h2" component="h2">
                    {selectedUser.name}
                  </Typography>
                  <MuiChip
                    label={selectedUser.type}
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
                    <Typography variant="body2" color="text.secondary">
                      {selectedUser.status}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={closeModal} size="small">
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent dividers>
              <MuiTabs
                value={modalTab}
                onChange={(_, newValue) => setModalTab(newValue)}
                sx={{ mb: 3 }}
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
                  <Card>
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Typography variant="body2" color="text.secondary">
                          User ID
                        </Typography>
                        <Box p={1} bgcolor="grey.50" borderRadius={2}>
                          <Building fontSize="small" color="disabled" />
                        </Box>
                      </Box>
                      <Typography variant="h4" mt={1}>
                        {selectedUser.userId}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Joined Date Card */}
                  <Card>
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Joined Date
                        </Typography>
                        <Box p={1} bgcolor="grey.50" borderRadius={2}>
                          <Globe fontSize="small" color="disabled" />
                        </Box>
                      </Box>
                      <Typography variant="h4" mt={1}>
                        {selectedUser.joinedDate}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Profile Card */}
                  <Card sx={{ gridColumn: "span 1" }}>
                    <CardContent>
                      <Typography variant="h3" gutterBottom>
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
                          <Mail color="disabled" />
                          <Typography color="text.secondary">
                            {selectedUser.email}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Phone color="disabled" />
                          <Typography color="text.secondary">
                            {selectedUser.phone}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Building color="disabled" />
                          <Typography color="text.secondary">
                            {selectedUser.organization}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Overview Card */}
                  <Card sx={{ gridColumn: "span 1" }}>
                    <CardContent>
                      <Typography variant="h3" gutterBottom>
                        Overview
                      </Typography>

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={4}
                      >
                        <Typography variant="h2" color="primary">
                          {selectedUser.donationsMade}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Donations Made
                        </Typography>
                      </Box>

                      <Typography variant="h6" gutterBottom>
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
                            bgcolor: "grey.100",
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
                                <Typography variant="body2" fontWeight="medium">
                                  {item.event}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
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
                <Card>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={3}
                    >
                      <Typography variant="h3">Donation History</Typography>
                      <Box display="flex" gap={1} alignItems="center">
                        <TextField
                          type="date"
                          size="small"
                          defaultValue="2025-10-01"
                          sx={{ width: 150 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          to
                        </Typography>
                        <TextField
                          type="date"
                          size="small"
                          defaultValue="2025-12-31"
                          sx={{ width: 150 }}
                        />
                      </Box>
                    </Box>

                    {/* Table for donation history using Global ERPGridTable */}
                    <ERPGridTable
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
                        return <span>{val}</span>;
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" color="inherit">
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
