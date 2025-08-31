"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Settings,
  Save,
  LoaderCircle,
  Edit3,
  Check,
  X,
  Shield,
  Gift,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/store/FirebaseAuthProvider";
import {
  useCurrentUserProfile,
  useUpdateCurrentUserProfile,
  useUserReferralData,
} from "@/hooks/useUser";
import { toast } from "sonner";
import RouteProtection from "@/components/RouteProtection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showReferralStats, setShowReferralStats] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useCurrentUserProfile(user?.uid);

  const { data: referralData, isLoading: referralLoading } =
    useUserReferralData(user?.uid);

  const updateProfileMutation = useUpdateCurrentUserProfile();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
    },
  });

  // Update form data when profile data loads
  useState(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        phone: profileData.phone || "",
        dateOfBirth: profileData.dateOfBirth || "",
        address: profileData.address || "",
        preferences: {
          emailNotifications:
            profileData.preferences?.emailNotifications ?? true,
          smsNotifications: profileData.preferences?.smsNotifications ?? false,
          marketingEmails: profileData.preferences?.marketingEmails ?? true,
        },
      });
    }
  }, [profileData]);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        userId: user.uid,
        profileData: formData,
      });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        phone: profileData.phone || "",
        dateOfBirth: profileData.dateOfBirth || "",
        address: profileData.address || "",
        preferences: {
          emailNotifications:
            profileData.preferences?.emailNotifications ?? true,
          smsNotifications: profileData.preferences?.smsNotifications ?? false,
          marketingEmails: profileData.preferences?.marketingEmails ?? true,
        },
      });
    }
    setIsEditing(false);
  };

  // Show loading state
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="w-8 h-8 animate-spin text-orange-600" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (profileError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-4">{profileError.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <RouteProtection allowedRoles={["user", "admin"]}>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-12 px-4 bg-gradient-to-br from-gray-50 to-white ">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={user?.photoURL} alt={profileData?.name} />
                <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-2xl font-medium">
                  {profileData?.name?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
                  {profileData?.name || "Your Profile"}
                </h1>
                <p className="text-gray-600 mb-4">
                  Manage your personal information and preferences
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {formatDate(profileData?.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleSave}
                      disabled={updateProfileMutation.isPending}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
                    >
                      {updateProfileMutation.isPending ? (
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="px-4 py-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Main Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="p-6 border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      value={user?.email || profileData?.email}
                      disabled
                      className="mt-1 bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder="Enter your phone number"
                      type="tel"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1"
                      type="date"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-700"
                    >
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder="Enter your full address"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <Card className="p-6 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Account Status
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        profileData?.isBanned
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {profileData?.isBanned ? "Banned" : "Active"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Role</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {profileData?.role || "User"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Plan</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {profileData?.plan || "Free"}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Referral Stats */}
              <Card className="p-6 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Gift className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Referral Stats
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReferralStats(!showReferralStats)}
                    className="p-1"
                  >
                    {showReferralStats ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {showReferralStats && !referralLoading && referralData ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Total Referrals
                      </span>
                      <span className="font-semibold text-gray-900">
                        {referralData.stats?.totalReferrals || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="font-semibold text-green-600">
                        {referralData.stats?.completedReferrals || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Total Earned
                      </span>
                      <span className="font-semibold text-orange-600">
                        £{referralData.stats?.totalEarned || 0}
                      </span>
                    </div>
                  </div>
                ) : showReferralStats && referralLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <LoaderCircle className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                ) : showReferralStats ? (
                  <p className="text-sm text-gray-500 text-center py-2">
                    No referral data available
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-2">
                    Click to view referral statistics
                  </p>
                )}
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => (window.location.href = "/refer-a-friend")}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Refer Friends
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => (window.location.href = "/bookings")}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    My Bookings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => (window.location.href = "/shop")}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Shop Products
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </RouteProtection>
  );
}
