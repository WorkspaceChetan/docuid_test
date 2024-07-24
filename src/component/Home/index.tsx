import HeadingBox from "./HeadingBox";
import Producers from "./Producers";
import TasksManagerBox from "./TasksManagerBox";

const HomePage = () => {
  return (
    <>
      <HeadingBox />
      <div className="flex flex-col gap-7.5">
        <Producers />
        <TasksManagerBox />
      </div>
    </>
  );
};

export default HomePage;
