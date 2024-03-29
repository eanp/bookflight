import nodemailer from "nodemailer";
import * as dotenv from 'dotenv';

dotenv.config();

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_NAME!,
    pass: process.env.EMAIL_PASS!,
  },
});

async function sendMail(mailOptions: MailOptions): Promise<string | boolean> {
  try {
    const data = await transporter.sendMail(mailOptions);
    console.log('Email sent:', data.response);
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export const sendEmailActivated = async (emailClient: string, url: string, name: string): Promise<string | boolean> => {
  const mailOptions: MailOptions = {
    from: process.env.EMAIL_NAME!,
    to: emailClient,
    subject: `Angkasa activated email for ${name}`,
    text: `Hello ${name}, this is your user activated link: ${url}`,
  };

  return await sendMail(mailOptions);
};

export const sendLinkChangePassword = async (emailClient: string, url: string, name: string): Promise<string | boolean> => {
  const mailOptions: MailOptions = {
    from: process.env.EMAIL_NAME!,
    to: emailClient,
    subject: `Angkasa request new password for ${name}`,
    text: `Hello ${name}, this is your request password link: ${url}`,
  };

  return await sendMail(mailOptions);
};