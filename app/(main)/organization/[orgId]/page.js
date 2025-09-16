import { getOrganization } from "@/actions/organization";
import ShinyText from "@/components/ui/ShinyText";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProjectList from "../_components/ProjectList";
import SetActiveOrg from "../_components/SetActiveOrg";

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const orgId = resolvedParams?.orgId;
  const org = await getOrganization(orgId);
  if (!org) {
    return (
      <div className="flex flex-col items-center p-10 gap-2">
        {/* Ensure URL-based active org switching attempt */}
        <SetActiveOrg orgId={orgId} />
        <h1 className="text-4xl text-red-500 font-bold">404</h1>
        <ShinyText
          text={`Organization ${orgId ? `(${orgId}) ` : ''}not found!`}
          className="text-3xl text-center"
        />
        <Link href={"/organization"}>
          <h2 className="flex mt-2 gap-2 cursor-pointer text-blue-300 hover:text-blue-500 items-center">
            Select your organization <ArrowRightIcon size={18} />
          </h2>
        </Link>
      </div>
    );
  } else {
    return (
    <div className="flex flex-col min-h-[calc(100vh-5.5rem)] items-center h-full w-full p-5">
      {/* Switch active organization to the current URL when valid */}
      <SetActiveOrg orgId={orgId} />
      <ShinyText text={`${org.name}'s Projects`} className="text-6xl max-sm:text-3xl mt-5 uppercase text-center font-bold" />
      <ProjectList org={org} />
    </div>)
  }
};

export default Page;
