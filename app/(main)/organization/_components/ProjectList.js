import { getProjects } from '@/actions/project'
import ShinyText from '@/components/ui/ShinyText';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DeleteProject from './DeleteProject';
import { toast } from "sonner";

const ProjectList = async ({ org }) => {
    const projects = await getProjects(org.id);

    if (projects.length === 0) {
        return (
            <div className='flex flex-col bg-card gap-2 justify-center items-center mt-16 border-2 border-dotted p-10 rounded-3xl'>
                <ShinyText text={`There are no projects.`} className='text-6xl max-sm:text-3xl font-medium text-center' />
                <Link href={"/project/create"} className='flex items-center mt-5 gap-2 hover:text-blue-600 text-blue-500 justify-center'>Create a new project here <ArrowRight size={18} /></Link>
            </div>
        )
    }

    return (
        <div className='mt-5 w-full p-2 sm:p-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 p-7 max-sm:p-3 border-2 border-foreground/30 rounded-xl border-dotted'>
                {projects.map((project) => (
                    <Card key={project.id} className='flex !py-0 flex-col justify-between min-h-[260px] border-2 border-border bg-card transition hover:border-primary/40 duration-200'>
                        <div className='flex flex-col justify-center p-6'>
                            <h3 className='text-3xl max-sm:text-xl max-md:text-2xl font-bold mb-2 text-primary'>{project.name}</h3>
                            <p className='text-muted-foreground mb-4 mt-0'>{project.description}</p>
                            <div className='flex mt-2 flex-col flex-wrap gap-4 text-xs text-muted-foreground'>
                                <span>Key: <span className='font-semibold'>{project.key}</span></span>
                                <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className='flex rounded-b-xl items-center justify-between border-t px-4 py-3 gap-2 bg-muted/60'>
                            <Button asChild variant="outline" size="sm" className="flex items-center gap-1 group hover:border-[1px] hover:border-foreground/10">
                                <Link href={`/project/${project.id}`} prefetch={false}>
                                    Go to Project
                                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                                        <ArrowRight size={16} />
                                    </span>
                                </Link>
                            </Button>
                            <DeleteProject projectId={project.id} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ProjectList