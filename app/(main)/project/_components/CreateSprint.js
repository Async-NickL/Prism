"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, addDays } from "date-fns";
import { sprintSchema } from "@/lib/validators";
import useFetch from "@/hooks/use-fetch";
import { createSprint } from "@/actions/sprint";
import ShinyText from "@/components/ui/ShinyText";

export default function SprintCreationForm({
    projectTitle,
    projectKey,
    projectId,
    sprintKey,
}) {
    const [showForm, setShowForm] = useState(false);
    const [dateRange, setDateRange] = useState({
        from: new Date(),
        to: addDays(new Date(), 14),
    });
    const router = useRouter();

    const { loading: createSprintLoading, fn: createSprintFn } =
        useFetch(createSprint);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(sprintSchema),
        defaultValues: {
            name: `${projectKey}-${sprintKey}`,
            startDate: dateRange.from,
            endDate: dateRange.to,
        },
    });

    useEffect(() => {
        reset({
            name: `${projectKey}-${sprintKey}`,
            startDate: dateRange.from,
            endDate: dateRange.to,
        });
    }, [sprintKey, projectKey, dateRange.from, dateRange.to, reset]);

    const onSubmit = async (data) => {
        try {
            await createSprintFn(projectId, {
                ...data,
                startDate: dateRange.from,
                endDate: dateRange.to,
            });
            toast.success("Sprint created successfully!");
            setShowForm(false);
            router.refresh();
        } catch (err) {
            toast.error(err?.message || "Failed to create sprint");
        }
    };

    return (
        <>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-10 border-b-2 px-4 sm:px-5 pb-5 gap-4">
                <ShinyText className="text-5xl font-bold gradient-title"
                    text={projectTitle}
                />
                <Button
                    className="mt-2 w-full sm:w-fit"
                    onClick={() => setShowForm(!showForm)}
                    variant={!showForm ? "default" : "destructive"}
                >
                    {!showForm ? "Create New Sprint" : "Cancel"}
                </Button>
            </div>
            {showForm && (
                <div className="w-full flex justify-center px-2 max-sm:px-5">
                    <Card className="pt-4 mb-4 w-full max-w-3xl max-sm:rounded-lg max-sm:p-2 bg-card shadow-lg border border-border">
                        <CardContent className="w-full p-5 sm:p-6 max-sm:p-3">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col sm:flex-row gap-4 max-sm:gap-3 items-center w-full"
                            >
                                <div className="flex-1 flex flex-col w-full max-sm:w-full max-sm:mb-3">
                                    <label
                                        htmlFor="name"
                                        className="block max-sm:text-xs text-sm font-medium mb-1 ml-1"
                                    >
                                        Sprint Name
                                    </label>
                                    <Input
                                        id="name"
                                        {...register("name")}
                                        readOnly
                                        className="max-sm:text-xs w-full"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col w-full max-sm:w-full max-sm:mb-3">
                                    <label className="block max-sm:text-xs text-sm font-medium mb-1 ml-1">
                                        Sprint Duration
                                    </label>
                                    <Controller
                                        control={control}
                                        name="dateRange"
                                        render={({ field }) => (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={`w-full py-5 max-sm:text-xs justify-start font-normal ${!dateRange && "text-muted-foreground"}`}
                                                    >
                                                        <CalendarIcon className="mr-2 max-sm:mr-0 h-4 w-4" />
                                                        {dateRange.from && dateRange.to ? (
                                                            format(dateRange.from, "LLL dd, y") +
                                                            " - " +
                                                            format(dateRange.to, "LLL dd, y")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto bg-secondary"
                                                    align="center"
                                                >
                                                    <DayPicker
                                                        classNames={{
                                                            chevron: "fill-foreground",
                                                            day: "p-2 max-sm:p-1",
                                                            range_start: "bg-zinc-500 dark:bg-zinc-950",
                                                            range_end: "bg-zinc-500 dark:bg-zinc-950",
                                                            range_middle: "bg-zinc-300 dark:bg-zinc-700",
                                                            day_button: "border-none",
                                                            today: "border-2 border-foreground",
                                                        }}
                                                        mode="range"
                                                        disabled={[{ before: new Date() }]}
                                                        selected={dateRange}
                                                        onSelect={(range) => {
                                                            if (range?.from && range?.to) {
                                                                setDateRange(range);
                                                                field.onChange(range);
                                                            }
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    />
                                </div>
                                <div className="flex items-end w-full sm:w-auto mt-5">
                                    <Button type="submit" disabled={createSprintLoading} className="w-full sm:w-fit max-sm:mt-2 max-sm:rounded-md max-sm:py-3" variant="default">
                                        {createSprintLoading ? "Creating..." : "Create Sprint"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}