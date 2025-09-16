"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import { formatDistanceToNow, isAfter, isBefore, format } from "date-fns";

import useFetch from "@/hooks/use-fetch";
import { useRouter, useSearchParams } from "next/navigation";

import { updateSprintStatus } from "@/actions/sprint";

export default function SprintManager({
    sprint,
    setSprint,
    sprints,
    projectId,
}) {
    const [status, setStatus] = useState(sprint.status);
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        fn: updateStatus,
        loading,
        error,
        data: updatedStatus,
    } = useFetch(updateSprintStatus);

    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const now = new Date();

    const canStart =
        isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";

    const canEnd = status === "ACTIVE";

    const handleStatusChange = async (newStatus) => {
        updateStatus(sprint.id, newStatus);
    };

    useEffect(() => {
        if (updatedStatus && updatedStatus.success) {
            setStatus(updatedStatus.sprint.status);
            setSprint({
                ...sprint,
                status: updatedStatus.sprint.status,
            });
            toast.success(`Sprint ${updatedStatus.sprint.status.toLowerCase()}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedStatus, loading]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to update sprint");
        }
    }, [error]);

    const getStatusText = () => {
        if (status === "COMPLETED") {
            return `Sprint Ended`;
        }
        if (status === "ACTIVE" && isAfter(now, endDate)) {
            return `Overdue by ${formatDistanceToNow(endDate)}`;
        }
        if (status === "PLANNED" && isBefore(now, startDate)) {
            return `Starts in ${formatDistanceToNow(startDate)}`;
        }
        return null;
    };

    useEffect(() => {
        const sprintId = searchParams.get("sprint");
        if (sprintId && sprintId !== sprint.id) {
            const selectedSprint = sprints.find((s) => s.id === sprintId);
            if (selectedSprint) {
                setSprint(selectedSprint);
                setStatus(selectedSprint.status);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, sprints]);

    const handleSprintChange = (value) => {
        const selectedSprint = sprints.find((s) => s.id === value);
        setSprint(selectedSprint);
        setStatus(selectedSprint.status);
        router.replace(`/project/${projectId}`, undefined, { shallow: true });
    };

    return (
        <>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 px-0">
                <Select value={sprint.id} onValueChange={handleSprintChange}>
                    <SelectTrigger className="bg-card">
                        <SelectValue placeholder="Select Sprint" />
                    </SelectTrigger>
                    <SelectContent>
                        {sprints.map((sprint) => (
                            <SelectItem key={sprint.id} value={sprint.id}>
                                {sprint.name} ({format(sprint.startDate, "MMM d, yyyy")} to{" "}
                                {format(sprint.endDate, "MMM d, yyyy")})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {canStart && (
                    <Button
                        onClick={() => handleStatusChange("ACTIVE")}
                        disabled={loading}
                        variant="default"
                    >
                        Start Sprint
                    </Button>
                )}
                {canEnd && (
                    <Button
                        onClick={() => handleStatusChange("COMPLETED")}
                        disabled={loading}
                        variant="destructive"
                    >
                        End Sprint
                    </Button>
                )}
            </div>
            {/* Removed skeleton loader per request */}
            {getStatusText() && (
                <Badge variant="" className="mt-3 ml-1 px-3 py-2 self-start max-sm:self-center">
                    {getStatusText()}
                </Badge>
            )}
        </>
    );
}