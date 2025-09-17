"use client";
import { useState } from "react";
import { useRewardsData, useUpdateRewardStatus } from "../../../hooks/useRewards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Gift,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Eye,
  Check,
  X,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

export default function ReferralRewardsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReward, setSelectedReward] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, reward: null, action: null });

  const {
    data: rewardsData,
    isLoading,
    error,
    refetch,
  } = useRewardsData(statusFilter === "all" ? "" : statusFilter);

  const updateStatusMutation = useUpdateRewardStatus();

  const rewards = rewardsData?.rewards || [];
  const stats = rewardsData?.stats || {};

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
    return `£${amount?.toFixed(2) || "0.00"}`;
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAppointmentStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "no-show":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleStatusUpdate = (reward, action) => {
    setConfirmDialog({ open: true, reward, action });
  };

  const confirmStatusUpdate = async () => {
    const { reward, action } = confirmDialog;
    try {
      await updateStatusMutation.mutateAsync({
        userId: reward.userId,
        appointmentId: reward.appointmentId,
        status: action,
        adminId: "admin", // You might want to get actual admin ID
      });

      toast.success(
        `Reward ${action === "approved" ? "approved" : "rejected"} successfully!`
      );
      setConfirmDialog({ open: false, reward: null, action: null });
    } catch (error) {
      toast.error(error.message || "Failed to update reward status");
    }
  };

  const handleViewDetails = (reward) => {
    setSelectedReward(reward);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            Loading Referral Rewards...
          </div>
          <div className="text-gray-500">Please wait while we fetch the data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">Error loading rewards</div>
        <Button onClick={() => refetch()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
              <Gift className="w-8 h-8" />
              Referral Rewards Management
            </h1>
            <p className="text-gray-300 text-base sm:text-lg">
              Manage and approve referral rewards for users
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[120px] text-center border border-white/20">
            <div className="text-2xl sm:text-3xl font-bold">{stats.total || 0}</div>
            <div className="text-sm text-gray-300">Total Rewards</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</div>
          <div className="text-sm text-gray-600">Pending Approval</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.approved || 0}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600">{stats.rejected || 0}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-4 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div className="text-2xl font-bold text-white">
            {formatCurrency(stats.totalAmount)}
          </div>
          <div className="text-sm text-gray-300">Total Approved</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-300">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rewards Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-900 py-4">Referrer</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">
                  Referred User
                </TableHead>
                <TableHead className="font-semibold text-gray-900">Treatment</TableHead>
                <TableHead className="font-semibold text-gray-900">Reward Amount</TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rewards.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="text-gray-500">
                      {statusFilter !== "all"
                        ? `No ${statusFilter} rewards found`
                        : "No referral rewards found"}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                rewards.map((reward) => (
                  <TableRow key={reward.id} className="hover:bg-gray-100 transition-colors duration-200">
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium">
                            {reward.referrerName?.charAt(0)?.toUpperCase() ||
                              reward.referrerEmail?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">
                            {reward.referrerName || "No Name"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {reward.referrerCode}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {reward.referredUserName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {reward.referredUserEmail}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {reward.treatmentName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {reward.treatmentCost}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="font-bold text-green-600">
                        {formatCurrency(reward.rewardAmount)}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={`${getStatusBadgeColor(reward.status)} border`}>
                        {reward.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm text-gray-500 hidden lg:table-cell">
                      {formatDate(reward.createdAt)}
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleViewDetails(reward)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {reward.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(reward, "approved")}
                                className="text-green-600"
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(reward, "rejected")}
                                className="text-red-600"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => 
        setConfirmDialog({ open, reward: null, action: null })
      }>
        <DialogContent className="shadow-xl">
          <DialogHeader>
            <DialogTitle>
              {confirmDialog.action === "approved" ? "Approve" : "Reject"} Reward
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {confirmDialog.action === "approved" ? "approve" : "reject"} 
              this referral reward of {formatCurrency(confirmDialog.reward?.rewardAmount)} 
              for {confirmDialog.reward?.referrerName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmDialog({ open: false, reward: null, action: null })}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmStatusUpdate}
              variant={confirmDialog.action === "approved" ? "default" : "destructive"}
              disabled={updateStatusMutation.isPending}
              className={confirmDialog.action === "approved" ? "bg-gray-900 hover:bg-gray-800" : ""}
            >
              {updateStatusMutation.isPending ? "Processing..." : 
               confirmDialog.action === "approved" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reward Details Dialog */}
      {selectedReward && (
        <Dialog open={!!selectedReward} onOpenChange={() => setSelectedReward(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <DialogHeader className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white rounded-t-lg -mx-6 -mt-6">
              <DialogTitle>Referral Reward Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pb-4">
              {/* Referrer Info */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg border border-gray-300 shadow-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Referrer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedReward.referrerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedReward.referrerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Referral Code</p>
                    <p className="font-mono font-medium">{selectedReward.referrerCode}</p>
                  </div>
                </div>
              </div>

              {/* Referred User & Appointment Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-300 shadow-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Referred User</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{selectedReward.referredUserName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{selectedReward.referredUserEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-300 shadow-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Appointment Details</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Treatment</p>
                      <p className="font-medium">{selectedReward.treatmentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Treatment Cost</p>
                      <p className="font-medium">{selectedReward.treatmentCost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Appointment #</p>
                      <p className="font-mono text-sm">{selectedReward.appointmentNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Appointment Status</p>
                      <Badge className={`${getAppointmentStatusBadgeColor(selectedReward.appointmentStatus)} border mt-1`}>
                        {selectedReward.appointmentStatus || "unknown"}
                      </Badge>
                    </div>
                    {selectedReward.appointmentData?.createdAt && (
                      <div>
                        <p className="text-sm text-gray-600">Appointment Date</p>
                        <p className="text-sm font-medium">{formatDate(selectedReward.appointmentData.createdAt)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reward Info */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg text-white">
                <h4 className="font-semibold text-white mb-2">Reward Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-300">Reward Amount (5% of treatment cost)</p>
                    <p className="text-2xl font-bold text-green-400">
                      {formatCurrency(selectedReward.rewardAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Reward Status</p>
                    <Badge className={`${getStatusBadgeColor(selectedReward.status)} border mt-1`}>
                      {selectedReward.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Reward Created</p>
                    <p className="font-medium">{formatDate(selectedReward.createdAt)}</p>
                  </div>
                  {selectedReward.processedAt && (
                    <div>
                      <p className="text-sm text-gray-300">Processed Date</p>
                      <p className="font-medium">{formatDate(selectedReward.processedAt)}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                  <p className="text-sm text-gray-200">
                    <strong>Note:</strong> This reward was automatically generated when the referred user completed their first appointment. 
                    The reward amount is calculated as 5% of the treatment cost.
                  </p>
                </div>
              </div>

              {selectedReward.status === "pending" && (
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => {
                      setSelectedReward(null);
                      handleStatusUpdate(selectedReward, "approved");
                    }}
                    className="flex-1 bg-gray-900 hover:bg-gray-800"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve Reward
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedReward(null);
                      handleStatusUpdate(selectedReward, "rejected");
                    }}
                    variant="destructive"
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject Reward
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
