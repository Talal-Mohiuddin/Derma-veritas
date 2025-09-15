import { useUserById } from "../../../../hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Mail,
  User,
  Shield,
  CreditCard,
  Clock,
  Users,
  TrendingUp,
  UserPlus,
  Copy,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function UserDetailsModal({ userId, isOpen, onClose }) {
  const { data: user, isLoading, error } = useUserById(userId);

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

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      toast.success("Referral code copied to clipboard!");
    }
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh]">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh]">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-2">
              Failed to load user details
            </div>
            <p className="text-gray-500">
              {error?.message || "User not found"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-4 sm:p-6 w-full max-h-[90vh] overflow-y-auto max-w-3xl mx-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 p-4 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white rounded-lg -mx-4 -mt-4 sm:-mx-6 sm:-mt-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            User Profile & Details
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* User Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl border border-gray-300 shadow-lg">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-white shadow-md">
                <AvatarImage src={user.photoURL} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-lg sm:text-xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() ||
                    user.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 sm:hidden">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {user.name || "No Name"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{user.email}</p>
              </div>
            </div>
            
            <div className="flex-1 hidden sm:block">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {user.name || "No Name"}
              </h3>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={`${getRoleBadgeColor(user.role)} border`}>
                  {user.role || "user"}
                </Badge>
                <Badge
                  variant={user.isBanned ? "destructive" : "default"}
                  className={
                    user.isBanned
                      ? "bg-red-100 text-red-800 border-red-200"
                      : "bg-green-100 text-green-800 border-green-200"
                  }
                >
                  {user.isBanned ? "Banned" : "Active"}
                </Badge>
                {user.referralCode && (
                  <Badge variant="outline" className="text-xs border border-gray-300">
                    Code: {user.referralCode}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Mobile badges */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:hidden">
              <Badge className={`${getRoleBadgeColor(user.role)} border`}>
                {user.role || "user"}
              </Badge>
              <Badge
                variant={user.isBanned ? "destructive" : "default"}
                className={
                  user.isBanned
                    ? "bg-red-100 text-red-800 border-red-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }
              >
                {user.isBanned ? "Banned" : "Active"}
              </Badge>
              {user.referralCode && (
                <Badge variant="outline" className="text-xs border border-gray-300">
                  Code: {user.referralCode}
                </Badge>
              )}
            </div>
            
            <div className="text-left sm:text-right w-full sm:w-auto">
              <div className="text-sm text-gray-500">Member Since</div>
              <div className="font-medium text-sm sm:text-base">{formatDate(user.createdAt)}</div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-3 sm:p-4 border border-gray-300 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">
                {user.plan || "Free"}
              </div>
              <div className="text-xs sm:text-sm text-gray-700">Current Plan</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 sm:p-4 border border-green-200 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {user.referralCount || 0}
              </div>
              <div className="text-xs sm:text-sm text-green-700">Users Referred</div>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700 shadow-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-white">
                £{(user.totalRewardsEarned || 0).toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">Total Rewards Earned</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 sm:p-4 border border-orange-200 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-orange-600">
                {user.usedReferralCodesCount || 0}
              </div>
              <div className="text-xs sm:text-sm text-orange-700">Codes Used</div>
            </div>
          </div>

          <Separator className="border-gray-300" />

          {/* Main Content Grid */}
          <div className="space-y-6 sm:space-y-8">
            {/* Personal Information */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-700" />
                  Personal Information
                </h4>

                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4 border border-gray-300 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-4 h-4 text-gray-500 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-gray-900 font-medium text-sm sm:text-base break-all">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <User className="w-4 h-4 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-gray-900 font-medium text-sm sm:text-base">
                        {user.name || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Shield className="w-4 h-4 text-gray-500 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500">User ID</p>
                      <p className="text-gray-900 font-mono text-xs break-all">
                        {user.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Account Created</p>
                      <p className="text-gray-900 font-medium text-sm sm:text-base">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>

                  {user.updatedAt && (
                    <div className="flex items-start space-x-3">
                      <Clock className="w-4 h-4 text-gray-500 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="text-gray-900 font-medium text-sm sm:text-base">
                          {formatDate(user.updatedAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Referral Information - Full Width */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                Referral Information
              </h4>

              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-4 sm:p-6 border border-gray-300 shadow-lg">
                <div className="space-y-4 sm:space-y-6">
                  {user.referralCode && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        User's Referral Code
                      </p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <code className="bg-white px-3 py-2 rounded border border-gray-300 text-gray-900 font-bold text-sm sm:text-base w-full sm:w-auto text-center sm:text-left">
                          {user.referralCode}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={copyReferralCode}
                          className="w-full sm:w-auto border-gray-300 hover:bg-gray-100"
                        >
                          <Copy className="w-4 h-4 mr-2 sm:mr-0" />
                          <span className="sm:hidden">Copy Code</span>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Referral Activity Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-300 text-center shadow-md">
                      <div className="text-lg font-bold text-green-600">
                        {user.referralCount || 0}
                      </div>
                      <div className="text-xs text-gray-600">Users Referred</div>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-300 text-center shadow-md">
                      <div className="text-lg font-bold text-gray-900">
                        £{(user.totalRewardsEarned || 0).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600">Total Earned</div>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-300 text-center shadow-md">
                      <div className="text-lg font-bold text-orange-600">
                        {user.usedReferralCodesCount || 0}
                      </div>
                      <div className="text-xs text-gray-600">Codes Used</div>
                    </div>
                  </div>

                  {/* Used Referral Codes */}
                  {user.usedReferralCodes && user.usedReferralCodes.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Referral Codes This User Has Used
                      </p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {user.usedReferralCodes.map((usage, index) => (
                          <div key={index} className="bg-white p-3 rounded border flex justify-between items-center">
                            <div>
                              <code className="font-mono text-sm font-bold text-blue-600">
                                {usage.code}
                              </code>
                              <div className="text-xs text-gray-500">
                                Used on: {formatDate(usage.usedAt)}
                              </div>
                            </div>
                            {usage.referrerReward > 0 && (
                              <Badge variant="outline" className="text-xs">
                                Reward: £{usage.referrerReward}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pending Rewards */}
                  {user.pendingRewards > 0 && (
                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          {user.pendingRewards} pending reward{user.pendingRewards !== 1 ? 's' : ''} awaiting approval
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <Separator className="border-gray-300" />
          <div className="bg-gray-100 rounded-lg p-4 sm:p-6 border border-gray-300 shadow-lg">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
              Account Status & Security
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Account Status</p>
                <Badge
                  variant={user.isBanned ? "destructive" : "default"}
                  className={
                    user.isBanned
                      ? "bg-red-100 text-red-800 border-red-200"
                      : "bg-green-100 text-green-800 border-green-200"
                  }
                >
                  {user.isBanned ? "Banned" : "Active"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email Verified</p>
                <Badge variant={user.emailVerified ? "default" : "warning"}>
                  {user.emailVerified ? "Verified" : "Pending"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
