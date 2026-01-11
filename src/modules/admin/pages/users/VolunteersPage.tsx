import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";
import ReusableTable from "../../../../global/components/resuable-components/table";
import ReusableButton from "../../../../global/components/resuable-components/button";

type VolunteerStatus = "available" | "on-leave" | "busy";

interface Volunteer {
  id: number;
  name: string;
  zone: string;
  tasksCompleted: number;
  rating: string;
  status: VolunteerStatus;
  email: string;
  phone: string;
  address: string;
  vehicle: string;
  license: string;
}

const volunteers: Volunteer[] = [
  {
    id: 0,
    name: "Aisha Sharma",
    zone: "North",
    tasksCompleted: 45,
    rating: "4.8",
    status: "available",
    email: "aisha@example.com",
    phone: "+1 234 567 8901",
    address: "123 Maple St, Northwood, ON",
    vehicle: "Car",
    license: "ABC 123",
  },
  {
    id: 1,
    name: "Ben Carter",
    zone: "East",
    tasksCompleted: 30,
    rating: "4.5",
    status: "on-leave",
    email: "ben@example.com",
    phone: "+1 234 567 8902",
    address: "456 Oak Ave, Eastville, ON",
    vehicle: "SUV",
    license: "XYZ 789",
  },
  {
    id: 2,
    name: "Chloe Davis",
    zone: "South",
    tasksCompleted: 60,
    rating: "4.9",
    status: "available",
    email: "chloe@example.com",
    phone: "+1 234 567 8903",
    address: "789 Pine Rd, Southtown, ON",
    vehicle: "Sedan",
    license: "DEF 456",
  },
  {
    id: 3,
    name: "David Lee",
    zone: "West",
    tasksCompleted: 22,
    rating: "4.2",
    status: "available",
    email: "david@example.com",
    phone: "+1 234 567 8904",
    address: "321 Elm St, Westfield, ON",
    vehicle: "Van",
    license: "GHI 123",
  },
  {
    id: 4,
    name: "Emily Chen",
    zone: "North",
    tasksCompleted: 50,
    rating: "4.7",
    status: "busy",
    email: "emily@example.com",
    phone: "+1 234 567 8905",
    address: "654 Birch Ln, Northside, ON",
    vehicle: "Car",
    license: "JKL 789",
  },
];

const VolunteersPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeVolunteer, setActiveVolunteer] = useState<Volunteer | null>(
    volunteers[0]
  );
  const [weeklyHours, setWeeklyHours] = useState(45);
  const [onLeaveToggle, setOnLeaveToggle] = useState(false);

  const openDrawer = (vol: Volunteer) => {
    setActiveVolunteer(vol);
    onOpen();
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeeklyHours(Number(e.target.value));
  };

  const toggleOnLeave = () => {
    setOnLeaveToggle((prev) => !prev);
  };

  const getStatusBadge = (status: VolunteerStatus): React.ReactElement => {
    const statusStyles: Record<
      VolunteerStatus,
      { backgroundColor: string; color: string; border: string }
    > = {
      available: {
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        color: "#22c55e",
        border: "1px solid rgba(34, 197, 94, 0.2)",
      },
      "on-leave": {
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        color: "#ef4444",
        border: "1px solid rgba(239, 68, 68, 0.2)",
      },
      busy: {
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        color: "#f59e0b",
        border: "1px solid rgba(245, 158, 11, 0.2)",
      },
    };

    const statusLabels: Record<VolunteerStatus, string> = {
      available: "Available",
      "on-leave": "On Leave",
      busy: "Busy",
    };

    const style = statusStyles[status];

    return (
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
        style={{
          backgroundColor: style.backgroundColor,
          color: style.color,
          border: style.border,
        }}
      >
        {statusLabels[status]}
      </span>
    );
  };

  const renderStars = (rating: string) => {
    return (
      <div className="flex items-center">
        <div className="inline-flex gap-1">
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-sm" style={{ color: "var(--border-color)" }}>
            ★
          </span>
        </div>
        <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
          {rating}
        </span>
      </div>
    );
  };

  return (
    <div
      className="p-6 space-y-6 min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div className="text-left">
        <h1
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Volunteer Management
        </h1>
        <p className="mt-2" style={{ color: "var(--text-muted)" }}>
          Manage and track volunteer profiles
        </p>
      </div>

      {/* Volunteer Table */}
      <ReusableTable
        data={volunteers}
        columns={[
          { name: "Volunteer", uid: "name", sortable: true, align: "start" },
          {
            name: "Availability",
            uid: "status",
            sortable: false,
            align: "center",
          },
          { name: "Email", uid: "email", sortable: true },
          { name: "Phone", uid: "phone" },
          { name: "Actions", uid: "actions", sortable: false },
        ]}
        renderCell={(vol: Volunteer, columnKey: React.Key) => {
          switch (columnKey) {
            case "name":
              return (
                <div
                  className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-hf-green/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0"
                  onClick={() => openDrawer(vol)}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-br from-emerald-400 to-teal-600 shadow-sm shrink-0">
                    {vol.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <span
                    className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-hf-green transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {vol.name}
                  </span>
                </div>
              );
            case "zone":
              return (
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {vol.zone}
                </span>
              );
            case "tasksCompleted":
              return (
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {vol.tasksCompleted}
                </span>
              );
            case "rating":
              return renderStars(vol.rating);
            case "status":
              return (
                <div className="flex justify-center w-full">
                  {getStatusBadge(vol.status)}
                </div>
              );
            case "email":
            case "phone":
              return (
                <span
                  className="text-xs whitespace-nowrap"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {String(vol[columnKey as keyof Volunteer])}
                </span>
              );
            default:
              return (
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {String(vol[columnKey as keyof Volunteer])}
                </span>
              );
          }
        }}
        // title="Volunteer List"
        // description="Manage and track volunteer profiles"
        actionConfig={{
          showView: true,
          showMessage: true,
          showApprove: true,
          showDeactivate: true,
          onView: openDrawer,
          onMessage: (vol) => console.log("Message", vol),
          onApprove: (vol) => console.log("Approve", vol),
          onDeactivate: (vol) => console.log("Deactivate", vol),
        }}
      />

      {/* HeroUI Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        placement="right"
        classNames={{
          base: "w-[350px] !max-w-[350px]",
          backdrop: "bg-black/50",
        }}
      >
        <DrawerContent
          className="no-scrollbar"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {() => (
            <>
              <DrawerBody className="px-6 py-4 space-y-6 overflow-y-auto no-scrollbar">
                {activeVolunteer && (
                  <>
                    {/* Stats */}
                    <div
                      className="mb-3 pb-3 border-b flex flex-row justify-between px-2"
                      style={{ borderBottomColor: "var(--border-color)" }}
                    >
                      <div className="mb-4">
                        <h3
                          className="text-sm font-semibold mb-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Completion Rate
                        </h3>
                        <div className="text-2xl font-black text-blue-500">
                          92%
                        </div>
                      </div>
                      <div>
                        <h3
                          className="text-sm font-semibold mb-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Average Rating
                        </h3>
                        <div className="flex items-center gap-2 justify-center">
                          <div className="text-2xl font-black text-blue-500">
                            {activeVolunteer.rating}
                          </div>
                          <div className="inline-flex gap-1">
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-gray-300 text-sm">★</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Availability Management */}
                    <div
                      className="mb-2 pb-6 border-b"
                      style={{ borderBottomColor: "var(--border-color)" }}
                    >
                      <h3
                        className="font-semibold mb-3"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Availability Management
                      </h3>
                      <p
                        className="text-sm mb-4"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Adjust volunteer&apos;s working hours and status.
                      </p>

                      <div className="mb-4">
                        <div className="flex flex-row justify-between">
                          <label
                            className="text-sm font-medium block mb-2"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            Weekly Hours
                          </label>
                          <div
                            className="text-right text-sm font-semibold mt-1"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {weeklyHours} hours
                          </div>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={60}
                          value={weeklyHours}
                          onChange={handleHoursChange}
                          className="w-full"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="text-sm font-medium flex justify-between mb-2"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span>On Leave</span>
                          <button
                            type="button"
                            onClick={toggleOnLeave}
                            className={`inline-flex items-center h-[10px] w-[40px] rounded-full px-[2px] transition-colors ${
                              onLeaveToggle
                                ? "bg-blue-500 justify-end hover:bg-blue-500"
                                : "bg-gray-300 justify-start hover:bg-gray-300"
                            }`}
                          >
                            <span className="h-[18px] w-[18px] rounded-full bg-white shadow-sm" />
                          </button>
                        </label>
                      </div>

                      <ReusableButton
                        variant="primary"
                        size="md"
                        onClick={() => console.log("Update Availability")}
                      >
                        Update Availability
                      </ReusableButton>
                    </div>

                    {/* Volunteer Details */}
                    <div className="text-left">
                      <h3
                        className="font-bold text-xl mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Volunteer Details
                      </h3>
                      <p
                        className="text-sm mb-4"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Comprehensive profile information for{" "}
                        {activeVolunteer.name}.
                      </p>

                      <div className="space-y-6 text-sm">
                        {/* Personal Info */}
                        <div className="space-y-1">
                          <h4
                            className="text-sm font-semibold mb-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            Personal Information
                          </h4>
                          <p style={{ color: "var(--text-secondary)" }}>
                            {activeVolunteer.email}
                          </p>
                          <p style={{ color: "var(--text-secondary)" }}>
                            {activeVolunteer.phone}
                          </p>
                          <p style={{ color: "var(--text-secondary)" }}>
                            {activeVolunteer.address}
                          </p>
                        </div>

                        {/* Vehicle Info */}
                        <div className="space-y-1">
                          <h4
                            className="text-sm font-semibold mb-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            Vehicle Details
                          </h4>
                          <p style={{ color: "var(--text-secondary)" }}>
                            Type: {activeVolunteer.vehicle}
                          </p>
                          <p style={{ color: "var(--text-secondary)" }}>
                            License Plate: {activeVolunteer.license}
                          </p>
                        </div>

                        {/* Assigned Tasks */}
                        <div>
                          <h4
                            className="text-sm font-semibold mb-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            Assigned Tasks
                          </h4>
                          <ul
                            className="space-y-1"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <li>• Food Distribution - Elm Street Shelter</li>
                            <li>• Community Cleanup – Central Park</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default VolunteersPage;
