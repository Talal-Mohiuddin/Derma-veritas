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
      if (!user?.uid) throw new Error("User not authenticated");
      
      const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid }),
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
      if (!user?.uid) throw new Error("User not authenticated");
      
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid, productId, quantity }),
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

      // Skip optimistic update if we don't have complete product data
      // This prevents showing items with $0.00 price
      if (!previousCart?.cart?.products) {
        return { previousCart };
      }

      // Only do optimistic update if we have the product details already
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
          // Don't add new product optimistically without product details
          // Let the server response handle it
          return old;
        }

        // Recalculate total price only for existing products with complete data
        const newTotalPrice = updatedProducts.reduce((total, item) => {
          const price = item.productDetails?.price || 0;
          return total + (price * item.quantity);
        }, 0);

        return {
          ...old,
          cart: {
            ...old.cart,
            products: updatedProducts,
            totalPrice: newTotalPrice,
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
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["cart", "count", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["cart", "total", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["cart", "contains"] });
    },
  });
};

// Remove Item from Cart
export const useRemoveFromCart = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }) => {
      if (!user?.uid) throw new Error("User not authenticated");
      
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid, productId, quantity }),
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

        // Recalculate total price
        const newTotalPrice = updatedProducts.reduce((total, item) => {
          const price = item.productDetails?.price || 0;
          return total + (price * item.quantity);
        }, 0);

        return {
          ...old,
          cart: {
            ...old.cart,
            products: updatedProducts,
            totalPrice: newTotalPrice,
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
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["cart", "count", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["cart", "total", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["cart", "contains"] });
    },
  });
};

// Update Item Quantity in Cart
export const useUpdateCartQuantity = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ productId, quantity }) => {
      if (!user?.uid) throw new Error("User not authenticated");
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const response = await fetch("/api/cart/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.uid, productId, quantity: 999 }), // Remove all
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
            },
            body: JSON.stringify({ userId: user.uid, productId, quantity: difference }),
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
            },
            body: JSON.stringify({ userId: user.uid, productId, quantity: Math.abs(difference) }),
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

      // Only do optimistic update if we have complete product data
      queryClient.setQueryData(["cart", user?.uid], (old) => {
        if (!old?.cart?.products) return old;

        const productIndex = old.cart.products.findIndex(
          item => item.productId === productId
        );

        // Don't optimistically update if product details are missing
        if (productIndex > -1 && !old.cart.products[productIndex].productDetails?.price) {
          return old;
        }

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
          // Don't add new product without details
          return old;
        }

        // Recalculate total price
        const newTotalPrice = updatedProducts.reduce((total, item) => {
          const price = item.productDetails?.price || 0;
          return total + (price * item.quantity);
        }, 0);

        return {
          ...old,
          cart: {
            ...old.cart,
            products: updatedProducts,
            totalPrice: newTotalPrice,
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
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["cart", "count", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["cart", "total", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["cart", "contains"] });
    },
  });
};

// Clear Cart
export const useClearCart = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async () => {
      if (!user?.uid) throw new Error("User not authenticated");
      
      const response = await fetch("/api/cart/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to clear cart");
      }

      return response.json();
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart", user?.uid] });

      const previousCart = queryClient.getQueryData(["cart", user?.uid]);

      queryClient.setQueryData(["cart", user?.uid], {
        success: true,
        cart: {
          products: [],
          totalPrice: 0,
        }
      });

      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart", user?.uid], context.previousCart);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart", user?.uid], data);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["cart", "count", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["cart", "total", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["cart", "contains"] });
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
        if (!user?.uid) return 0;
        
        const response = await fetch(`/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.uid }),
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
        if (!user?.uid) return { inCart: false, quantity: 0 };
        
        const response = await fetch(`/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.uid }),
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
        if (!user?.uid) return 0;
        
        const response = await fetch(`/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.uid }),
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
      if (!user?.uid) throw new Error("User not authenticated");
      
      const addPromises = items.map(({ productId, quantity }) =>
        fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.uid, productId, quantity }),
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

// Create Payment Intent
export const useCreatePaymentIntent = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ cartId }) => {
      if (!user?.uid) throw new Error("User not authenticated");
      
      const response = await fetch("/api/cart/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid, cartId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create payment intent");
      }

      return response.json();
    },
  });
};
