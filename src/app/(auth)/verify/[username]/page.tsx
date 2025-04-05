"use client"
import { VerifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



function VerifyAccount() {
    const router=useRouter()
    const params= useParams<{username:string}>()
    const form = useForm<z.infer<typeof VerifySchema>>({
        resolver: zodResolver(VerifySchema),
      });
      const onSubmit = async (data: z.infer<typeof VerifySchema>) => {
        try {
            const response= await axios.post(`/api/verify-code`,{
                username:params.username,
                code:data.code
                
            })
            toast.success(response.data.message)
            router.replace('/sign-in')
            
        } catch (error) {
             console.error("Error in signup of user", error);
                  const axiosError = error as AxiosError<ApiResponse>;
                  const erroMessage = axiosError.response?.data.message;
                  toast.error(erroMessage ?? "Error in signup of user");
        }
      }
    
  return (
   <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6">
              Verify Your Account
            </h1>
            <p className="mb-4">Enter the verfication code send to your email</p>
          </div>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>
    </div>
   </>
  )
}

export default VerifyAccount