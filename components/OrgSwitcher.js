"use client";
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

const OrgSwitcher = () => {
  const { theme } = useTheme();
  const { organization } = useOrganization();
  if (!organization) return <></>;

  return (
    <OrganizationSwitcher
      hidePersonal
      afterCreateOrganizationUrl={"/organization/:slug"}
      afterSelectOrganizationUrl={"/organization/:slug"}
      createOrganizationUrl="/organization"
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          organizationSwitcherTrigger: {
            padding: "0",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            minHeight: "40px",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:focus": {
              backgroundColor: "transparent",
              boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
            },
          },
          organizationSwitcherTriggerIcon: {
            display: "none",
          },
          avatarBox: {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          },
          avatarImage: {
            borderRadius: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        },
      }}
    />
  );
};

export default OrgSwitcher;
