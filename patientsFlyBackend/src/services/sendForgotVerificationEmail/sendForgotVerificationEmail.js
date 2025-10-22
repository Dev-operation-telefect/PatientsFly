import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendForgotVerificationEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const url = `${process.env.CLIENT_URL}/verify-login?token=${otp}`;

  const mailOptions = {
    from: `"Air Ambulance" <${process.env.AUTH_EMAIL}>`,
    to: email,
    subject: "Verify Your Login",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Verify Your Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body style="background-color: #f4f4f4; font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding: 40px 10px;">
              <table style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden;" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 20px; text-align: center; background-color: #033E48; color: white;">
                    <h1 style="margin: 0;">Air Ambulance</h1>
                    <p style="margin: 0;">Verify to Confirm Your Air Ambulance Admin Account.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <h2 style="color: #333;">Confirm Your Email</h2>
                    <p style="font-size: 16px; color: #555;">
                      Please verify your email address using the token below or click the button to confirm.
                    </p>

                    <div style="font-family:Arial,sans-serif;font-size:16px;color:#333;">
                      <p>Your OTP to reset password is:</p>
                      <h2 style="color:#007BFF;">${otp}</h2>
                      <p>It expires in 5 minutes.</p>
                    </div>
                    
                    <p style="font-size: 14px; color: #999;">If you didn’t request this, you can safely ignore this email.</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                    &copy; ${new Date().getFullYear()} Telerism. All rights reserved.<br />
                    Created by TefeFect
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendForgotVerificationEmail;
