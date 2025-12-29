const DonorProfile = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-black text-start">
        My Profile
      </h1>
      <p className="text-gray-600 mt-2 text-start">
        Manage your personal information and preferences.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-50 mb-4">
            <img
              src="https://mui.com/static/images/avatar/1.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900">John Donor</h2>
          <p className="text-emerald-500 text-sm font-black tracking-widest uppercase">
            Verified Donor
          </p>

          <div className="w-full mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Member Since</span>
              <span className="text-gray-900 font-medium">Jan 2025</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Impact</span>
              <span className="text-emerald-600 font-bold">1.2K Points</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-start">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Full Name
              </label>
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-gray-900 text-sm">
                Johnathan Doe
              </div>
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-gray-900 text-sm">
                john.doe@example.com
              </div>
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Phone
              </label>
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-gray-900 text-sm">
                +1 234 567 890
              </div>
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Location
              </label>
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-gray-900 text-sm">
                New York, USA
              </div>
            </div>
          </div>

          <button className="mt-8 px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
