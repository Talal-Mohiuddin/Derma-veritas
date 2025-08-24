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

// Get User's Cart
export const useCartData = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["cart", user?.uid],
    queryFn: async () => {
      const token = await getAuthToken();
      const response = await fetch(`/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch cart");
      }
      
      return response.json();
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Add Item to Cart
export const useAddToCart = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }) => {
      const token = await getAuthToken();
      
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to cart");
      }

      return response.json();
    },
    onMutate: async ({ productId, quantity }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cart", user?.uid] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(["cart", user?.uid]);

      // Optimistically update to the new value
      queryClient.setQueryData(["cart", user?.uid], (old) => {
        if (!old) return old;

        const existingProductIndex = old.cart.products.findIndex(
          item => item.productId === productId
        );

        let updatedProducts;
        if (existingProductIndex > -1) {
          // Update existing product quantity
          updatedProducts = old.cart.products.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new product
          updatedProducts = [
            ...old.cart.products,
            { productId, quantity, addedAt: new Date() }
          ];
        }

        return {
          ...old,
          cart: {
            ...old.cart,
            products: updatedProducts,
          }
        };
      });

      return { previousCart };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(["cart", user?.uid], context.previousCart);
    },
    onSuccess: (data) => {
      // Update cart cache with server response
      queryClient.setQueryData(["cart", user?.uid], data);
    },
  });
};

// Remove Item from Cart
export const useRemoveFromCart = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }) => {
      const token = await getAuthToken();
      
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove item from cart");
      }

      return response.json();
    },
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart", user?.uid] });

      const previousCart = queryClient.getQueryData(["cart", user?.uid]);

      queryClient.setQueryData(["cart", user?.uid], (old) => {
        if (!old) return old;

        const productIndex = old.cart.products.findIndex(
          item => item.productId === productId
        );

        if (productIndex === -1) return old;

        let updatedProducts;
        const currentQuantity = old.cart.products[productIndex].quantity;

        if (currentQuantity <= quantity) {
          // Remove product entirely
          updatedProducts = old.cart.products.filter(
            item => item.productId !== productId
          );
        } else {
          // Decrease quantity
          updatedProducts = old.cart.products.map((item, index) =>
            index === productIndex
              ? { ...item, quantity: item.quantity - quantity }
              : item
          );
        }

        return {
          ...old,
          cart: {
            ...old.cart,
            products: updatedProducts,
          }
        };
      });

      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart", user?.uid], context.previousCart);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart", user?.uid], data);
    },
  });
};

// Update Item Quantity in Cart
export const useUpdateCartQuantity = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const token = await getAuthToken();
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const response = await fetch("/api/cart/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity: 999 }), // Remove all
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to remove item from cart");
        }

        return response.json();
      } else {
        // Update quantity by adding/removing difference
        const currentCart = queryClient.getQueryData(["cart", user?.uid]);
        const currentItem = currentCart?.cart.products.find(item => item.productId === productId);
        const currentQuantity = currentItem?.quantity || 0;
        const difference = quantity - currentQuantity;

        if (difference > 0) {
          // Add items
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity: difference }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update cart");
          }

          return response.json();
        } else if (difference < 0) {
          // Remove items
          const response = await fetch("/api/cart/remove", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity: Math.abs(difference) }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update cart");
          }

          return response.json();
        } else {
          // No change needed
          return currentCart;
        }
      }
    },
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart", user?.uid] });

      const previousCart = queryClient.getQueryData(["cart", user?.uid]);

      queryClient.setQueryData(["cart", user?.uid], (old) => {
        if (!old) return old;

        const productIndex = old.cart.products.findIndex(
          item => item.productId === productId
        );

        let updatedProducts;
        if (quantity <= 0) {
          // Remove product
          updatedProducts = old.cart.products.filter(
            item => item.productId !== productId
          );
        } else if (productIndex > -1) {
          // Update existing product
          updatedProducts = old.cart.products.map((item, index) =>
            index === productIndex
              ? { ...item, quantity }
              : item
          );
        } else {
          // Add new product
          updatedProducts = [
            ...old.cart.products,
            { productId, quantity, addedAt: new Date() }
          ];
        }

        return {
          ...old,
          cart: {
            ...old.cart,
            products: updatedProducts,
          }
        };
      });

      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart", user?.uid], context.previousCart);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart", user?.uid], data);
    },
  });
};

// Clear Cart
export const useClearCart = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async () => {
      const token = await getAuthToken();
      
      // Get current cart to remove all items
      const cartData = queryClient.getQueryData(["cart", user?.uid]);
      if (!cartData?.cart?.products?.length) {
        return { success: true, cart: { products: [], totalPrice: 0 } };
      }

      // Remove all items one by one (since we don't have a clear endpoint)
      const removePromises = cartData.cart.products.map(item =>
        fetch("/api/cart/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: item.productId, quantity: item.quantity }),
        }).then(res => {
          if (!res.ok) throw new Error(`Failed to remove ${item.productId}`);
          return res.json();
        })
      );

      const results = await Promise.all(removePromises);
      return results[results.length - 1]; // Return the last result
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart", user?.uid] });

      const previousCart = queryClient.getQueryData(["cart", user?.uid]);

      queryClient.setQueryData(["cart", user?.uid], (old) => {
        if (!old) return old;
        return {
          ...old,
          cart: {
            ...old.cart,
            products: [],
            totalPrice: 0,
          }
        };
      });

      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart", user?.uid], context.previousCart);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart", user?.uid], data);
    },
  });
};

// Checkout Cart
export const useCheckoutCart = () => {
  return useMutation({
    mutationFn: async () => {
      const token = await getAuthToken();
      
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create checkout session");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });
};

// Get Cart Item Count (helper hook)
export const useCartItemCount = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["cart", "count", user?.uid],
    queryFn: async () => {
      const cartData = queryClient.getQueryData(["cart", user?.uid]);
      if (!cartData?.cart?.products) {
        // Fetch cart if not in cache
        const token = await getAuthToken();
        const response = await fetch(`/api/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) return 0;
        
        const data = await response.json();
        return data.cart?.products?.reduce((count, item) => count + item.quantity, 0) || 0;
      }
      
      return cartData.cart.products.reduce((count, item) => count + item.quantity, 0);
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Check if Product is in Cart (helper hook)
export const useIsInCart = (productId) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["cart", "contains", productId, user?.uid],
    queryFn: async () => {
      const cartData = queryClient.getQueryData(["cart", user?.uid]);
      if (!cartData?.cart?.products) {
        const token = await getAuthToken();
        const response = await fetch(`/api/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) return { inCart: false, quantity: 0 };
        
        const data = await response.json();
        const item = data.cart?.products?.find(item => item.productId === productId);
        return {
          inCart: !!item,
          quantity: item?.quantity || 0
        };
      }
      
      const item = cartData.cart.products.find(item => item.productId === productId);
      return {
        inCart: !!item,
        quantity: item?.quantity || 0
      };
    },
    enabled: !!user && !!productId,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get Cart Total (helper hook)
export const useCartTotal = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["cart", "total", user?.uid],
    queryFn: async () => {
      const cartData = queryClient.getQueryData(["cart", user?.uid]);
      if (!cartData?.cart) {
        const token = await getAuthToken();
        const response = await fetch(`/api/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) return 0;
        
        const data = await response.json();
        return data.cart?.totalPrice || 0;
      }
      
      return cartData.cart.totalPrice || 0;
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Bulk Add to Cart (for multiple products)
export const useBulkAddToCart = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (items) => {
      const token = await getAuthToken();
      
      const addPromises = items.map(({ productId, quantity }) =>
        fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity }),
        }).then(res => {
          if (!res.ok) throw new Error(`Failed to add ${productId}`);
          return res.json();
        })
      );
      
      const results = await Promise.all(addPromises);
      return results[results.length - 1]; // Return the last result
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart", user?.uid], data);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["cart", "count", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["cart", "total", user?.uid] });
    },
  });
};
