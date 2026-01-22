import React, { useState } from "react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import ReusableTable from "../../../../global/components/resuable-components/table";
import type { ColumnDef } from "../../../../global/components/resuable-components/table";
import ResuableInput from "../../../../global/components/resuable-components/input";
import { Clock, AlertTriangle, Package, MapPin, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Tooltip,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { Plus } from "lucide-react";

const PendingDonationsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [pointsToAward, setPointsToAward] = useState("50");
  const [donations, setDonations] = useState([
    {
      id: "DON-001",
      donor: "Hotel Saravana Bhavan",
      type: "Meals (Veg)",
      quantity: "50 KG",
      location: "T. Nagar, Chennai",
      status: "urgent",
      expiry: "4 hours",
      assignedVolunteer: null,
    },
    {
      id: "DON-002",
      donor: "Anjappar Chettinad",
      type: "Rice & Curry",
      quantity: "30 KG",
      location: "Anna Nagar, Chennai",
      status: "pending",
      expiry: "8 hours",
      assignedVolunteer: null,
    },
    {
      id: "DON-003",
      donor: "Private Donor - Rajesh",
      type: "Bread & Jam",
      quantity: "15 KG",
      location: "Adyar, Chennai",
      status: "pending",
      expiry: "12 hours",
      assignedVolunteer: null,
    },
    {
      id: "DON-004",
      donor: "SM Wedding Hall",
      type: "Full Meals",
      quantity: "120 KG",
      location: "Velachery, Chennai",
      status: "urgent",
      expiry: "2 hours",
      assignedVolunteer: null,
    },
    {
      id: "DON-005",
      donor: "Corporate Canteen - TCS",
      type: "Variety Rice",
      quantity: "45 KG",
      location: "Siruseri, Chennai",
      status: "pending",
      expiry: "6 hours",
      assignedVolunteer: null,
    },
  ]);

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
              status: `Waiting for ${volunteer.name} (+${pointsToAward} Pts)`,
              assignedVolunteer: volunteer.name,
              points: pointsToAward,
            }
          : donation,
      ),
    );
    console.log(
      `Assigned ${volunteer.name} to donation ${selectedDonation.id} with ${pointsToAward} points`,
    );
    onClose();
  };

  const handleRejectAssignment = (donationId: string) => {
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.id === donationId
          ? {
              ...donation,
              status:
                donation.id.includes("DON-001") ||
                donation.id.includes("DON-004")
                  ? "urgent"
                  : "pending",
              assignedVolunteer: null,
              points: null,
            }
          : donation,
      ),
    );
  };

  const stats = [
    {
      label: "Total Pending",
      val: "42",
      trend: "Across all regions",
      color: "bg-amber-500",
    },
    {
      label: "Urgent Pickup",
      val: "12",
      trend: "Expires < 24 hrs",
      color: "bg-red-500",
    },
    {
      label: "New Today",
      val: "08",
      trend: "+3 from yesterday",
      color: "bg-emerald-500",
    },
    {
      label: "Avg. Wait Time",
      val: "4.2h",
      trend: "Processing speed",
      color: "bg-slate-300",
    },
  ];

  const columns: ColumnDef[] = [
    { uid: "id", name: "ID", sortable: true },
    { uid: "donor", name: "DONOR", sortable: true, align: "start" },
    { uid: "type", name: "FOOD TYPE", sortable: true },
    { uid: "quantity", name: "QUANTITY", sortable: true },
    { uid: "location", name: "LOCATION", sortable: true },
    { uid: "status", name: "STATUS", sortable: false, align: "center" },
    { uid: "expiry", name: "EXPIRY", sortable: true },
    { uid: "actions", name: "ACTIONS", align: "center" },
  ];

  const renderCell = (item: any, columnKey: React.Key) => {
    const value = item[columnKey as string];

    switch (columnKey) {
      case "id":
        return (
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>
            {value}
          </span>
        );
      case "donor":
        const initials = value
          .split(" ")
          .filter((word: string) => /^[a-zA-Z0-9]/.test(word))
          .map((n: string) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-2.5 pl-1 pr-4 py-1 rounded-full bg-slate-100/50 border border-slate-200 hover:border-hf-green/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white bg-hf-green shadow-sm shrink-0">
              {initials}
            </div>
            <span
              className="font-bold text-xs whitespace-nowrap truncate max-w-[160px] group-hover:text-hf-green transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {value}
            </span>
          </div>
        );
      case "status":
        // Check if status is "Waiting for {name}"
        const isWaitingStatus =
          typeof value === "string" && value.startsWith("Waiting for");

        if (isWaitingStatus) {
          return (
            <div className="flex justify-center w-full">
              <Chip
                className="capitalize border-none gap-1 h-6 text-[10px] font-black bg-blue-50 text-blue-600 shadow-none hover:bg-blue-100 transition-colors pr-1"
                size="sm"
                variant="flat"
                startContent={<UserCheck size={12} className="text-blue-500" />}
                onClose={() => handleRejectAssignment(item.id)}
              >
                {value}
              </Chip>
            </div>
          );
        }

        return (
          <div className="flex justify-center w-full">
            <Chip
              className="capitalize border-none gap-1 h-6 text-[10px] font-black"
              color={value === "urgent" ? "danger" : "warning"}
              size="sm"
              variant="flat"
              startContent={
                value === "urgent" ? (
                  <AlertTriangle size={12} />
                ) : (
                  <Clock size={12} />
                )
              }
            >
              {value}
            </Chip>
          </div>
        );
      case "quantity":
        return (
          <div className="flex items-center justify-center gap-1">
            <Package size={14} style={{ color: "var(--text-muted)" }} />
            <span
              className="font-bold"
              style={{ color: "var(--text-secondary)" }}
            >
              {value}
            </span>
          </div>
        );
      case "location":
        return (
          <div className="flex items-center gap-1.5 px-2">
            <MapPin size={12} style={{ color: "var(--text-muted)" }} />
            <span
              className="text-xs font-medium whitespace-nowrap"
              style={{ color: "var(--text-secondary)" }}
            >
              {value}
            </span>
          </div>
        );
      case "expiry":
        return (
          <span
            className="font-bold"
            style={{
              color:
                item.status === "urgent" ? "#ef4444" : "var(--text-secondary)",
            }}
          >
            {value}
          </span>
        );
      case "actions":
        // Check if status is "Waiting for {name}"
        const hasAssignedVolunteer =
          typeof item.status === "string" &&
          item.status.startsWith("Waiting for");

        return (
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-[80px]">
              <Tooltip
                content={
                  hasAssignedVolunteer
                    ? "Volunteer Assigned"
                    : "Assign Volunteer"
                }
              >
                <div className="flex items-center justify-center">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className={`w-8 h-8 min-w-0 ${
                      hasAssignedVolunteer
                        ? "text-slate-200 cursor-not-allowed"
                        : "text-slate-400 hover:text-purple-500"
                    }`}
                    onClick={() =>
                      !hasAssignedVolunteer && handleAssignClick(item)
                    }
                    isDisabled={hasAssignedVolunteer}
                  >
                    <UserCheck size={18} />
                  </Button>
                </div>
              </Tooltip>
            </div>
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Pending Donations
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Review and approve incoming food donations for distribution
          </p>
        </div>
        {/* <Button
          color="primary"
          className="bg-hf-green text-white rounded-sm h-10 px-6 font-bold hover:bg-emerald-600 transition-all active:scale-95"
          style={{ backgroundColor: "#22c55e", color: "white" }}
          endContent={<Plus size={18} />}
          onPress={() => console.log("Add new donation")}
        >
          Add New Donation
        </Button> */}
      </div>

      <ImpactCards data={stats} />

      <ReusableTable
        columns={columns}
        data={donations}
        renderCell={renderCell}
        enablePagination={true}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        size="md"
        classNames={{
          backdrop: "bg-[#0b1120]/50 backdrop-blur-sm",
          base: "border border-slate-200 bg-white rounded-sm",
          header: "border-b border-slate-100 p-4",
          footer: "border-t border-slate-100 p-4",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center text-center py-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">
              Assign Volunteer
            </h3>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
              Select a nearby volunteer for donation #{selectedDonation?.id}
            </p>
          </ModalHeader>
          <ModalBody className="py-6">
            <div className="space-y-6">
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-100">
                <ResuableInput
                  type="number"
                  label="REWARD POINTS"
                  placeholder="Set extra points for this donation"
                  value={pointsToAward}
                  onChange={setPointsToAward}
                  align="left"
                  startContent={
                    <span className="text-blue-500 text-xs font-black">+</span>
                  }
                  endContent={
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                      pts
                    </span>
                  }
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-center gap-1 mb-2">
                  <span className="text-[10px] font-black text-hf-green uppercase tracking-[0.2em]">
                    Available Responders ({availableVolunteers.length})
                  </span>
                  <div className="h-0.5 w-6 bg-hf-green/20 rounded-full" />
                </div>
                <div className="grid gap-2 min-h-[100px]">
                  <AnimatePresence mode="popLayout">
                    {availableVolunteers.map((vol) => (
                      <motion.div
                        key={vol.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between p-3 rounded-sm border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-hf-green/30 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                            {vol.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-700">
                              {vol.name}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[9px] font-bold text-hf-green flex items-center gap-0.5">
                                ★ {vol.rating}
                              </span>
                              <span className="text-[9px] font-medium text-slate-400">
                                • {vol.vehicle}
                              </span>
                              <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-1 rounded-full">
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
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {availableVolunteers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                        <Clock className="w-5 h-5 text-slate-400" />
                      </div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        All local responders are currently busy
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-center border-t border-slate-100 p-4">
            <Button
              variant="flat"
              className="bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-wider h-9 px-8 rounded-sm hover:bg-slate-200 transition-all"
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

export default PendingDonationsPage;
