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

  const renderAvatar = (vol: Volunteer) => {
    const initials = vol.name
      .split(" ")
      .map((p) => p[0])
      .join("");

    const gradient =
      vol.id === 0
        ? "bg-gradient-to-br from-indigo-400 to-purple-600 text-white"
        : vol.id === 1
        ? "bg-gradient-to-br from-fuchsia-300 to-rose-500 text-white"
        : vol.id === 2
        ? "bg-gradient-to-br from-rose-400 to-amber-200 text-white"
        : vol.id === 3
        ? "bg-gradient-to-br from-cyan-400 to-indigo-900 text-white"
        : "bg-gradient-to-br from-teal-100 to-rose-200 text-gray-800";

    return (
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-semibold text-base ${gradient}`}
      >
        {initials}
      </div>
    );
  };

  const getStatusBadge = (status: VolunteerStatus): React.ReactElement => {
    const statusClasses: Record<VolunteerStatus, string> = {
      available: "bg-emerald-50 text-hf-green border border-emerald-100",
      "on-leave": "bg-red-100 text-red-800 border border-red-300",
      busy: "bg-amber-100 text-amber-800 border border-amber-300",
    };

    const statusLabels: Record<VolunteerStatus, string> = {
      available: "Available",
      "on-leave": "On Leave",
      busy: "Busy",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}
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
          <span className="text-gray-300 text-sm">★</span>
        </div>
        <span className="text-xs ml-1 text-gray-500">{rating}</span>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Volunteer Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage and track volunteer profiles
        </p>
      </div>

      {/* Volunteer Table */}
      <ReusableTable
        data={volunteers}
        columns={[
          { name: "Avatar", uid: "avatar", sortable: false },
          { name: "Name", uid: "name", sortable: true },
          { name: "Zone", uid: "zone", sortable: true },
          { name: "Tasks Completed", uid: "tasksCompleted", sortable: true },
          { name: "Rating", uid: "rating", sortable: true },
          { name: "Availability", uid: "status", sortable: true },
          { name: "Actions", uid: "actions", sortable: false },
        ]}
        renderCell={(vol: Volunteer, columnKey: React.Key) => {
          switch (columnKey) {
            case "avatar":
              return renderAvatar(vol);
            case "name":
              return <span className="font-medium">{vol.name}</span>;
            case "zone":
              return <span className="text-gray-600">{vol.zone}</span>;
            case "tasksCompleted":
              return (
                <span className="text-gray-600">{vol.tasksCompleted}</span>
              );
            case "rating":
              return renderStars(vol.rating);
            case "status":
              return getStatusBadge(vol.status);
            default:
              return <span>{String(vol[columnKey as keyof Volunteer])}</span>;
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
        <DrawerContent className="bg-white no-scrollbar">
          {() => (
            <>
              <DrawerBody className="px-6 py-4 space-y-6 overflow-y-auto no-scrollbar">
                {activeVolunteer && (
                  <>
                    {/* Stats */}
                    <div className="mb-3 pb-3 border-b border-gray-200 flex flex-row justify-between px-2">
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">
                          Completion Rate
                        </h3>
                        <div className="text-2xl font-black text-blue-500">
                          92%
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">
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
                    <div className="mb-2 pb-6 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Availability Management
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Adjust volunteer&apos;s working hours and status.
                      </p>

                      <div className="mb-4">
                        <div className="flex flex-row justify-between">
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Weekly Hours
                          </label>
                          <div className="text-right text-sm font-semibold text-gray-900 mt-1">
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
                        <label className="text-sm font-medium text-gray-700 flex justify-between mb-2">
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
                      <h3 className="font-bold text-gray-900 text-xl mb-2">
                        Volunteer Details
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Comprehensive profile information for{" "}
                        {activeVolunteer.name}.
                      </p>

                      <div className="space-y-6 text-sm">
                        {/* Personal Info */}
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Personal Information
                          </h4>
                          <p className="text-gray-600">
                            {activeVolunteer.email}
                          </p>
                          <p className="text-gray-600">
                            {activeVolunteer.phone}
                          </p>
                          <p className="text-gray-600">
                            {activeVolunteer.address}
                          </p>
                        </div>

                        {/* Vehicle Info */}
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Vehicle Details
                          </h4>
                          <p className="text-gray-600">
                            Type: {activeVolunteer.vehicle}
                          </p>
                          <p className="text-gray-600">
                            License Plate: {activeVolunteer.license}
                          </p>
                        </div>

                        {/* Assigned Tasks */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Assigned Tasks
                          </h4>
                          <ul className="text-gray-600 space-y-1">
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
