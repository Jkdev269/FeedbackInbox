import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  // Check if session exists before accessing user
  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user as User;
  
  // Ensure user._id exists
  if (!user._id) {
    return Response.json(
      { success: false, message: "User ID not found in session" },
      { status: 400 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const userMessages = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } }
    ]);

    if (!userMessages || userMessages.length === 0) {
      return Response.json(
        { success: false, message: "No messages found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, messages: userMessages[0].messages },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Failed to get messages:", error);
    return Response.json(
      { success: false, message: "Failed to get messages" },
      { status: 500 }
    );
  }
}
