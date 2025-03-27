import nodemailer from 'nodemailer';
import { transporter } from "@/lib/nodemailer";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string, 
  username: string, 
  verifiedCode: string
): Promise<ApiResponse> {
  try {
    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: email,
      subject: 'Verification Code for Your Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${username},</h2>
          <p>Thank you for registering. Your verification code is:</p>
          <h3 style="background-color: #f4f4f4; padding: 10px; text-align: center;">
            ${verifiedCode}
          </h3>
          <p>This code will expire in 1 hour.</p>
          <p>If you did not request this code, please ignore this email.</p>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log("Email sent successfully:", info.response);
    return { 
      success: true, 
      message: "Verification email sent successfully" 
    };

  } catch (error) {
    console.error("Error sending verification email:", error);
    return { 
      success: false, 
      message: "Failed to send verification email" 
    };
  }
}










//resend email used to send email
// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";

// export async function sendVerificationEmail(
//   email: string, 
//   username: string, 
//   verifiedCode: string
// ): Promise<ApiResponse> {
//   try {
//     // Note the order of parameters matches the function call
//     const { error } = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: email,
//       subject: 'Verification code',
//       react: VerificationEmail({ username, otp: verifiedCode })
//     });

//     // Check for Resend API errors
//     if (error) {
//       console.error("Resend API Error:", error);
//       return { success: false, message: `Resend API Error: ${error.message}` };
//     }

//     return { success: true, message: "Verification email sent" };
//   } catch (emailError) {
//     console.error("Error sending verification email", emailError);
//     return { success: false, message: "Error sending verification email" };
//   }
// }