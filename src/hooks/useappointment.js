import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/config/tanstack";

// Get user appointments
export const useUserAppointments = (userId) => {
  return useQuery({
    queryKey: ["appointments", "user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/appointment?userId=${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch appointments");
      }
      return response.json();
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get all appointments (Admin only)
export const useAllAppointments = () => {
  return useQuery({
    queryKey: ["appointments", "all"],
    queryFn: async () => {
      const response = await fetch("/api/appointment?all=true");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch appointments");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Create appointment
export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: async (appointmentData) => {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create appointment");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate appointments lists
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      
      // If this was a first appointment, also invalidate referral data
      if (data.isFirstAppointment) {
        queryClient.invalidateQueries({ queryKey: ["referralData"] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
};

// Update appointment status (Admin only)
export const useUpdateAppointmentStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await fetch(`/api/appointment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update appointment status");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { id } = variables;
      
      // Update appointment cache
      queryClient.setQueryData(["appointment", id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          appointment: data.appointment
        };
      });
      
      // Invalidate appointments lists
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

// Delete appointment (Admin only)
export const useDeleteAppointment = () => {
  return useMutation({
    mutationFn: async ({ id }) => {
      const response = await fetch(`/api/appointment/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete appointment");
      }
      
      return { id, ...await response.json() };
    },
    onSuccess: (data) => {
      // Invalidate appointments lists
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

// Get appointment by ID
export const useAppointmentById = (id) => {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: async () => {
      const response = await fetch(`/api/appointment/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch appointment");
      }
      return response.json();
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
