import HeadingBox from "./HeadingBox";
import TasksManagerBox from "./TasksManagerBox";

const HomePage = () => {
  return (
    <>
      <HeadingBox />
      <div className="flex flex-col gap-7.5">
        <TasksManagerBox />
      </div>
    </>
  );
};

export default HomePage;
