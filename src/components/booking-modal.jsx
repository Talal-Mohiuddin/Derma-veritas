"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const {
    data: profileData,
    isLoading: profileLoading,
  } = useCurrentUserProfile(user?.uid);

  const [formData, setFormData] = useState({
    treatment: "",
    treatmentOption: "",
    clientType: "new",
    name: "",
    phone: "",
    email: "",
    callbackTime: "anytime", // Set default to "anytime"
    ageConfirm: false,
    newsletter: false,
  });

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

      toast.success(
        "Appointment request submitted successfully! We'll contact you soon."
      );
      onOpenChange(false);

      // Reset form
      setFormData({
        treatment: "",
        treatmentOption: "",
        clientType: "new",
        name: "",
        phone: "",
        email: "",
        callbackTime: "anytime", // Set default to "anytime" here too
        ageConfirm: false,
        newsletter: false,
      });
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error(
        error.message || "Failed to submit appointment. Please try again."
      );
    }
  };

  const selectedTreatmentData = treatmentOptions[formData.treatment];

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
                    <SelectItem value="8-point-facelift" className="pl-6">
                      8 Point Facelift
                    </SelectItem>
                    <SelectItem value="anti-wrinkle-treatment" className="pl-6">
                      Anti Wrinkle Treatment
                    </SelectItem>
                    <SelectItem value="cheek-fillers" className="pl-6">
                      Cheek Fillers
                    </SelectItem>
                    <SelectItem value="chin-fillers" className="pl-6">
                      Chin Fillers
                    </SelectItem>
                    <SelectItem value="dermal-fillers" className="pl-6">
                      Dermal Fillers
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
                      value="harmonyca-dermal-filler"
                      className="pl-6"
                    >
                      HarmonyCa Dermal Filler
                    </SelectItem>
                    <SelectItem value="lip-fillers" className="pl-6">
                      Lip Fillers
                    </SelectItem>
                    <SelectItem
                      value="nctf-skin-revitalisation"
                      className="pl-6"
                    >
                      NCTF Skin Revitalisation
                    </SelectItem>
                    <SelectItem
                      value="non-surgical-rhinoplasty"
                      className="pl-6"
                    >
                      Non Surgical Rhinoplasty
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
                    <SelectItem value="profhilo" className="pl-6">
                      Profhilo
                    </SelectItem>
                    <SelectItem value="tear-trough-filler" className="pl-6">
                      Tear Trough Filler
                    </SelectItem>

                    {/* Skin Care */}
                    <SelectItem
                      value="header-skin-care"
                      disabled
                      className="font-bold text-gray-800 bg-gray-50 mt-2"
                    >
                      ✨ Skin Care
                    </SelectItem>
                    <SelectItem value="chemical-peel" className="pl-6">
                      Chemical Peel
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
                    <SelectItem value="profusion-hydrafacial" className="pl-6">
                      ProFusion HydraFacial
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

                    {/* Advanced Treatments */}
                    <SelectItem
                      value="header-advanced"
                      disabled
                      className="font-bold text-gray-800 bg-gray-50 mt-2"
                    >
                      🔬 Advanced Treatments
                    </SelectItem>
                    <SelectItem value="v-hacker" className="pl-6">
                      V-Hacker Biohacking
                    </SelectItem>
                    <SelectItem value="exo" className="pl-6">
                      EXO–NAD Skin Longevity Peeling
                    </SelectItem>
                    <SelectItem value="skinfill-bacio" className="pl-6">
                      Skinfill™ Bacio
                    </SelectItem>
                    <SelectItem value="revitalizing" className="pl-6">
                      Hair+ Revitalizing
                    </SelectItem>
                    <SelectItem value="exosignal" className="pl-6">
                      ExoSignal™ Hair
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
                  <Label className="text-sm font-semibold text-gray-700">
                    Best Time for Callback
                  </Label>
                  <Select
                    value={formData.callbackTime}
                    onValueChange={(value) =>
                      setFormData({ ...formData, callbackTime: value })
                    }
                  >
                    <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors">
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">
                        🌅 Morning (9AM - 12PM)
                      </SelectItem>
                      <SelectItem value="afternoon">
                        ☀️ Afternoon (12PM - 5PM)
                      </SelectItem>
                      <SelectItem value="evening">
                        🌆 Evening (5PM - 8PM)
                      </SelectItem>
                      <SelectItem value="anytime">🕐 Anytime</SelectItem>
                    </SelectContent>
                  </Select>
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

            {/* reCAPTCHA Placeholder */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400 text-sm">
                🛡️ reCAPTCHA verification would appear here
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white py-4 h-14 text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                disabled={!formData.ageConfirm || createAppointment.isPending}
              >
                {createAppointment.isPending
                  ? "SUBMITTING..."
                  : "SUBMIT CONSULTATION REQUEST"}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
