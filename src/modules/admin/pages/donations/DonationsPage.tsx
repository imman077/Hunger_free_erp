import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import DatePicker from "../../../../global/common_functions/datepicker";

const DonationOverview = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [donations] = useState([
    {
      id: "001",
      donor: "Hotel Grand",
      foodType: "Prepared Meals",
      quantity: "50 meals",
      pickupTime: "Today 14:00",
      status: "Assigned",
    },
    {
      id: "002",
      donor: "Restaurant X",
      foodType: "Raw Ingredients",
      quantity: "25 kg",
      pickupTime: "Tomorrow 10:00",
      status: "Pending",
    },
    {
      id: "003",
      donor: "Cafe Brew",
      foodType: "Baked Goods",
      quantity: "15 items",
      pickupTime: "Today 16:30",
      status: "In Progress",
    },
    {
      id: "004",
      donor: "Event Hall Y",
      foodType: "Prepared Meals",
      quantity: "100 meals",
      pickupTime: "Tomorrow 13:00",
      status: "Pending",
    },
    {
      id: "005",
      donor: "Supermarket Z",
      foodType: "Produce",
      quantity: "30 kg",
      pickupTime: "Today 11:00",
      status: "Completed",
    },
    {
      id: "006",
      donor: "Pizzeria Slice",
      foodType: "Prepared Meals",
      quantity: "10 pizzas",
      pickupTime: "Today 18:00",
      status: "Assigned",
    },
    {
      id: "007",
      donor: "Bakery Delights",
      foodType: "Baked Goods",
      quantity: "20 pastries",
      pickupTime: "Tomorrow 09:00",
      status: "Pending",
    },
    {
      id: "008",
      donor: "Office Corp",
      foodType: "Raw Ingredients",
      quantity: "5 kg",
      pickupTime: "Today 15:00",
      status: "In Progress",
    },
  ]);

  const tabs = ["All", "Pending", "Assigned", "In Progress", "Completed"];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Assigned":
        return "text-blue-600";
      case "In Progress":
        return "text-orange-600";
      case "Completed":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredDonations =
    activeTab === "All"
      ? donations
      : donations.filter((donation) => donation.status === activeTab);

  const [foodType, setFoodType] = useState("select food type");
  const [quantity, setQuantity] = useState("select quantity");
  const [location, setLocation] = useState("select location");
  const [date, setDate] = useState(null);
  const handleDateChange = (value: any) => setDate(value);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
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
                {donations.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Food Type */}
        <FormControl size="small" fullWidth>
          <Select
            labelId="food-type-select-label"
            id="food-type-select"
            value={foodType}
            onChange={(e: SelectChangeEvent) => setFoodType(e.target.value)}
            displayEmpty
            sx={{
              height: "40px",
              fontSize: "14px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover": {
                borderColor: "#22c55e",
              },
              "&.Mui-focused": {
                borderColor: "#22c55e",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  border: "1px solid #e5e7eb",
                  marginTop: "4px",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <MenuItem
              value="select food type"
              sx={{ fontSize: "14px", color: "#9ca3af" }}
            >
              Select Food Type
            </MenuItem>
            <MenuItem value="Prepared Meals" sx={{ fontSize: "14px" }}>
              Prepared Meals
            </MenuItem>
            <MenuItem value="Raw Ingredients" sx={{ fontSize: "14px" }}>
              Raw Ingredients
            </MenuItem>
            <MenuItem value="Baked Goods" sx={{ fontSize: "14px" }}>
              Baked Goods
            </MenuItem>
            <MenuItem value="Produce" sx={{ fontSize: "14px" }}>
              Produce
            </MenuItem>
          </Select>
        </FormControl>

        {/* Quantity */}
        <FormControl size="small" fullWidth>
          <Select
            labelId="quantity-select-label"
            id="quantity-select"
            value={quantity}
            onChange={(e: SelectChangeEvent) => setQuantity(e.target.value)}
            displayEmpty
            sx={{
              height: "40px",
              fontSize: "14px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover": {
                borderColor: "#22c55e",
              },
              "&.Mui-focused": {
                borderColor: "#22c55e",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  border: "1px solid #e5e7eb",
                  marginTop: "4px",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <MenuItem
              value="select quantity"
              sx={{ fontSize: "14px", color: "#9ca3af" }}
            >
              Select Quantity
            </MenuItem>
            <MenuItem value="0-25" sx={{ fontSize: "14px" }}>
              0-25
            </MenuItem>
            <MenuItem value="25-50" sx={{ fontSize: "14px" }}>
              25-50
            </MenuItem>
            <MenuItem value="50-100" sx={{ fontSize: "14px" }}>
              50-100
            </MenuItem>
            <MenuItem value="100+" sx={{ fontSize: "14px" }}>
              100+
            </MenuItem>
          </Select>
        </FormControl>

        {/* Location */}
        <FormControl size="small" fullWidth>
          <Select
            labelId="location-select-label"
            id="location-select"
            value={location}
            onChange={(e: SelectChangeEvent) => setLocation(e.target.value)}
            displayEmpty
            sx={{
              height: "40px",
              fontSize: "14px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover": {
                borderColor: "#22c55e",
              },
              "&.Mui-focused": {
                borderColor: "#22c55e",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  border: "1px solid #e5e7eb",
                  marginTop: "4px",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <MenuItem
              value="select location"
              sx={{ fontSize: "14px", color: "#9ca3af" }}
            >
              Select Location
            </MenuItem>
            <MenuItem value="Location 1" sx={{ fontSize: "14px" }}>
              Location 1
            </MenuItem>
            <MenuItem value="Location 2" sx={{ fontSize: "14px" }}>
              Location 2
            </MenuItem>
            <MenuItem value="Location 3" sx={{ fontSize: "14px" }}>
              Location 3
            </MenuItem>
          </Select>
        </FormControl>

        {/* Date Picker */}
        <div className="w-full">
          <DatePicker
            value={date}
            onChange={handleDateChange}
            placeholder="Pick a date"
          />
        </div>
      </div>

      {/* Donations Count */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          All Donations ({filteredDonations.length})
        </h2>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center   text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donor
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Food Type
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDonations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {donation.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {donation.donor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {donation.foodType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {donation.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {donation.pickupTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm font-medium ${getStatusColor(
                      donation.status
                    )}`}
                  >
                    {donation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Assign Volunteer
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          Update Status
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
          Export
        </button>
      </div>
    </div>
  );
};

export default DonationOverview;
