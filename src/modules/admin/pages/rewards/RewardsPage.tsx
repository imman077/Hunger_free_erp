import { Outlet } from "react-router-dom";

const RewardsPage: React.FC = () => {
  return (
    <div className="p-8 w-full mx-auto animate-in slide-in-from-bottom-4 duration-700 text-start">
      <div className="transition-all duration-500">
        <Outlet />
      </div>
    </div>
  );
};

export default RewardsPage;
