import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

import { ProfileInfo } from "@/components/settigs/ProfileInfo";
import { UpdateProfile } from "@/components/settigs/UpdateProfile";

export default function ProfilePage() {
  return (
    <MaxWidthWrapper>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and set email preferences.
          </p>
        </div>

        {/* Responsive Flex Container */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column - Profile Info */}
          <div className="w-full md:w-1/2">
            <ProfileInfo />
          </div>

          {/* Right Column - Update Profile */}
          <div className="w-full md:w-2/3">
            <UpdateProfile />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
