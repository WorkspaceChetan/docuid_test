// components/TaskStatusCol.tsx

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { TaskStatusColProps } from "../types/TasksManagerBoxType";

const TaskStatusCol: React.FC<TaskStatusColProps> = ({
  title,
  color,
  items,
}) => {
  return (
    <div className="flex flex-col gap-5 items-start">
      <div className="flex gap-2.5 items-center">
        <div className={`bg-${color} rounded-full w-4 h-4`} />
        <div className="text-primary-text text-sm font-black">{title}</div>
      </div>
      {items.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard {...item} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TaskStatusCol;
