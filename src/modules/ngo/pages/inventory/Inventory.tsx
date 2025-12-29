const NGOInventory = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-black text-start">
        Inventory Management
      </h1>
      <p className="text-gray-600 mt-2 text-start">
        Track your current stock and distributed items.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex flex-col items-start">
          <span className="text-emerald-700 font-bold text-xl">420kg</span>
          <span className="text-xs text-emerald-600 font-medium uppercase tracking-wider">
            Dry Grains
          </span>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-start">
          <span className="text-blue-700 font-bold text-xl">150 units</span>
          <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">
            Hygiene Kits
          </span>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex flex-col items-start">
          <span className="text-orange-700 font-bold text-xl">85kg</span>
          <span className="text-xs text-orange-600 font-medium uppercase tracking-wider">
            Fresh Produce
          </span>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex flex-col items-start">
          <span className="text-purple-700 font-bold text-xl">1.2k units</span>
          <span className="text-xs text-purple-600 font-medium uppercase tracking-wider">
            Water Bottles
          </span>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-start">
          Recent Distribution
        </h3>
        <div className="overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest border-b border-gray-50">
              <tr>
                <th className="pb-3 px-2">Item</th>
                <th className="pb-3 px-2">Quantity</th>
                <th className="pb-3 px-2">Location</th>
                <th className="pb-3 px-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td className="py-3 px-2 font-medium text-gray-900">
                  Rice Packs
                </td>
                <td className="py-3 px-2 text-gray-600">50kg</td>
                <td className="py-3 px-2 text-gray-600">Community Center A</td>
                <td className="py-3 px-2 text-gray-500">28 Dec, 2025</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium text-gray-900">
                  Canned Soup
                </td>
                <td className="py-3 px-2 text-gray-600">120 units</td>
                <td className="py-3 px-2 text-gray-600">Soup Kitchen B</td>
                <td className="py-3 px-2 text-gray-500">27 Dec, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NGOInventory;
