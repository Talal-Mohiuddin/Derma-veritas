"use client";
import { useState } from "react";
import {
  useAllAppointments,
  useUpdateAppointmentStatus,
  useDeleteAppointment,
} from "../../../hooks/useappointment";
import LoadingSpinner from "../blogs/_components/LoadingSpinner";
import { toast } from "sonner";

export default function AppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch appointments
  const {
    data: appointmentsData,
    isLoading,
    error,
    refetch,
  } = useAllAppointments();

  const updateStatusMutation = useUpdateAppointmentStatus();
  const deleteAppointmentMutation = useDeleteAppointment();

  const appointments = appointmentsData?.appointments || [];

  // Filter appointments based on status
  const filteredAppointments = appointments.filter(appointment => {
    if (statusFilter === "all") return true;
    return appointment.status === statusFilter;
  });

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id: appointmentId, status: newStatus });
      toast.success(`Appointment ${newStatus} successfully! ${getStatusEmoji(newStatus)}`);
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(error.message || "Failed to update appointment status.");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!confirm("Are you sure you want to delete this appointment? This action cannot be undone.")) {
      return;
    }
    
    try {
      await deleteAppointmentMutation.mutateAsync({ id: appointmentId });
      toast.success("Appointment deleted successfully! 🗑️");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete appointment.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case "confirmed": return "✅";
      case "pending": return "⏳";
      case "completed": return "🎉";
      case "cancelled": return "❌";
      default: return "📅";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getCallbackTimeEmoji = (time) => {
    switch (time) {
      case "morning": return "🌅";
      case "afternoon": return "☀️";
      case "evening": return "🌆";
      case "anytime": return "🕐";
      default: return "📞";
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">Error loading appointments</div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Appointments Management 📅</h1>
            <p className="text-blue-100 text-lg">
              Manage and track all client appointments
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{appointments.length}</div>
            <div className="text-blue-100">Total Appointments</div>
          </div>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing: {filteredAppointments.length} appointments
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex space-x-6">
            {["pending", "confirmed", "completed", "cancelled"].map((status) => {
              const count = appointments.filter(apt => apt.status === status).length;
              return (
                <div key={status} className="text-center">
                  <div className="text-lg font-bold text-gray-800">{count}</div>
                  <div className="text-xs text-gray-500 capitalize">{status}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No appointments found</h3>
          <p className="text-gray-600">
            {statusFilter === "all" 
              ? "No appointments have been created yet."
              : `No ${statusFilter} appointments found.`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {appointment.name}
                    </h3>
                    <div className="text-sm text-gray-500">
                      #{appointment.appointmentNumber || appointment.id.slice(0, 8)}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusEmoji(appointment.status)} {appointment.status}
                  </span>
                </div>

                {/* Treatment Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">Treatment:</div>
                  <div className="text-sm text-gray-600">{appointment.treatment || "Not specified"}</div>
                </div>

                {/* Client Type */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs">
                    {appointment.clientType === "new" ? "🆕" : "🔄"}
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {appointment.clientType} Client
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-6 border-b border-gray-100 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📧</span>
                  <a
                    href={`mailto:${appointment.email}`}
                    className="text-blue-600 hover:text-blue-800 text-sm flex-1 hover:underline"
                    title="Click to send email"
                  >
                    {appointment.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📱</span>
                  <a
                    href={`tel:${appointment.phone}`}
                    className="text-blue-600 hover:text-blue-800 text-sm flex-1 hover:underline"
                    title="Click to call"
                  >
                    {appointment.phone}
                  </a>
                </div>

                {appointment.callbackTime && (
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">{getCallbackTimeEmoji(appointment.callbackTime)}</span>
                    <span className="text-sm text-gray-600 capitalize">
                      Best time: {appointment.callbackTime}
                    </span>
                  </div>
                )}
              </div>

              {/* Appointment Details */}
              <div className="p-6 border-b border-gray-100">
                <div className="text-xs text-gray-500 mb-2">Submitted:</div>
                <div className="text-sm text-gray-700 font-medium">
                  {formatDate(appointment.createdAt)}
                </div>
                
                {appointment.newsletter && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-xs">📰</span>
                    <span className="text-xs text-gray-600">Subscribed to newsletter</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-6">
                <div className="flex flex-col space-y-3">
                  {/* Status Update */}
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Update Status:</label>
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                      disabled={updateStatusMutation.isPending}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="confirmed">✅ Confirmed</option>
                      <option value="completed">🎉 Completed</option>
                      <option value="cancelled">❌ Cancelled</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowDetails(true);
                      }}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      disabled={deleteAppointmentMutation.isPending}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Appointment Details Modal */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Appointment Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Client Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">👤 Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Name:</label>
                    <div className="font-medium">{selectedAppointment.name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Client Type:</label>
                    <div className="font-medium capitalize">
                      {selectedAppointment.clientType === "new" ? "🆕 New" : "🔄 Returning"} Client
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email:</label>
                    <a
                      href={`mailto:${selectedAppointment.email}`}
                      className="font-medium text-blue-600 hover:underline block"
                    >
                      {selectedAppointment.email}
                    </a>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone:</label>
                    <a
                      href={`tel:${selectedAppointment.phone}`}
                      className="font-medium text-blue-600 hover:underline block"
                    >
                      {selectedAppointment.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">📅 Appointment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Treatment:</label>
                    <div className="font-medium">{selectedAppointment.treatment}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Status:</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAppointment.status)}`}>
                      {getStatusEmoji(selectedAppointment.status)} {selectedAppointment.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Preferred Callback Time:</label>
                    <div className="font-medium capitalize">
                      {getCallbackTimeEmoji(selectedAppointment.callbackTime)} {selectedAppointment.callbackTime}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Appointment Number:</label>
                    <div className="font-medium font-mono">
                      #{selectedAppointment.appointmentNumber || selectedAppointment.id.slice(0, 8)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">ℹ️ Additional Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Submitted:</span>
                    <span className="font-medium">{formatDate(selectedAppointment.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Newsletter Subscription:</span>
                    <span className="font-medium">
                      {selectedAppointment.newsletter ? "✅ Yes" : "❌ No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Age Confirmation:</span>
                    <span className="font-medium">
                      {selectedAppointment.ageConfirm ? "✅ Confirmed 18+" : "❌ Not confirmed"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-3">
                <a
                  href={`mailto:${selectedAppointment.email}?subject=Regarding your appointment - ${selectedAppointment.treatment}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                >
                  📧 Send Email
                </a>
                <a
                  href={`tel:${selectedAppointment.phone}`}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
                >
                  📱 Call Client
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
