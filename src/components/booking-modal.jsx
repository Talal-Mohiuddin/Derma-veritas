"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function BookingModal({ open, onOpenChange, children, selectedTreatment = "" }) {
  const [formData, setFormData] = useState({
    treatment: "",
    clientType: "new",
    name: "",
    phone: "",
    email: "",
    clinic: "",
    callbackTime: "",
    ageConfirm: false,
    newsletter: false,
  })

  // Auto-select treatment when modal opens or selectedTreatment changes
  useEffect(() => {
    if (selectedTreatment && open) {
      setFormData(prev => ({
        ...prev,
        treatment: selectedTreatment
      }))
    }
  }, [selectedTreatment, open])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
    onOpenChange(false)
  }

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
                <SheetTitle className="text-3xl font-bold text-gray-900 mb-2">Book a Consultation</SheetTitle>
                <p className="text-gray-600 text-sm">Schedule your personalized aesthetic consultation</p>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Treatment Selection */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="treatment" className="text-sm font-semibold text-gray-700">
                  Select Treatment
                </Label>
                <Select
                  value={formData.treatment}
                  onValueChange={(value) => setFormData({ ...formData, treatment: value })}
                >
                  <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Choose your desired treatment" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {/* Injectables */}
                    <SelectItem value="header-injectables" disabled className="font-bold text-gray-800 bg-gray-50">
                      💉 Injectables
                    </SelectItem>
                    <SelectItem value="8-point-facelift" className="pl-6">8 Point Facelift</SelectItem>
                    <SelectItem value="anti-wrinkle-treatment" className="pl-6">Anti Wrinkle Treatment</SelectItem>
                    <SelectItem value="cheek-fillers" className="pl-6">Cheek Fillers</SelectItem>
                    <SelectItem value="chin-fillers" className="pl-6">Chin Fillers</SelectItem>
                    <SelectItem value="dermal-fillers" className="pl-6">Dermal Fillers</SelectItem>
                    <SelectItem value="fat-dissolving-injections" className="pl-6">Fat Dissolving Injections</SelectItem>
                    <SelectItem value="hand-rejuvenation" className="pl-6">Hand Rejuvenation</SelectItem>
                    <SelectItem value="harmonyca-dermal-filler" className="pl-6">HarmonyCa Dermal Filler</SelectItem>
                    <SelectItem value="lip-fillers" className="pl-6">Lip Fillers</SelectItem>
                    <SelectItem value="nctf-skin-revitalisation" className="pl-6">NCTF Skin Revitalisation</SelectItem>
                    <SelectItem value="non-surgical-rhinoplasty" className="pl-6">Non Surgical Rhinoplasty</SelectItem>
                    <SelectItem value="polynucleotides-hair-loss-treatment" className="pl-6">
                      Polynucleotides Hair Loss Treatment
                    </SelectItem>
                    <SelectItem value="polynucleotides-skin-rejuvenation-treatment" className="pl-6">
                      Polynucleotides Skin Rejuvenation Treatment
                    </SelectItem>
                    <SelectItem value="profhilo" className="pl-6">Profhilo</SelectItem>
                    <SelectItem value="tear-trough-filler" className="pl-6">Tear Trough Filler</SelectItem>

                    {/* Minor Ops */}
                    <SelectItem value="header-minor-ops" disabled className="font-bold text-gray-800 bg-gray-50 mt-2">
                      🩺 Minor Ops
                    </SelectItem>
                    <SelectItem value="cyst-removal" className="pl-6">Cyst Removal</SelectItem>
                    <SelectItem value="minor-surgical-procedures" className="pl-6">Minor Surgical Procedures</SelectItem>
                    <SelectItem value="mole-removal" className="pl-6">Mole Removal</SelectItem>
                    <SelectItem value="skin-tag-removal" className="pl-6">Skin Tag Removal</SelectItem>
                    <SelectItem value="wart-removal" className="pl-6">Wart Removal</SelectItem>

                    {/* Skin Care */}
                    <SelectItem value="header-skin-care" disabled className="font-bold text-gray-800 bg-gray-50 mt-2">
                      ✨ Skin Care
                    </SelectItem>
                    <SelectItem value="acufirm-facelift" className="pl-6">Acufirm Facelift</SelectItem>
                    <SelectItem value="chemical-peel" className="pl-6">Chemical Peel</SelectItem>
                    <SelectItem value="dermalux-led-light-therapy" className="pl-6">Dermalux LED Light Therapy</SelectItem>
                    <SelectItem value="medical-hydrafacial" className="pl-6">Medical Hydrafacial</SelectItem>
                    <SelectItem value="milia-removal" className="pl-6">Milia Removal</SelectItem>
                    <SelectItem value="nctf-skin-revitalisation-skincare" className="pl-6">NCTF Skin Revitalisation</SelectItem>
                    <SelectItem value="obagi-blue-radiance-peel" className="pl-6">Obagi Blue Radiance Peel</SelectItem>
                    <SelectItem value="prx-therapy" className="pl-6">PRX Therapy</SelectItem>
                    <SelectItem value="skin-assessment" className="pl-6">Skin Assessment</SelectItem>
                    <SelectItem value="skin-sculptor-facial" className="pl-6">Skin Sculptor Facial</SelectItem>
                    <SelectItem value="skinpen-microneedling" className="pl-6">SkinPen Microneedling</SelectItem>
                    <SelectItem value="zo-skin-health-facial" className="pl-6">ZO Skin Health Facial</SelectItem>

                    {/* Wellness */}
                    <SelectItem value="header-wellness" disabled className="font-bold text-gray-800 bg-gray-50 mt-2">
                      🌿 Wellness
                    </SelectItem>
                    <SelectItem value="blood-tests" className="pl-6">Blood Tests</SelectItem>
                    <SelectItem value="iv-drips" className="pl-6">IV Drips</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Client Status</Label>
                <Select
                  value={formData.clientType}
                  onValueChange={(value) => setFormData({ ...formData, clientType: value })}
                >
                  <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">🆕 I'm a new client</SelectItem>
                    <SelectItem value="returning">🔄 I'm a returning client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your first & last name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 border-gray-200 focus:border-gray-400 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+44 7xxx xxx xxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 border-gray-200 focus:border-gray-400 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 border-gray-200 focus:border-gray-400 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Preferences */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-4">Appointment Preferences</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Preferred Clinic</Label>
                  <Select value={formData.clinic} onValueChange={(value) => setFormData({ ...formData, clinic: value })}>
                    <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors">
                      <SelectValue placeholder="Select a clinic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="london">📍 London Clinic</SelectItem>
                      <SelectItem value="manchester">📍 Manchester Clinic</SelectItem>
                      <SelectItem value="birmingham">📍 Birmingham Clinic</SelectItem>
                      <SelectItem value="leeds">📍 Leeds Clinic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Best Time for Callback</Label>
                  <Select
                    value={formData.callbackTime}
                    onValueChange={(value) => setFormData({ ...formData, callbackTime: value })}
                  >
                    <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors">
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">🌅 Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">☀️ Afternoon (12PM - 5PM)</SelectItem>
                      <SelectItem value="evening">🌆 Evening (5PM - 8PM)</SelectItem>
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
                    <span className="font-semibold">Important Notice:</span> All minor ops consultations are conducted by highly 
                    skilled specialist doctors. A £50 consultation fee applies, which is fully refundable if you proceed with the treatment.
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    AL Aesthetics does not provide treatments to individuals under 18 years of age.
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
                  onCheckedChange={(checked) => setFormData({ ...formData, ageConfirm: checked })}
                  className="mt-1"
                  required
                />
                <Label htmlFor="age-confirm" className="text-sm leading-relaxed text-gray-700">
                  I confirm that I am 18+ years old, and the treatment is intended for someone aged 18+.
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked })}
                  className="mt-1"
                />
                <Label htmlFor="newsletter" className="text-sm leading-relaxed text-gray-700">
                  I would like to receive occasional news & exclusive offers from AL Aesthetics.
                </Label>
              </div>
            </div>

            {/* reCAPTCHA Placeholder */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400 text-sm">🛡️ reCAPTCHA verification would appear here</div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white py-4 h-14 text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                disabled={!formData.ageConfirm}
              >
                SUBMIT CONSULTATION REQUEST
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
