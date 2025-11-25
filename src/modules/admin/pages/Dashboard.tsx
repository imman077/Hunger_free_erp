import { Button } from "@heroui/react";
import { Users, Shield, HandHeart, UserPlus, Handshake } from "lucide-react";
import LineChart from "../../../global/charts/LineChart";
import BarChart from "../../../global/charts/BarChart";
import {
  CheckCircle,
  User,
  Package,
  Database,
  GraduationCap,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Donations",
      value: "1.2K",
      change: "+15% from last month",
      changeColor: "text-green-600",
      icon: <HandHeart size={20} className="text-gray-500" />,
    },
    {
      title: "Active Users",
      value: "542",
      change: "+8% from last week",
      changeColor: "text-green-600",
      icon: <Users size={20} className="text-gray-500" />,
    },
    {
      title: "NGO Partners",
      value: "68",
      change: "+2 new this month",
      changeColor: "text-green-600",
      icon: <Handshake size={20} className="text-gray-500" />,
    },
    {
      title: "Volunteers Onboarded",
      value: "210",
      change: "-3% from last month",
      changeColor: "text-red-600",
      icon: <UserPlus size={20} className="text-gray-500" />,
    },
  ];

  const activities = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: 'New NGO partner "Green Harvest" registered.',
      category: "Partner Registration",
      time: "2 hours ago",
      date: "Nov 25, 2025",
      color: "border-green-500",
    },
    {
      icon: <User className="w-6 h-6 text-blue-600" />,
      title: 'User "John Doe" updated profile details.',
      category: "User Update",
      time: "5 hours ago",
      date: "Nov 25, 2025",
      color: "border-blue-500",
    },
    {
      icon: <Package className="w-6 h-6 text-orange-600" />,
      title: "Donation pickup for order #10023 confirmed.",
      category: "Logistics",
      time: "Yesterday",
      date: "Nov 24, 2025",
      color: "border-orange-500",
    },
    {
      icon: <Database className="w-6 h-6 text-purple-600" />,
      title: "System alert: Database backup completed successfully.",
      category: "System Alert",
      time: "Yesterday",
      date: "Nov 24, 2025",
      color: "border-purple-500",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-teal-600" />,
      title: 'Volunteer "Jane Smith" completed training.',
      category: "Training",
      time: "2 days ago",
      date: "Nov 23, 2025",
      color: "border-teal-500",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Admin Panel */}
      <div className="flex justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-black">Admin Panel</h1>
          <p className="text-gray-600">
            Comprehensive overview and management of the HungerFree ERP
            platform.
          </p>
        </div>
        <div className="flex items-center">
          <Button
            color="success"
            className="flex items-center justify-center bg-green-500 text-sm"
          >
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Four Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-md p-5 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-600">
                {item.title}
              </h4>
              {item.icon}
            </div>
            <div className="flex flex-col items-start">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>

              <p className={`text-xs mt-1 ${item.changeColor}`}>
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-md p-5 border border-gray-100">
          <div className="mb-3 flex flex-col items-start">
            <h3 className="text-lg font-semibold text-black">
              Donation Trends
            </h3>
            <p className="text-gray-600">
              Monthly overview of donations and pickups.
            </p>
          </div>
          <LineChart />
        </div>
        <div className="bg-white rounded-md p-5 border border-gray-100">
          <div className="mb-3 flex flex-col items-start">
            <h3 className="text-lg font-semibold text-black">
              User Sign-ups by Role
            </h3>
            <p className="text-gray-600">New user registrations per role.</p>
          </div>
          <BarChart />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-md border border-gray-100 p-5">
        {/* Header */}
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-semibold text-black">
            Recent System Activities
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Latest updates and events across the platform.
          </p>
        </div>

        {/* Activity List */}
        <div className="">
          {activities.map((activity, index) => (
            <div key={index}>
              <div
                className={`flex items-start gap-4 p-1 rounded-md ${activity.color} bg-white hover:bg-gray-50 transition-all`}
              >
                {/* Icon */}
                <div className="pt-1">{activity.icon}</div>

                {/* Info */}
                <div className="flex flex-col items-start">
                  <p className="text-gray-900 font-medium">{activity.title}</p>

                  {/* Category Tag */}
                  <span className="inline-block mt-1 text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                    {activity.category}
                  </span>

                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>•
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
              </div>

              {/* Divider except last item */}
              {index < activities.length - 1 && (
                <hr className="border-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
