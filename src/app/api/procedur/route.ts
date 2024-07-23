import connect from "@/lib/db";
import Procedure from "@/lib/modals/procedur";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
  try {
    await connect();
    const procedure = await Procedure.find();
    return new NextResponse(JSON.stringify(procedure), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching procedure" + error.message, {
      status: 500,
    });
  }
};

const convertDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    if (body.dueDate) {
      body.dueDate = convertDate(body.dueDate);
    }

    await connect();
    const newProcedure = new Procedure(body);
    await newProcedure.save();

    return new NextResponse(
      JSON.stringify({
        message: "procedure is created",
        data: newProcedure,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating procedure: " + error.message, {
      status: 500,
    });
  }
};
export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { _id, title, label, column } = body;
    await connect();
    if (!_id) {
      return new NextResponse(JSON.stringify({ message: "ID  not found" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(_id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid Procedure id" }),
        {
          status: 400,
        }
      );
    }

    const updateData: any = { _id };
    if (title) updateData.title = title;
    if (
      label &&
      Array.isArray(label) &&
      label.every((id) => Types.ObjectId.isValid(id))
    ) {
      updateData.label = label.map((id) => new Types.ObjectId(id));
    }
    if (column) updateData.column = column;

    const updatedProcedure = await Procedure.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      updateData,
      { new: true }
    );

    if (!updatedProcedure) {
      return new NextResponse(
        JSON.stringify({ message: "Procedure not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Procedure is updated",
        data: updatedProcedure,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating user: " + error.message, {
      status: 500,
    });
  }
};

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const { _id, column } = body;
    await connect();
    if (!_id) {
      return new NextResponse(JSON.stringify({ message: "ID  not found" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(_id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid Procedure id" }),
        {
          status: 400,
        }
      );
    }

    const updateData: any = { _id };
    if (column) updateData.column = column;

    const updatedProcedure = await Procedure.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      updateData,
      { new: true }
    );

    if (!updatedProcedure) {
      return new NextResponse(
        JSON.stringify({ message: "Procedure not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Procedure status updated",
        data: updatedProcedure,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating user: " + error.message, {
      status: 500,
    });
  }
};
