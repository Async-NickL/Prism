"use client";

import React from "react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import MDEditor from "@uiw/react-md-editor";
import useFetch from "@/hooks/use-fetch";
import { createIssue } from "@/actions/issue";
import { getOrganizationUsers } from "@/actions/organization";
import { issueSchema } from "@/lib/validators";

export default function IssueCreationDrawer({
    isOpen,
    onClose,
    sprintId,
    status,
    projectId,
    onIssueCreated,
    orgId,
}) {
    const {
        loading: createIssueLoading,
        fn: createIssueFn,
        error,
        data: newIssue,
    } = useFetch(createIssue);

    const {
        fn: fetchUsers,
        data: users,
    } = useFetch(getOrganizationUsers);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(issueSchema),
        defaultValues: {
            priority: "MEDIUM",
            description: "",
            assigneeId: "",
        },
    });

    useEffect(() => {
        if (isOpen && orgId) {
            fetchUsers(orgId);
        }
    }, [isOpen, orgId]);

    const onSubmit = async (data) => {
        await createIssueFn(projectId, {
            ...data,
            status,
            sprintId,
        });
    };

    useEffect(() => {
        if (newIssue) {
            reset();
            onClose();
            onIssueCreated();
        }
    }, [newIssue, createIssueLoading]);

    return (
        <Drawer open={isOpen} onClose={onClose} modal={false} >
            <DrawerContent className="w-full sm:w-[90vw] mx-auto max-sm:px-0 px-4 mb-5">
                <DrawerHeader>
                    <DrawerTitle>Create New Issue</DrawerTitle>
                </DrawerHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 flex flex-col items-center w-full">
                    <div className="w-full">
                        <label htmlFor="title" className="block text-sm font-medium ">
                            Title
                        </label>
                        <Input id="title" {...register("title")} className="w-full" />
                        {errors.title && (
                            <p className="text-red-500 text-sm ">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="assigneeId"
                            className="block text-sm font-medium"
                        >
                            Assignee
                        </label>
                        <Controller
                            name="assigneeId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users?.map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user?.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.assigneeId && (
                            <p className="text-red-500 text-sm">
                                {errors.assigneeId.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium"
                        >
                            Description
                        </label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <MDEditor value={field.value} onChange={field.onChange} className="w-full" />
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="priority"
                            className="block text-sm font-medium"
                        >
                            Priority
                        </label>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOW">Low</SelectItem>
                                        <SelectItem value="MEDIUM">Medium</SelectItem>
                                        <SelectItem value="HIGH">High</SelectItem>
                                        <SelectItem value="URGENT">Urgent</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {error && <p className="text-red-500">{error.message}</p>}
                    <Button
                        type="submit"
                        disabled={createIssueLoading}
                        className="w-full max-w-xl"
                        variant="default"
                    >
                        {createIssueLoading ? "Creating..." : "Create Issue"}
                    </Button>
                </form>
            </DrawerContent>
        </Drawer>
    );
}