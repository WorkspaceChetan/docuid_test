import connect from "@/lib/db";
import Label from "@/lib/modals/label";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const labelData = await Label.find();
    console.log(labelData, "ok");
    return new NextResponse(JSON.stringify(labelData), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching label" + error.message, {
      status: 500,
    });
  }
};
