import axios from "axios";
import { GetProcedures } from "./types";

export class HomeServices {
  static getProcedues = async () => {
    try {
      const res = await axios.get<GetProcedures[]>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/procedur`
      );

      return res.data;
    } catch (err: any) {
      return "Something went wrong! Please try again later.";
    }
  };
}
