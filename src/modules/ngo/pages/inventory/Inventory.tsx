import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ReusableTable from "../../../../global/components/resuable-components/table";

interface DistributionRecord {
  id: number;
  item: string;
  quantity: string;
  location: string;
  date: string;
}

const NGOInventory = () => {
  const inventoryStats = [
    {
      label: "Dry Grains",
      val: "420kg",
      trend: "In stock",
      color: "bg-[#22c55e]",
    },
    {
      label: "Hygiene Kits",
      val: "150 units",
      trend: "Available",
      color: "bg-blue-500",
    },
    {
      label: "Fresh Produce",
      val: "85kg",
      trend: "Perishable",
      color: "bg-orange-500",
    },
    {
      label: "Water Bottles",
      val: "1.2k units",
      trend: "Well stocked",
      color: "bg-purple-500",
    },
  ];

  const distributionData: DistributionRecord[] = [
    {
      id: 1,
      item: "Rice Packs",
      quantity: "50kg",
      location: "Community Center A",
      date: "28 Dec, 2025",
    },
    {
      id: 2,
      item: "Canned Soup",
      quantity: "120 units",
      location: "Soup Kitchen B",
      date: "27 Dec, 2025",
    },
    {
      id: 3,
      item: "Hygiene Kits",
      quantity: "30 units",
      location: "Shelter C",
      date: "26 Dec, 2025",
    },
  ];

  return (
    <div
      className="p-6 space-y-6"
      style={{ backgroundColor: "var(--bg-secondary)", minHeight: "100%" }}
    >
      <div className="text-left">
        <h1
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Inventory Management
        </h1>
        <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
          Track your current stock and distributed items.
        </p>
      </div>

      {/* Inventory Stats */}
      <ImpactCards data={inventoryStats} />

      {/* Recent Distribution Table */}
      <ReusableTable
        data={distributionData}
        columns={[
          { name: "Item", uid: "item", sortable: true },
          { name: "Quantity", uid: "quantity", sortable: false },
          { name: "Location", uid: "location", sortable: true },
          { name: "Date", uid: "date", sortable: true },
        ]}
        renderCell={(record: DistributionRecord, columnKey: React.Key) => {
          switch (columnKey) {
            case "item":
              return (
                <span
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {record.item}
                </span>
              );
            case "quantity":
              return (
                <span style={{ color: "var(--text-secondary)" }}>
                  {record.quantity}
                </span>
              );
            case "location":
              return (
                <span style={{ color: "var(--text-secondary)" }}>
                  {record.location}
                </span>
              );
            case "date":
              return (
                <span style={{ color: "var(--text-muted)" }}>
                  {record.date}
                </span>
              );
            default:
              return (
                <span>
                  {String(record[columnKey as keyof DistributionRecord])}
                </span>
              );
          }
        }}
        title="Recent Distribution"
        description="Track distributed items and their destinations"
      />
    </div>
  );
};

export default NGOInventory;
