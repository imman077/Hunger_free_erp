import { Star, Clock, CheckCircle, TrendingUp } from "lucide-react";

const VolunteerProfile = () => {
  return (
    <div className="p-6 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
          Volunteer Profile
        </h1>
        <p className="text-gray-600 font-medium mb-8">
          Manage your availability and track your contributions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Availability */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white p-8 rounded-sm border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] flex items-center justify-center text-5xl mb-4 border-4 border-white">
                  🚴
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  Sam Volunteer
                </h3>
                <div className="mt-2 px-4 py-1.5 bg-[#ecfdf5] border border-[#d1fae5] rounded-sm">
                  <p className="text-xs text-[#16a34a] font-black uppercase tracking-widest">
                    Master Courier
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-white p-6 rounded-sm border border-gray-100">
              <h4 className="text-sm font-black text-gray-900 mb-4 uppercase tracking-wider">
                Availability
              </h4>
              <div className="space-y-3">
                {["Mon", "Wed", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-sm"
                  >
                    <span className="text-sm font-bold text-gray-700">
                      {day}
                    </span>
                    <span className="px-3 py-1 bg-[#ecfdf5] text-[#16a34a] font-black uppercase text-[10px] tracking-widest rounded-sm border border-[#d1fae5]">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Excellence Record */}
            <div className="bg-white p-8 rounded-sm border border-gray-100">
              <h4 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-[#22c55e]" />
                Service Excellence Record
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-[#ecfdf5] to-white rounded-sm border border-[#d1fae5] transition-all duration-300">
                  <div className="flex justify-center mb-3">
                    <Star className="w-8 h-8 text-[#22c55e]" />
                  </div>
                  <div className="text-3xl font-black text-gray-900">4.9/5</div>
                  <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">
                    Rating
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-sm border border-blue-100 transition-all duration-300">
                  <div className="flex justify-center mb-3">
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-3xl font-black text-gray-900">98%</div>
                  <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">
                    On-time
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-white rounded-sm border border-purple-100 transition-all duration-300">
                  <div className="flex justify-center mb-3">
                    <CheckCircle className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="text-3xl font-black text-gray-900">0</div>
                  <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">
                    Issues
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white p-8 rounded-sm border border-gray-100">
              <h4 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-[#22c55e]" />
                Vehicle Details
              </h4>
              <div className="p-6 rounded-sm border-2 border-dashed border-gray-200 flex justify-between items-center hover:border-[#d1fae5] hover:bg-[#ecfdf5]/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] rounded-sm flex items-center justify-center text-3xl">
                    🚲
                  </div>
                  <div>
                    <p className="text-base font-black text-gray-900">
                      Electric Bicycle
                    </p>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                      Model: EcoRider 3000
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-[#ecfdf5] border border-[#d1fae5] rounded-sm">
                      <CheckCircle className="w-3 h-3 text-[#22c55e]" />
                      <span className="text-[10px] text-[#16a34a] font-black uppercase tracking-widest">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2.5 text-sm font-black text-[#22c55e] hover:bg-[#ecfdf5] rounded-sm border-2 border-[#d1fae5] transition-all duration-300 uppercase tracking-wider">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;
