"use client";

import type React from "react";

import { useState } from "react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Mail, MapPin, Phone, User } from "lucide-react";
import { ProfileInfo } from "@/components/settigs/ProfileInfo";
import { UpdateProfile } from "@/components/settigs/UpdateProfile";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer with 5+ years of experience building web applications. Passionate about React, TypeScript, and modern web technologies.",
    company: "Tech Corp",
    role: "Senior Developer",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Updated profile:", formData);
  };

  return (
    <MaxWidthWrapper>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and set email preferences.
          </p>
        </div>

        <div className="flex gap-4">
          {/* Left Column - Profile Info (1 column wide) */}
          <div className="flex-1">
            <ProfileInfo />
          </div>

          {/* Right Column - Update Profile (2 columns wide) */}
          <div className="flex-2">
            <UpdateProfile />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
