// components/TaskStatusCol.tsx

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import {
  TaskStatusColProps,
  GetProcedures,
} from "../types/TasksManagerBoxType";

const TaskStatusCol: React.FC<TaskStatusColProps> = ({
  title,
  color,
  procedures,
}) => {
  return (
    <div className="flex flex-col gap-5 items-start">
      <div className="flex gap-2.5 items-center">
        <div className={`bg-${color} rounded-full w-4 h-4`} />
        <div className="text-primary-text text-sm font-black">{title}</div>
      </div>
      {procedures &&
        typeof procedures !== "string" &&
        procedures.length > 0 &&
        procedures.map((procedure: GetProcedures, index: number) => (
          <Draggable
            key={procedure.id}
            draggableId={procedure.id.toString()}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskCard
                  label={procedure.label.toString()}
                  description={procedure.title}
                  user={procedure.user}
                  date={procedure.dueDate}
                />
              </div>
            )}
          </Draggable>
        ))}
    </div>
  );
};

export default TaskStatusCol;
