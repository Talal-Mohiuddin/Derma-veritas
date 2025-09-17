import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/zustand";

// Get Dashboard Statistics
export const useDashboardStats = () => {
  const { user } = useStore();
  
  return useQuery({
    queryKey: ["dashboard", "stats", user?.uid],
    queryFn: async () => {
      if (!user?.uid) {
        throw new Error("User not authenticated");
      }
      
      const params = new URLSearchParams();
      params.append("userId", user.uid);
      
      const response = await fetch(`/api/admin?${params}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch dashboard stats");
      }
      return response.json();
    },
    enabled: !!user?.uid,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get Recent Activities
export const useRecentActivities = () => {
  const { user } = useStore();
  
  return useQuery({
    queryKey: ["dashboard", "recent-activities", user?.uid],
    queryFn: async () => {
      if (!user?.uid) {
        throw new Error("User not authenticated");
      }
      
      const params = new URLSearchParams();
      params.append("userId", user.uid);
      
      const response = await fetch(`/api/admin/dashboard/recent?${params}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch recent activities");
      }
      return response.json();
    },
    enabled: !!user?.uid,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 3, // 3 minutes
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};
