import TaskStatusCol from "./TaskStatusCol";

const TasksManagerBox = () => {
  return (
    <div className="flex flex-wrap gap-7.5">
      <TaskStatusCol color="success" title="Todo (1)" />
      <TaskStatusCol color="warning" title="On doing (1)" />
      <TaskStatusCol color="primary" title="Done (1)" />
      <TaskStatusCol color="grey-text" title="Waiting (1)" />
    </div>
  );
};

export default TasksManagerBox;
