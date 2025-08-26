"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function BotoxSection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-[#f4f4f4]">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="how-it-works" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-transparent border-b border-gray-200 rounded-none h-auto p-0">
            <TabsTrigger
              value="how-it-works"
              className="border-b-[1px] border-transparent 
                     data-[state=active]:border-gray-900 
                     data-[state=active]:bg-transparent bg-transparent text-gray-600 
                     data-[state=active]:text-gray-900 rounded-none py-4 px-6 font-medium 
                     hover:bg-transparent hover:text-gray-900 hover:border-transparent"
            >
              What is Botox and how does it work?
            </TabsTrigger>
            <TabsTrigger
              value="what-helps"
              className="border-b-[1px] border-transparent 
                     data-[state=active]:border-gray-900 
                     data-[state=active]:bg-transparent bg-transparent text-gray-600 
                     data-[state=active]:text-gray-900 rounded-none py-4 px-6 font-medium 
                     hover:bg-transparent hover:text-gray-900 hover:border-transparent"
            >
              What can Botox help with?
            </TabsTrigger>
          </TabsList>

          {/* === First Tab === */}
          <TabsContent value="how-it-works" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              {/* Video Section */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-[4/3]">
                  <img
                    src="/images/professional-aesthetic-consultation-modern-clinic-.png"
                    alt="Professional aesthetic consultation in a modern clinic"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full shadow-lg"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      SEE HOW IT WORKS
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                <div>
                  <span className="text-sm text-gray-600 font-medium">Botox Treatment</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                    What is Botox and how does it work?
                  </h3>
                </div>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Anti-wrinkle treatment (Botox®) works by weakening the muscles to{" "}
                    <span className="font-semibold text-gray-900">reduce lines and wrinkles</span> on the forehead,
                    frown lines and the face. In small doses, these injections are a very effective anti-ageing
                    treatment.
                  </p>
                  <p>
                    We use anti-wrinkle injections to <span className="font-semibold text-gray-900">rejuvenate</span>{" "}
                    the skin and combat wrinkles, which strengthens the skin and smooths away lines and folds.
                  </p>
                </div>

                <div className="pt-4">
                  <Button className="text-sm text-gray-600 hover:text-gray-900 p-0 h-auto font-normal underline bg-transparent hover:bg-transparent">
                    Read more
                  </Button>
                </div>

                <div className="pt-6">
                  <div className="pt-6">
                    <button className="relative px-6 py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide">
                      BOOK A CONSULTATION
                      <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* === Second Tab === */}
          <TabsContent value="what-helps" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              {/* Video Section */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-[4/3]">
                  <img
                    src="/images/professional-aesthetic-consultation-modern-clinic-.png"
                    alt="Dr. Ash Labib explaining Botox treatments"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-lg">
                    <div className="text-xs text-gray-600 font-medium">Dr. Ash Labib</div>
                    <div className="text-xs text-gray-500">Owner & Founder</div>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-full shadow-lg text-xs"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      WATCH HOW IT WORKS
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                <div>
                  <span className="text-sm text-gray-600 font-medium">Botox Injectables</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                    What can Botox help with?
                  </h3>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-2">
                  {[
                    "Frown Lines",
                    "Forehead Lines",
                    "Crows Feet",
                    "Smokers Lines",
                    "Marionette Lines",
                    "Bunny Lines",
                    "Drooped Brows",
                    "Neck Band",
                  ].map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                      <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline py-4">
                        {item}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        Treatment information for {item.toLowerCase()} will be displayed here.
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="pt-6">
                  <button className="relative px-6 py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide">
                    WATCH AL AESTHETICS EXPLAIN PLATYSMA BAND TREATMENT
                    <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
