"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SellerLoginForm } from "./SellterLoginForm";
import { SellerRegistrationForm } from "./SellerRegistrationForm";

export const SellerAuthTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  return (
    <Tabs
      defaultValue="login"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <SellerLoginForm
          onSuccess={() => {}}
          onRegisterClick={() => setActiveTab("register")}
        />
      </TabsContent>
      <TabsContent value="register">
        <SellerRegistrationForm
          onSuccess={() => setActiveTab("login")}
          onLoginClick={() => setActiveTab("login")}
        />
      </TabsContent>
    </Tabs>
  );
};
