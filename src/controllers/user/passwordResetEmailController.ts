import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { Request, Response } from 'express';

config();

export default async function sendPasswordResetEmail(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'whiskedaway.contact@gmail.com',
        pass: process.env.EMAIL_PASSWORD!,
      },
    });

    const mailOptions = {
      from: 'whiskedaway.contact@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: 'You have requested to reset your password. Click on the link to reset it.',
      html: '<p>You have requested to reset your password. Click on the link to reset it.</p>',
    };

    transporter.sendMail(mailOptions, (error: Error | null) => {
      if (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).send('An error occurred while sending the password reset email.');
      } else {
        res.status(200).send('Password reset email sent successfully.');
      }
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).send('An error occurred while sending the password reset email.');
  }
}
