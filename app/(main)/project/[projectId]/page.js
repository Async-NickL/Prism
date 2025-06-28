import { getProject } from "@/actions/project";
import ShinyText from "@/components/ui/ShinyText";
import { ArrowRightIcon, ArrowUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import SprintBoard from "../_components/SprintBoard";
import SprintCreationForm from "../_components/CreateSprint";

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const projectId = resolvedParams?.projectId;
  const project = await getProject(projectId);


  if (!project) {
    return (
      <div className="flex flex-col items-center p-10 gap-2">
        <h1 className="text-4xl text-red-500 font-bold">404</h1>
        <ShinyText
          text={`Project named ${project.name} not found !`}
          className="text-3xl text-center"
        />
        <Link href={"/organization"}>
          <h2 className="flex mt-2 gap-2 cursor-pointer text-blue-300 hover:text-blue-500 items-center">
            Try with different organization <ArrowRightIcon size={18} />
          </h2>
        </Link>
      </div>
    )
  } else {
    return (
      <div className="min-h-[calc(100vh-5.5rem)] pb-10 w-full flex flex-col gap-4">
        <SprintCreationForm
          projectTitle={project.name}
          projectId={projectId}
          projectKey={project.key}
          sprintKey={project.sprints?.length + 1}
        />

        {project.sprints.length > 0 ? (
          <SprintBoard
            sprints={project.sprints}
            projectId={projectId}
            orgId={project.organizationId}
          />
        ) : (
          <div className="h-full w-full flex justify-center items-center gap-2"><ShinyText text={"No Sprints found, Create one by button above"} /> <ArrowUp size={18} /></div>
        )}
      </div>
    )
  }

};

export default Page;
