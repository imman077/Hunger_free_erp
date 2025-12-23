import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import { MapPin, TrendingUp, Users, Package, Crosshair } from "lucide-react";

interface DonationMarker {
  id: string;
  name: string;
  coordinates: [number, number];
  amount: number;
  status: "active" | "pending" | "completed";
}

// Component to handle map centering
const MapController = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();
  if (center) {
    map.setView(center, 13);
  }
  return null;
};

const DonationTrackingPage: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<DonationMarker | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isLocating, setIsLocating] = useState(false);

  const handleLocateMe = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setIsLocating(false);
      },
      () => {
        alert("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  // Sample donation locations
  const donations: DonationMarker[] = [
    {
      id: "1",
      name: "Chennai Hub",
      coordinates: [13.0827, 80.2707],
      amount: 450,
      status: "active",
    },
    {
      id: "2",
      name: "Mumbai Center",
      coordinates: [19.076, 72.8777],
      amount: 320,
      status: "completed",
    },
    {
      id: "3",
      name: "Delhi Distribution",
      coordinates: [28.7041, 77.1025],
      amount: 580,
      status: "active",
    },
    {
      id: "4",
      name: "Bangalore Hub",
      coordinates: [12.9716, 77.5946],
      amount: 290,
      status: "pending",
    },
    {
      id: "5",
      name: "Kolkata Center",
      coordinates: [22.5726, 88.3639],
      amount: 410,
      status: "active",
    },
  ];

  const stats = [
    {
      label: "Active Donations",
      val: "24",
      trend: "+12% from yesterday",
      color: "bg-emerald-500",
    },
    {
      label: "Total Weight",
      val: "2,050 KG",
      trend: "+340 KG today",
      color: "bg-emerald-500",
    },
    {
      label: "Hubs Active",
      val: "18",
      trend: "98% operational",
      color: "bg-slate-300",
    },
    {
      label: "Beneficiaries",
      val: "1,240",
      trend: "Meals served today",
      color: "bg-emerald-500",
    },
  ];

  const getMarkerIcon = (status: string) => {
    const color =
      status === "active"
        ? "#10b981"
        : status === "pending"
        ? "#f59e0b"
        : "#6b7280";

    return divIcon({
      className: "custom-marker",
      html: `
        <div style="position: relative;">
          <div style="
            width: 32px;
            height: 32px;
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            position: relative;
            z-index: 1000;
          "></div>
          <div style="
            width: 48px;
            height: 48px;
            background-color: ${color};
            opacity: 0.3;
            border-radius: 50%;
            position: absolute;
            top: -8px;
            left: -8px;
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  const getUserIcon = () => {
    return divIcon({
      className: "user-marker",
      html: `
        <div style="position: relative;">
          <div style="
            width: 24px;
            height: 24px;
            background-color: #3b82f6;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
            position: relative;
            z-index: 1000;
          "></div>
          <div style="
            width: 40px;
            height: 40px;
            background-color: #3b82f6;
            opacity: 0.2;
            border-radius: 50%;
            position: absolute;
            top: -8px;
            left: -8px;
            animation: pulse-blue 2s infinite;
          "></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="p-6 space-y-6">
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes pulse-blue {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        .custom-marker, .user-marker {
          background: transparent;
          border: none;
        }
      `}</style>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Live Tracking
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time donation tracking across all hubs
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className={`flex items-center gap-2 px-4 py-2 bg-white rounded-sm border border-gray-200 text-xs font-bold transition-all hover:bg-gray-50 active:scale-95 ${
              isLocating ? "text-gray-400" : "text-gray-700"
            }`}
          >
            <Crosshair
              className={`w-4 h-4 ${isLocating ? "animate-spin" : ""}`}
            />
            {isLocating ? "Locating..." : "Locate Me"}
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-sm border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <ImpactCards data={stats} />

      {/* Map and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-white rounded-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">
              Donation Locations
            </h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-gray-600">My Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-gray-600">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-gray-600">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-gray-600">Completed</span>
              </div>
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-sm border border-gray-200 overflow-hidden h-[500px]">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController center={userLocation} />

              {userLocation && (
                <Marker position={userLocation} icon={getUserIcon()}>
                  <Popup>
                    <div className="p-1">
                      <p className="text-xs font-bold text-gray-900 text-center">
                        You are here
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}

              {donations.map((donation) => (
                <Marker
                  key={donation.id}
                  position={donation.coordinates}
                  icon={getMarkerIcon(donation.status)}
                  eventHandlers={{
                    click: () => setSelectedMarker(donation),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">
                        {donation.name}
                      </h3>
                      <div className="space-y-1 text-xs">
                        <p className="text-gray-600">
                          Amount:{" "}
                          <span className="font-bold">
                            {donation.amount} KG
                          </span>
                        </p>
                        <p className="text-gray-600">
                          Status:{" "}
                          <span
                            className={`font-bold capitalize ${
                              donation.status === "active"
                                ? "text-emerald-600"
                                : donation.status === "pending"
                                ? "text-amber-600"
                                : "text-gray-600"
                            }`}
                          >
                            {donation.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-sm border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Live Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                time: "2 min ago",
                action: "New donation received",
                location: "Chennai Hub",
                amount: "45 KG",
                icon: Package,
              },
              {
                time: "5 min ago",
                action: "Distribution completed",
                location: "Mumbai Center",
                amount: "120 KG",
                icon: TrendingUp,
              },
              {
                time: "12 min ago",
                action: "Volunteer assigned",
                location: "Delhi Distribution",
                amount: "3 volunteers",
                icon: Users,
              },
              {
                time: "18 min ago",
                action: "Pickup scheduled",
                location: "Bangalore Hub",
                amount: "85 KG",
                icon: MapPin,
              },
              {
                time: "25 min ago",
                action: "New donation received",
                location: "Kolkata Center",
                amount: "62 KG",
                icon: Package,
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="w-8 h-8 rounded-sm bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 mb-1">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.location}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-emerald-600">
                      {activity.amount}
                    </span>
                    <span className="text-xs text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationTrackingPage;
