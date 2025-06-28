"use client"
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { React, useEffect, useState } from "react";
import { useOrganization } from "@clerk/nextjs";
import { deleteProject } from "@/actions/project";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { toast } from "sonner";

const DeleteProject = ({ projectId }) => {
    const { membership } = useOrganization();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const {
        loading: isDeleting,
        error,
        fn: deleteProjectFn,
        data: deleted,
    } = useFetch(deleteProject);

    const isAdmin = membership?.role === "org:admin";

    const handleDelete = async () => {
        setOpen(false);
        await deleteProjectFn(projectId);
    };

    useEffect(() => {
        if (deleted) {
            toast.success("Project deleted successfully!");
            router.refresh();
        }
    }, [deleted]);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    if (!isAdmin) return null;
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button disabled={isDeleting} variant="destructive" size="sm" className="flex items-center gap-1 cursor-pointer" type="button">
                    <Trash2 size={16} /> Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the project.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive text-white hover:bg-destructive/90">
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteProject