import {z} from 'zod';
export const MessageSchema = z.object({
    content:z.string().min(5,"Message must be atleast 5 character long").max(500,"Message must be atmost 500 characters long")
});