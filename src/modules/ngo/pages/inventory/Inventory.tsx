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
      className="p-8 min-h-screen space-y-8"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-start">
          <h1 className="text-5xl font-black tracking-tighter mb-3 uppercase text-slate-900">
            Inventory Management
          </h1>
          <p className="font-medium text-lg text-slate-500">
            Track your current stock and distributed items 📦
          </p>
        </div>
      </div>

      {/* Inventory Stats */}
      <ImpactCards data={inventoryStats} />

      {/* Recent Distribution Table */}
      <ReusableTable
        data={distributionData}
        columns={[
          { name: "Item", uid: "item", sortable: true, align: "start" },
          { name: "Quantity", uid: "quantity", sortable: false },
          { name: "Location", uid: "location", sortable: true, align: "start" },
          { name: "Date", uid: "date", sortable: true },
        ]}
        renderCell={(record: DistributionRecord, columnKey: React.Key) => {
          switch (columnKey) {
            case "item":
              return (
                <div className="text-left">
                  <span className="font-bold text-slate-800 text-xs whitespace-nowrap px-1">
                    {record.item}
                  </span>
                </div>
              );
            case "quantity":
              return (
                <span className="font-bold text-slate-500 text-xs uppercase tracking-wide">
                  {record.quantity}
                </span>
              );
            case "location":
              return (
                <div className="text-left">
                  <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wide whitespace-nowrap px-1">
                    {record.location}
                  </span>
                </div>
              );
            case "date":
              return (
                <span className="text-[10px] font-black text-[#22c55e] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 whitespace-nowrap">
                  {record.date.toUpperCase()}
                </span>
              );
            default:
              return (
                <span className="text-xs font-medium text-slate-700 whitespace-nowrap px-1">
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
