"use client";
import { NotebookPen } from 'lucide-react'
import React from 'react'
import { useUser, useOrganization } from "@clerk/nextjs";
import Link from 'next/link';

const CreateProject = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { organization } = useOrganization();

  if (!isLoaded || !isSignedIn || !user || !organization) return <></>;

  return (
    <Link href={"/project/create"}>
        <div
            className="bg-card px-3 py-2 border-2 dark:border-foreground/20 border-foreground/50 rounded-md"
            title="Create Project"
        >
            <NotebookPen size={16} />
        </div>
    </Link>
  );
}

export default CreateProject
