import {z} from 'zod';
export const SignInSchema = z.object({
    email:z.string().email("Please enter a valid email address"),
    password:z.string().min(6,{message:"Password must be atleast 6 characters long"})
});