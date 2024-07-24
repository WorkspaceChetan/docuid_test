import HeadingBox from "./HeadingBox";
import Filter from "./Filter";
import TasksManagerBox from "./TasksManagerBox";

const HomePage = () => {
  return (
    <>
      <HeadingBox />
      <div className="flex flex-col gap-7.5">
        <Filter />
        <TasksManagerBox />
      </div>
    </>
  );
};

export default HomePage;
