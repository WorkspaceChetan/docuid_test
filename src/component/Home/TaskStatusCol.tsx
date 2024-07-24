import { GetProcedures } from "@/services/types";
import TaskCard from "./TaskCard";

const TaskStatusCol = ({
  title,
  color,
  procedures,
}: {
  title: string;
  color: string;
  procedures: GetProcedures[] | string;
}) => {
  return (
    <div className="flex flex-col gap-5 items-start">
      <div className="flex gap-2.5 items-center">
        <div className={`bg-${color} rounded-full w-4 h-4`} />
        <div className="text-primary-text text-sm font-black">{title}</div>
      </div>

      {procedures &&
        typeof procedures !== "string" &&
        procedures.length &&
        procedures.map((procedure, index) => (
          <TaskCard
            key={index}
            label={procedure.label.toString()}
            description={procedure.title}
            user={procedure.user}
            date={procedure.dueDate}
          />
        ))}
    </div>
  );
};

export default TaskStatusCol;
