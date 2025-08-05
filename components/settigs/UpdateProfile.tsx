"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { trpc } from "@/server/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileFormData, updateProfileSchema } from "@/lib/zodSchemas";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export const UpdateProfile = () => {
  const utils = trpc.useUtils();
  const { data: userData, isLoading: isUserLoading } =
    trpc.userRouter.getUser.useQuery();

  const { mutate: updateUser, isPending } =
    trpc.userRouter.updateUser.useMutation({
      onSuccess: () => {
        toast.success("Profile updated successfully");
        utils.userRouter.getUser.invalidate(); // Refresh the cache
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  // Reset form values once user data is fetched
  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData.name ?? "",
        email: userData.email ?? "",
        phone: userData.phone ?? "",
        location: userData.location ?? "",
        bio: userData.bio ?? "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (data: UpdateProfileFormData) => {
    updateUser(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>
          Make changes to your profile information here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder={userData?.name ?? "Enter your full name"}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={userData?.email ?? "your@gmail.com"}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder={userData?.phone ?? "eg. 9828047184"}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder={userData?.location ?? "eg. Lalitpur, Kathmandu"}
              {...register("location")}
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder={userData?.bio ?? "Tell us about yourself"}
              rows={4}
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <Separator />

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || isUserLoading}>
              {isPending ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
