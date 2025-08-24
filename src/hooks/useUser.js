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

// Get Single User by ID
export const useUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${id}`);
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
