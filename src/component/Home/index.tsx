import HeadingBox from "./HeadingBox";
import Filter from "./Filter";
import TasksManagerBox from "./TasksManagerBox";
import { GetProcedures } from "@/services/types";

const HomePage = ({ procedures }: { procedures: GetProcedures[] | string }) => {
  return (
    <>
      <HeadingBox />
      <div className="flex flex-col gap-7.5">
        <Filter />
        <TasksManagerBox procedures={procedures} />
      </div>
    </>
  );
};

export default HomePage;
