"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function BookingModal({ children }) {
  const [open, setOpen] = useState(false)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-[70%] sm:max-w-[80%] overflow-y-auto p-0"
      >
        <div className="p-6">
          <SheetHeader className="space-y-0 pb-8">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-semibold">Book a Consultation</SheetTitle>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Treatment Selection */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="treatment" className="text-sm font-medium">
                  Select Treatment:
                </Label>
                <Select
                  value={formData.treatment}
                  onValueChange={(value) => setFormData({ ...formData, treatment: value })}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Non Surgical Nose Job" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Injectables */}
                    <SelectItem value="header-injectables" disabled className="font-bold text-black">
                      Injectables
                    </SelectItem>
                    <SelectItem value="8-point-facelift">8 Point Facelift</SelectItem>
                    <SelectItem value="anti-wrinkle-treatment">Anti Wrinkle Treatment</SelectItem>
                    <SelectItem value="cheek-fillers">Cheek Fillers</SelectItem>
                    <SelectItem value="chin-fillers">Chin Fillers</SelectItem>
                    <SelectItem value="dermal-fillers">Dermal Fillers</SelectItem>
                    <SelectItem value="fat-dissolving-injections">Fat Dissolving Injections</SelectItem>
                    <SelectItem value="hand-rejuvenation">Hand Rejuvenation</SelectItem>
                    <SelectItem value="harmonyca-dermal-filler">HarmonyCa Dermal Filler</SelectItem>
                    <SelectItem value="lip-fillers">Lip Fillers</SelectItem>
                    <SelectItem value="nctf-skin-revitalisation">NCTF Skin Revitalisation</SelectItem>
                    <SelectItem value="non-surgical-rhinoplasty">Non Surgical Rhinoplasty</SelectItem>
                    <SelectItem value="polynucleotides-hair-loss-treatment">
                      Polynucleotides Hair Loss Treatment
                    </SelectItem>
                    <SelectItem value="polynucleotides-skin-rejuvenation-treatment">
                      Polynucleotides Skin Rejuvenation Treatment
                    </SelectItem>
                    <SelectItem value="profhilo">Profhilo</SelectItem>
                    <SelectItem value="tear-trough-filler">Tear Trough Filler</SelectItem>

                    {/* Minor Ops */}
                    <SelectItem value="header-minor-ops" disabled className="font-bold text-black mt-4">
                      Minor Ops
                    </SelectItem>
                    <SelectItem value="cyst-removal">Cyst Removal</SelectItem>
                    <SelectItem value="minor-surgical-procedures">Minor Surgical Procedures</SelectItem>
                    <SelectItem value="mole-removal">Mole Removal</SelectItem>
                    <SelectItem value="skin-tag-removal">Skin Tag Removal</SelectItem>
                    <SelectItem value="wart-removal">Wart Removal</SelectItem>

                    {/* Skin Care */}
                    <SelectItem value="header-skin-care" disabled className="font-bold text-black mt-4">
                      Skin Care
                    </SelectItem>
                    <SelectItem value="acufirm-facelift">Acufirm Facelift</SelectItem>
                    <SelectItem value="chemical-peel">Chemical Peel</SelectItem>
                    <SelectItem value="dermalux-led-light-therapy">Dermalux LED Light Therapy</SelectItem>
                    <SelectItem value="medical-hydrafacial">Medical Hydrafacial</SelectItem>
                    <SelectItem value="milia-removal">Milia Removal</SelectItem>
                    <SelectItem value="nctf-skin-revitalisation-skincare">NCTF Skin Revitalisation</SelectItem>
                    <SelectItem value="obagi-blue-radiance-peel">Obagi Blue Radiance Peel</SelectItem>
                    <SelectItem value="prx-therapy">PRX Therapy</SelectItem>
                    <SelectItem value="skin-assessment">Skin Assessment</SelectItem>
                    <SelectItem value="skin-sculptor-facial">Skin Sculptor Facial</SelectItem>
                    <SelectItem value="skinpen-microneedling">SkinPen Microneedling</SelectItem>
                    <SelectItem value="zo-skin-health-facial">ZO Skin Health Facial</SelectItem>

                    {/* Wellness */}
                    <SelectItem value="header-wellness" disabled className="font-bold text-black mt-4">
                      Wellness
                    </SelectItem>
                    <SelectItem value="blood-tests">Blood Tests</SelectItem>
                    <SelectItem value="iv-drips">IV Drips</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Are you a returning client?</Label>
                <Select
                  value={formData.clientType}
                  onValueChange={(value) => setFormData({ ...formData, clientType: value })}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">I'm a new client</SelectItem>
                    <SelectItem value="returning">I'm a returning client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-medium">
                  Your Name*
                </Label>
                <Input
                  id="name"
                  placeholder="Your first & last name?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone No*
                </Label>
                <Input
                  id="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-11"
                  required
                />
              </div>
            </div>

            {/* Email and Clinic */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address*
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Preferred Clinic:</Label>
                <Select value={formData.clinic} onValueChange={(value) => setFormData({ ...formData, clinic: value })}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="--select a clinic--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="london">London Clinic</SelectItem>
                    <SelectItem value="manchester">Manchester Clinic</SelectItem>
                    <SelectItem value="birmingham">Birmingham Clinic</SelectItem>
                    <SelectItem value="leeds">Leeds Clinic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Callback Time */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">When is the best time for a callback?</Label>
              <Select
                value={formData.callbackTime}
                onValueChange={(value) => setFormData({ ...formData, callbackTime: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="--select a time--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                  <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                  <SelectItem value="anytime">Anytime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Important Notice */}
            <div className="bg-muted p-5 rounded-lg space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="text-sm leading-relaxed">
                  <span className="font-medium">Please note:</span> All minor ops consultations are done by a highly
                  skilled specialist doctor; a fee of £50 is payable for your consultation - refundable if you wish to
                  proceed with the procedure.
                </div>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                AL Aesthetics does not offer treatments to individuals under 18 years of age.
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="age-confirm"
                  checked={formData.ageConfirm}
                  onCheckedChange={(checked) => setFormData({ ...formData, ageConfirm: checked })}
                  className="mt-0.5"
                  required
                />
                <Label htmlFor="age-confirm" className="text-sm leading-relaxed">
                  I confirm that I am 18+ years old, and the treatment is intended for someone aged 18+.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked })}
                  className="mt-0.5"
                />
                <Label htmlFor="newsletter" className="text-sm leading-relaxed">
                  I would like to occasionally receive news & offers from AL Aesthetics.
                </Label>
              </div>
            </div>

            {/* reCAPTCHA Placeholder */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500">
              reCAPTCHA verification would appear here
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 h-12 text-base font-medium"
                disabled={!formData.ageConfirm}
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
