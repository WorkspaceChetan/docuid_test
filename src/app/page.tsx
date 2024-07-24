import HomePage from "@/component/Home";
import { HomeServices } from "@/services/home.services";

export default async function Home() {
  const procedures = await HomeServices.getProcedues();
  return <HomePage procedures={procedures} />;
}
