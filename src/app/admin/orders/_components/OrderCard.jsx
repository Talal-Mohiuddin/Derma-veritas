import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const OrderCard = ({ order, onView, onUpdateStatus, onDelete, isUpdating, isDeleting }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const getStatusBadge = (status) => {
    const configs = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
      processing: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Package },
      shipped: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: Truck },
      delivered: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
    };

    const config = configs[status] || configs.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "Pending"}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const isPaid = status === "paid" || status === "completed";
    return (
      <Badge 
        className={`${
          isPaid 
            ? "bg-green-100 text-green-800 border-green-200" 
            : "bg-orange-100 text-orange-800 border-orange-200"
        } border`}
      >
        {isPaid ? "Paid" : "Pending"}
      </Badge>
    );
  };

  const statusOptions = [
    { value: "pending", label: "Pending", icon: Clock },
    { value: "processing", label: "Processing", icon: Package },
    { value: "shipped", label: "Shipped", icon: Truck },
    { value: "delivered", label: "Delivered", icon: CheckCircle },
    { value: "cancelled", label: "Cancelled", icon: XCircle },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">
            #{order.orderNumber || order.id?.slice(-8)}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onView(order)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {statusOptions.map((statusOption) => {
              const Icon = statusOption.icon;
              return (
                <DropdownMenuItem
                  key={statusOption.value}
                  onClick={() => onUpdateStatus(order.id, statusOption.value)}
                  disabled={isUpdating || order.status === statusOption.value}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  Mark as {statusOption.label}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(order.id)}
              disabled={isDeleting}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Customer Info */}
      <div className="flex items-center space-x-3 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={order.userDetails?.photoURL} />
          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium">
            {order.userDetails?.name?.charAt(0)?.toUpperCase() || 
             order.userDetails?.email?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-gray-900">
            {order.userDetails?.name || "Unknown User"}
          </div>
          <div className="text-sm text-gray-500">
            {order.userDetails?.email || "No email"}
          </div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {getStatusBadge(order.status)}
        {getPaymentStatusBadge(order.paymentStatus)}
      </div>

      {/* Products Summary */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Products ({order.products?.length || 0})
        </p>
        <div className="space-y-2 max-h-24 overflow-y-auto">
          {order.products?.slice(0, 2).map((product, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 truncate">
                {product.productDetails?.name || `Product ${index + 1}`} × {product.quantity}
              </span>
              <span className="text-gray-900 font-medium">
                {formatCurrency(product.price * product.quantity)}
              </span>
            </div>
          ))}
          {order.products?.length > 2 && (
            <p className="text-xs text-gray-500">
              +{order.products.length - 2} more items
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Total Amount
        </div>
        <div className="text-lg font-bold text-purple-600">
          {formatCurrency(order.totalAmount)}
        </div>
      </div>

      {/* Shipping Address (if available) */}
      {order.shippingAddress && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Shipping to:</p>
          <p className="text-sm text-gray-700 truncate">
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
