import React, { useState } from "react";
import { Filter, UserPlus } from "lucide-react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { RefreshCcw, CheckCircle, Sparkles } from "lucide-react";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
} from "lucide-react";
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
  Chip,
  Tabs,
  Tab,
  Button,
  ThemeProvider,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import theme from "../../../../global/utils/theme";

const TABS = ["All", "Donors", "NGOs", "Volunteers", "Admins"];

const USERS = [
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

const UsersPage = () => {
  const [status, setStatus] = useState("All Status");
  const [date, setDate] = useState("All Dates");
  const [selected, setSelected] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedUser, setSelectedUser] = useState<(typeof USERS)[0] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("Profile Details");

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === USERS.length) {
      setSelected([]);
    } else {
      setSelected(USERS.map((u) => u.id));
    }
  };

  const openUserModal = (user: (typeof USERS)[0]) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="w-full space-y-6 p-6">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          {/* Left: Title */}
          <h1 className="text-2xl font-semibold text-gray-900">
            User Management
          </h1>
 
          {/* Right: Filters + Buttons */}
          <div className="flex items-center gap-3">
            {/* Status Dropdown */}
            <FormControl size="small">
              <Select
                labelId="status-select-label"
                id="status-select"
                value={status}
                onChange={(e: SelectChangeEvent) => setStatus(e.target.value)}
                displayEmpty
                sx={{
                  minWidth: 130,
                  height: "38px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  // Remove all shadow effects
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
                  // Remove dropdown icon shadow if any
                  "& .MuiSelect-icon": {
                    boxShadow: "none",
                  },
                }}
                // Remove menu shadow via MenuProps
                MenuProps={{
                  PaperProps: {
                    sx: {
                      boxShadow: "none",
                      border: "1px solid #e5e7eb",
                      marginTop: "4px",
                      borderRadius: "8px",
                    },
                  },
                }}
              >
                <MenuItem value="All Status" sx={{ fontSize: "14px" }}>
                  All Status
                </MenuItem>
                <MenuItem value="Active" sx={{ fontSize: "14px" }}>
                  Active
                </MenuItem>
                <MenuItem value="Inactive" sx={{ fontSize: "14px" }}>
                  Inactive
                </MenuItem>
                <MenuItem value="Pending" sx={{ fontSize: "14px" }}>
                  Pending
                </MenuItem>
              </Select>
            </FormControl>

            {/* Date Dropdown */}
            <FormControl
              size="small"
              sx={{
                boxShadow: "none",
                "& .MuiInputBase-root": {
                  boxShadow: "none !important",
                },
                "& .MuiOutlinedInput-root": {
                  boxShadow: "none !important",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
            >
              <Select
                labelId="date-select-label"
                id="date-select"
                value={date}
                onChange={(e: SelectChangeEvent) => setDate(e.target.value)}
                displayEmpty
                sx={{
                  minWidth: 130,
                  height: "38px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "none !important",
                  "& .MuiSelect-select": {
                    padding: "8px 12px",
                  },
                  "& .MuiSelect-icon": {
                    boxShadow: "none !important",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      boxShadow: "none !important",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      mt: "4px",
                    },
                  },
                }}
              >
                <MenuItem value="All Dates" sx={{ fontSize: "14px" }}>
                  All Dates
                </MenuItem>
                <MenuItem value="Today" sx={{ fontSize: "14px" }}>
                  Today
                </MenuItem>
                <MenuItem value="This Week" sx={{ fontSize: "14px" }}>
                  This Week
                </MenuItem>
                <MenuItem value="This Month" sx={{ fontSize: "14px" }}>
                  This Month
                </MenuItem>
              </Select>
            </FormControl>

            {/* More Filters Button */}
            <button className="flex items-center gap-2 px-4 py-2 text-black font-normal rounded-md text-sm bg-white border border-gray-200">
              <Filter size={14} />
              More Filters
            </button>

            {/* Create User Button */}
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition ">
              <UserPlus size={16} />
              Create User
            </button>
          </div>
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

        {/* Users Table */}
        <div className="bg-white shadow-sm rounded-xl mt-6 p-5">
          {/* Custom Tabs */}
          <div className="flex gap-3 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    activeTab === tab
                      ? "bg-[#22c55e] text-white shadow-sm hover:bg-[#22c55e]"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:border-[#22c55e] hover:text-[#22c55e]"
                  }
                `}
              >
                {tab}
                {tab === "All" && (
                  <span className="ml-2 text-xs opacity-90">
                    {USERS.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.length === USERS.length}
                      onChange={selectAll}
                    />
                  </th>
                  <th className="p-3">#</th>
                  <th className="p-3 flex items-center justify-center gap-1">
                    Name ↑
                  </th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Join Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {USERS.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 text-black hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(user.id)}
                        onChange={() => toggleSelect(user.id)}
                      />
                    </td>

                    <td className="p-3">{user.id}</td>

                    <td className="p-3 font-medium">{user.name}</td>

                    <td className="p-3">{user.type}</td>

                    <td className="p-3">
                      {user.status === "Active" && (
                        <span className="text-green-600 flex items-center justify-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Active
                        </span>
                      )}
                      {user.status === "New" && (
                        <span className="text-blue-600 flex items-center justify-center gap-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          New
                        </span>
                      )}
                      {user.status === "Pending" && (
                        <span className="text-amber-600 flex items-center justify-center gap-1">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-3">{user.date}</td>

                    <td className="p-3 flex items-center justify-center">
                      <Eye
                        size={18}
                        className="text-gray-500 cursor-pointer hover:text-black"
                        onClick={() => openUserModal(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex justify-between items-center mt-4">
            {/* Left Actions */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm">
                Activate Selected ({selected.length})
              </button>

              <button className="px-4 py-2 bg-white text-black border rounded-lg text-sm">
                Export CSV
              </button>

              <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm">
                Delete Selected
              </button>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-4">
              <button className="p-2 border rounded-md bg-white">
                <ChevronLeft size={16} color="black" />
              </button>

              <span className="text-gray-500">Page 1 of 2</span>

              <button className="p-2 border rounded-lg bg-white">
                <ChevronRight size={16} color="black" />
              </button>
            </div>
          </div>
        </div>
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
                  <Chip
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
              <Tabs
                value={modalTab}
                onChange={(_, newValue) => setModalTab(newValue)}
                sx={{ mb: 3 }}
              >
                <Tab value="Profile Details" label="Profile Details" />
                <Tab value="Donation History" label="Donation History" />
              </Tabs>

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

                      <Box sx={{ position: "relative" }}>
                        {/* Vertical Line */}
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

                        {/* Timeline Items */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Box
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
                                Account created
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {selectedUser.joinedDate}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
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
                                First donation made
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Apr 01, 2022
                              </Typography>
                            </Box>
                          </Box>

                          <Box
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
                                Became a recurring donor
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Jan 01, 2023
                              </Typography>
                            </Box>
                          </Box>
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

                    {/* Table for donation history */}
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Donation ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Item/Description</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Notes</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>11/20/2025</TableCell>
                            <TableCell>DON-10234</TableCell>
                            <TableCell>Prepared</TableCell>
                            <TableCell>50 meals</TableCell>
                            <TableCell>50 meals</TableCell>
                            <TableCell>Central Kitchen</TableCell>
                            <TableCell>
                              <Chip
                                label="Completed"
                                color="success"
                                size="small"
                              />
                            </TableCell>
                            <TableCell>Delivered on time</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>10/15/2025</TableCell>
                            <TableCell>DON-09821</TableCell>
                            <TableCell>Canned Goods</TableCell>
                            <TableCell>Vegetables & Soup</TableCell>
                            <TableCell>100 cans</TableCell>
                            <TableCell>North Warehouse</TableCell>
                            <TableCell>
                              <Chip
                                label="Verified"
                                color="info"
                                size="small"
                              />
                            </TableCell>
                            <TableCell>-</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
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
