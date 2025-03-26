import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string, 
  username: string, 
  verifiedCode: string
): Promise<ApiResponse> {
  try {
    // Note the order of parameters matches the function call
    const { error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Verification code',
      react: VerificationEmail({ username, otp: verifiedCode })
    });

    // Check for Resend API errors
    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, message: `Resend API Error: ${error.message}` };
    }

    return { success: true, message: "Verification email sent" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Error sending verification email" };
  }
}