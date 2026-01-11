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
      className="p-8 min-h-screen space-y-8"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-start">
          <h1 className="text-5xl font-black tracking-tighter mb-3 uppercase text-slate-900">
            Donation Requests
          </h1>
          <p className="font-medium text-lg text-slate-500">
            Review and accept donations from the community 🤝
          </p>
        </div>
      </div>

      <ReusableTable
        variant="compact"
        title="Incoming Donations"
        description="Filter and manage requests based on proximity and item types."
        data={donations}
        columns={[
          { name: "Icon", uid: "icon", sortable: false },
          { name: "Donation Details", uid: "title", sortable: true },
          { name: "Donor", uid: "donor", sortable: true, align: "start" },
          { name: "Distance", uid: "distance", sortable: false },
          { name: "Actions", uid: "actions", sortable: false },
        ]}
        renderCell={(donation: DonationRequest, columnKey: React.Key) => {
          switch (columnKey) {
            case "icon":
              return (
                <div className="flex">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center text-xl shadow-sm border border-slate-100"
                    style={{ backgroundColor: "var(--bg-primary)" }}
                  >
                    {donation.icon}
                  </div>
                </div>
              );
            case "title":
              return (
                <div className="text-left min-w-0">
                  <span className="font-bold text-slate-800 text-xs whitespace-nowrap truncate max-w-[180px] px-1 block">
                    {donation.title}
                  </span>
                </div>
              );
            case "donor":
              return (
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-hf-green/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-slate-400 shadow-sm shrink-0">
                    {donation.donor
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <span
                    className="font-bold text-[11px] whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-hf-green transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {donation.donor}
                  </span>
                </div>
              );
            case "distance":
              return (
                <span className="text-xs font-black text-[#22c55e] bg-emerald-50 px-3 py-1.5 rounded-sm border border-emerald-100">
                  {donation.distance}
                </span>
              );
            default:
              return (
                <span className="text-slate-700 text-[11px] font-medium whitespace-nowrap px-1">
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
