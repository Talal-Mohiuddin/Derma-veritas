import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/config/tanstack";

// Get all referral rewards (Admin only)
export const useRewardsData = (statusFilter = "") => {
  return useQuery({
    queryKey: ["rewards", statusFilter],
    queryFn: async () => {
      const url = statusFilter 
        ? `/api/rewards?status=${statusFilter}`
        : "/api/rewards";
      
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch rewards");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Update reward status (Admin only)
export const useUpdateRewardStatus = () => {
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update reward status");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate rewards data to refresh the list
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
      // Also invalidate users data as it contains reward information
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Get reward statistics
export const useRewardStats = () => {
  return useQuery({
    queryKey: ["rewards", "stats"],
    queryFn: async () => {
      const response = await fetch("/api/rewards/stats");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch reward stats");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
