import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/config/tanstack";
import { useStore } from "@/store/zustand";

// Get All Orders (Admin) or User Orders
export const useOrdersData = (getAllOrders = false) => {
  const { user } = useStore();
  
  return useQuery({
    queryKey: ["orders", getAllOrders ? "all" : "user", user?.uid],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('userId', user.uid);
      
      if (getAllOrders) {
        params.append('all', 'true');
      }

      const response = await fetch(`/api/orders?${params}`);
      
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
  const { user } = useStore();
  
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('userId', user.uid);
      
      const response = await fetch(`/api/orders/${id}?${params}`);
      
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
  const { user } = useStore();
  
  return useMutation({
    mutationFn: async (orderData) => {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          adminUserId: user.uid
        }),
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
  const { user } = useStore();
  
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          status,
          userId: user.uid
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order status");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { orderId } = variables;
      
      // Update single order cache
      queryClient.setQueryData(["order", orderId], (oldData) => {
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
            order.id === orderId ? data.order : order
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
  const { user } = useStore();
  
  return useMutation({
    mutationFn: async ({ orderId }) => {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order");
      }
      
      return { id: orderId, ...await response.json() };
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
  const { user } = useStore();
  
  return useQuery({
    queryKey: ["orders", "user", user?.uid],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('userId', user.uid);
      
      const response = await fetch(`/api/orders?${params}`);
      
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
  const { user } = useStore();
  
  return useQuery({
    queryKey: ["orders", "status", status],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('userId', user.uid);
      params.append('all', 'true');
      
      const response = await fetch(`/api/orders?${params}`);
      
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
  const { user } = useStore();
  
  return useQuery({
    queryKey: ["orders", "recent", limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('userId', user.uid);
      params.append('all', 'true');
      
      const response = await fetch(`/api/orders?${params}`);
      
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
  const { user } = useStore();
  
  return useMutation({
    mutationFn: async ({ ids, status }) => {
      const updatePromises = ids.map((id) =>
        fetch(`/api/orders/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            status,
            userId: user.uid
          }),
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
  const { user } = useStore();
  
  return useQuery({
    queryKey: ["orders", "statistics"],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('userId', user.uid);
      params.append('all', 'true');
      
      const response = await fetch(`/api/orders?${params}`);
      
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
