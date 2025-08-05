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
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and set email preferences.
          </p>
        </div>

        <div className="flex gap-4">
          {/* Left Column - User Info Display */}
          <div className="space-y-6 flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Your current profile details and information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src="/placeholder.svg?height=80&width=80"
                      alt="Profile picture"
                    />
                    <AvatarFallback className="text-lg">
                      {formData.firstName[0]}
                      {formData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {formData.firstName} {formData.lastName}
                    </h3>
                    <p className="text-muted-foreground">{formData.role}</p>
                    <Badge variant="secondary" className="mt-1">
                      {formData.company}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formData.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Joined March 2023</span>
                  </div>
                </div>

                {/* <div>
                  <h4 className="text-sm font-medium mb-2">About</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {formData.bio}
                  </p>
                </div> */}
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Account Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Verified</span>
                    <Badge variant="default">Verified</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Two-Factor Auth</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Account Type</span>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Right Column - Update Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Update Profile</CardTitle>
                <CardDescription>
                  Make changes to your profile information here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your location"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Enter your company"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="Enter your role"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
