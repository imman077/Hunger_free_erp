const MyTasks = () => {
  return (
    <div className="p-6 text-start">
      <h1 className="text-2xl font-semibold text-black">
        My Volunteering Tasks
      </h1>
      <p className="text-gray-600 mt-2">
        View your assigned tasks and available opportunities.
      </p>

      <div className="mt-8">
        <div className="flex gap-4 border-b border-gray-100 mb-6">
          <button className="px-4 py-2 text-sm font-bold text-emerald-500 border-b-2 border-emerald-500">
            Active Tasks (2)
          </button>
          <button className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
            Opportunities (12)
          </button>
          <button className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
            Past Tasks
          </button>
        </div>

        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-gray-100 group hover:border-emerald-200 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-lg">
                    🚚
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Food Redistribution - Route #{200 + i}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      3 Stop Points • Estimated 2.5 hours • 50kg Total Load
                    </p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-orange-50 text-orange-600 font-bold uppercase rounded-full">
                  In Progress
                </span>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button className="px-4 py-1.5 text-xs font-bold text-gray-500 border border-gray-200 rounded-lg">
                  View Details
                </button>
                <button className="px-4 py-1.5 text-xs font-bold text-white bg-gray-900 rounded-lg">
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
