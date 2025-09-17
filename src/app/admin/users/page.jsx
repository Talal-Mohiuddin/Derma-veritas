"use client";
import { useState, useEffect } from "react";
import { useUsersData, useToggleUserBan } from "../../../hooks/useUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Eye,
  Users,
  UserPlus,
  TrendingUp,
  Calendar,
  PoundSterling,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserDetailsModal } from "@/app/admin/users/_components/UserDetailsModal";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useUsersData(
    debouncedSearch,
    roleFilter === "all" ? "" : roleFilter,
    statusFilter === "all" ? "" : statusFilter
  );

  const toggleBanMutation = useToggleUserBan();

  const users = usersData?.users || [];

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter((u) => !u.isBanned).length,
    banned: users.filter((u) => u.isBanned).length,
    withReferrals: users.filter((u) => u.referralCount > 0).length,
    totalReferrals: users.reduce((sum, u) => sum + (u.referralCount || 0), 0),
    totalRewards: users.reduce((sum, u) => sum + (u.totalRewardsEarned || 0), 0),
    usersWhoUsedCodes: users.filter((u) => u.usedReferralCodesCount > 0).length,
  };

  const handleToggleBan = async (userId, currentStatus) => {
    try {
      await toggleBanMutation.mutateAsync({
        id: userId,
        isBanned: !currentStatus,
      });
      toast.success(
        `User ${!currentStatus ? "banned" : "unbanned"} successfully!`
      );
    } catch (error) {
      toast.error(error.message || "Failed to update user status");
    }
  };

  const handleViewDetails = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700 mb-2">Loading Users...</div>
          <div className="text-gray-500">Please wait while we fetch the data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">Error loading users</div>
        <Button onClick={() => refetch()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
                <Users className="w-8 h-8" />
                User Management
              </h1>
              <p className="text-gray-300 text-base sm:text-lg">
                Manage users, track referrals, and monitor growth
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[120px] text-center border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-300">Total Users</div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <UserX className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.banned}</div>
            <div className="text-sm text-gray-600">Banned Users</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.withReferrals}</div>
            <div className="text-sm text-gray-600">Active Referrers</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-indigo-600">{stats.totalReferrals}</div>
            <div className="text-sm text-gray-600">Total Referrals</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <PoundSterling className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">£{stats.totalRewards.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total Rewards</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-300">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent w-full sm:w-auto"
                >
                  <option value="all">All Roles</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent w-full sm:w-auto"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Users Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-semibold text-gray-900 py-4">User</TableHead>
                  <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">Email</TableHead>
                  <TableHead className="font-semibold text-gray-900">Role</TableHead>
                  <TableHead className="font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Referrals Made</TableHead>
                  <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Codes Used</TableHead>
                  <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Rewards Earned</TableHead>
                  <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Joined</TableHead>
                  <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Plan</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12">
                      <div className="text-gray-500">
                        {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                          ? "No users found matching your criteria"
                          : "No users found"}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-100 transition-colors duration-200">
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.photoURL} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium">
                              {user.name?.charAt(0)?.toUpperCase() ||
                                user.email?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.name || "No Name"}
                            </div>
                            <div className="text-xs text-gray-500 sm:hidden">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </TableCell>

                      <TableCell>
                        <Badge className={`${getRoleBadgeColor(user.role)} border`}>
                          {user.role || "user"}
                        </Badge>
                      </TableCell>

                      <TableCell>
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
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              user.referralCount > 0
                                ? "bg-orange-50 text-orange-600 border-orange-200"
                                : "bg-gray-50 text-gray-500 border-gray-200"
                            }`}
                          >
                            {user.referralCount || 0}
                          </Badge>
                          {user.referralCount > 0 && (
                            <TrendingUp className="w-3 h-3 text-orange-500" />
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              user.usedReferralCodesCount > 0
                                ? "bg-blue-50 text-blue-600 border-blue-200"
                                : "bg-gray-50 text-gray-500 border-gray-200"
                            }`}
                          >
                            {user.usedReferralCodesCount || 0}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-gray-500 hidden lg:table-cell">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-green-600">
                            £{(user.totalRewardsEarned || 0).toFixed(2)}
                          </span>
                          {user.pendingRewards > 0 && (
                            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-600 border-yellow-200">
                              {user.pendingRewards} pending
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-gray-500 hidden lg:table-cell">
                        {formatDate(user.createdAt)}
                      </TableCell>

                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="outline" className="text-xs border border-gray-300">
                          {user.plan || "Free"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleBan(user.id, user.isBanned)}
                              disabled={toggleBanMutation.isPending}
                              className={user.isBanned ? "text-green-600" : "text-red-600"}
                            >
                              {user.isBanned ? (
                                <>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Unban User
                                </>
                              ) : (
                                <>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Ban User
                                </>
                              )}
                            </DropdownMenuItem>
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

        {/* User Details Modal */}
        <UserDetailsModal
          userId={selectedUserId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </TooltipProvider>
  );
}
