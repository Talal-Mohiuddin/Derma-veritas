import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount || 0);
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      processing: Package,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: XCircle,
    };
    return icons[status] || Clock;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-200 border-red-200",
    };
    return colors[status] || colors.pending;
  };

  if (!order) return null;

  const StatusIcon = getStatusIcon(order.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <DialogHeader className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white rounded-t-lg -mx-6 -mt-6">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="w-6 h-6 text-white" />
            Order #{order.orderNumber || order.id?.slice(-8)}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Order Status */}
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-300 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <StatusIcon className="w-5 h-5" />
                Order Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Status:</span>
                  <Badge
                    className={`${getStatusColor(
                      order.status
                    )} border flex items-center gap-1`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {order.status?.charAt(0).toUpperCase() +
                      order.status?.slice(1) || "Pending"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Status:</span>
                  <Badge
                    className={`${
                      order.paymentStatus === "paid" ||
                      order.paymentStatus === "completed"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-orange-100 text-orange-800 border-orange-200"
                    } border`}
                  >
                    {order.paymentStatus === "paid" ||
                    order.paymentStatus === "completed"
                      ? "Paid"
                      : "Pending"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Order Date:</span>
                  <span className="text-sm font-medium">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                {order.updatedAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Updated:</span>
                    <span className="text-sm font-medium">
                      {formatDate(order.updatedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-300 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h3>
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={order.userDetails?.photoURL} />
                  <AvatarFallback className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium">
                    {order.userDetails?.name?.charAt(0)?.toUpperCase() ||
                      order.userDetails?.email?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">
                    {order.userDetails?.name || "Unknown User"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.userDetails?.email || "No email"}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-gray-100 rounded-xl p-4 border border-gray-300 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  {order.shippingAddress.address2 && (
                    <p>{order.shippingAddress.address2}</p>
                  )}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                  {order.shippingAddress.country && (
                    <p>{order.shippingAddress.country}</p>
                  )}
                  {order.shippingAddress.phone && (
                    <p>Phone: {order.shippingAddress.phone}</p>
                  )}
                </div>
              </div>
            )}

            {/* Payment Information */}
            {order.stripeSessionId && (
              <div className="bg-gray-100 rounded-xl p-4 border border-gray-300 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">Stripe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session ID:</span>
                    <span className="font-mono text-xs">
                      {order.stripeSessionId}
                    </span>
                  </div>
                  {order.paidAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paid At:</span>
                      <span className="font-medium">
                        {formatDate(order.paidAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-300 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items ({order.products?.length || 0})
              </h3>
              <div className="space-y-3">
                {order.products?.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 flex items-center space-x-3 border border-gray-300 shadow-md"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {product.productDetails?.images?.[0]?.url ? (
                        <img
                          src={product.productDetails.images[0].url}
                          alt={product.productDetails.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {product.productDetails?.name || `Product ${index + 1}`}
                      </div>
                      <div className="text-sm text-gray-600">
                        Quantity: {product.quantity} ×{" "}
                        {formatCurrency(product.price)}
                      </div>
                      {product.productDetails?.price !== product.price &&
                        product.originalPrice > 0 && (
                          <div className="text-xs text-gray-500">
                            Current price:{" "}
                            {formatCurrency(product.productDetails?.price)}
                          </div>
                        )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(product.price * product.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-4 border border-gray-700 shadow-lg">
              <h3 className="font-semibold text-white mb-3">
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Subtotal:</span>
                  <span>
                    {formatCurrency(order.subtotal || order.totalAmount)}
                  </span>
                </div>
                {order.shipping && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Shipping:</span>
                    <span>{formatCurrency(order.shipping)}</span>
                  </div>
                )}
                {order.tax && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Tax:</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                )}
                {order.discount && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Discount:</span>
                    <span className="text-green-400">
                      -{formatCurrency(order.discount)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-400">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            {order.notes && (
              <div className="bg-gray-100 rounded-xl p-4 border border-gray-300 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Order Notes
                </h3>
                <p className="text-sm text-gray-700">{order.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t border-gray-300">
          <Button onClick={onClose} className="bg-gray-900 hover:bg-gray-800">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
