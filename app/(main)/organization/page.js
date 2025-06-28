"use client";
import { BackgroundBeams } from "@/components/ui/Background";
import ShinyText from "@/components/ui/ShinyText";
import { OrganizationList, useOrganizationList } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

const Page = () => {
  const { theme } = useTheme();
  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
    userInvitations: {
      infinite: true,
    },
  });

  const hasOrganizations =
    isLoaded &&
    userMemberships &&
    userMemberships.data &&
    userMemberships.data.length > 0;

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <BackgroundBeams/>
      <ShinyText
        text={
          hasOrganizations ? "Your Organizations" : "Create an Organization"
        }
        className="text-center text-2xl font-bold"
      />
      <OrganizationList
        afterCreateOrganizationUrl={"/organization/:slug"}
        afterSelectOrganizationUrl={"/organization/:slug"}
        hidePersonal
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      />
    </div>
  );
};

export default Page;
