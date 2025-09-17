"use client";
import { useState } from "react";
import {
  useAllAppointments,
  useUpdateAppointmentStatus,
  useDeleteAppointment,
} from "@/hooks/useAppointment";
import { toast } from "sonner";

export default function AppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

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
  const filteredAppointments = appointments.filter((appointment) => {
    if (statusFilter === "all") return true;
    return appointment.status === statusFilter;
  });

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: appointmentId,
        status: newStatus,
      });
      toast.success(
        `Appointment ${newStatus} successfully! ${getStatusEmoji(newStatus)}`
      );
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(error.message || "Failed to update appointment status.");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteAppointmentMutation.mutateAsync({ id: appointmentId });
      toast.success("Appointment deleted successfully! 🗑️");
      setShowDeleteModal(false);
      setAppointmentToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete appointment.");
    }
  };

  const openDeleteModal = (appointment) => {
    setAppointmentToDelete(appointment);
    setShowDeleteModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case "confirmed":
        return "✅";
      case "pending":
        return "⏳";
      case "completed":
        return "🎉";
      case "cancelled":
        return "❌";
      default:
        return "📅";
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
      minute: "2-digit",
    });
  };

  const formatPreferredDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getCallbackTimeEmoji = (time) => {
    switch (time) {
      case "morning":
        return "🌅";
      case "afternoon":
        return "☀️";
      case "evening":
        return "🌆";
      case "anytime":
        return "🕐";
      default:
        return "📞";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            Loading Appointments...
          </div>
          <div className="text-gray-500">
            Please wait while we fetch the data
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">
          Error loading appointments
        </div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Appointments Management 📅</h1>
            <p className="text-gray-300 text-lg">
              Manage and track all client appointments
            </p>
          </div>
          <div className="text-right bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[120px] border border-white/20">
            <div className="text-2xl font-bold">{appointments.length}</div>
            <div className="text-gray-300">Total Appointments</div>
          </div>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-300">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">
                Status:
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
            {["pending", "confirmed", "completed", "cancelled"].map(
              (status) => {
                const count = appointments.filter(
                  (apt) => apt.status === status
                ).length;
                return (
                  <div key={status} className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      {count}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {status}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-300 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-600">
            {statusFilter === "all"
              ? "No appointments have been created yet."
              : `No ${statusFilter} appointments found.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {appointment.name}
                    </h3>
                    <div className="text-sm text-gray-500">
                      #
                      {appointment.appointmentNumber ||
                        appointment.id.slice(0, 8)}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {getStatusEmoji(appointment.status)} {appointment.status}
                  </span>
                </div>

                {/* Treatment Info */}
                <div className="bg-gray-100 rounded-lg p-3 mb-3 border border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Treatment:
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="font-medium">
                      {appointment.treatmentDetails?.treatmentName || appointment.treatment || "Not specified"}
                    </div>
                    {appointment.treatmentDetails?.optionName && (
                      <div className="text-xs text-gray-500">
                        <strong>Option:</strong> {appointment.treatmentDetails.optionName}
                      </div>
                    )}
                    {appointment.treatmentDetails?.optionPrice && (
                      <div className="text-xs font-semibold text-green-600">
                        💰 {appointment.treatmentDetails.optionPrice}
                        {appointment.userDiscount && appointment.userDiscount > 0 && (
                          <div className="text-xs text-blue-600 mt-1">
                            💸 Discount Applied: £{appointment.userDiscount} (Final: £{appointment.finalPrice})
                          </div>
                        )}
                      </div>
                    )}
                    {appointment.treatmentDetails?.optionDescription && (
                      <div className="text-xs text-gray-500 italic">
                        {appointment.treatmentDetails.optionDescription}
                      </div>
                    )}
                  </div>
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
              <div className="p-6 border-b border-gray-200 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📧</span>
                  <a
                    href={`mailto:${appointment.email}`}
                    className="text-gray-700 hover:text-gray-900 text-sm flex-1 hover:underline"
                    title="Click to send email"
                  >
                    {appointment.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📱</span>
                  <a
                    href={`tel:${appointment.phone}`}
                    className="text-gray-700 hover:text-gray-900 text-sm flex-1 hover:underline"
                    title="Click to call"
                  >
                    {appointment.phone}
                  </a>
                </div>

                {appointment.callbackTime && (
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">
                      {getCallbackTimeEmoji(appointment.callbackTime)}
                    </span>
                    <span className="text-sm text-gray-600 capitalize">
                      Best time: {appointment.callbackTime}
                    </span>
                  </div>
                )}

                {appointment.preferredDate && (
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">📅</span>
                    <span className="text-sm text-gray-600">
                      Preferred: {formatPreferredDate(appointment.preferredDate)}
                    </span>
                  </div>
                )}

                {appointment.additionalInfo && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 text-sm">💬</span>
                      <div className="text-sm text-blue-800">
                        <div className="font-medium mb-1">Additional Info:</div>
                        <div className="text-blue-700">
                          {appointment.additionalInfo.length > 100
                            ? `${appointment.additionalInfo.substring(0, 100)}...`
                            : appointment.additionalInfo}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Appointment Details */}
              <div className="p-6 border-b border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Submitted:</div>
                <div className="text-sm text-gray-700 font-medium">
                  {formatDate(appointment.createdAt)}
                </div>

                {appointment.newsletter && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-xs">📰</span>
                    <span className="text-xs text-gray-600">
                      Subscribed to newsletter
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-6">
                <div className="flex flex-col space-y-3">
                  {/* Status Update */}
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Update Status:
                    </label>
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        handleStatusChange(appointment.id, e.target.value)
                      }
                      disabled={updateStatusMutation.isPending}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                      className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-gray-900 hover:to-black transition-all duration-200 shadow-lg"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openDeleteModal(appointment)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && appointmentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
            <div className="p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Delete Appointment
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete the appointment for{" "}
                  <span className="font-semibold">
                    {appointmentToDelete.name}
                  </span>
                  ?
                  <br />
                  <span className="text-sm text-red-600 mt-2 block">
                    This action cannot be undone.
                  </span>
                </p>

                <div className="bg-gray-100 rounded-lg p-3 mb-6 text-left border border-gray-300">
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>Client:</strong> {appointmentToDelete.name}
                    </div>
                    <div>
                      <strong>Treatment:</strong>{" "}
                      {appointmentToDelete.treatment}
                    </div>
                    <div>
                      <strong>Status:</strong> {appointmentToDelete.status}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setAppointmentToDelete(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                    disabled={deleteAppointmentMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteAppointment(appointmentToDelete.id)
                    }
                    disabled={deleteAppointmentMutation.isPending}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {deleteAppointmentMutation.isPending ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </div>
                    ) : (
                      "Delete Appointment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-gray-300 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  Appointment Details
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Client Information */}
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                <h3 className="font-semibold text-gray-800 mb-3">
                  👤 Client Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Name:</label>
                    <div className="font-medium">
                      {selectedAppointment.name}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Client Type:
                    </label>
                    <div className="font-medium capitalize">
                      {selectedAppointment.clientType === "new"
                        ? "🆕 New"
                        : "🔄 Returning"}{" "}
                      Client
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email:</label>
                    <a
                      href={`mailto:${selectedAppointment.email}`}
                      className="font-medium text-gray-700 hover:text-gray-900 hover:underline block"
                    >
                      {selectedAppointment.email}
                    </a>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone:</label>
                    <a
                      href={`tel:${selectedAppointment.phone}`}
                      className="font-medium text-gray-700 hover:text-gray-900 hover:underline block"
                    >
                      {selectedAppointment.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                <h3 className="font-semibold text-gray-800 mb-3">
                  📅 Appointment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-500">Treatment:</label>
                    <div className="font-medium space-y-2">
                      <div className="text-lg">
                        {selectedAppointment.treatmentDetails?.treatmentName || selectedAppointment.treatment}
                      </div>
                      {selectedAppointment.treatmentDetails?.optionName && (
                        <div className="bg-white rounded-lg p-3 border">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">
                                {selectedAppointment.treatmentDetails.optionName}
                              </div>
                              {selectedAppointment.treatmentDetails.optionDescription && (
                                <div className="text-sm text-gray-600 mt-1">
                                  {selectedAppointment.treatmentDetails.optionDescription}
                                </div>
                              )}
                            </div>
                            {selectedAppointment.treatmentDetails.optionPrice && (
                              <div className="ml-3 text-right">
                                <div className="font-bold text-green-600 text-lg">
                                  {selectedAppointment.treatmentDetails.optionPrice}
                                </div>
                                {selectedAppointment.userDiscount && selectedAppointment.userDiscount > 0 && (
                                  <div className="text-sm space-y-1 mt-2">
                                    <div className="text-blue-600">
                                      💸 Discount: £{selectedAppointment.userDiscount}
                                    </div>
                                    <div className="font-bold text-orange-600">
                                      Final: £{selectedAppointment.finalPrice}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral Information */}
              {(selectedAppointment.referralCodeUsed || selectedAppointment.userDiscount > 0) && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-3">
                    🎁 Referral Information
                  </h3>
                  <div className="space-y-2">
                    {selectedAppointment.referralCodeUsed && (
                      <div className="flex justify-between">
                        <span className="text-sm text-purple-600">Referral Code Used:</span>
                        <span className="font-medium font-mono text-purple-800">
                          {selectedAppointment.referralCodeUsed}
                        </span>
                      </div>
                    )}
                    {selectedAppointment.userDiscount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600">User Discount (5%):</span>
                        <span className="font-medium text-blue-800">
                          £{selectedAppointment.userDiscount}
                        </span>
                      </div>
                    )}
                    {selectedAppointment.referrerReward > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-green-600">Referrer Reward (5%):</span>
                        <span className="font-medium text-green-800">
                          £{selectedAppointment.referrerReward}
                        </span>
                      </div>
                    )}
                    {selectedAppointment.originalPrice && selectedAppointment.finalPrice && (
                      <div className="pt-2 border-t border-purple-200">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Original Price:</span>
                          <span className="text-gray-800">£{selectedAppointment.originalPrice}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-purple-700">Final Price:</span>
                          <span className="text-purple-800">£{selectedAppointment.finalPrice}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {selectedAppointment.additionalInfo && (
                <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    💬 Additional Information
                  </h3>
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {selectedAppointment.additionalInfo}
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                <h3 className="font-semibold text-gray-800 mb-3">
                  ℹ️ Additional Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Submitted:</span>
                    <span className="font-medium">
                      {formatDate(selectedAppointment.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Newsletter Subscription:
                    </span>
                    <span className="font-medium">
                      {selectedAppointment.newsletter ? "✅ Yes" : "❌ No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Age Confirmation:
                    </span>
                    <span className="font-medium">
                      {selectedAppointment.ageConfirm
                        ? "✅ Confirmed 18+"
                        : "❌ Not confirmed"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-3">
                <a
                  href={`mailto:${selectedAppointment.email}?subject=Regarding your appointment - ${selectedAppointment.treatmentDetails?.treatmentName || selectedAppointment.treatment}&body=Hello ${selectedAppointment.name},%0D%0A%0D%0AThank you for booking a consultation with us.%0D%0A%0D%0AAppointment Details:%0D%0A- Treatment: ${selectedAppointment.treatmentDetails?.treatmentName || selectedAppointment.treatment}%0D%0A${selectedAppointment.treatmentDetails?.optionName ? `- Option: ${selectedAppointment.treatmentDetails.optionName}%0D%0A` : ''}${selectedAppointment.treatmentDetails?.optionPrice ? `- Price: ${selectedAppointment.treatmentDetails.optionPrice}%0D%0A` : ''}- Status: ${selectedAppointment.status}%0D%0A%0D%0ABest regards,%0D%0ADerma Veritas Team`}
                  className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-lg text-center font-medium hover:from-gray-900 hover:to-black transition-all duration-200 shadow-lg"
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
