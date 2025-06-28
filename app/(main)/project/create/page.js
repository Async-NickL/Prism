"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { projectSchema } from "@/lib/validators";
import { createProject } from "@/actions/project";
import ShinyText from "@/components/ui/ShinyText";
import { Label } from "@/components/ui/label";
import { BackgroundBeams } from "@/components/ui/Background";
import Link from "next/link";
import { toast } from "sonner";


export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {
    loading,
    error,
    data: project,
    fn: createProjectFn,
  } = useFetch(createProject);

  const onSubmit = async (data) => {
    if (!isAdmin) {
      toast.error("Only organization admins can create projects");
      return;
    }
    createProjectFn(data);
  };

  useEffect(() => {
    if (project) {
      toast.success("Project created successfully!");
      router.push(`/project/${project.id}`);
    }
  }, [project]);

  if (!isOrgLoaded || !isUserLoaded) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <ShinyText text={"Oops! Only Admins can create projects."} className="text-4xl text-center" />
        <Link href={"/organization"} className="text-center mt-2 text-blue-500">Switch to admin account to create project.</Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-[70vh] w-full bg-background">
        <BackgroundBeams />
        <div className="w-full z-2 max-w-xl rounded-2xl max-sm:rounded-none shadow-lg border border-border bg-card p-4 sm:p-8 md:p-12">
          <div className="mb-6 sm:mb-8 text-center">
            <ShinyText text={"Create New Project"} className="text-4xl font-bold sm:text-5xl mb-2" />
            <p className="text-muted-foreground text-base">Start a new project for your organization</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 sm:gap-4 md:gap-6"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">Project Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Project Name"
                className="bg-input border border-border focus-visible:ring-primary"
              />
              {errors.name && (
                <span className="text-destructive text-xs mt-1">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="key" className="text-sm font-medium text-foreground">Project Key</Label>
              <Input
                id="key"
                {...register("key")}
                placeholder="Project Key"
                className="bg-input border border-border focus-visible:ring-primary"
              />
              {errors.key && (
                <span className="text-destructive text-xs mt-1">{errors.key.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">Project Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Project Description"
                className="bg-input border border-border focus-visible:ring-primary h-28"
              />
              {errors.description && (
                <span className="text-destructive text-xs mt-1">{errors.description.message}</span>
              )}
            </div>
            {loading && (
              <div className="w-full flex justify-center mb-4">
                <div className="bar-loader w-1/2">
                  <div className="bar-loader-inner" style={{ left: 0, width: '30%' }} />
                </div>
              </div>
            )}
            <Button
              type="submit"
              size="lg"
              variant="default"
              disabled={loading}
              className="w-full mt-2"
            >
              {loading ? "Creating..." : "Create Project"}
            </Button>
            {error && <span className="text-destructive mt-2 text-center">{error.message}</span>}
          </form>
        </div>
      </div>
    </>
  );
}