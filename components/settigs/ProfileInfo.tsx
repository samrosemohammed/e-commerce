"use client";
import {
  CalendarDays,
  Lock,
  Mail,
  MapPin,
  Phone,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { trpc } from "@/server/client";
import { format } from "date-fns";
import { capitalizeWords } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { Loading } from "../Loading";

export const ProfileInfo = () => {
  const { data: userData, isLoading } = trpc.userRouter.getUser.useQuery();

  const displayName = userData?.name || "---";
  const initials = userData?.name
    ? userData?.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "-";

  const role = userData?.role
    ? capitalizeWords(userData?.role)
    : "Not specified";
  const email = userData?.email || "No email provided";
  const location = userData?.location || "---"; // Static or get from userData? if available
  const phone = userData?.phone || "---"; // Placeholder unless dynamic
  const joined = userData?.createdAt
    ? format(new Date(userData?.createdAt), "MMMM yyyy")
    : "---";
  const badge = userData?.role === "user" ? "Buyer" : "Seller";
  if (isLoading) return <Loading className="h-[50vh] border rounded-lg" />;

  return (
    <div className="space-y-4">
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
                src={userData?.image || "/placeholder.svg?height=80&width=80"}
                alt="Profile picture"
              />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-semibold">{displayName}</h3>
              <p className="text-muted-foreground">{role}</p>
              <Badge variant="secondary" className="mt-1">
                {badge}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Joined {joined}</span>
            </div>
          </div>
        </CardContent>
      </Card>{" "}
      {/* Security Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your account security and password settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <div className="leading-tight">
                <p className="text-sm font-medium">Password</p>
                <p className="text-xs text-muted-foreground">
                  Last updated: Never
                </p>
              </div>
            </div>
            <ChangePasswordDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
