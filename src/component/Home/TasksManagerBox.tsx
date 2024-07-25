"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskStatusCol from "./TaskStatusCol";
import { Columns, GetProcedures, TaskItem } from "@/services/types";

const initialColumns: Columns = {
  todo: {
    id: "todo",
    title: "Todo",
    color: "success",
    items: [],
  },
  doing: {
    id: "doing",
    title: "On doing",
    color: "warning",
    items: [],
  },
  done: {
    id: "done",
    title: "Done",
    color: "primary",
    items: [],
  },
  waiting: {
    id: "waiting",
    title: "Waiting",
    color: "grey-text",
    items: [],
  },
};

const TasksManagerBox: React.FC<{
  procedures: GetProcedures[] | string;
  selectedName: string;
  selectedCategory: string;
}> = ({ procedures, selectedName, selectedCategory }) => {
  const [columns, setColumns] = useState<Columns>(initialColumns);

  useEffect(() => {
    if (typeof procedures !== "string") {
      const newColumns: Columns = { ...initialColumns };

      procedures.forEach((procedure) => {
        const taskDate = new Date(procedure.dueDate);
        const matchesName = procedure.user.userName === selectedName;
        const matchesCategory =
          procedure.label[0]?.labelName === selectedCategory;

        if (matchesName && matchesCategory) {
          const task: TaskItem = {
            id: procedure._id,
            label: procedure.label[0]?.labelName || "No Label",
            description: procedure.title,
            user: procedure.user.userName,
            date: taskDate.toLocaleDateString(),
          };

          if (
            !newColumns[procedure.column].items.some(
              (item) => item.id === task.id
            )
          ) {
            newColumns[procedure.column].items.push(task);
          }
        }
      });

      setColumns(newColumns);
    }
  }, [procedures, selectedName, selectedCategory]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = Array.from(sourceColumn.items);
    const destItems = Array.from(destColumn.items);
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      }));
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap gap-7.5">
        {Object.entries(columns).map(([id, column]) => (
          <Droppable key={id} droppableId={id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-5 items-start">
                <TaskStatusCol
                  title={column.title}
                  color={column.color}
                  items={column.items}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TasksManagerBox;
