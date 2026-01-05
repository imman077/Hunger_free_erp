import ReusableTable from "../../../../global/components/resuable-components/table";

interface DonationRequest {
  id: number;
  title: string;
  donor: string;
  distance: string;
  icon: string;
}

const DonationRequests = () => {
  const donations: DonationRequest[] = [
    {
      id: 1,
      title: "Excess Food from Corporate Event",
      donor: "Global Tech Inc.",
      distance: "20 miles away",
      icon: "🥗",
    },
    {
      id: 2,
      title: "Fresh Bakery Items",
      donor: "Local Bakery",
      distance: "5 miles away",
      icon: "🥖",
    },
    {
      id: 3,
      title: "Canned Goods Donation",
      donor: "Community Center",
      distance: "12 miles away",
      icon: "🥫",
    },
  ];

  const handleAccept = (donation: DonationRequest) => {
    console.log("Accepted:", donation);
  };

  const handleDecline = (donation: DonationRequest) => {
    console.log("Declined:", donation);
  };

  return (
    <div
      className="p-6 space-y-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="text-left">
        <h1
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Donation Requests
        </h1>
        <p className="mt-2" style={{ color: "var(--text-muted)" }}>
          Review and accept donations from the community.
        </p>
      </div>

      <ReusableTable
        data={donations}
        columns={[
          { name: "Icon", uid: "icon", sortable: false },
          { name: "Donation Details", uid: "title", sortable: true },
          { name: "Donor", uid: "donor", sortable: true },
          { name: "Distance", uid: "distance", sortable: false },
          { name: "Actions", uid: "actions", sortable: false },
        ]}
        renderCell={(donation: DonationRequest, columnKey: React.Key) => {
          switch (columnKey) {
            case "icon":
              return (
                <div className="flex justify-center">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center text-xl"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    {donation.icon}
                  </div>
                </div>
              );
            case "title":
              return (
                <span
                  className="font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {donation.title}
                </span>
              );
            case "donor":
              return (
                <span style={{ color: "var(--text-secondary)" }}>
                  {donation.donor}
                </span>
              );
            case "distance":
              return (
                <span
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {donation.distance}
                </span>
              );
            default:
              return (
                <span style={{ color: "var(--text-primary)" }}>
                  {String(donation[columnKey as keyof DonationRequest])}
                </span>
              );
          }
        }}
        actionConfig={{
          showView: false,
          showMessage: false,
          showApprove: true,
          showDeactivate: true,
          onApprove: handleAccept,
          onDeactivate: handleDecline,
        }}
      />
    </div>
  );
};

export default DonationRequests;
