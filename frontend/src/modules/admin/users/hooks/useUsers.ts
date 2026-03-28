import { useUserStore } from "../store/user-store";

export const useUsers = () => {
  const { data, setUserData } = useUserStore();
  const users = data.users;

  return {
    users,
    setUserData,
  };
};
