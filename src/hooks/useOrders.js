import { useQuery, useMutation, queryClient } from "@tanstack/react-query";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { db } from "@/config/db";
import { collection, query, where, orderBy, getDocs, doc, getDoc } from "firebase/firestore";

// Get User's Orders
export const useUserOrders = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["orders", user?.uid],
    queryFn: async () => {
      if (!user?.uid) throw new Error("User not authenticated");
      
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const orders = [];
      
      querySnapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
          paidAt: doc.data().paidAt?.toDate?.() || doc.data().paidAt,
        });
      });
      
      return orders;
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 30, // 30 minutes
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Get Single Order
export const useOrder = (orderId) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["order", orderId, user?.uid],
    queryFn: async () => {
      if (!user?.uid) throw new Error("User not authenticated");
      if (!orderId) throw new Error("Order ID is required");
      
      const orderRef = doc(db, "orders", orderId);
      const orderDoc = await getDoc(orderRef);
      
      if (!orderDoc.exists()) {
        throw new Error("Order not found");
      }
      
      const orderData = orderDoc.data();
      
      // Check if this order belongs to the current user
      if (orderData.userId !== user.uid) {
        throw new Error("Unauthorized to view this order");
      }
      
      return {
        id: orderDoc.id,
        ...orderData,
        createdAt: orderData.createdAt?.toDate?.() || orderData.createdAt,
        updatedAt: orderData.updatedAt?.toDate?.() || orderData.updatedAt,
        paidAt: orderData.paidAt?.toDate?.() || orderData.paidAt,
      };
    },
    enabled: !!user && !!orderId,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 30, // 30 minutes
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Get Order by Order Number
export const useOrderByNumber = (orderNumber) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["order", "number", orderNumber, user?.uid],
    queryFn: async () => {
      if (!user?.uid) throw new Error("User not authenticated");
      if (!orderNumber) throw new Error("Order number is required");
      
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("orderNumber", "==", orderNumber),
        where("userId", "==", user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error("Order not found");
      }
      
      const orderDoc = querySnapshot.docs[0];
      const orderData = orderDoc.data();
      
      return {
        id: orderDoc.id,
        ...orderData,
        createdAt: orderData.createdAt?.toDate?.() || orderData.createdAt,
        updatedAt: orderData.updatedAt?.toDate?.() || orderData.updatedAt,
        paidAt: orderData.paidAt?.toDate?.() || orderData.paidAt,
      };
    },
    enabled: !!user && !!orderNumber,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 30, // 30 minutes
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Get Order Statistics
export const useOrderStats = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["orders", "stats", user?.uid],
    queryFn: async () => {
      if (!user?.uid) throw new Error("User not authenticated");
      
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", user.uid));
      
      const querySnapshot = await getDocs(q);
      const orders = [];
      
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });
      
      // Calculate statistics
      const totalOrders = orders.length;
      const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const completedOrders = orders.filter(order => order.status === "completed" || order.status === "confirmed").length;
      const pendingOrders = orders.filter(order => order.fulfillmentStatus === "pending").length;
      
      return {
        totalOrders,
        totalSpent,
        completedOrders,
        pendingOrders,
        averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0,
      };
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 30, // 30 minutes
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

// Admin: Get All Orders
export const useAllOrders = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["orders", "admin", "all"],
    queryFn: async () => {
      if (!user?.uid) throw new Error("User not authenticated");
      
      const response = await fetch(`/api/orders?all=true&userId=${user.uid}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }
      
      return response.json();
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 30, // 30 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Admin: Update Order Status
export const useUpdateOrderStatus = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      if (!user?.uid) throw new Error("User not authenticated");
      
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, userId: user.uid }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update order status');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Admin: Delete Order
export const useDeleteOrder = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ orderId }) => {
      if (!user?.uid) throw new Error("User not authenticated");
      
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.uid }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete order');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
