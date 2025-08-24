import { useUserDetails, useUserById } from "../../../../hooks/useUser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, User, Shield, CreditCard, Clock } from "lucide-react";

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
        return "bg-red-100 text-red-800";
      case "user":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-2">
              Failed to load user details
            </div>
            <p className="text-gray-500">
              {error?.message || "User not found"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Header */}
          <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photoURL} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl">
                {user.name?.charAt(0)?.toUpperCase() ||
                  user.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {user.name || "No Name"}
              </h3>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={getRoleBadgeColor(user.role)}>
                  {user.role || "user"}
                </Badge>
                <Badge
                  variant={user.isBanned ? "destructive" : "default"}
                  className={
                    user.isBanned
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {user.isBanned ? "Banned" : "Active"}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* User Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-600" />
                Personal Information
              </h4>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-900">
                      {user.name || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-gray-900 font-mono text-xs">{user.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-600" />
                Account Information
              </h4>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="text-gray-900">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Plan</p>
                    <Badge variant="outline">{user.plan || "Free"}</Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-gray-900">
                      {formatDate(user.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {(user.bio || user.phoneNumber || user.location) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Additional Information
                </h4>
                <div className="space-y-3">
                  {user.bio && (
                    <div>
                      <p className="text-sm text-gray-500">Bio</p>
                      <p className="text-gray-900">{user.bio}</p>
                    </div>
                  )}
                  {user.phoneNumber && (
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-gray-900">{user.phoneNumber}</p>
                    </div>
                  )}
                  {user.location && (
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">{user.location}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Account Status */}
          <Separator />
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Account Status
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge
                  variant={user.isBanned ? "destructive" : "default"}
                  className={
                    user.isBanned
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {user.isBanned ? "Banned" : "Active"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <Badge className={getRoleBadgeColor(user.role)}>
                  {user.role || "user"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
