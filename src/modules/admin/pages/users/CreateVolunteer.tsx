import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  User,
  MapPin,
  Car,
  ShieldCheck,
  Clock,
  Utensils,
  Smartphone,
  Info,
  Briefcase,
  HelpCircle,
} from "lucide-react";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";
import FileUploadSlot from "../../../../global/components/resuable-components/FileUploadSlot";

const CreateVolunteer = () => {
  const navigate = useNavigate();

  const [statesList, setStatesList] = useState<
    { value: string; label: string; id: number }[]
  >([]);
  const [districtsList, setDistrictsList] = useState<
    { value: string; label: string }[]
  >([]);
  const [loadingStates, setLoadingStates] = useState(false);

  const [formData, setFormData] = useState({
    // 1. Basic Details
    name: "",
    phone: "",
    role: "",
    emergencyPhone: "",

    // 2. Place Details
    city: "",
    district: "",
    state: "",
    pincode: "",

    // 3. Area Details
    areaName: "",
    wardNo: "",
    landmark: "",
    areaType: "",

    // 4. Area Assignment
    assignedArea: "",
    coverNearby: "No",

    // 5. Availability
    availableDays: "",
    availableTime: "",

    // 6. Consent
    willingToHandleFood: "No",
    followSafetyGuidelines: false,

    // 7. Additional (Optional)
    email: "",
    gender: "",
    ageGroup: "",

    // 8. Familiarity
    yearsInArea: "",
    familiarityLevel: "",
    languages: "",

    // 9. Transport
    transportMode: "",
    maxDistance: "",
    fuelReimbursement: "No",

    // 10. Emergency Support
    emergencyAvailable: "No",
    nightHours: "No",
    firstAid: "No",
  });

  // Fetch States and Districts data from GitHub (CORS-free)
  useEffect(() => {
    const fetchLocationData = async () => {
      setLoadingStates(true);
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json"
        );
        const data = await response.json();
        if (data && data.states) {
          // Map states with their IDs
          const mappedStates = data.states.map((s: any, index: number) => ({
            value: s.state,
            label: s.state,
            id: index + 1,
            districts: s.districts || [],
          }));
          setStatesList(mappedStates);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchLocationData();
  }, []);

  // Update districts when state changes
  useEffect(() => {
    if (!formData.state) {
      setDistrictsList([]);
      return;
    }

    const selectedState = statesList.find((s) => s.value === formData.state);
    if (selectedState && (selectedState as any).districts) {
      const mappedDistricts = (selectedState as any).districts.map(
        (d: string) => ({
          value: d,
          label: d,
        })
      );
      setDistrictsList(mappedDistricts);
    } else {
      setDistrictsList([]);
    }
  }, [formData.state, statesList]);

  const [attachments, setAttachments] = useState<Record<string, File | null>>({
    "Profile Photo": null,
    "Address Proof": null,
    "Government ID Proof": null,
    "NGO ID": null,
  });

  const handleValueChange = (name: string, value: string | boolean) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === "state") {
        newData.district = "";
        newData.assignedArea = "";
      }

      if (name === "district") {
        newData.assignedArea = "";
      }

      return newData;
    });
  };

  const handleAttachmentChange = (slot: string, file: File | null) => {
    setAttachments((prev) => ({
      ...prev,
      [slot]: file,
    }));
  };

  const dropOptions = {
    roles: [
      { value: "Volunteer", label: "Volunteer" },
      { value: "Area Coordinator", label: "Area Coordinator" },
      { value: "Delivery Volunteer", label: "Delivery Volunteer" },
    ],
    areaTypes: [
      { value: "Residential", label: "Residential" },
      { value: "Commercial", label: "Commercial" },
      { value: "Mixed", label: "Mixed" },
    ],
    yesNo: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
    availableDays: [
      { value: "Weekdays", label: "Weekdays" },
      { value: "Weekends", label: "Weekends" },
      { value: "Both", label: "Both" },
    ],
    timeSlots: [
      { value: "Morning", label: "Morning" },
      { value: "Afternoon", label: "Afternoon" },
      { value: "Evening", label: "Evening" },
    ],
    gender: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other", label: "Other" },
    ],
    ageGroups: [
      { value: "18-25", label: "18-25" },
      { value: "26-35", label: "26-35" },
      { value: "36-50", label: "36-50" },
      { value: "50+", label: "50+" },
    ],
    familiarity: [
      { value: "Very Familiar", label: "Very Familiar" },
      { value: "Moderate", label: "Moderate" },
      { value: "New", label: "New" },
    ],
    transport: [
      { value: "Walking", label: "Walking" },
      { value: "Bike", label: "Bike" },
      { value: "Car", label: "Car" },
      { value: "Public Transport", label: "Public Transport" },
    ],
    states: statesList,
    districts: districtsList,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.followSafetyGuidelines) {
      alert("Please agree to follow food safety guidelines.");
      return;
    }
    console.log("Submitting Volunteer Form:", { formData, attachments });
    alert("Volunteer Registration Completed Successfully!");
    navigate("/admin/users/volunteers");
  };

  const SectionHeader = ({
    icon: Icon,
    number,
    title,
    subtitle,
    isMandatory = true,
  }: any) => (
    <div
      className={`p-6 border-b flex items-center gap-4 ${
        isMandatory ? "bg-slate-50/50" : "bg-gray-50/30"
      }`}
      style={{ borderColor: "var(--border-color)" }}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${
          isMandatory
            ? "bg-white text-[#22c55e] border border-emerald-100"
            : "bg-white text-slate-400 border border-slate-100"
        }`}
      >
        <Icon size={24} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-black uppercase tracking-tight text-slate-800">
            {number}. {title}
          </h2>
          {isMandatory && (
            <span className="text-[8px] font-bold bg-red-50 text-red-500 px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-widest">
              Mandatory
            </span>
          )}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest mt-1 text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 w-full min-h-screen bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/admin/users/volunteers")}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-[#22c55e] hover:border-[#22c55e]/30 transition-all shadow-sm group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div>
              <h1 className="text-4xl font-black tracking-tighter italic text-slate-900">
                Volunteer Enrollment
              </h1>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.3em]">
                Operational Assignment Protocol
              </p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-full flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Live Registration
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pb-32">
          {/* --- MANDATORY SECTIONS --- */}
          <div className="space-y-1">
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <CheckCircle size={14} /> Mandatory Operational Details
            </p>

            <div className="grid grid-cols-1 gap-6">
              {/* 1. Basic Details */}
              <div className="bg-white rounded-xl border border-emerald-100 shadow-sm">
                <SectionHeader
                  icon={User}
                  number="01"
                  title="Basic Identity"
                  subtitle="Primary contact and role assignment"
                />
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <ResuableInput
                    label="Full Name"
                    value={formData.name}
                    onChange={(v) => handleValueChange("name", v)}
                    required
                    placeholder="e.g. Rahul Sharma"
                  />
                  <div className="relative">
                    <ResuableInput
                      label="Mobile Number"
                      value={formData.phone}
                      onChange={(v) => handleValueChange("phone", v)}
                      required
                      placeholder="+91-XXXXX-XXXXX"
                    />
                    <span className="absolute -top-1 right-0 text-[7px] font-bold bg-emerald-50 text-emerald-600 px-1 rounded-sm border border-emerald-100">
                      OTP VERIFIED
                    </span>
                  </div>
                  <ResuableDropdown
                    label="Role"
                    value={formData.role}
                    onChange={(v) => handleValueChange("role", v)}
                    options={dropOptions.roles}
                    required
                    placeholder="Select Role"
                  />
                  <ResuableInput
                    label="Emergency Contact"
                    value={formData.emergencyPhone}
                    onChange={(v) => handleValueChange("emergencyPhone", v)}
                    required
                    placeholder="+91-XXXXX-XXXXX"
                  />
                </div>
              </div>

              {/* 2. Place Details */}
              <div className="bg-white rounded-xl border border-emerald-100 shadow-sm">
                <SectionHeader
                  icon={MapPin}
                  number="02"
                  title="Base Location"
                  subtitle="City and District verification"
                />
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <ResuableDropdown
                      label="State"
                      value={formData.state}
                      onChange={(v) => handleValueChange("state", v)}
                      options={dropOptions.states}
                      required
                      placeholder={
                        loadingStates ? "Loading States..." : "Select State"
                      }
                      disabled={loadingStates}
                    />
                  </div>
                  <div className="lg:col-span-1">
                    {dropOptions.districts.length > 0 ? (
                      <ResuableDropdown
                        label="District"
                        value={formData.district}
                        onChange={(v) => handleValueChange("district", v)}
                        options={dropOptions.districts}
                        required
                        placeholder="Select District"
                      />
                    ) : (
                      <ResuableInput
                        label="District"
                        value={formData.district}
                        onChange={(v) => handleValueChange("district", v)}
                        required
                        placeholder={
                          formData.state
                            ? "Enter District Name"
                            : "Select State First"
                        }
                        disabled={!formData.state}
                      />
                    )}
                  </div>
                  <ResuableInput
                    label="City / Town"
                    value={formData.city}
                    onChange={(v) => handleValueChange("city", v)}
                    required
                    placeholder="e.g. Mumbai"
                  />
                  <ResuableInput
                    label="Pincode"
                    value={formData.pincode}
                    onChange={(v) => handleValueChange("pincode", v)}
                    required
                    placeholder="XXXXXX"
                  />
                </div>
              </div>

              {/* 3. Area Specifics */}
              <div className="bg-white rounded-xl border border-emerald-100 shadow-sm">
                <SectionHeader
                  icon={Info}
                  number="03"
                  title="Area Logistics"
                  subtitle="Granular locality data for routing"
                />
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <ResuableInput
                    label="Area / Locality Name"
                    value={formData.areaName}
                    onChange={(v) => handleValueChange("areaName", v)}
                    required
                    placeholder="e.g. Anna Nagar"
                  />
                  <ResuableInput
                    label="Ward / Zone / Block"
                    value={formData.wardNo}
                    onChange={(v) => handleValueChange("wardNo", v)}
                    placeholder="e.g. Ward 12"
                  />
                  <ResuableInput
                    label="Landmark"
                    value={formData.landmark}
                    onChange={(v) => handleValueChange("landmark", v)}
                    placeholder="e.g. Near Post Office"
                  />
                  <ResuableDropdown
                    label="Area Type"
                    value={formData.areaType}
                    onChange={(v) => handleValueChange("areaType", v)}
                    options={dropOptions.areaTypes}
                    required
                    placeholder="Select Type"
                  />
                </div>
              </div>

              {/* 4. Area Assignment & 5. Availability */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-emerald-100 shadow-sm">
                  <SectionHeader
                    icon={Briefcase}
                    number="04"
                    title="Field Assignment"
                    subtitle="Operational boundary settings"
                  />
                  <div className="p-8 space-y-6">
                    <ResuableInput
                      label="Assigned Area (Primary)"
                      value={formData.assignedArea}
                      onChange={(v) => handleValueChange("assignedArea", v)}
                      required
                      placeholder="e.g. Anna Nagar West"
                    />
                    <ResuableDropdown
                      label="Willing to cover nearby areas?"
                      value={formData.coverNearby}
                      onChange={(v) => handleValueChange("coverNearby", v)}
                      options={dropOptions.yesNo}
                      required
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-emerald-100 shadow-sm">
                  <SectionHeader
                    icon={Clock}
                    number="05"
                    title="Execution Timing"
                    subtitle="Availability windows"
                  />
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResuableDropdown
                      label="Available Days"
                      value={formData.availableDays}
                      onChange={(v) => handleValueChange("availableDays", v)}
                      options={dropOptions.availableDays}
                      required
                    />
                    <ResuableDropdown
                      label="Time Slot"
                      value={formData.availableTime}
                      onChange={(v) => handleValueChange("availableTime", v)}
                      options={dropOptions.timeSlots}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 6. Food Handling Consent */}
              <div className="bg-white rounded-xl border border-emerald-100 shadow-sm">
                <SectionHeader
                  icon={Utensils}
                  number="06"
                  title="Safety & Consent"
                  subtitle="Food handling and safety protocols"
                />
                <div className="p-8 flex flex-col md:flex-row gap-10 items-center justify-between">
                  <div className="w-full md:w-1/3">
                    <ResuableDropdown
                      label="Willing to handle food?"
                      value={formData.willingToHandleFood}
                      onChange={(v) =>
                        handleValueChange("willingToHandleFood", v)
                      }
                      options={dropOptions.yesNo}
                      required
                    />
                  </div>
                  <div
                    className={`flex-1 p-4 rounded-lg border-2 border-dashed flex items-start gap-4 transition-all ${
                      formData.followSafetyGuidelines
                        ? "border-emerald-200 bg-emerald-50/30"
                        : "border-slate-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id="safety"
                      className="mt-1 w-5 h-5 accent-emerald-500 cursor-pointer"
                      checked={formData.followSafetyGuidelines}
                      onChange={(e) =>
                        handleValueChange(
                          "followSafetyGuidelines",
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor="safety"
                      className="text-xs font-bold text-slate-600 cursor-pointer leading-relaxed"
                    >
                      I hereby agree to strictly follow all Food Safety &
                      Hygiene Guidelines provided by the Hunger Free
                      organization during collection and distribution.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- NON-MANDATORY SECTIONS --- */}
          <div className="pt-10 space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Info size={14} /> Optional Coordination Details (Helpful)
            </p>

            <div className="grid grid-cols-1 gap-6">
              {/* 7. Additional Info */}
              <div className="bg-white rounded-xl border border-slate-200 border-dashed shadow-sm">
                <SectionHeader
                  icon={Smartphone}
                  number="07"
                  title="Personal Profile"
                  subtitle="Background information"
                  isMandatory={false}
                />
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <ResuableInput
                    label="Email Address"
                    value={formData.email}
                    onChange={(v) => handleValueChange("email", v)}
                    type="email"
                    placeholder="example@mail.com"
                  />
                  <ResuableDropdown
                    label="Gender"
                    value={formData.gender}
                    onChange={(v) => handleValueChange("gender", v)}
                    options={dropOptions.gender}
                  />
                  <ResuableDropdown
                    label="Age Group"
                    value={formData.ageGroup}
                    onChange={(v) => handleValueChange("ageGroup", v)}
                    options={dropOptions.ageGroups}
                  />
                  <div className="flex items-center justify-center p-2 border-2 border-dashed border-slate-100 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-300">
                      Profile Photo Upload
                    </p>
                  </div>
                </div>
              </div>

              {/* 8. Familiarity & 9. Transport */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 border-dashed shadow-sm">
                  <SectionHeader
                    icon={HelpCircle}
                    number="08"
                    title="Area Familiarity"
                    subtitle="Local knowledge assessment"
                    isMandatory={false}
                  />
                  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ResuableInput
                      label="Years in Area"
                      value={formData.yearsInArea}
                      onChange={(v) => handleValueChange("yearsInArea", v)}
                      type="number"
                      placeholder="0"
                    />
                    <ResuableDropdown
                      label="Familiarity"
                      value={formData.familiarityLevel}
                      onChange={(v) => handleValueChange("familiarityLevel", v)}
                      options={dropOptions.familiarity}
                    />
                    <ResuableInput
                      label="Languages"
                      value={formData.languages}
                      onChange={(v) => handleValueChange("languages", v)}
                      placeholder="e.g. Tamil, English"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 border-dashed shadow-sm">
                  <SectionHeader
                    icon={Car}
                    number="09"
                    title="Mobility & Logistics"
                    subtitle="Transport mode for efficiency"
                    isMandatory={false}
                  />
                  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ResuableDropdown
                      label="Mode of Transport"
                      value={formData.transportMode}
                      onChange={(v) => handleValueChange("transportMode", v)}
                      options={dropOptions.transport}
                    />
                    <ResuableInput
                      label="Max Distance"
                      value={formData.maxDistance}
                      onChange={(v) => handleValueChange("maxDistance", v)}
                      placeholder="e.g. 10km"
                    />
                    <ResuableDropdown
                      label="Fuel Reimbursement"
                      value={formData.fuelReimbursement}
                      onChange={(v) =>
                        handleValueChange("fuelReimbursement", v)
                      }
                      options={dropOptions.yesNo}
                    />
                  </div>
                </div>
              </div>

              {/* 10. Emergency & Documents */}
              <div className="bg-white rounded-xl border border-slate-200 border-dashed shadow-sm">
                <SectionHeader
                  icon={ShieldCheck}
                  number="10"
                  title="Extended Support & Proofs"
                  subtitle="Emergency readiness and verification"
                  isMandatory={false}
                />
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ResuableDropdown
                      label="Emergency Availability?"
                      value={formData.emergencyAvailable}
                      onChange={(v) =>
                        handleValueChange("emergencyAvailable", v)
                      }
                      options={dropOptions.yesNo}
                    />
                    <ResuableDropdown
                      label="Late Hours?"
                      value={formData.nightHours}
                      onChange={(v) => handleValueChange("nightHours", v)}
                      options={dropOptions.yesNo}
                    />
                    <ResuableDropdown
                      label="First Aid Knowledge?"
                      value={formData.firstAid}
                      onChange={(v) => handleValueChange("firstAid", v)}
                      options={dropOptions.yesNo}
                    />
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <FileUploadSlot
                      label="Profile Photo"
                      value={attachments["Profile Photo"]}
                      onChange={(f) =>
                        handleAttachmentChange("Profile Photo", f)
                      }
                      icon="file"
                    />
                    <FileUploadSlot
                      label="Address Proof"
                      value={attachments["Address Proof"]}
                      onChange={(f) =>
                        handleAttachmentChange("Address Proof", f)
                      }
                      icon="file"
                    />
                    <FileUploadSlot
                      label="ID Proof"
                      value={attachments["Government ID Proof"]}
                      onChange={(f) =>
                        handleAttachmentChange("Government ID Proof", f)
                      }
                      icon="shield"
                    />
                    <FileUploadSlot
                      label="Organization ID"
                      value={attachments["NGO ID"]}
                      onChange={(f) => handleAttachmentChange("NGO ID", f)}
                      icon="file"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t p-6 z-[200]">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="hidden md:flex items-center gap-2 text-slate-400">
              <Info size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest pt-0.5">
                Please ensure all mandatory sections are populated
              </span>
            </div>
            <div className="flex items-center gap-6 ml-auto">
              <ResuableButton
                variant="ghost"
                onClick={() => navigate("/admin/users/volunteers")}
                className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] hover:text-red-500"
              >
                Cancel Entry
              </ResuableButton>
              <ResuableButton
                onClick={() =>
                  (
                    document.querySelector("form") as HTMLFormElement
                  ).requestSubmit()
                }
                variant="primary"
                className="min-w-[240px] h-[54px] !bg-[#22c55e] hover:!bg-[#1ea34a] !rounded-xl shadow-lg shadow-emerald-200 transition-all font-black text-[11px] uppercase tracking-[0.2em]"
                startContent={<CheckCircle size={20} />}
              >
                Confirm Registration
              </ResuableButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVolunteer;
