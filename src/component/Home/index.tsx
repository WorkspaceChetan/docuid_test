import HeadingBox from "./HeadingBox";
import Filter from "./Filter";
import { GetProcedures } from "@/services/types";

const HomePage = ({ procedures }: { procedures: GetProcedures[] | string }) => {
  return (
    <>
      <HeadingBox />
      <Filter procedures={procedures} />
    </>
  );
};

export default HomePage;
