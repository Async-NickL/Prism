'use client'
import { useOrganization, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";
import { Pyramid } from "lucide-react";

const UserMenu = () => {
  const { theme } = useTheme();
  const { organization } = useOrganization();
  if (!organization) return <></>;


  return (
    <div className="h-full mb-4 flex flex-col items-center gap-2">
      <UserButton
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="My Organization"
            labelIcon={<Pyramid size={18} />}
            href={`/organization/${organization?.slug}`}
          />
          <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};

export default UserMenu;
