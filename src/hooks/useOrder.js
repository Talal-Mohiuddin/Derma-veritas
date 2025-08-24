import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/config/tanstack";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { getAuth } from "firebase/auth";

// Helper function to get auth token
const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  return await user.getIdToken();
};

// Get All Orders (Admin) or User Orders
export const useOrdersData = (getAllOrders = false) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["orders", getAllOrders ? "all" : "user", user?.uid],
    queryFn: async () => {
      const token = await getAuthToken();
      const params = new URLSearchParams();
      
      if (getAllOrders) {
        params.append('all', 'true');
      }

      const response = await fetch(`/api/orders?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch orders");
      }
      
      return response.json();
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get Single Order by ID
export const useOrderById = (id) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const token = await getAuthToken();
      const response = await fetch(`/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch order");
      }
      
      return response.json();
    },
    enabled: !!id && !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Create Order (Admin only)
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData) => {
      const token = await getAuthToken();
      
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate orders lists
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      
      // Optionally add the new order to existing cache
      const queryCache = queryClient.getQueryCache();
      const orderQueries = queryCache.findAll({
        queryKey: ["orders"]
      });

      orderQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData?.orders) return oldData;

          return {
            ...oldData,
            orders: [data.order, ...oldData.orders],
          };
        });
      });
    },
  });
};

// Update Order Status (Admin only)
export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const token = await getAuthToken();
      
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order status");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { id } = variables;
      
      // Update single order cache
      queryClient.setQueryData(["order", id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          order: data.order
        };
      });
      
      // Update orders list cache
      const queryCache = queryClient.getQueryCache();
      const orderQueries = queryCache.findAll({
        queryKey: ["orders"]
      });

      orderQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData?.orders) return oldData;

          const updatedOrders = oldData.orders.map(order =>
            order.id === id ? data.order : order
          );

          return {
            ...oldData,
            orders: updatedOrders,
          };
        });
      });
    },
  });
};

// Delete Order (Admin only)
export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: async ({ id }) => {
      const token = await getAuthToken();
      
      const response = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order");
      }
      
      return { id, ...await response.json() };
    },
    onSuccess: (data) => {
      // Remove from single order cache
      queryClient.removeQueries({ queryKey: ["order", data.id] });
      
      // Update orders list cache
      const queryCache = queryClient.getQueryCache();
      const orderQueries = queryCache.findAll({
        queryKey: ["orders"]
      });

      orderQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData?.orders) return oldData;

          const updatedOrders = oldData.orders.filter(
            order => order.id !== data.id
          );

          return {
            ...oldData,
            orders: updatedOrders,
          };
        });
      });
    },
  });
};

// Get User's Order History
export const useUserOrderHistory = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["orders", "user", user?.uid],
    queryFn: async () => {
      const token = await getAuthToken();
      const response = await fetch(`/api/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch order history");
      }
      
      return response.json();
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get Orders by Status (Admin only)
export const useOrdersByStatus = (status) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["orders", "status", status],
    queryFn: async () => {
      const token = await getAuthToken();
      const response = await fetch(`/api/orders?all=true`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch orders");
      }
      
      const data = await response.json();
      
      // Filter by status on client side
      const filteredOrders = data.orders?.filter(order => order.status === status) || [];
      
      return {
        ...data,
        orders: filteredOrders
      };
    },
    enabled: !!user && !!status,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get Recent Orders (Admin dashboard)
export const useRecentOrders = (limit = 10) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["orders", "recent", limit],
    queryFn: async () => {
      const token = await getAuthToken();
      const response = await fetch(`/api/orders?all=true`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch recent orders");
      }
      
      const data = await response.json();
      
      // Limit results on client side
      const recentOrders = data.orders?.slice(0, limit) || [];
      
      return {
        ...data,
        orders: recentOrders
      };
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 3, // 3 minutes
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

// Bulk Update Order Status (Admin only)
export const useBulkUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: async ({ ids, status }) => {
      const token = await getAuthToken();
      
      const updatePromises = ids.map((id) =>
        fetch(`/api/orders/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }).then(res => {
          if (!res.ok) throw new Error(`Failed to update order ${id}`);
          return res.json();
        })
      );
      
      const results = await Promise.all(updatePromises);
      return { ids, status, results };
    },
    onSuccess: (data) => {
      const { ids } = data;
      
      // Update individual order caches
      ids.forEach((id, index) => {
        queryClient.setQueryData(["order", id], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            order: data.results[index].order
          };
        });
      });
      
      // Invalidate orders list cache for simplicity
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Get Order Statistics (Admin dashboard)
export const useOrderStatistics = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["orders", "statistics"],
    queryFn: async () => {
      const token = await getAuthToken();
      const response = await fetch(`/api/orders?all=true`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch order statistics");
      }
      
      const data = await response.json();
      const orders = data.orders || [];
      
      // Calculate statistics on client side
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(order => order.status === 'pending').length;
      const processingOrders = orders.filter(order => order.status === 'processing').length;
      const shippedOrders = orders.filter(order => order.status === 'shipped').length;
      const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
      const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
      
      const totalRevenue = orders
        .filter(order => order.status === 'delivered')
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      
      return {
        totalOrders,
        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue,
        orders
      };
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
