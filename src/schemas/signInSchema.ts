import {z} from 'zod';
export const SignInSchema = z.object({
    identifier: z.string().min(1, { message: "Email or username is required" }),
    password:z.string().min(6,{message:"Password must be atleast 6 characters long"})
});