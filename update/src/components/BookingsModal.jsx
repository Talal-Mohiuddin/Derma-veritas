"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle, Calendar, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserAppointments } from "@/hooks/useAppointment";

export default function BookingsModal({ isOpen, onClose, userId }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const { data: appointmentsData, isLoading, error } = useUserAppointments(userId);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    if (!price) return "N/A";
    if (typeof price === "string" && price.includes("£")) return price;
    return `£${price}`;
  };

  const toggleRowExpansion = (appointmentId) => {
    setExpandedRow(expandedRow === appointmentId ? null : appointmentId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            My Bookings
          </DialogTitle>
          <DialogDescription>
            View all your appointment bookings and their current status
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 overflow-y-auto max-h-[calc(85vh-150px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoaderCircle className="w-6 h-6 animate-spin text-orange-600" />
              <span className="ml-2 text-gray-600">Loading your bookings...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-2">Error loading bookings</p>
              <p className="text-gray-500 text-sm">{error.message}</p>
            </div>
          ) : !appointmentsData?.appointments?.length ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No bookings found</p>
              <p className="text-gray-500 text-sm">You haven't made any appointments yet</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="font-semibold">Booking #</TableHead>
                    <TableHead className="font-semibold">Treatment</TableHead>
                    <TableHead className="font-semibold">Preferred Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    <TableHead className="font-semibold">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointmentsData.appointments.map((appointment) => (
                    <>
                      <TableRow 
                        key={appointment.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleRowExpansion(appointment.id)}
                      >
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            {expandedRow === appointment.id ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium text-sm">
                          {appointment.appointmentNumber}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{appointment.treatment}</div>
                            {appointment.treatmentOption && (
                              <div className="text-xs text-gray-500">
                                {appointment.treatmentOption}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(appointment.preferredDate)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status || "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {appointment.finalPrice !== appointment.originalPrice && appointment.originalPrice ? (
                            <div>
                              <div className="font-medium">{formatPrice(appointment.finalPrice)}</div>
                              <div className="text-xs text-gray-500 line-through">
                                {formatPrice(appointment.originalPrice)}
                              </div>
                            </div>
                          ) : (
                            <div className="font-medium">
                              {appointment.treatmentDetails?.optionPrice || 
                               formatPrice(appointment.originalPrice) || "TBD"}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(appointment.createdAt)}
                        </TableCell>
                      </TableRow>
                      
                      {/* Expanded Row Details */}
                      {expandedRow === appointment.id && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-gray-50 p-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {/* Contact Information */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 text-sm mb-3">
                                  Contact Information
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="text-gray-600">Name:</span>
                                    <span className="ml-2 text-gray-900">{appointment.name}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Email:</span>
                                    <span className="ml-2 text-gray-900">{appointment.email}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Phone:</span>
                                    <span className="ml-2 text-gray-900">{appointment.phone}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Client Type:</span>
                                    <span className="ml-2 text-gray-900 capitalize">
                                      {appointment.clientType || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Appointment Details */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 text-sm mb-3">
                                  Appointment Details
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="text-gray-600">Clinic:</span>
                                    <span className="ml-2 text-gray-900 capitalize">
                                      {appointment.clinic || "Main"}
                                    </span>
                                  </div>
                                  {appointment.isFirstAppointment && (
                                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium inline-block">
                                      First Appointment
                                    </div>
                                  )}
                                  {appointment.additionalInfo && (
                                    <div>
                                      <span className="text-gray-600">Additional Info:</span>
                                      <p className="text-gray-900 mt-1">{appointment.additionalInfo}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Pricing & Referral Details */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 text-sm mb-3">
                                  Pricing Details
                                </h4>
                                <div className="space-y-2 text-sm">
                                  {appointment.originalPrice && appointment.finalPrice !== appointment.originalPrice ? (
                                    <>
                                      <div>
                                        <span className="text-gray-600">Original Price:</span>
                                        <span className="ml-2 text-gray-500 line-through">
                                          {formatPrice(appointment.originalPrice)}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Discount:</span>
                                        <span className="ml-2 text-green-600 font-medium">
                                          -{formatPrice(appointment.userDiscount)}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Final Price:</span>
                                        <span className="ml-2 text-gray-900 font-semibold">
                                          {formatPrice(appointment.finalPrice)}
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    <div>
                                      <span className="text-gray-600">Price:</span>
                                      <span className="ml-2 text-gray-900 font-semibold">
                                        {appointment.treatmentDetails?.optionPrice || 
                                         formatPrice(appointment.originalPrice) || "TBD"}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {appointment.referralCodeUsed && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium inline-block">
                                        Referral Applied: {appointment.referralCodeUsed}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
