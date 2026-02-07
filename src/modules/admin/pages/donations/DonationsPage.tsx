import { useState, useMemo, useCallback } from "react";
import { Filter, X, ChevronDown, Plus, UserCheck } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@heroui/react";
import ReusableTable, {
  type ColumnDef,
} from "../../../../global/components/resuable-components/table";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";

const DonationOverview = () => {
  const [donations, setDonations] = useState([
    {
      id: "001",
      donor: "Hotel Grand",
      foodType: "Prepared Meals",
      quantity: "50 meals",
      pickupTime: "Today 14:00",
      status: "Assigned",
      assignedVolunteer: null,
    },
    {
      id: "002",
      donor: "Restaurant X",
      foodType: "Raw Ingredients",
      quantity: "25 kg",
      pickupTime: "Tomorrow 10:00",
      status: "Pending",
      assignedVolunteer: null,
    },
    {
      id: "003",
      donor: "Cafe Brew",
      foodType: "Baked Goods",
      quantity: "15 items",
      pickupTime: "Today 16:30",
      status: "In Progress",
      assignedVolunteer: null,
    },
    {
      id: "004",
      donor: "Event Hall Y",
      foodType: "Prepared Meals",
      quantity: "100 meals",
      pickupTime: "Tomorrow 13:00",
      status: "Pending",
      assignedVolunteer: null,
    },
    {
      id: "005",
      donor: "Supermarket Z",
      foodType: "Produce",
      quantity: "30 kg",
      pickupTime: "Today 11:00",
      status: "Completed",
      assignedVolunteer: null,
    },
    {
      id: "006",
      donor: "Pizzeria Slice",
      foodType: "Prepared Meals",
      quantity: "10 pizzas",
      pickupTime: "Today 18:00",
      status: "Assigned",
      assignedVolunteer: null,
    },
    {
      id: "007",
      donor: "Bakery Delights",
      foodType: "Baked Goods",
      quantity: "20 pastries",
      pickupTime: "Tomorrow 09:00",
      status: "Pending",
      assignedVolunteer: null,
    },
    {
      id: "008",
      donor: "Office Corp",
      foodType: "Raw Ingredients",
      quantity: "5 kg",
      pickupTime: "Today 15:00",
      status: "In Progress",
      assignedVolunteer: null,
    },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  const nearbyVolunteers = [
    {
      id: "V001",
      name: "Arun Vijay",
      rating: "4.8",
      vehicle: "Car (Swift)",
      distance: "1.2 km",
      tasks: 45,
    },
    {
      id: "V002",
      name: "Manikandan",
      rating: "4.9",
      vehicle: "Bike (Xpulse)",
      distance: "0.8 km",
      tasks: 60,
    },
    {
      id: "V003",
      name: "Siddarth",
      rating: "4.2",
      vehicle: "SUV (Thar)",
      distance: "2.5 km",
      tasks: 22,
    },
    {
      id: "V004",
      name: "Janani Iyer",
      rating: "4.7",
      vehicle: "Car (Baleno)",
      distance: "1.5 km",
      tasks: 50,
    },
  ];

  // Derived state to find busy volunteers
  const busyVolunteerNames = donations
    .filter((d) => d.status.startsWith("Waiting for"))
    .map((d) => d.status.replace("Waiting for ", "").split(" (")[0]);

  const availableVolunteers = nearbyVolunteers.filter(
    (v) => !busyVolunteerNames.includes(v.name),
  );

  const handleAssignClick = (donation: any) => {
    setSelectedDonation(donation);
    onOpen();
  };

  const handleAssignVolunteer = (volunteer: any) => {
    // Update the donation status to show waiting for volunteer
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.id === selectedDonation.id
          ? {
              ...donation,
              status: `Waiting for ${volunteer.name}`,
              assignedVolunteer: volunteer.name,
            }
          : donation,
      ),
    );
    console.log(
      `Assigned ${volunteer.name} to donation ${selectedDonation.id}`,
    );
    onClose();
  };

  const handleRejectAssignment = (donationId: string) => {
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.id === donationId
          ? {
              ...donation,
              status: "Pending",
              assignedVolunteer: null,
            }
          : donation,
      ),
    );
  };

  // Filter States
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [foodTypeFilter, setFoodTypeFilter] = useState<string>("all");

  const toggleFilter = (filterType: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType],
    );
    if (filterType === "status") setStatusFilter("all");
    if (filterType === "foodType") setFoodTypeFilter("all");
  };

  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      const matchStatus =
        !activeFilters.includes("status") ||
        statusFilter === "all" ||
        item.status === statusFilter;
      const matchFoodType =
        !activeFilters.includes("foodType") ||
        foodTypeFilter === "all" ||
        item.foodType === foodTypeFilter;
      return matchStatus && matchFoodType;
    });
  }, [donations, activeFilters, statusFilter, foodTypeFilter]);

  const foodTypeOptions = [
    "Prepared Meals",
    "Raw Ingredients",
    "Baked Goods",
    "Produce",
  ];

  const statusOptions = ["Pending", "Assigned", "In Progress", "Completed"];

  const stats = [
    {
      label: "Active Donations",
      val: "84",
      trend: "+12% from yesterday",
      color: "bg-emerald-500",
    },
    {
      label: "Total Weight",
      val: "1,240 KG",
      trend: "+150 KG today",
      color: "bg-emerald-500",
    },
    {
      label: "Pending Pickups",
      val: "12",
      trend: "Immediate action",
      color: "bg-amber-500",
    },
    {
      label: "Success Rate",
      val: "98.5%",
      trend: "Program health",
      color: "bg-emerald-500",
    },
  ];

  const columns: ColumnDef[] = [
    { uid: "id", name: "#", sortable: true },
    { uid: "donor", name: "Donor", sortable: true, align: "start" },
    { uid: "foodType", name: "Food Type", sortable: true },
    { uid: "quantity", name: "Qty", sortable: true },
    { uid: "pickupTime", name: "Pickup Time", sortable: true },
    { uid: "status", name: "Status", sortable: false, align: "center" },
    { uid: "actions", name: "Actions", sortable: false, align: "center" },
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

  const renderCell = useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as string];

    switch (columnKey) {
      case "donor":
        return (
          <div
            className="flex items-center gap-2 px-2 py-1 rounded-full border transition-all cursor-pointer group w-fit min-w-0"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-gradient-to-br from-amber-400 to-orange-600 shadow-sm shrink-0">
              {cellValue
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <span
              className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-amber-500 transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {cellValue}
            </span>
          </div>
        );
      case "status":
        // Check if status is "Waiting for {name}"
        const isWaitingStatus = cellValue.startsWith("Waiting for");
        const color = isWaitingStatus ? "#7c3aed" : getStatusColor(cellValue); // purple for waiting

        if (isWaitingStatus) {
          return (
            <div className="flex justify-center w-full">
              <Chip
                className="capitalize border h-6 text-[10px] font-black shadow-none transition-colors pr-1"
                style={{
                  backgroundColor: `${color}10`,
                  color: color,
                  borderColor: `${color}20`,
                }}
                size="sm"
                variant="flat"
                startContent={<UserCheck size={12} />}
                onClose={() => handleRejectAssignment(item.id)}
              >
                {cellValue}
              </Chip>
            </div>
          );
        }

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
          <span className="text-xs font-bold" style={{ color: "#d97706" }}>
            {cellValue}
          </span>
        );
      case "actions":
        // Only show assign button for truly pending donations (not waiting for volunteer)
        if (
          item.status === "Pending" &&
          !item.status.startsWith("Waiting for")
        ) {
          return (
            <div className="flex justify-center w-full">
              <Button
                size="sm"
                className="bg-hf-green text-white font-bold text-[10px] uppercase tracking-wider h-7 px-3 rounded-sm shadow-sm hover:shadow-md transition-all active:scale-95"
                startContent={<UserCheck size={12} />}
                onClick={() => handleAssignClick(item)}
              >
                Assign Volunteer
              </Button>
            </div>
          );
        }
        return null;
      default:
        return (
          <span className="text-xs" style={{ color: "var(--text-primary)" }}>
            {cellValue}
          </span>
        );
    }
  }, []);

  const additionalFilters = (
    <div className="flex items-center gap-2 flex-wrap">
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Button
            variant="flat"
            className="border rounded-sm h-10 px-4 text-[11px] font-bold transition-all shadow-none"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
              color: "var(--text-muted)",
            }}
            startContent={
              <Filter size={14} style={{ color: "var(--text-muted)" }} />
            }
            endContent={
              <Plus size={14} style={{ color: "var(--text-muted)" }} />
            }
          >
            ADD FILTER
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Add Filter Options"
          onAction={(key) => toggleFilter(key as string)}
          classNames={{
            base: "border rounded-sm min-w-[180px] p-1 shadow-2xl",
          }}
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
          itemClasses={{
            base: [
              "text-[11px] font-bold uppercase tracking-tight",
              "data-[hover=true]:bg-[var(--bg-secondary)] data-[hover=true]:text-hf-green",
              "rounded-sm",
              "px-3",
              "py-2.5",
              "transition-colors duration-200",
            ].join(" "),
            title: "text-[var(--text-secondary)]",
          }}
        >
          <DropdownItem
            key="status"
            isDisabled={activeFilters.includes("status")}
            startContent={<Filter size={14} />}
          >
            STATUS
          </DropdownItem>
          <DropdownItem
            key="foodType"
            isDisabled={activeFilters.includes("foodType")}
            startContent={<Filter size={14} />}
          >
            FOOD TYPE
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {activeFilters.includes("status") && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              className="border border-emerald-100 bg-emerald-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-hf-green hover:bg-emerald-100 transition-all shadow-none"
              endContent={<ChevronDown size={14} />}
            >
              STATUS: {statusFilter.toUpperCase()}
              <div
                className="ml-2 hover:bg-emerald-200 rounded-full p-0.5 cursor-pointer"
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
              { key: "all", label: "ALL STATUS" },
              ...statusOptions.map((s) => ({
                key: s,
                label: s.toUpperCase(),
              })),
            ]}
            classNames={{
              base: "rounded-sm min-w-[160px] p-1 border",
            }}
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
            itemClasses={{
              base: [
                "text-[11px] font-bold uppercase tracking-tight",
                "data-[hover=true]:bg-[var(--bg-secondary)] data-[hover=true]:text-hf-green",
                "data-[selected=true]:bg-emerald-500/10 data-[selected=true]:text-hf-green",
                "rounded-sm",
                "px-3",
                "py-2.5",
                "transition-colors duration-200",
              ].join(" "),
              title: "text-[var(--text-secondary)]",
              selectedIcon: "text-hf-green w-4 h-4 ml-auto",
            }}
          >
            {(item: any) => (
              <DropdownItem key={item.key}>{item.label}</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      )}

      {activeFilters.includes("foodType") && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              className="border border-blue-100 bg-blue-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-blue-600 hover:bg-blue-100 transition-all shadow-none"
              endContent={<ChevronDown size={14} />}
            >
              TYPE: {foodTypeFilter.toUpperCase()}
              <div
                className="ml-2 hover:bg-blue-200 rounded-full p-0.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter("foodType");
                }}
              >
                <X size={12} />
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Food Type Filter Choices"
            selectionMode="single"
            selectedKeys={[foodTypeFilter]}
            onSelectionChange={(keys) =>
              setFoodTypeFilter(Array.from(keys)[0] as string)
            }
            items={[
              { key: "all", label: "ALL TYPES" },
              ...foodTypeOptions.map((t) => ({
                key: t,
                label: t.toUpperCase(),
              })),
            ]}
            classNames={{
              base: "rounded-sm min-w-[160px] p-1 border",
            }}
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
            itemClasses={{
              base: [
                "text-[11px] font-bold uppercase tracking-tight",
                "data-[hover=true]:bg-[var(--bg-secondary)] data-[hover=true]:text-blue-600",
                "data-[selected=true]:bg-blue-500/10 data-[selected=true]:text-blue-600",
                "rounded-sm",
                "px-3",
                "py-2.5",
                "transition-colors duration-200",
              ].join(" "),
              title: "text-[var(--text-secondary)]",
              selectedIcon: "text-blue-600 w-4 h-4 ml-auto",
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
      className="p-6 space-y-6 min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Elite Header */}
      <div className="flex items-center justify-between w-full">
        <div className="text-left">
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Donation Management
          </h1>
          <p
            className="mt-1 text-sm font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            Real-time donation intelligence and distribution coordination
          </p>
        </div>

        {/* <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-sm border bg-white/50 backdrop-blur-sm border-slate-200 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-hf-green animate-pulse" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
              Live System
            </span>
          </div>
        </div> */}
      </div>

      {/* Impact Metrics */}
      <ImpactCards data={stats} />

      {/* Donations Table */}
      <ReusableTable
        data={filteredDonations}
        columns={columns}
        renderCell={renderCell}
        variant="compact"
        enableFilters={false}
        additionalFilters={additionalFilters}
        enablePagination={true}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        size="md"
        classNames={{
          backdrop: "bg-[#0b1120]/80 backdrop-blur-sm",
          base: "border border-[var(--border-color)] bg-[var(--bg-primary)] rounded-sm",
          header: "border-b border-[var(--border-color)] p-4",
          footer: "border-t border-[var(--border-color)] p-4",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center text-center py-6">
            <h3
              className="text-sm font-black uppercase tracking-widest"
              style={{ color: "var(--text-primary)" }}
            >
              Assign Volunteer
            </h3>
            <p
              className="text-[10px] font-medium uppercase tracking-tight"
              style={{ color: "var(--text-muted)" }}
            >
              Select a nearby volunteer for donation #{selectedDonation?.id}
            </p>
          </ModalHeader>
          <ModalBody className="py-6">
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-1 mb-2">
                <span className="text-[10px] font-black text-hf-green uppercase tracking-[0.2em]">
                  Recommended Force
                </span>
                <div className="h-0.5 w-6 bg-hf-green/20 rounded-full" />
              </div>
              <div className="grid gap-2">
                {availableVolunteers.map((vol) => (
                  <div
                    key={vol.id}
                    className="flex items-center justify-between p-3 rounded-sm border transition-all group"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                        {vol.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="text-xs font-black"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {vol.name}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] font-bold text-hf-green flex items-center gap-0.5">
                            ★ {vol.rating}
                          </span>
                          <span
                            className="text-[9px] font-medium"
                            style={{ color: "var(--text-muted)" }}
                          >
                            • {vol.vehicle}
                          </span>
                          <span
                            className="text-[9px] font-black px-1 rounded-full border"
                            style={{
                              backgroundColor: "rgba(217, 119, 6, 0.1)",
                              color: "#d97706",
                              borderColor: "rgba(217, 119, 6, 0.2)",
                            }}
                          >
                            {vol.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-hf-green text-white font-black text-[9px] uppercase tracking-wider h-7 px-3 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleAssignVolunteer(vol)}
                    >
                      Assign
                    </Button>
                  </div>
                ))}
                {availableVolunteers.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center bg-var(--bg-tertiary) rounded-sm border border-dashed border-[var(--border-color)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-2">
                      <Plus className="w-5 h-5 text-[var(--text-muted)] rotate-45" />
                    </div>
                    <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      All local responders are currently busy
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter
            className="flex justify-center border-t p-4"
            style={{ borderColor: "var(--border-color)" }}
          >
            <Button
              variant="flat"
              className="font-black text-[10px] uppercase tracking-wider h-9 px-8 rounded-sm transition-all"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DonationOverview;
