import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
export async function POST(request: Request) {
    await dbConnect();
    try {
        const {username,code} = await request.json();
        const decodedusername=decodeURIComponent(username);
        const user=await UserModel.findOne({username:decodedusername});
        if(!user){
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
        const isCodeValid=user.verifyCode===code;
        const isCodeNotExpired=new Date(user.verifyCodeExpires)>new Date();
        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true;
            await user.save();
            return Response.json(
                { success: true, message: "User verified" },
                { status: 200 }
            );
        }
        else if(!isCodeNotExpired){
            return Response.json(
                { success: false, message: "verification Code has expired please signup again to get a new code" },
                { status: 400 }
            );
        }
        else{
            return Response.json(
                { success: false, message: "Invalid verification code" },
                { status: 400 }
            );
        }

        
    } catch (error) {
        console.error("Error verfying user", error);
        return Response.json(
            { success: false, message: "Error verfying user" },
            { status: 500 } 
        );
        
    }
}