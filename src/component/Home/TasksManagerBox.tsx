import { GetProcedures } from "@/services/types";
import TaskStatusCol from "./TaskStatusCol";

const TasksManagerBox = ({
  procedures,
}: {
  procedures: GetProcedures[] | string;
}) => {
  return (
    <div className="flex flex-wrap gap-6.5">
      <TaskStatusCol color="success" title="Todo (1)" procedures={procedures} />
      <TaskStatusCol
        color="warning"
        title="On doing (1)"
        procedures={procedures}
      />
      <TaskStatusCol color="primary" title="Done (1)" procedures={procedures} />
      <TaskStatusCol
        color="grey-text"
        title="Waiting (1)"
        procedures={procedures}
      />
    </div>
  );
};

export default TasksManagerBox;
