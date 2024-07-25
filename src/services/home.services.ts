import axios from "axios";
import { GetProcedures, labelProcedures, UserProcedures } from "./types";

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

  static userProcedues = async () => {
    try {
      const res = await axios.get<UserProcedures[]>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`
      );

      return res.data;
    } catch (err: any) {
      return "Something went wrong! Please try again later.";
    }
  };

  static labelProcedues = async () => {
    try {
      const res = await axios.get<labelProcedures[]>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/label`
      );

      return res.data;
    } catch (err: any) {
      return "Something went wrong! Please try again later.";
    }
  };
}
