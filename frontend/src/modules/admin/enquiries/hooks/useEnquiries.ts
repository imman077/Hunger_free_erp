import { useEnquiryStore } from "../store/enquiry-store";
import { toast } from "sonner";

export const useEnquiries = () => {
  const { registrations, claims, payments, updates, rewards, approve, reject } =
    useEnquiryStore();

  const handleApprove = (
    id: string,
    name: string,
    type: "registrations" | "claims" | "payments" | "updates" | "rewards",
  ) => {
    approve(type, id);
    toast.success(`${name} has been approved!`);
  };

  const handleReject = (
    id: string,
    name: string,
    type: "registrations" | "claims" | "payments" | "updates" | "rewards",
  ) => {
    reject(type, id);
    toast.error(`${name} has been rejected.`);
  };

  return {
    registrations,
    claims,
    payments,
    updates,
    rewards,
    actions: {
      approve: handleApprove,
      reject: handleReject,
    },
  };
};
