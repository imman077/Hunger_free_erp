import React, { useState } from "react";
import { Plus, Pencil, Trash2, Settings, Check, X } from "lucide-react";

// Configuration categories with mock data
const initialConfig = {
  foodCategories: [
    { id: 1, name: "Cooked Food", description: "Ready-to-eat meals" },
    { id: 2, name: "Fresh Produce", description: "Fruits and vegetables" },
    { id: 3, name: "Packaged Items", description: "Sealed packaged goods" },
    { id: 4, name: "Beverages", description: "Drinks and liquids" },
  ],
  donationStatuses: [
    { id: 1, name: "Pending Pickup", color: "amber" },
    { id: 2, name: "In Transit", color: "blue" },
    { id: 3, name: "Delivered", color: "emerald" },
    { id: 4, name: "Cancelled", color: "red" },
  ],
  userStatuses: [
    { id: 1, name: "Active", color: "emerald" },
    { id: 2, name: "Inactive", color: "slate" },
    { id: 3, name: "Pending Approval", color: "amber" },
    { id: 4, name: "Suspended", color: "red" },
  ],
  ngoTypes: [
    { id: 1, name: "Food Bank", description: "Large-scale food distribution" },
    { id: 2, name: "Shelter", description: "Housing with food services" },
    { id: 3, name: "Community Kitchen", description: "Local meal preparation" },
    { id: 4, name: "School Program", description: "Student meal programs" },
  ],
  volunteerSkills: [
    { id: 1, name: "Driving", description: "Vehicle operation for delivery" },
    { id: 2, name: "Cooking", description: "Food preparation skills" },
    { id: 3, name: "Logistics", description: "Coordination and planning" },
    { id: 4, name: "Packaging", description: "Food packing and sorting" },
  ],
};

type ConfigItem = {
  id: number;
  name: string;
  description?: string;
  color?: string;
};

type ConfigSection = {
  key: keyof typeof initialConfig;
  title: string;
  icon: React.ReactNode;
  hasDescription: boolean;
  hasColor: boolean;
};

const configSections: ConfigSection[] = [
  {
    key: "foodCategories",
    title: "Food Categories",
    icon: <Settings size={18} />,
    hasDescription: true,
    hasColor: false,
  },
  {
    key: "donationStatuses",
    title: "Donation Statuses",
    icon: <Settings size={18} />,
    hasDescription: false,
    hasColor: true,
  },
  {
    key: "userStatuses",
    title: "User Statuses",
    icon: <Settings size={18} />,
    hasDescription: false,
    hasColor: true,
  },
  {
    key: "ngoTypes",
    title: "NGO Types",
    icon: <Settings size={18} />,
    hasDescription: true,
    hasColor: false,
  },
  {
    key: "volunteerSkills",
    title: "Volunteer Skills",
    icon: <Settings size={18} />,
    hasDescription: true,
    hasColor: false,
  },
];

const ConfigurationPage: React.FC = () => {
  const [config, setConfig] = useState(initialConfig);
  const [activeSection, setActiveSection] =
    useState<keyof typeof initialConfig>("foodCategories");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState({
    name: "",
    description: "",
    color: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    color: "slate",
  });

  const currentSection = configSections.find((s) => s.key === activeSection)!;
  const currentItems = config[activeSection] as ConfigItem[];

  const handleAdd = () => {
    if (!newItem.name.trim()) return;
    const maxId = Math.max(...currentItems.map((i) => i.id), 0);
    const itemToAdd: ConfigItem = {
      id: maxId + 1,
      name: newItem.name,
      ...(currentSection.hasDescription && {
        description: newItem.description,
      }),
      ...(currentSection.hasColor && { color: newItem.color }),
    };
    setConfig((prev) => ({
      ...prev,
      [activeSection]: [...prev[activeSection], itemToAdd],
    }));
    setNewItem({ name: "", description: "", color: "slate" });
    setIsAdding(false);
  };

  const handleEdit = (item: ConfigItem) => {
    setEditingId(item.id);
    setEditValue({
      name: item.name,
      description: item.description || "",
      color: item.color || "",
    });
  };

  const handleSave = (id: number) => {
    setConfig((prev) => ({
      ...prev,
      [activeSection]: (prev[activeSection] as ConfigItem[]).map((item) =>
        item.id === id
          ? {
              ...item,
              name: editValue.name,
              description: editValue.description,
              color: editValue.color,
            }
          : item,
      ),
    }));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setConfig((prev) => ({
        ...prev,
        [activeSection]: (prev[activeSection] as ConfigItem[]).filter(
          (item) => item.id !== id,
        ),
      }));
    }
  };

  const colorOptions = ["emerald", "blue", "amber", "red", "slate", "purple"];

  return (
    <div className="p-8 w-full mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div className="text-start">
          <h1
            className="text-4xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            System Configuration
          </h1>
          <p className="text-slate-500 font-semibold mt-2">
            Manage dropdown options and system settings in one place.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar - Section Tabs */}
        <div className="col-span-3">
          <div className="bg-white border border-slate-200 rounded-sm p-2 space-y-1">
            {configSections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all ${
                  activeSection === section.key
                    ? "bg-emerald-50 text-emerald-700 font-bold border-l-4 border-emerald-500"
                    : "text-slate-600 hover:bg-slate-50 font-medium"
                }`}
              >
                <span
                  className={
                    activeSection === section.key
                      ? "text-emerald-600"
                      : "text-slate-400"
                  }
                >
                  {section.icon}
                </span>
                <span className="text-sm">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="bg-white border border-slate-200 rounded-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-800">
                  {currentSection.title}
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {currentItems.length} items configured
                </p>
              </div>
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-all"
              >
                <Plus size={14} />
                Add New
              </button>
            </div>

            {/* Add New Item Form */}
            {isAdding && (
              <div className="p-4 bg-emerald-50/50 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  {currentSection.hasDescription && (
                    <input
                      type="text"
                      placeholder="Description"
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  )}
                  {currentSection.hasColor && (
                    <select
                      value={newItem.color}
                      onChange={(e) =>
                        setNewItem({ ...newItem, color: e.target.value })
                      }
                      className="px-3 py-2 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      {colorOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  )}
                  <button
                    onClick={handleAdd}
                    className="p-2 bg-emerald-500 text-white rounded-sm hover:bg-emerald-600"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="p-2 bg-slate-200 text-slate-600 rounded-sm hover:bg-slate-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Items List */}
            <div className="divide-y divide-slate-100">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors group"
                >
                  {editingId === item.id ? (
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="text"
                        value={editValue.name}
                        onChange={(e) =>
                          setEditValue({ ...editValue, name: e.target.value })
                        }
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                      {currentSection.hasDescription && (
                        <input
                          type="text"
                          value={editValue.description}
                          onChange={(e) =>
                            setEditValue({
                              ...editValue,
                              description: e.target.value,
                            })
                          }
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                      )}
                      {currentSection.hasColor && (
                        <select
                          value={editValue.color}
                          onChange={(e) =>
                            setEditValue({
                              ...editValue,
                              color: e.target.value,
                            })
                          }
                          className="px-3 py-2 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        >
                          {colorOptions.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      )}
                      <button
                        onClick={() => handleSave(item.id)}
                        className="p-2 bg-emerald-500 text-white rounded-sm hover:bg-emerald-600"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2 bg-slate-200 text-slate-600 rounded-sm hover:bg-slate-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4">
                        {currentSection.hasColor && item.color && (
                          <div
                            className={`w-3 h-3 rounded-full bg-${item.color}-500`}
                          />
                        )}
                        <div>
                          <p className="font-bold text-slate-800 text-sm">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-xs text-slate-400 font-medium">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-sm transition-all"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {currentItems.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-slate-400 font-medium">
                    No items configured yet.
                  </p>
                  <button
                    onClick={() => setIsAdding(true)}
                    className="mt-4 text-emerald-600 font-bold text-sm hover:underline"
                  >
                    Add your first item
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPage;
