import {
    DndContext,
    closestCenter,
    type DragEndEvent,
} from "@dnd-kit/core";

import {
    SortableContext,
    horizontalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

import {
    useEffect,
    useState,
} from "react";

import Column from "./Column";

import {
    useReorderColumnsMutation,
    useReorderTasksMutation,
} from "../boardApi";

import type {
    Column as BoardColumn,
} from "../board.types";

import {
    DragOverlay,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import {
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

interface Props {
    boardId: string;
    columns: BoardColumn[];
}

export default function KanbanBoard({
    boardId,
    columns: initialColumns,
}: Props) {
    const [columns, setColumns] =
        useState(initialColumns);

    const [activeTask, setActiveTask] =
        useState<any>(null);

    const [activeColumn, setActiveColumn] =
        useState<any>(null);

    const [reorderColumns] =
        useReorderColumnsMutation();

    const [reorderTasks] =
        useReorderTasksMutation();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),

        useSensor(KeyboardSensor, {
            coordinateGetter:
                sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setColumns(initialColumns);
    }, [initialColumns]);

    const handleColumnDrag = async (
        event: DragEndEvent
    ) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id === over.id) return;

        const oldIndex =
            columns.findIndex(
                (c) => c.id === active.id
            );

        const newIndex =
            columns.findIndex(
                (c) => c.id === over.id
            );

        if (
            oldIndex === -1 ||
            newIndex === -1
        )
            return;

        const updated =
            arrayMove(
                columns,
                oldIndex,
                newIndex
            ).map((column, index) => ({
                ...column,
                position: index,
            }));

        setColumns(updated);

        try {
            await reorderColumns({
                boardId,
                columns: updated.map(
                    (column) => ({
                        id: column.id,
                        position:
                            column.position,
                    })
                ),
            }).unwrap();
        } catch {
            setColumns(initialColumns);
        }
    };

    const handleTaskDrag = async (
        event: DragEndEvent
    ) => {
        const { active, over } = event;

        if (!over) return;

        const sourceColumnId =
            active.data.current?.columnId;

        // `over` can be either a TASK (has columnId) or a COLUMN (has column.id)
        const overType = over.data.current?.type;
        const destinationColumnId: string =
            overType === "TASK"
                ? over.data.current?.columnId
                : overType === "COLUMN"
                  ? over.data.current?.column?.id
                  : undefined;

        if (!sourceColumnId || !destinationColumnId)
            return;

        const sourceColumnIndex =
            columns.findIndex(
                (column) =>
                    column.id === sourceColumnId
            );

        const destinationColumnIndex =
            columns.findIndex(
                (column) =>
                    column.id ===
                    destinationColumnId
            );

        if (
            sourceColumnIndex === -1 ||
            destinationColumnIndex === -1
        )
            return;

        const sourceColumn =
            columns[sourceColumnIndex];

        const destinationColumn =
            columns[destinationColumnIndex];

        const sourceTaskIndex =
            (sourceColumn.tasks ?? []).findIndex(
                (task) =>
                    task.id === active.id
            );

        const rawDestinationTaskIndex =
            (destinationColumn.tasks ?? []).findIndex(
                (task) =>
                    task.id === over.id
            );

        // -1 means dropped on empty column or column container → append to end
        const destinationTaskIndex =
            rawDestinationTaskIndex === -1
                ? (destinationColumn.tasks ?? []).length
                : rawDestinationTaskIndex;

        if (sourceTaskIndex === -1)
            return;

        const updatedColumns = [
            ...columns,
        ];

        // Same Column
        if (
            sourceColumnId ===
            destinationColumnId
        ) {
            const reordered =
                arrayMove(
                    sourceColumn.tasks ?? [],
                    sourceTaskIndex,
                    destinationTaskIndex
                ).map((task, index) => ({
                    ...task,
                    position: index,
                }));

            updatedColumns[
                sourceColumnIndex
            ] = {
                ...sourceColumn,
                tasks: reordered,
            };

            setColumns(updatedColumns);

            try {
                await reorderTasks({
                    columns: [
                        {
                            columnId:
                                sourceColumnId,

                            tasks:
                                reordered.map(
                                    (task) => ({
                                        id: task.id,

                                        position:
                                            task.position,
                                    })
                                ),
                        },
                    ],
                }).unwrap();
            } catch {
                setColumns(initialColumns);
            }

            return;
        }

        // Different Column

        const sourceTasks = [
            ...(sourceColumn.tasks ?? []),
        ];

        const destinationTasks = [
            ...(destinationColumn.tasks ?? []),
        ];

        const [movedTask] =
            sourceTasks.splice(
                sourceTaskIndex,
                1
            );

        destinationTasks.splice(
            destinationTaskIndex,
            0,
            movedTask
        );

        const updatedSource =
            sourceTasks.map(
                (task, index) => ({
                    ...task,

                    position: index,
                })
            );

        const updatedDestination =
            destinationTasks.map(
                (task, index) => ({
                    ...task,

                    position: index,
                })
            );

        updatedColumns[
            sourceColumnIndex
        ] = {
            ...sourceColumn,

            tasks: updatedSource,
        };

        updatedColumns[
            destinationColumnIndex
        ] = {
            ...destinationColumn,

            tasks:
                updatedDestination,
        };

        setColumns(updatedColumns);

        try {
            await reorderTasks({
                columns: [
                    {
                        columnId:
                            sourceColumnId,

                        tasks:
                            updatedSource.map(
                                (task) => ({
                                    id: task.id,

                                    position:
                                        task.position,
                                })
                            ),
                    },
                    {
                        columnId:
                            destinationColumnId,

                        tasks:
                            updatedDestination.map(
                                (task) => ({
                                    id: task.id,

                                    position:
                                        task.position,
                                })
                            ),
                    },
                ],
            }).unwrap();
        } catch {
            setColumns(initialColumns);
        }
    };

    // const onDragEnd = async (
    //     event: DragEndEvent
    // ) => {
    //     const type =
    //         event.active.data.current?.type;

    //     if (type === "COLUMN") {
    //         await handleColumnDrag(
    //             event
    //         );
    //         return;
    //     }

    //     if (type === "TASK") {
    //         await handleTaskDrag(
    //             event
    //         );
    //     }
    // };

    const handleDragStart = (
        event: any
    ) => {
        const type =
            event.active.data.current?.type;

        if (type === "TASK") {
            setActiveTask(
                event.active.data.current.task
            );

            return;
        }

        if (type === "COLUMN") {
            setActiveColumn(
                event.active.data.current.column
            );
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={
                closestCenter
            }
            onDragStart={
                handleDragStart
            }
            onDragEnd={async (event) => {
                setActiveTask(null);
                setActiveColumn(null);

                const type =
                    event.active.data.current?.type;

                if (type === "COLUMN") {
                    await handleColumnDrag(
                        event
                    );

                    return;
                }

                if (type === "TASK") {
                    await handleTaskDrag(
                        event
                    );
                }
            }}
        >
            <SortableContext
                items={columns.map(
                    (column) => column.id
                )}
                strategy={
                    horizontalListSortingStrategy
                }
            >
                <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-thin">
                    {columns.map(
                        (column) => (
                            <Column
                                key={column.id}
                                column={column}
                            />
                        )
                    )}
                </div>
            </SortableContext>
            <DragOverlay>
                {activeTask && (
                    <div className="w-72 rounded-xl bg-white p-4 shadow-2xl ring-2 ring-blue-500">
                        <h3 className="font-semibold">
                            {activeTask.title}
                        </h3>

                        <div className="mt-3 flex justify-between">
                            <span className="rounded bg-slate-100 px-2 py-1 text-xs">
                                {activeTask.priority}
                            </span>

                            {activeTask.assignee && (
                                <span className="text-xs">
                                    {
                                        activeTask
                                            .assignee.name
                                    }
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {activeColumn && (
                    <div className="w-80 rounded-xl bg-slate-100 p-4 shadow-2xl ring-2 ring-blue-500">
                        <h2 className="font-semibold">
                            {activeColumn.name}
                        </h2>
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    );
}