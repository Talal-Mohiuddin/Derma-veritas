import { useStore } from "@/store/zustand";
import { Star, Gift, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Simplicity() {
  const { bookingOpen, setBookingOpen } = useStore();
  const router = useRouter();

  const handleReferralRedirect = () => {
    router.push("/refer-a-friend");
  };

  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Share beauty, earn rewards
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                Refer friends to Derma Veritas and earn 5% cash of their treatment
                cost. Your friends get 5% discount on their treatment. Everyone wins!
              </p>

              {/* Key Benefits */}
              <div className="space-y-3 text-left max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-gray-600" />
                  <span className="text-muted-foreground">
                    You earn 5% cash rewards
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-muted-foreground">
                    Friends get 5% discount
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-gray-600" />
                  <span className="text-muted-foreground">
                    Unlimited referrals
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Secondary CTA - Book Consultation */}
              <button
                onClick={handleReferralRedirect}
                className="px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-transparent border-2 border-[#272728] tracking-wide rounded-lg hover:bg-[#272728] hover:text-white transition-colors"
              >
                START REFERRING{" "}
              </button>
            </div>
          </div>

          {/* Right Content - Team Image with Referral Stats */}
          <div className="relative flex flex-col items-center lg:items-end">
            <div className="aspect-[4/3] overflow-hidden rounded-lg w-full max-w-md lg:max-w-none">
              <img
                src="https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Derma Veritas Team"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Referral Stats Overlay */}
            <div className="absolute -bottom-6 lg:bottom-6 lg:right-6 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Gift className="w-3 h-3 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-900 text-sm font-bold">£5</span>
                  <span className="text-gray-600 text-xs">cash per £100</span>
                </div>
              </div>
              <span className="text-gray-600 text-sm font-medium">
                You earn + Friend saves
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
