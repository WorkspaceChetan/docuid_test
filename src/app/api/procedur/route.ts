import connect from "@/lib/db";
import Procedure from "@/lib/modals/procedur";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const getNonGMTDate = (dtParam: Date): Date => {
  const dt = new Date(dtParam);
  const date = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
};

const convertDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return getNonGMTDate(date);
};
export const GET = async (request: Request) => {
  try {
    await connect();
    const url = new URL(request.url);
    const startDateString = url.searchParams.get("startDate");
    const endDateString = url.searchParams.get("endDate");

    if (!startDateString || !endDateString) {
      return new NextResponse("Start date and end date are required", {
        status: 400,
      });
    }

    const startDate = convertDate(startDateString);
    const endDate = convertDate(endDateString);

    const procedures = await Procedure.find({
      createAt: { $gte: startDate },
      dueDate: { $lte: endDate },
    });

    return new NextResponse(JSON.stringify(procedures), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching procedure: " + error.message, {
      status: 500,
    });
  }
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
    const { _id, title, label, column, dueDate } = body;

    await connect();

    if (!_id) {
      return new NextResponse(JSON.stringify({ message: "ID not found" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(_id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid Procedure ID" }),
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

    if (dueDate) {
      try {
        updateData.dueDate = convertDate(dueDate);
      } catch (error) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid dueDate format" }),
          { status: 400 }
        );
      }
    }

    const updatedProcedure = await Procedure.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      updateData,
      { new: true }
    );

    if (!updatedProcedure) {
      return new NextResponse(
        JSON.stringify({ message: "Procedure not found in the database" }),
        { status: 404 }
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
    return new NextResponse("Error in updating procedure: " + error.message, {
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
