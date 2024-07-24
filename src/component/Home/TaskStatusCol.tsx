import TaskCard from "./TaskCard";

const TaskStatusCol = ({ title, color }: { title: string; color: string }) => {
  return (
    <div className="flex flex-col gap-5 items-start">
      <div className="flex gap-2.5 items-center">
        <div className={`bg-${color} rounded-full w-4 h-4`} />
        <div className="text-primary-text text-sm font-black">{title}</div>
      </div>
      <TaskCard
        label="Réseau"
        description="Créer un nouveau compte sur DocutIT"
        user="Joe Regan"
        date="27/08/24"
      />
    </div>
  );
};

export default TaskStatusCol;
