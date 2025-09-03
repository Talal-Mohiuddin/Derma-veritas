"use client";

import { useDashboardStats, useRecentActivities } from "@/hooks/useDashboard";
import { useStore } from "@/store/zustand";
import { formatDistanceToNow } from "date-fns";

export default function AdminDashboard() {
  const { user } = useStore();
  
  const { data: statsData, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: activitiesData, isLoading: activitiesLoading } = useRecentActivities();

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            Loading Dashboard...
          </div>
          <div className="text-gray-500">
            Please wait while we fetch the data
          </div>
        </div>
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading dashboard: {statsError.message}</p>
      </div>
    );
  }

  const stats = statsData?.stats;
  const recentOrders = activitiesData?.recentOrders || [];
  const recentAppointments = activitiesData?.recentAppointments || [];

  const dashboardStats = [
    { 
      name: 'Total Users', 
      value: stats?.totalUsers || 0, 
      change: stats?.userChange || '0%', 
      icon: '👥',
      isPositive: stats?.userChange?.startsWith('+')
    },
    { 
      name: 'Products', 
      value: stats?.totalProducts || 0, 
      change: stats?.productChange || '0%', 
      icon: '📦',
      isPositive: stats?.productChange?.startsWith('+')
    },
    { 
      name: 'Appointments', 
      value: stats?.totalAppointments || 0, 
      change: stats?.appointmentChange || '0%', 
      icon: '📅',
      isPositive: stats?.appointmentChange?.startsWith('+')
    },
    { 
      name: 'Orders', 
      value: stats?.totalOrders || 0, 
      change: stats?.orderChange || '0%', 
      icon: '🛍️',
      isPositive: stats?.orderChange?.startsWith('+')
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown';
    const dateObj = date instanceof Date ? date : new Date(date);
    return formatDistanceToNow(dateObj, { addSuffix: true });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-purple-100 text-lg">Here's what's happening with DermaVeritas today.</p>
        {stats?.totalRevenue && (
          <div className="mt-4">
            <p className="text-sm text-purple-200">Total Revenue</p>
            <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value.toLocaleString()}</p>
                <p className={`text-sm mt-1 ${stat.isPositive ? 'text-green-600' : stat.change === '0%' ? 'text-gray-500' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      {(stats?.appointmentStatuses || stats?.orderStatuses) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointment Status Breakdown */}
          {stats?.appointmentStatuses && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status</h3>
              <div className="space-y-3">
                {Object.entries(stats.appointmentStatuses).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <span className="capitalize text-gray-700">{status}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Status Breakdown */}
          {stats?.orderStatuses && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
              <div className="space-y-3">
                {Object.entries(stats.orderStatuses).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <span className="capitalize text-gray-700">{status}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          {activitiesLoading ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-16 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {order.orderNumber?.slice(-3) || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {order.orderNumber || `Order #${order.id.slice(-6)}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.userDetails?.name || 'Unknown'} • {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 text-sm font-medium">
                      {formatCurrency(order.totalAmount)}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent orders</p>
          )}
        </div>

        {/* Recent appointments */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
          {activitiesLoading ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-16 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          ) : recentAppointments.length > 0 ? (
            <div className="space-y-3">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {appointment.appointmentNumber?.slice(-3) || 'A'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.treatment || 'Consultation'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {appointment.name || appointment.userDetails?.name || 'Unknown'} • {formatDate(appointment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status || 'pending'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent appointments</p>
          )}
        </div>
      </div>
    </div>
  );
}
