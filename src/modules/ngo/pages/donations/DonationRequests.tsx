const DonationRequests = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-black text-start">
        Donation Requests
      </h1>
      <p className="text-gray-600 mt-2 text-start">
        Review and accept donations from the community.
      </p>

      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center group hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl">
                🥗
              </div>
              <div className="flex flex-col items-start">
                <h4 className="font-bold text-gray-900">
                  Excess Food from Corporate Event
                </h4>
                <p className="text-xs text-gray-500">
                  Donated by: Global Tech Inc. • 20 miles away
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                Decline
              </button>
              <button className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors shadow-sm shadow-emerald-200">
                Accept Donation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
