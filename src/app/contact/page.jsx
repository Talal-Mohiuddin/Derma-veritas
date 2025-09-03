"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    newsletter: false,
    ageConfirm: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-muted-foreground/30 flex-1 max-w-20"></div>
            <span className="text-sm text-muted-foreground font-medium">
              Contact Derma Veritas
            </span>
            <div className="h-px bg-muted-foreground/30 flex-1 max-w-20"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            See below for how to contact Derma Veritas to start your journey in
            enhancing your natural beauty.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-muted-foreground/30 flex-1 max-w-12"></div>
                <span className="text-sm text-muted-foreground font-medium">
                  Contact Us
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance">
                Get in touch with our team today
              </h2>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 font-medium rounded-lg"
              >
                BOOK A CONSULTATION
              </Button>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Your Name*
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your first & last name?"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address*
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone No*
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Please provide your mobile..."
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={6}
                  className="w-full resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) =>
                      handleInputChange("newsletter", checked)
                    }
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    I would like to occasionally receive news & offers from AL
                    Aesthetics.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                SEND MESSAGE
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
