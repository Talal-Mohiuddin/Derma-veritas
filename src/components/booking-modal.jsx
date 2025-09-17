"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { useRouter } from "next/navigation";
import { useCreateAppointment } from "@/hooks/useAppointment";
import { useCurrentUserProfile } from "@/hooks/useUser";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function BookingModal({
  open,
  onOpenChange,
  children,
  selectedTreatment = "",
}) {
  const { user } = useAuth();
  const router = useRouter();
  const createAppointment = useCreateAppointment();

  // Get user profile data
  const { data: profileData, isLoading: profileLoading } =
    useCurrentUserProfile(user?.uid);

  const [formData, setFormData] = useState({
    treatment: "",
    treatmentOption: "",
    clientType: "new",
    name: "",
    phone: "",
    email: "",
    preferredDate: "", // Changed from callbackTime
    additionalInfo: "", // New field
    ageConfirm: false,
    newsletter: false,
    referralCode: "", // Add referral code field
  });

  const [referralError, setReferralError] = useState(null);
  const [originalReferralCode, setOriginalReferralCode] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Treatment options mapping
  const treatmentOptions = {
    "8-point-facelift": {
      name: "8 Point Facelift - Dermal Filler Treatments & Packages",
      options: [
        {
          id: "lip-cheek-chin",
          name: "Lip, Cheek, Chin (0.5-1.0ml)",
          price: "£250",
        },
        { id: "jawline", name: "Jawline (3.0ml)", price: "£450" },
        { id: "tear-trough", name: "Tear Trough", price: "£450" },
        { id: "russian-lip", name: "Russian Lip Technique", price: "£350" },
        { id: "additional-1ml", name: "Additional 1.0ml", price: "£110" },
        {
          id: "lift-reshape",
          name: "Lift & Reshape Package",
          price: "£1,950",
          description:
            "Includes Endolift + RF Microneedling + Profhilo + 2ml Dermal Filler",
        },
        {
          id: "custom-plan",
          name: "Custom Treatment Plan",
          price: "Consultation",
          description: "Tailored to your specific needs and goals",
        },
      ],
    },
    "cheek-fillers": {
      name: "Cheek Fillers - Dermal Filler Treatments & Packages",
      options: [
        {
          id: "lip-cheek-chin",
          name: "Lip, Cheek, Chin (0.5-1.0ml)",
          price: "£250",
        },
        { id: "jawline", name: "Jawline (3.0ml)", price: "£450" },
        { id: "tear-trough", name: "Tear Trough", price: "£450" },
        { id: "russian-lip", name: "Russian Lip Technique", price: "£350" },
        { id: "additional-1ml", name: "Additional 1.0ml", price: "£110" },
        {
          id: "lift-reshape",
          name: "Lift & Reshape Package",
          price: "£1,950",
          description:
            "Includes Endolift + RF Microneedling + Profhilo + 2ml Dermal Filler",
        },
      ],
    },
    "chin-fillers": {
      name: "Chin Filler Treatments",
      options: [
        {
          id: "chin-filler",
          name: "Chin (0.5–1.0 ml)",
          price: "£250",
          description:
            "Perfect for enhancing chin definition and creating facial balance",
        },
        { id: "additional-1ml", name: "Additional 1.0 ml", price: "£110" },
        { id: "jawline-related", name: "Jawline (3.0 ml)", price: "£450" },
        { id: "lip-cheek-chin", name: "Lip, Cheek, Chin", price: "£250" },
      ],
    },
    "fat-dissolving-injections": {
      name: "Fat Dissolving Injections",
      options: [
        {
          id: "small-area",
          name: "Small Area (chin/jawline)",
          price: "£250 per session",
        },
        {
          id: "medium-area",
          name: "Medium Area (arms, small belly)",
          price: "£350 per session",
        },
        {
          id: "large-area",
          name: "Large Area (abdomen, thighs)",
          price: "£500 per session",
        },
      ],
    },
    "hand-rejuvenation": {
      name: "Hand Rejuvenation Treatments",
      options: [
        {
          id: "dermal-fillers",
          name: "Dermal Fillers (1–2 ml)",
          price: "£300 – £450",
          description:
            "Immediate restoration of volume and smoother appearance. Duration: 6–12 months",
        },
        {
          id: "prp-therapy",
          name: "PRP Therapy (3 Sessions)",
          price: "£500",
          description:
            "Gradual improvement in skin quality, texture, and glow. Results last several months",
        },
        {
          id: "pn-therapy",
          name: "Polynucleotide (PN) Therapy (2–3 Sessions)",
          price: "£350 – £500",
          description:
            "Increased hydration, elasticity, and tissue regeneration. Duration: 3–6 months",
        },
        {
          id: "laser-therapy",
          name: "Laser / Light Therapy (CO₂ / Phototherapy)",
          price: "From £200 per session",
          description:
            "Reduction in pigmentation, age spots, and wrinkles. Progressive results over weeks",
        },
      ],
    },
    "harmonyca-dermal-filler": {
      name: "HarmonyCA™ Hybrid Filler",
      options: [
        {
          id: "per-syringe",
          name: "Per Syringe",
          price: "£450",
          description:
            "Instant + Progressive results. Immediate lift with improvement over 3-6 months. Duration: Up to 18 Months",
        },
      ],
    },
    "lip-fillers": {
      name: "Lip Filler Treatments",
      options: [
        {
          id: "standard-lip",
          name: "Standard Lip Filler (0.5–1.0 ml)",
          price: "£250",
        },
        { id: "russian-lip", name: "Russian Lip Technique", price: "£350" },
        { id: "add-on", name: "Add-On (extra 1.0 ml)", price: "£110" },
      ],
    },
    "nctf-skin-revitalisation": {
      name: "NCTF® Skin Revitalisation",
      options: [
        { id: "single-session", name: "1 Session", price: "£180" },
        {
          id: "three-sessions",
          name: "3 Sessions (recommended)",
          price: "£450",
        },
        {
          id: "five-sessions",
          name: "5 Sessions (full course)",
          price: "£700",
        },
      ],
    },
    "tear-trough-filler": {
      name: "Tear Trough & Dermal Filler Treatments",
      options: [
        { id: "tear-trough", name: "Tear Trough Treatment", price: "£450" },
        {
          id: "lip-cheek-chin",
          name: "Lip, Cheek, Chin (0.5-1.0ml)",
          price: "£250",
        },
        { id: "jawline", name: "Jawline (3.0ml)", price: "£450" },
        { id: "russian-lip", name: "Russian Lip Technique", price: "£350" },
        { id: "additional-1ml", name: "Additional 1.0ml", price: "£110" },
      ],
    },
    "anti-wrinkle-treatment": {
      name: "Anti-Wrinkle Treatment (Advanced Anti-Wrinkle Treatment)",
      options: [
        {
          id: "one-area",
          name: "Precision Wrinkle Smoothing – One Area",
          price: "£125",
        },
        {
          id: "three-areas",
          name: "Precision Wrinkle Smoothing – Three Areas",
          price: "£250",
        },
        { id: "masseter", name: "Masseter Muscle Treatment", price: "£300" },
        { id: "neckbands", name: "Neckbands Treatment", price: "£300" },
        {
          id: "hyperhidrosis",
          name: "Hyperhidrosis (Excessive Sweating)",
          price: "£350",
        },
      ],
    },
    "dermal-fillers": {
      name: "Dermal Fillers",
      options: [
        {
          id: "lip-cheek-chin",
          name: "Lip, Cheek, Chin (0.5–1 ml)",
          price: "£250",
        },
        { id: "add-on", name: "Add-On (Additional 1.0 ml)", price: "£110" },
        { id: "jawline", name: "Jawline (3.0 ml)", price: "£450" },
        { id: "tear-trough", name: "Tear Trough", price: "£450" },
        { id: "russian-lip", name: "Russian Lip Technique", price: "£350" },
      ],
    },
    "non-surgical-rhinoplasty": {
      name: "Non-Surgical Rhinoplasty",
      options: [
        { id: "rhinoplasty", name: "Non-Surgical Rhinoplasty", price: "£450" },
      ],
    },
    "polynucleotides-skin-rejuvenation-treatment": {
      name: "Polynucleotide (PN) Treatments - Face",
      options: [
        { id: "face-1", name: "Face - 1 Session", price: "£190" },
        { id: "face-2", name: "Face - 2 Sessions", price: "£350" },
        { id: "face-3", name: "Face - 3 Sessions", price: "£500" },
      ],
    },
    "polynucleotides-hair-loss-treatment": {
      name: "Polynucleotide (PN) Treatments - Hair",
      options: [
        { id: "hair-1", name: "Hair Restoration - 1 Session", price: "£250" },
        { id: "hair-2", name: "Hair Restoration - 2 Sessions", price: "£450" },
        { id: "hair-3", name: "Hair Restoration - 3 Sessions", price: "£600" },
      ],
    },
    "iv-drips": {
      name: "PRP Therapy & Exosome Therapy",
      options: [
        { id: "prp-face", name: "PRP Full Face (3 Sessions)", price: "£500" },
        {
          id: "prp-eyes",
          name: "PRP Under-Eye Area (3 Sessions)",
          price: "£300",
        },
        { id: "prp-hair", name: "PRP Hair (3 Sessions)", price: "£500" },
        {
          id: "exosome-3",
          name: "Exosome Therapy (3 Sessions)",
          price: "£500",
        },
        {
          id: "exosome-5",
          name: "Exosome Therapy (5 Sessions)",
          price: "£700",
        },
      ],
    },
    profhilo: {
      name: "Profhilo® Skin Booster",
      options: [
        { id: "profhilo-1", name: "1 Session", price: "£300" },
        { id: "profhilo-2", name: "2 Sessions", price: "£550" },
        { id: "profhilo-3", name: "3 Sessions", price: "£700" },
      ],
    },
    endolift: {
      name: "Endolift® (Skin & Tissue Rejuvenation)",
      options: [
        { id: "one-area", name: "One Area", price: "£800" },
        { id: "full-face", name: "Full Face", price: "£1,600" },
        {
          id: "upper-face",
          name: "Upper Face / Malar Bags (Under Eyes)",
          price: "£1,500",
        },
        { id: "upper-arms", name: "Upper Arms", price: "£1,800" },
        { id: "abdomen", name: "Abdomen / Tummy", price: "£2,000" },
        { id: "thighs", name: "Thighs / Other Body Areas", price: "£2,000" },
      ],
    },
    "co2-laser": {
      name: "CO₂ Fractional Laser",
      options: [
        { id: "patch-test", name: "Patch Test", price: "£50" },
        {
          id: "upper-face",
          name: "Single – One Area Upper Face",
          price: "£700",
        },
        {
          id: "lower-face",
          name: "Single – One Area Lower Face",
          price: "£700",
        },
        { id: "body-limb", name: "Single – Body (per limb)", price: "£700" },
        { id: "full-face-single", name: "Single – Full Face", price: "£1,250" },
        { id: "full-face-3", name: "3 Sessions – Full Face", price: "£2,500" },
      ],
    },
    microneedling: {
      name: "Microneedling",
      options: [
        {
          id: "full-face",
          name: "Single Treatment – Full Face",
          price: "£350",
        },
        {
          id: "scars-stretch",
          name: "Single Treatment – Scars & Stretch Marks (One Area)",
          price: "£300",
        },
        { id: "full-face-3", name: "3 Sessions – Full Face", price: "£950" },
      ],
    },
    "skinpen-microneedling": {
      name: "RF Microneedling",
      options: [
        {
          id: "full-face",
          name: "Single Treatment – Full Face",
          price: "£450",
        },
        {
          id: "scars-stretch",
          name: "Single Treatment – Scars & Stretch Marks (One Area)",
          price: "£350",
        },
        { id: "full-face-3", name: "3 Sessions – Full Face", price: "£1,250" },
      ],
    },
    "quad-laser-hair-removal": {
      name: "Quad Laser Hair Removal - Face",
      options: [
        { id: "upper-lip", name: "Upper Lip", price: "£45 (6 for £225)" },
        { id: "chin", name: "Chin", price: "£50 (6 for £250)" },
        { id: "lip-chin", name: "Lip & Chin", price: "£75 (6 for £375)" },
        { id: "sides-face", name: "Sides of Face", price: "£60 (6 for £300)" },
        { id: "full-face", name: "Full Face", price: "£120 (6 for £600)" },
        { id: "neck", name: "Neck (Front/Back)", price: "£60 (6 for £300)" },
        {
          id: "face-neck",
          name: "Full Face & Neck",
          price: "£160 (6 for £800)",
        },
      ],
    },
    "profusion-hydrafacial": {
      name: "ProFusion HydraFacial - Advanced Skin Rejuvenation",
      options: [
        {
          id: "signature-rf",
          name: "Signature + RF (40 min)",
          price: "£150",
          description:
            "Cleanse, exfoliate, extraction, hydration + RF tightening. Package: £750 for 6 sessions",
        },
        {
          id: "deluxe-rf",
          name: "Deluxe + RF (50 min)",
          price: "£180",
          description:
            "Signature + custom booster serum + LED therapy + RF. Package: £900 for 6 sessions",
        },
        {
          id: "platinum-rf",
          name: "Platinum + RF (70 min)",
          price: "£210",
          description:
            "Deluxe + lymphatic drainage + advanced RF lifting. Package: £1,050 for 6 sessions",
        },
        {
          id: "elite-cellular",
          name: "Elite – Cellular Repair & Lift (75 min)",
          price: "£250",
          description:
            "Platinum + enhanced serums + deep RF collagen stimulation. Package: £1,250 for 6 sessions",
        },
      ],
    },
    "v-hacker": {
      name: "V-Hacker Biohacking Treatment",
      options: [
        {
          id: "single-session",
          name: "1 Session",
          price: "£300",
          description:
            "Advanced biohacking treatment with peptides and exosomal delivery",
        },
        {
          id: "two-sessions",
          name: "2 Sessions",
          price: "£500",
          description: "Recommended course for enhanced results",
        },
        {
          id: "three-sessions",
          name: "3 Sessions",
          price: "£700",
          description: "Complete course for optimal cellular-level results",
        },
      ],
    },
    revitalizing: {
      name: "Hair+ Revitalizing Treatment",
      options: [
        {
          id: "four-session-package",
          name: "4-Session Package",
          price: "£600",
          description: "Complete treatment course for optimal hair restoration",
        },
        {
          id: "single-session",
          name: "Single Session",
          price: "£180",
          description: "Individual treatment session",
        },
        {
          id: "maintenance-session",
          name: "Maintenance Session",
          price: "£150",
          description: "After initial package completion",
        },
        {
          id: "with-prp",
          name: "With PRP Enhancement",
          price: "+£200",
          description: "Enhanced results with PRP therapy",
        },
        {
          id: "with-light-therapy",
          name: "With Light Therapy",
          price: "+£100",
          description: "Additional light therapy for better results",
        },
      ],
    },
    exosignal: {
      name: "ExoSignal™ Hair Treatment",
      options: [
        {
          id: "complete-course",
          name: "Complete Course (4 sessions)",
          price: "£700",
          description:
            "Full treatment course using synthetic exosome technology",
        },
        {
          id: "single-session",
          name: "Single Session",
          price: "£200",
          description: "Individual treatment session",
        },
        {
          id: "maintenance-session",
          name: "Maintenance Session",
          price: "£180",
          description: "After initial course completion",
        },
      ],
    },
    exo: {
      name: "EXO–NAD Skin Longevity Peeling",
      options: [
        {
          id: "single-session",
          name: "Single Session",
          price: "£380",
          description: "Multi-step peel with synthetic exosome technology",
        },
        {
          id: "three-sessions",
          name: "Course of 3 Sessions",
          price: "£1,000",
          description: "Recommended course for optimal results",
        },
        {
          id: "six-sessions",
          name: "Course of 6 Sessions",
          price: "£1,900",
          description: "Complete rejuvenation program",
        },
      ],
    },
    "skinfill-bacio": {
      name: "Skinfill™ Bacio Lip Enhancement",
      options: [
        {
          id: "single-session",
          name: "Single Session",
          price: "£230",
          description: "Professional lip booster with Vitamin B12 and HA",
        },
        {
          id: "three-sessions",
          name: "Course of 3 Sessions",
          price: "£600",
          description: "Complete treatment course (Save £90)",
        },
      ],
    },
    "skin-boosters": {
      name: "Skin Boosters",
      options: [
        { id: "profhilo-1", name: "Profhilo - 1 Session", price: "£300" },
        { id: "profhilo-2", name: "Profhilo - 2 Sessions", price: "£550" },
        { id: "profhilo-3", name: "Profhilo - 3 Sessions", price: "£700" },
        { id: "nctf-1", name: "NCTF - 1 Session", price: "£180" },
        { id: "nctf-3", name: "NCTF - 3 Sessions", price: "£450" },
        { id: "nctf-5", name: "NCTF - 5 Sessions", price: "£700" },
      ],
    },
    "prescription-skincare": {
      name: "Prescription Skincare",
      options: [
        {
          id: "consultation",
          name: "Initial Consultation & Assessment",
          price: "£60",
          description:
            "Professional skin assessment and treatment plan (deductible from treatment costs)",
        },
        {
          id: "topical-formulations",
          name: "Topical Formulations",
          price: "From £40",
          description: "Custom prescription topical treatments",
        },
        {
          id: "oral-medications",
          name: "Oral Medications",
          price: "From £25",
          description: "Prescription oral therapies",
        },
        {
          id: "combination-therapy",
          name: "Combination Therapy",
          price: "From £65",
          description: "Combined topical and oral treatment approach",
        },
        {
          id: "follow-up",
          name: "Follow-up Consultations",
          price: "£30",
          description: "Regular monitoring and treatment adjustments",
        },
      ],
    },
    "weight-loss": {
      name: "Weight Loss Treatments",
      options: [
        {
          id: "consultation",
          name: "Initial Consultation",
          price: "Consultation Required",
          description: "Comprehensive assessment with clinical team",
        },
        {
          id: "single-session",
          name: "Single Injection Session",
          price: "Consultation Required",
          description: "Individual weight loss modulator injection",
        },
        {
          id: "four-session-course",
          name: "4-Session Course",
          price: "Consultation Required",
          description: "Standard treatment course for optimal results",
        },
        {
          id: "eight-session-course",
          name: "8-Session Course",
          price: "Consultation Required",
          description: "Extended course for comprehensive weight management",
        },
        {
          id: "follow-up-appointments",
          name: "Follow-up Appointments",
          price: "Consultation Required",
          description: "Regular monitoring and progress assessment",
        },
      ],
    },
    ablative: {
      name: "Ablative Laser Treatments",
      options: [
        {
          id: "consultation",
          name: "Initial Consultation & Assessment",
          price: "Consultation Required",
          description: "Comprehensive skin assessment and treatment planning",
        },
        {
          id: "co2-single-area",
          name: "CO₂ Fractional Laser - Single Area",
          price: "Consultation Required",
          description: "Pricing varies by treatment area and intensity",
        },
        {
          id: "co2-full-face",
          name: "CO₂ Fractional Laser - Full Face",
          price: "Consultation Required",
          description: "Complete facial resurfacing treatment",
        },
        {
          id: "co2-multiple-sessions",
          name: "Multiple Session Course",
          price: "Consultation Required",
          description: "Enhanced results with course of treatments",
        },
        {
          id: "aftercare-products",
          name: "Aftercare Products & Follow-up",
          price: "Included",
          description: "Required post-treatment care and monitoring",
        },
      ],
    },
    "prescription-hair": {
      name: "Prescription Hair Treatments",
      options: [
        {
          id: "hair-consultation",
          name: "Initial Hair Assessment",
          price: "Consultation Required",
          description:
            "Comprehensive hair loss consultation and treatment planning",
        },
        {
          id: "topical-treatments",
          name: "Prescription Topical Solutions",
          price: "Consultation Required",
          description: "Custom topical hair restoration treatments",
        },
        {
          id: "oral-therapies",
          name: "Oral Hair Therapies",
          price: "Consultation Required",
          description: "Prescription oral medications for hair health",
        },
        {
          id: "injection-treatments",
          name: "Injectable Hair Treatments",
          price: "Consultation Required",
          description: "Professional injectable therapies for hair restoration",
        },
        {
          id: "combination-plan",
          name: "Combination Treatment Plan",
          price: "Consultation Required",
          description: "Multi-modal approach combining various therapies",
        },
        {
          id: "follow-up-monitoring",
          name: "Follow-up & Monitoring",
          price: "Consultation Required",
          description: "Regular assessment and treatment adjustments",
        },
      ],
    },
  };
  // Auto-fill user info when logged in
  useEffect(() => {
    if (user && open) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || profileData?.name || "",
        email: user.email || "",
        phone: profileData?.phone || "",
        treatment: selectedTreatment || prev.treatment,
      }));
    } else if (selectedTreatment && open) {
      setFormData((prev) => ({
        ...prev,
        treatment: selectedTreatment,
      }));
    }
  }, [user, profileData, selectedTreatment, open]);

  // Reset treatmentOption when treatment changes
  useEffect(() => {
    if (formData.treatment) {
      setFormData((prev) => ({
        ...prev,
        treatmentOption: "",
      }));
    }
  }, [formData.treatment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous referral errors
    setReferralError(null);

    // Check if user is logged in - redirect to login if not
    if (!user) {
      const currentUrl = window.location.pathname + window.location.search;
      sessionStorage.setItem("redirectAfterLogin", currentUrl);
      router.push("/login");
      return;
    }

    try {
      // Get selected treatment details
      const selectedOption = selectedTreatmentData?.options.find(
        (opt) => opt.id === formData.treatmentOption
      );

      const appointmentData = {
        ...formData,
        // Enhanced treatment information
        treatmentDetails: {
          treatmentId: formData.treatment,
          treatmentName: selectedTreatmentData?.name || formData.treatment,
          optionId: formData.treatmentOption,
          optionName: selectedOption?.name || null,
          optionPrice: selectedOption?.price || null,
          optionDescription: selectedOption?.description || null,
        },
        clinic: "main", // Default to main clinic since there's only one
        userId: user.uid,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await createAppointment.mutateAsync(appointmentData);

      // Show success message with referral info if applicable
      const successMessage = createAppointment.data?.referralRewardProcessed
        ? `Appointment request submitted successfully! You received a 5% discount (£${createAppointment.data.discountAmount}). We'll contact you soon.`
        : "Appointment request submitted successfully! We'll contact you soon.";

      toast.success(successMessage);
      onOpenChange(false);

      // Reset form
      setFormData({
        treatment: "",
        treatmentOption: "",
        clientType: "new",
        name: "",
        phone: "",
        email: "",
        preferredDate: "", // Reset new field
        additionalInfo: "", // Reset new field
        ageConfirm: false,
        newsletter: false,
        referralCode: "", // Reset referral code
      });
      setReferralError(null);
    } catch (error) {
      console.error("Error submitting appointment:", error);

      // Check if this is a referral code error
      if (
        error.message.includes("referral code") ||
        error.message.includes("referred")
      ) {
        setReferralError(error.message);

        // If there's an original referral code, store it for suggestion
        if (error.response?.data?.originalReferralCode) {
          setOriginalReferralCode(error.response.data.originalReferralCode);
        }

        // Scroll to referral code section
        const referralSection = document.getElementById("referralCode");
        if (referralSection) {
          referralSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } else {
        toast.error(
          error.message || "Failed to submit appointment. Please try again."
        );
      }
    }
  };

  const handleReferralCodeChange = (e) => {
    const value = e.target.value.toUpperCase().trim();
    setFormData({
      ...formData,
      referralCode: value,
    });

    // Clear referral error when user starts typing
    if (referralError) {
      setReferralError(null);
    }
  };

  const clearReferralCode = () => {
    setFormData({ ...formData, referralCode: "" });
    setReferralError(null);
  };

  const useOriginalReferralCode = () => {
    if (originalReferralCode) {
      setFormData({ ...formData, referralCode: originalReferralCode });
      setReferralError(null);
      setOriginalReferralCode(null);
    }
  };

  const selectedTreatmentData = treatmentOptions[formData.treatment];

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date) => {
    if (!formData.preferredDate) return false;
    const selectedDate = new Date(formData.preferredDate);
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateSelect = (date) => {
    const dateString = date.toISOString().split("T")[0];
    setFormData({ ...formData, preferredDate: dateString });
    setShowCalendar(false);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      days.push(date);
    }

    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-[60%] sm:max-w-[600px] overflow-y-auto p-0 bg-gradient-to-br from-white to-gray-50"
      >
        <div className="p-8">
          <SheetHeader className="space-y-0 pb-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Book a Consultation
                </SheetTitle>
                <p className="text-gray-600 text-sm">
                  Schedule your personalized aesthetic consultation
                </p>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Treatment Selection */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="treatment"
                  className="text-sm font-semibold text-gray-700"
                >
                  Select Treatment
                </Label>
                <Select
                  value={formData.treatment}
                  onValueChange={(value) =>
                    setFormData({ ...formData, treatment: value })
                  }
                >
                  <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Choose your desired treatment" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {/* Injectables */}
                    <SelectItem
                      value="header-injectables"
                      disabled
                      className="font-bold text-gray-800 bg-gray-50"
                    >
                      💉 Injectables
                    </SelectItem>
                    <SelectItem value="anti-wrinkle-treatment" className="pl-6">
                      Anti-Wrinkle Treatment
                    </SelectItem>
                    <SelectItem
                      value="non-surgical-rhinoplasty"
                      className="pl-6"
                    >
                      Non Surgical Rhinoplasty
                    </SelectItem>
                    <SelectItem value="8-point-facelift" className="pl-6">
                      8 Point Facelift
                    </SelectItem>
                    <SelectItem
                      value="nctf-skin-revitalisation"
                      className="pl-6"
                    >
                      NCTF Skin Revitalisation
                    </SelectItem>
                    <SelectItem
                      value="harmonyca-dermal-filler"
                      className="pl-6"
                    >
                      HArmonyCa Dermal Filler
                    </SelectItem>
                    <SelectItem value="dermal-fillers" className="pl-6">
                      Dermal Fillers
                    </SelectItem>
                    <SelectItem value="lip-fillers" className="pl-6">
                      Lip Fillers
                    </SelectItem>
                    <SelectItem value="chin-fillers" className="pl-6">
                      Chin Fillers
                    </SelectItem>
                    <SelectItem value="tear-trough-filler" className="pl-6">
                      Tear Trough Filler
                    </SelectItem>
                    <SelectItem value="cheek-fillers" className="pl-6">
                      Cheek Fillers
                    </SelectItem>
                    <SelectItem value="profhilo" className="pl-6">
                      Profhilo
                    </SelectItem>
                    <SelectItem
                      value="fat-dissolving-injections"
                      className="pl-6"
                    >
                      Fat Dissolving Injections
                    </SelectItem>
                    <SelectItem value="hand-rejuvenation" className="pl-6">
                      Hand Rejuvenation
                    </SelectItem>
                    <SelectItem
                      value="polynucleotides-hair-loss-treatment"
                      className="pl-6"
                    >
                      Polynucleotides Hair Loss Treatment
                    </SelectItem>
                    <SelectItem
                      value="polynucleotides-skin-rejuvenation-treatment"
                      className="pl-6"
                    >
                      Polynucleotides Skin Rejuvenation Treatment
                    </SelectItem>
                    <SelectItem value="skin-boosters" className="pl-6">
                      Skin Boosters
                    </SelectItem>
                    <SelectItem value="skinfill-bacio" className="pl-6">
                      Skinfill™ Bacio
                    </SelectItem>

                    {/* Skincare */}
                    <SelectItem
                      value="header-skincare"
                      disabled
                      className="font-bold text-gray-800 bg-gray-50 mt-2"
                    >
                      ✨ Skincare
                    </SelectItem>
                    <SelectItem value="microneedling" className="pl-6">
                      Microneedling
                    </SelectItem>
                    <SelectItem value="skinpen-microneedling" className="pl-6">
                      RF Microneedling
                    </SelectItem>
                    <SelectItem value="co2-laser" className="pl-6">
                      Co2 Laser
                    </SelectItem>
                    <SelectItem
                      value="polynucleotides-skin-rejuvenation-treatment"
                      className="pl-6"
                    >
                      Polynucleotide
                    </SelectItem>
                    <SelectItem value="endolift" className="pl-6">
                      Endolift
                    </SelectItem>
                    <SelectItem value="exo" className="pl-6">
                      EXO–NAD Skin Longevity Peeling
                    </SelectItem>
                    <SelectItem value="prescription-skincare" className="pl-6">
                      Prescription Skincare
                    </SelectItem>

                    {/* Wellness */}
                    <SelectItem
                      value="header-wellness"
                      disabled
                      className="font-bold text-gray-800 bg-gray-50 mt-2"
                    >
                      🌿 Wellness
                    </SelectItem>
                    <SelectItem value="iv-drips" className="pl-6">
                      Exosome Therapy
                    </SelectItem>
                    <SelectItem value="iv-drips" className="pl-6">
                      PRP Therapy
                    </SelectItem>
                    <SelectItem value="v-hacker" className="pl-6">
                      V-Hacker
                    </SelectItem>
                    <SelectItem value="revitalizing" className="pl-6">
                      Hair+ Revitalizing
                    </SelectItem>
                    <SelectItem value="weight-loss" className="pl-6">
                      Weight Loss
                    </SelectItem>

                    {/* Laser Treatments */}
                    <SelectItem
                      value="header-laser"
                      disabled
                      className="font-bold text-gray-800 bg-gray-50 mt-2"
                    >
                      🔥 Laser Treatments
                    </SelectItem>
                    <SelectItem
                      value="quad-laser-hair-removal"
                      className="pl-6"
                    >
                      Quad Laser Hair Removal
                    </SelectItem>
                    <SelectItem value="ablative" className="pl-6">
                      Ablative
                    </SelectItem>

                    {/* Hair Treatments */}
                    <SelectItem
                      value="header-hair"
                      disabled
                      className="font-bold text-gray-800 bg-gray-50 mt-2"
                    >
                      💇 Hair Treatments
                    </SelectItem>
                    <SelectItem value="revitalizing" className="pl-6">
                      Hair+ Revitalizing
                    </SelectItem>
                    <SelectItem value="exosignal" className="pl-6">
                      ExoSignal™ Hair
                    </SelectItem>
                    <SelectItem value="prescription-hair" className="pl-6">
                      Prescription Hair
                    </SelectItem>

                    {/* Packages */}
                    <SelectItem
                      value="header-packages"
                      disabled
                      className="font-bold text-gray-800 bg-gray-50 mt-2"
                    >
                      📦 Packages
                    </SelectItem>
                    <SelectItem value="profusion-hydrafacial" className="pl-6">
                      ProFusion HydraFacial
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Treatment Options - Show when treatment is selected */}
              {selectedTreatmentData && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">
                    {selectedTreatmentData.name} - Select Option
                  </Label>
                  <Select
                    value={formData.treatmentOption}
                    onValueChange={(value) =>
                      setFormData({ ...formData, treatmentOption: value })
                    }
                  >
                    <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors">
                      <SelectValue placeholder="Choose specific treatment option" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {selectedTreatmentData.options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">{option.name}</span>
                              <span className="ml-4 font-semibold text-green-600">
                                {option.price}
                              </span>
                            </div>
                            {option.description && (
                              <span className="text-xs text-gray-500 mt-1">
                                {option.description}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Show selected option details */}
                  {formData.treatmentOption &&
                    selectedTreatmentData.options.find(
                      (opt) => opt.id === formData.treatmentOption
                    ) && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-green-800">
                              Selected Treatment:
                            </h4>
                            <p className="text-sm text-green-700">
                              {
                                selectedTreatmentData.options.find(
                                  (opt) => opt.id === formData.treatmentOption
                                )?.name
                              }
                            </p>
                            {selectedTreatmentData.options.find(
                              (opt) => opt.id === formData.treatmentOption
                            )?.description && (
                              <p className="text-xs text-green-600 mt-2">
                                {
                                  selectedTreatmentData.options.find(
                                    (opt) => opt.id === formData.treatmentOption
                                  )?.description
                                }
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-800">
                              {
                                selectedTreatmentData.options.find(
                                  (opt) => opt.id === formData.treatmentOption
                                )?.price
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Client Status
                </Label>
                <Select
                  value={formData.clientType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, clientType: value })
                  }
                >
                  <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">🆕 I'm a new client</SelectItem>
                    <SelectItem value="returning">
                      🔄 I'm a returning client
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-4">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your first & last name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12 border-gray-200 focus:border-gray-400 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+44 7xxx xxx xxx"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12 border-gray-200 focus:border-gray-400 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 border-gray-200 focus:border-gray-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="preferredDate"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Preferred Appointment Date *
                  </Label>

                  {/* Custom Calendar UI */}
                  <div className="relative">
                    {/* Date Input Display */}
                    <div
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="h-12 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-gray-300 transition-colors flex items-center justify-between bg-white"
                    >
                      <span
                        className={
                          formData.preferredDate
                            ? "text-gray-900"
                            : "text-gray-500"
                        }
                      >
                        {formData.preferredDate
                          ? formatDateForDisplay(formData.preferredDate)
                          : "Select your preferred date"}
                      </span>
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>

                    {/* Custom Calendar Dropdown */}
                    {showCalendar && (
                      <div className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                          <button
                            type="button"
                            onClick={() => navigateMonth(-1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4 text-gray-600" />
                          </button>

                          <h3 className="font-semibold text-gray-800">
                            {monthNames[currentMonth.getMonth()]}{" "}
                            {currentMonth.getFullYear()}
                          </h3>

                          <button
                            type="button"
                            onClick={() => navigateMonth(1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <ChevronRight className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Day Names */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {dayNames.map((day) => (
                            <div
                              key={day}
                              className="text-center text-xs font-medium text-gray-500 py-2"
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-1">
                          {generateCalendarDays().map((date, index) => {
                            if (!date) {
                              return <div key={index} className="h-10"></div>;
                            }

                            const isDisabled = isDateDisabled(date);
                            const isSelected = isDateSelected(date);
                            const isToday =
                              date.toDateString() === new Date().toDateString();

                            return (
                              <button
                                key={index}
                                type="button"
                                onClick={() =>
                                  !isDisabled && handleDateSelect(date)
                                }
                                disabled={isDisabled}
                                className={`
                                  h-10 w-full text-sm rounded-lg transition-all duration-200 font-medium
                                  ${
                                    isSelected
                                      ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg transform scale-105"
                                      : isToday
                                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                                      : isDisabled
                                      ? "text-gray-300 cursor-not-allowed"
                                      : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                                  }
                                  ${
                                    !isDisabled && !isSelected
                                      ? "hover:shadow-md"
                                      : ""
                                  }
                                `}
                              >
                                {date.getDate()}
                              </button>
                            );
                          })}
                        </div>

                        {/* Calendar Footer */}
                        <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            💡 Select your preferred consultation date
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowCalendar(false)}
                            className="text-xs text-gray-600 hover:text-gray-800 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Hidden native date input for form validation */}
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredDate: e.target.value,
                        })
                      }
                      min={getMinDate()}
                      required
                      className="sr-only"
                      tabIndex={-1}
                    />
                  </div>

                  {/* Selected Date Display */}
                  {formData.preferredDate && (
                    <div className="text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-blue-800">
                            📅 Selected Date:
                          </span>
                          <div className="text-blue-700 font-semibold mt-1">
                            {formatDateForDisplay(formData.preferredDate)}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, preferredDate: "" });
                            setShowCalendar(false);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          Change Date
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    📅 Please select your preferred date for the consultation.
                    We'll contact you to confirm the exact time.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="additionalInfo"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Additional Information (Optional)
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Please share any additional information, specific concerns, questions, or preferences you'd like us to know about..."
                    value={formData.additionalInfo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additionalInfo: e.target.value,
                      })
                    }
                    className="min-h-[100px] border-gray-200 focus:border-gray-400 transition-colors resize-vertical"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      💬 Feel free to mention any specific areas of concern,
                      medical history, or questions
                    </p>
                    <span className="text-xs text-gray-400">
                      {formData.additionalInfo.length}/500
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="referralCode"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Referral Code (Optional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="referralCode"
                      placeholder="Enter referral code if you have one"
                      value={formData.referralCode}
                      onChange={handleReferralCodeChange}
                      className={`h-12 pr-10 border-gray-200 focus:border-gray-400 transition-colors ${
                        referralError
                          ? "border-red-300 focus:border-red-400"
                          : ""
                      }`}
                      maxLength={8}
                    />
                    {formData.referralCode && (
                      <button
                        type="button"
                        onClick={clearReferralCode}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* Referral Error Alert */}
                  {referralError && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">
                        <div className="space-y-2">
                          <p>{referralError}</p>
                          {originalReferralCode && (
                            <div className="flex flex-col gap-2">
                              <p className="text-sm">
                                Your original referral code was:{" "}
                                <strong>{originalReferralCode}</strong>
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={useOriginalReferralCode}
                                className="w-fit"
                              >
                                Use Original Code ({originalReferralCode})
                              </Button>
                            </div>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {!referralError && (
                    <p className="text-xs text-gray-500">
                      Have a friend's referral code? Enter it here to give them
                      credit for referring you!
                      <br />
                      <span className="text-green-600 font-medium">
                        🎁 Valid codes give you 5% discount reward based on your
                        treatment cost
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-400 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm leading-relaxed text-gray-800">
                    <span className="font-semibold">Important Notice:</span> All
                    minor ops consultations are conducted by highly skilled
                    specialist doctors. A £50 consultation fee applies, which is
                    fully refundable if you proceed with the treatment.
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Derma Veritas does not provide treatments to individuals
                    under 18 years of age.
                  </div>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                <Checkbox
                  id="age-confirm"
                  checked={formData.ageConfirm}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, ageConfirm: checked })
                  }
                  className="mt-1"
                  required
                />
                <Label
                  htmlFor="age-confirm"
                  className="text-sm leading-relaxed text-gray-700"
                >
                  I confirm that I am 18+ years old, and the treatment is
                  intended for someone aged 18+.
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, newsletter: checked })
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor="newsletter"
                  className="text-sm leading-relaxed text-gray-700"
                >
                  I would like to receive occasional news & exclusive offers
                  from Derma Veritas.
                </Label>
              </div>
            </div>

            {/* Show referral reward preview if referral code is entered and valid */}
            {formData.referralCode &&
              !referralError &&
              selectedTreatmentData &&
              formData.treatmentOption &&
              ![
                "skin-boosters",
                "prescription-skincare",
                "weight-loss",
                "ablative",
                "prescription-hair",
              ].includes(formData.treatment) && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-600 font-semibold">
                      🎁 Referral Benefits Preview
                    </span>
                  </div>
                  <div className="text-sm text-green-700">
                    {(() => {
                      const selectedOption = selectedTreatmentData.options.find(
                        (opt) => opt.id === formData.treatmentOption
                      );
                      if (
                        selectedOption?.price &&
                        !selectedOption.price.includes("Consultation Required")
                      ) {
                        const priceString = selectedOption.price;
                        const numericPrice = parseFloat(
                          priceString.replace(/[£$,]/g, "")
                        );
                        if (!isNaN(numericPrice)) {
                          const reward =
                            Math.round(numericPrice * 0.05 * 100) / 100;
                          const discount =
                            Math.round(numericPrice * 0.05 * 100) / 100;
                          const finalPrice =
                            Math.round((numericPrice - discount) * 100) / 100;
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Original Treatment Cost:</span>
                                <span>£{numericPrice}</span>
                              </div>
                              <div className="flex justify-between text-blue-600">
                                <span>Your Discount (5%):</span>
                                <span className="font-semibold">
                                  -£{discount}
                                </span>
                              </div>
                              <div className="flex justify-between text-lg font-bold text-green-600 border-t pt-2">
                                <span>Your Final Cost:</span>
                                <span>£{finalPrice}</span>
                              </div>
                              <div className="text-xs text-green-600 mt-2 p-2 bg-green-100 rounded">
                                💡 You save £{discount}
                              </div>
                            </div>
                          );
                        }
                      }
                      return "Benefits will be calculated based on your treatment selection during consultation.";
                    })()}
                  </div>
                </div>
              )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white py-4 h-14 text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={
                  !formData.ageConfirm ||
                  createAppointment.isPending ||
                  referralError
                }
              >
                {createAppointment.isPending
                  ? "SUBMITTING..."
                  : referralError
                  ? "PLEASE FIX REFERRAL CODE ISSUE"
                  : "SUBMIT CONSULTATION REQUEST"}
              </Button>

              {referralError && (
                <p className="text-xs text-red-600 text-center mt-2">
                  Please remove or correct the referral code to continue
                </p>
              )}
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
