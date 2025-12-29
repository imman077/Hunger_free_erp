const NGOProfile = () => {
  return (
    <div className="p-6 text-start">
      <h1 className="text-2xl font-semibold text-black">NGO Profile</h1>
      <p className="text-gray-600 mt-2">
        Update your organization's details and verification status.
      </p>

      <div className="mt-8 bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center gap-6 mb-8 pt-4">
          <div className="w-24 h-24 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-3xl font-black">
            GH
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Green Harvest NGO
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold uppercase tracking-wider">
                Certified Partner
              </span>
              <span className="text-xs text-gray-400">• New York, NY</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Organization Description
              </label>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dedicated to reducing food waste and hunger by connecting local
                donors with those in need. Operating since 2018 with a network
                of over 200 volunteers.
              </p>
            </div>
            <div className="pt-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Registration ID
              </label>
              <p className="text-sm font-mono text-gray-900">
                NGO-8823-XYZ-2025
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h4 className="font-bold text-gray-900 mb-4">
              Verification Documents
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-gray-600">
                  Tax Exempt Certificate.pdf
                </span>
                <span className="text-emerald-500 font-bold text-xs uppercase">
                  Verified
                </span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-gray-600">Operating License.pdf</span>
                <span className="text-emerald-500 font-bold text-xs uppercase">
                  Verified
                </span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-slate-400 hover:text-emerald-500 transition-colors">
              Upload New Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOProfile;
