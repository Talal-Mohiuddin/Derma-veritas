import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/config/tanstack";

// Get All Users with filters
export const useUsersData = (searchTerm = "", role = "", status = "") => {
  return useQuery({
    queryKey: ["users", searchTerm, role, status],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (searchTerm) {
        params.append("search", searchTerm);
      }
      if (role) {
        params.append("role", role);
      }
      if (status) {
        params.append("status", status);
      }

      const response = await fetch(`/api/user?${params}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get Single User by ID with referral details
export const useUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${id}?includeReferrals=true`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Update User (Admin only)
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ id, userData }) => {
      const response = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, isAdmin: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { id } = variables;

      // Invalidate single user cache
      queryClient.invalidateQueries({ queryKey: ["user", id] });

      // Invalidate users list cache
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Ban/Unban User (Admin only)
export const useToggleUserBan = () => {
  return useMutation({
    mutationFn: async ({ id, isBanned }) => {
      const response = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBanned, isAdmin: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user status");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { id } = variables;

      // Update users list cache
      const queryCache = queryClient.getQueryCache();
      const userQueries = queryCache.findAll({
        queryKey: ["users"],
      });

      userQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData) return oldData;

          const updatedUsers = oldData.users.map((user) =>
            user.id === id ? { ...user, isBanned: data.user.isBanned } : user
          );

          return {
            ...oldData,
            users: updatedUsers,
          };
        });
      });

      // Invalidate single user cache
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
};

// Get Users by Role
export const useUsersByRole = (role) => {
  return useQuery({
    queryKey: ["users", "role", role],
    queryFn: async () => {
      const response = await fetch(`/api/user?role=${role}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!role,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get User Statistics
export const useUserStats = () => {
  return useQuery({
    queryKey: ["users", "stats"],
    queryFn: async () => {
      const response = await fetch("/api/user/stats");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get Current User's Referral Data
export const useUserReferralData = (userId) => {
  return useQuery({
    queryKey: ["user", "referral", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      
      const response = await fetch(`/api/user/get-refer-link?userId=${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch referral data");
      }
      return response.json();
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get Current User Profile
export const useCurrentUserProfile = (userId) => {
  return useQuery({
    queryKey: ["currentUser", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch user profile");
      }
      return response.json();
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Update Current User Profile
export const useUpdateCurrentUserProfile = () => {
  return useMutation({
    mutationFn: async ({ userId, profileData }) => {
      const response = await fetch(`/api/user/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { userId } = variables;

      // Update current user cache
      queryClient.invalidateQueries({ queryKey: ["currentUser", userId] });
      
      // Update single user cache
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });
};

// Create Membership Checkout Session
export const useCreateMembershipCheckout = () => {
  return useMutation({
    mutationFn: async ({ planName, userId, successUrl, cancelUrl }) => {
      const response = await fetch("/api/user/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName, userId, successUrl, cancelUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      return response.json();
    },
  });
};

// Update Membership Plan (Admin only)
export const useUpdateMembershipPlan = () => {
  return useMutation({
    mutationFn: async ({ userId, planName, isAdmin }) => {
      const response = await fetch("/api/user/membership", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, planName, isAdmin }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update membership plan");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { userId } = variables;

      // Invalidate user caches
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["currentUser", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Get User Membership Details
export const useUserMembership = (userId) => {
  return useQuery({
    queryKey: ["user", "membership", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch membership details");
      }
      
      const data = await response.json();
      return {
        membershipPlan: data.user.membershipPlan || null,
        membershipStatus: data.user.membershipStatus || "inactive",
        planUpdatedAt: data.user.planUpdatedAt || null,
      };
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
