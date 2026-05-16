import { useEffect } from "react";
import { useNgoStore } from "../../store/ngo-store";
import { ngoRewardsService } from "../api/rewards.api";

export const useNgoRewards = () => {
  const { data, isLoading, error, setNgoData, setLoading, setError } =
    useNgoStore();

  useEffect(() => {
    const fetchRewardsData = async () => {
      if (isLoading) return;
      setLoading(true);
      try {
        const [
          rewardsResponse,
          tiersResponse,
          prizesResponse,
          profileResponse,
        ] = await Promise.all([
          ngoRewardsService.getRewards(),
          ngoRewardsService.getTiers(),
          ngoRewardsService.getLuckySpinPrizes(),
          ngoRewardsService.getNGOProfile(),
        ]);

        // Filter rewards for NGO role and map to categories
        const ngoRewards = rewardsResponse.filter((r: any) => r.role === "NGO");

        const mappedRewards = {
          grants: ngoRewards
            .filter((r: any) => r.category === "cash") // "Quick Money" maps to cash in DB
            .map((r: any) => ({
              id: r.id,
              name: r.name,
              amount: r.amount || r.name,
              points: r.points_required,
              available: r.available,
              desc: r.description,
            })),
          mega: ngoRewards
            .filter((r: any) => r.category === "grants") // "Big Funds" maps to grants in DB
            .map((r: any) => ({
              id: r.id,
              name: r.name,
              amount: r.amount || r.name,
              points: r.points_required,
              available: r.available,
              desc: r.description,
            })),
          social: ngoRewards
            .filter((r: any) => r.category === "social") // "Aid & Tools" maps to social in DB
            .map((r: any) => ({
              id: r.id,
              name: r.name,
              points: r.points_required,
              available: r.available,
              desc: r.description,
              details: r.details || [],
            })),
        };

        // Map prizes
        const mappedPrizes = prizesResponse.map((p: any) => ({
          id: p.id,
          label: p.label,
          icon: p.icon || "🎁",
          color: p.prize_type === "GRANT" ? "#22c55e" : "var(--bg-secondary)",
        }));

        // Map tiers
        const mappedTiers = tiersResponse.map((t: any) => ({
          name: t.name,
          points: `${t.min_points.toLocaleString()}${t.max_points ? "-" + t.max_points.toLocaleString() : "+"}`,
          color: t.color || "text-gray-400",
        }));

        setNgoData({
          ...data,
          currentPoints: profileResponse.donation_points || 0,
          profile: {
            ...data.profile,
            beneficiariesServed:
              parseFloat(profileResponse.beneficiaries_helped_count) || 0,
            donationsAccepted:
              Number(profileResponse.total_donations_count) || 0,
          },
          rewards: mappedRewards,
          prizes: mappedPrizes.length > 0 ? mappedPrizes : data.prizes,
          tiers: mappedTiers.length > 0 ? mappedTiers : data.tiers,
        });
      } catch (err: any) {
        console.error("Failed to fetch NGO rewards:", err);
        setError("Could not load rewards data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if data is mock or empty (optional check)
    // For now, always sync with DB on mount
    fetchRewardsData();
  }, []);

  return {
    data,
    prizes: data.prizes,
    rewards: data.rewards,
    tiers: data.tiers || [],
    currentPoints: data.currentPoints,
    isLoading,
    error,
  };
};
