import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch referral rewards
export function useRewardsData(statusFilter = "") {
  return useQuery({
    queryKey: ["rewards", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(`/api/rewards?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch rewards");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Update reward status
export function useUpdateRewardStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, appointmentId, status, adminId }) => {
      const response = await fetch("/api/rewards", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          appointmentId,
          status,
          adminId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update reward status");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch rewards data
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
