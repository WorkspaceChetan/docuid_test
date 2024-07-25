import connect from "@/lib/db";
import Label from "@/lib/modals/label";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const labelData = await Label.find();
    return new NextResponse(JSON.stringify(labelData), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching label" + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connect();
    const labelAdd = new Label(body);
    await labelAdd.save();

    return new NextResponse(
      JSON.stringify({
        message: "labelAdd is created",
        data: labelAdd,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating label: " + error.message, {
      status: 500,
    });
  }
};
