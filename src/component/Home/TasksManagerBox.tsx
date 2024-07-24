"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskStatusCol from "./TaskStatusCol";
import { Columns } from "../types/TasksManagerBoxType";

const initialColumns: Columns = {
  todo: {
    id: "todo",
    title: "Todo (1)",
    color: "primary",
    items: [
      {
        id: "1",
        label: "Réseau",
        description: "Créer un nouveau compte sur DocutIT",
        user: "Joe Regan",
        date: "27/08/24",
      },
    ],
  },
  doing: {
    id: "doing",
    title: "On doing (1)",
    color: "primary",
    items: [
      {
        id: "2",
        label: "Search",
        description: "Créer un nouveau compte sur DocutIT",
        user: "Design",
        date: "27/08/24",
      },
    ],
  },
  done: {
    id: "done",
    title: "Done (1)",
    color: "primary",
    items: [
      {
        id: "2",
        label: "Search",
        description: "Créer un nouveau compte sur DocutIT",
        user: "Design",
        date: "27/08/24",
      },
    ],
  },
  waiting: {
    id: "waiting",
    title: "Waiting (1)",
    color: "primary",
    items: [
      {
        id: "2",
        label: "Search",
        description: "Créer un nouveau compte sur DocutIT",
        user: "Design",
        date: "27/08/24",
      },
    ],
  },
};

const TasksManagerBox: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialColumns);

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
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
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
                className="flex flex-col gap-5 items-start"
              >
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
