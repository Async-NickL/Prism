"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useFetch from "@/hooks/use-fetch";
import { data as statuses } from "./Data";
import { getIssuesForSprint, updateIssueOrder } from "@/actions/issue";

import SprintManager from "./SprintManager";
import IssueCreationDrawer from "./CreateIssue";
import IssueCard from "@/components/IssueCard";
import BoardFilters from "./SpringBoardFilter";

function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

export default function SprintBoard({ sprints, projectId, orgId }) {
    const [currentSprint, setCurrentSprint] = useState(
        sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
    );

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const lastSprintIdRef = useRef(null);

    const {
        loading: issuesLoading,
        error: issuesError,
        fn: fetchIssues,
        data: issues,
        setData: setIssues,
    } = useFetch(getIssuesForSprint);

    const [filteredIssues, setFilteredIssues] = useState(issues);

    const handleFilterChange = (newFilteredIssues) => {
        setFilteredIssues(newFilteredIssues);
    };

    // Fetch issues when currentSprint changes
    useEffect(() => {
      if (currentSprint?.id && currentSprint.id !== lastSprintIdRef.current) {
        lastSprintIdRef.current = currentSprint.id;
        fetchIssues(currentSprint.id);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSprint?.id]);

    // Update filteredIssues when issues change
    useEffect(() => {
        setFilteredIssues(issues);
    }, [issues]);

    const handleAddIssue = (status) => {
        setSelectedStatus(status);
        setIsDrawerOpen(true);
    };

    const handleIssueCreated = () => {
        if (currentSprint?.id) {
            fetchIssues(currentSprint.id);
        }
    };

    const {
        fn: updateIssueOrderFn,
        loading: updateIssuesLoading,
        error: updateIssuesError,
    } = useFetch(updateIssueOrder);

    const [reordering, setReordering] = useState(false);

    const onDragEnd = async (result) => {
        if (currentSprint.status === "PLANNED") {
            toast.warning("Start the sprint to update board");
            return;
        }
        if (currentSprint.status === "COMPLETED") {
            toast.warning("Cannot update board after sprint end");
            return;
        }
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newOrderedData = [...issues];
        const sourceList = newOrderedData.filter(
            (list) => list.status === source.droppableId
        );

        const destinationList = newOrderedData.filter(
            (list) => list.status === destination.droppableId
        );

        if (source.droppableId === destination.droppableId) {
            const reorderedCards = reorder(
                sourceList,
                source.index,
                destination.index
            );

            reorderedCards.forEach((card, i) => {
                card.order = i;
            });
        } else {
            const [movedCard] = sourceList.splice(source.index, 1);
            movedCard.status = destination.droppableId;

            destinationList.splice(destination.index, 0, movedCard);

            sourceList.forEach((card, i) => {
                card.order = i;
            });
            destinationList.forEach((card, i) => {
                card.order = i;
            });
        }

        const sortedIssues = newOrderedData.sort((a, b) => a.order - b.order);
        setIssues(newOrderedData, sortedIssues);

        setReordering(true);
        updateIssueOrderFn(sortedIssues);
    };

    // Show a toast when reordering completes successfully
    useEffect(() => {
        if (reordering && !updateIssuesLoading && !updateIssuesError) {
            toast.success("Board updated");
            setReordering(false);
        }
        if (updateIssuesError) {
            toast.error(updateIssuesError.message || "Failed to update board");
            setReordering(false);
        }
    }, [reordering, updateIssuesLoading, updateIssuesError]);

    if (issuesError) return <div>Error loading issues</div>;

    return (
        <div className="w-full flex flex-col gap-4 px-4 sm:px-6 lg:px-8">
            <SprintManager
                sprint={currentSprint}
                setSprint={setCurrentSprint}
                sprints={sprints}
                projectId={projectId}
            />

            {issues && !issuesLoading && (
                <BoardFilters issues={issues} onFilterChange={handleFilterChange} />
            )}

            {updateIssuesError && (
                <p className="text-red-500 mt-2">{updateIssuesError.message}</p>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-card p-4 rounded-lg overflow-x-auto">
                    {statuses.map((column) => (
                        <Droppable key={column.key} droppableId={column.key}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-2"
                                >
                                    <h3 className="font-semibold mb-2 text-center">
                                        {column.name}
                                    </h3>
                                    {filteredIssues
                                        ?.filter((issue) => issue.status === column.key)
                                        .map((issue, index) => (
                                            <Draggable
                                                key={issue.id}
                                                draggableId={issue.id}
                                                index={index}
                                                isDragDisabled={updateIssuesLoading}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <IssueCard
                                                            issue={issue}
                                                            onDelete={() => {
                                                                if (currentSprint?.id) {
                                                                    fetchIssues(currentSprint.id);
                                                                }
                                                            }}
                                                            onUpdate={(updated) =>
                                                                setIssues((issues) =>
                                                                    issues.map((issue) => {
                                                                        if (issue.id === updated.id) return updated;
                                                                        return issue;
                                                                    })
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            {currentSprint.status !== "COMPLETED" && (
                <Button
                    variant="default"
                    className="w-full max-w-xs mx-auto mt-4"
                    onClick={() => handleAddIssue("TODO")}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Issue
                </Button>
            )}

            <IssueCreationDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                sprintId={currentSprint.id}
                status={selectedStatus}
                projectId={projectId}
                onIssueCreated={handleIssueCreated}
                orgId={orgId}
            />
        </div>
    );
}