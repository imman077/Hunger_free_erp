const VolunteerProfile = () => {
  return (
    <div className="p-6 text-start">
      <h1 className="text-2xl font-semibold text-black">Volunteer Profile</h1>
      <p className="text-gray-600 mt-2">
        Manage your availability and track your contributions.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-4 grayscale">
              🚴
            </div>
            <h3 className="font-bold text-gray-900">Sam Volunteer</h3>
            <p className="text-xs text-emerald-500 font-black uppercase tracking-widest mt-1">
              Master Courier
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 mb-4">
              Availability
            </h4>
            <div className="space-y-2">
              {["Mon", "Wed", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-500">{day}</span>
                  <span className="text-emerald-500 font-bold uppercase text-[10px]">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3 bg-white p-6 rounded-xl border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">
            Service Excellence Record
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-black text-gray-900">4.9/5</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Rating
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-black text-gray-900">98%</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                On-time
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-black text-gray-900">0</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Issues
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-bold text-gray-900 mb-4">Vehicle Details</h4>
            <div className="p-4 rounded-xl border border-dashed border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🚲</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Electric Bicycle
                  </p>
                  <p className="text-xs text-gray-400">
                    Model: EcoRider 3000 • Verified
                  </p>
                </div>
              </div>
              <button className="text-xs font-bold text-emerald-500">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;
