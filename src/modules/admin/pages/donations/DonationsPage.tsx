import { useState } from "react";
import Tabs, {
  type Tab,
} from "../../../../global/components/resuable-components/tabs";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import ResuableDatePicker from "../../../../global/components/resuable-components/datepicker";
import ReusableTable, {
  type ColumnDef,
} from "../../../../global/components/resuable-components/table";

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

  const tabs: Tab[] = [
    { label: "All", value: "All", count: donations.length, showCount: true },
    { label: "Pending", value: "Pending" },
    { label: "Assigned", value: "Assigned" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ];

  const filteredDonations =
    activeTab === "All"
      ? donations
      : donations.filter((donation) => donation.status === activeTab);

  const [foodType, setFoodType] = useState("select food type");
  const [quantity, setQuantity] = useState("select quantity");
  const [location, setLocation] = useState("select location");
  const [date, setDate] = useState<string | null>(null);

  const foodTypeOptions = [
    { value: "Prepared Meals", label: "Prepared Meals" },
    { value: "Raw Ingredients", label: "Raw Ingredients" },
    { value: "Baked Goods", label: "Baked Goods" },
    { value: "Produce", label: "Produce" },
  ];

  const quantityOptions = [
    { value: "0-25", label: "0-25" },
    { value: "25-50", label: "25-50" },
    { value: "50-100", label: "50-100" },
    { value: "100+", label: "100+" },
  ];

  const locationOptions = [
    { value: "Location 1", label: "Location 1" },
    { value: "Location 2", label: "Location 2" },
    { value: "Location 3", label: "Location 3" },
  ];

  const columns: ColumnDef[] = [
    { uid: "id", name: "#", sortable: true },
    { uid: "donor", name: "Donor", sortable: true, align: "start" },
    { uid: "foodType", name: "Food Type", sortable: true },
    { uid: "quantity", name: "Qty", sortable: true },
    { uid: "pickupTime", name: "Pickup Time", sortable: true },
    { uid: "status", name: "Status", sortable: false, align: "center" },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Pending":
        return "#ca8a04"; // yellow-600
      case "Assigned":
        return "#2563eb"; // blue-600
      case "In Progress":
        return "#ea580c"; // orange-600
      case "Completed":
        return "#22c55e"; // hf-green
      default:
        return "var(--text-muted)";
    }
  };

  const renderCell = (item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as string];

    switch (columnKey) {
      case "donor":
        return (
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-amber-500/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-gradient-to-br from-amber-400 to-orange-600 shadow-sm shrink-0">
              {cellValue
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <span
              className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-amber-600 transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {cellValue}
            </span>
          </div>
        );
      case "status":
        const color = getStatusColor(cellValue);
        return (
          <div className="flex justify-center w-full">
            <div
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${color}10`,
                color: color,
                borderColor: `${color}20`,
              }}
            >
              <div
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: color }}
              />
              {cellValue}
            </div>
          </div>
        );
      case "foodType":
      case "pickupTime":
        return (
          <span
            className="text-xs font-medium whitespace-nowrap"
            style={{ color: "var(--text-secondary)" }}
          >
            {cellValue}
          </span>
        );
      case "quantity":
        return (
          <span className="text-xs font-bold text-amber-600">{cellValue}</span>
        );
      default:
        return (
          <span className="text-xs" style={{ color: "var(--text-primary)" }}>
            {cellValue}
          </span>
        );
    }
  };

  return (
    <div
      className="p-6 min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div className="mb-4">
        <h2
          className="text-lg font-semibold text-left"
          style={{ color: "var(--text-primary)" }}
        >
          Donation Overview
        </h2>
      </div>

      {/* Header Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {/* Filters */}
      <div className="mb-6">
        <h3
          className="text-xl font-semibold text-left mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Filters
        </h3>

        {/* Filter Labels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
          <label
            className="text-sm font-medium text-left"
            style={{ color: "var(--text-secondary)" }}
          >
            Food Type
          </label>
          <label
            className="text-sm font-medium text-left"
            style={{ color: "var(--text-secondary)" }}
          >
            Quantity
          </label>
          <label
            className="text-sm font-medium text-left"
            style={{ color: "var(--text-secondary)" }}
          >
            Location
          </label>
          <label
            className="text-sm font-medium text-left"
            style={{ color: "var(--text-secondary)" }}
          >
            Time Range
          </label>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResuableDropdown
            options={foodTypeOptions}
            value={foodType === "select food type" ? "" : foodType}
            placeholder="Select Food Type"
            onChange={setFoodType}
          />

          <ResuableDropdown
            options={quantityOptions}
            value={quantity === "select quantity" ? "" : quantity}
            placeholder="Select Quantity"
            onChange={setQuantity}
          />

          <ResuableDropdown
            options={locationOptions}
            value={location === "select location" ? "" : location}
            placeholder="Select Location"
            onChange={setLocation}
          />

          <ResuableDatePicker value={date} onChange={setDate} />
        </div>
      </div>

      {/* Donations Count */}
      <div className="mb-4">
        <h2
          className="text-lg font-semibold text-left"
          style={{ color: "var(--text-primary)" }}
        >
          All Donations ({filteredDonations.length})
        </h2>
      </div>

      {/* Donations Table */}
      <ReusableTable
        data={filteredDonations}
        columns={columns}
        renderCell={renderCell}
        enableSearch={false}
        enablePagination={true}
      />

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end p-3">
        <ResuableButton
          variant="success"
          startContent={<i className="fa-solid fa-user-plus text-xs" />}
        >
          Assign Volunteer
        </ResuableButton>

        <ResuableButton
          variant="success"
          startContent={<i className="fa-solid fa-rotate-right text-xs" />}
        >
          Update Status
        </ResuableButton>

        <ResuableButton
          variant="success"
          startContent={<i className="fa-solid fa-download text-xs" />}
        >
          Export
        </ResuableButton>
      </div>
    </div>
  );
};

export default DonationOverview;
