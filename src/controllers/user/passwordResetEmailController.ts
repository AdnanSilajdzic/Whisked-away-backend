import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import crypto from 'crypto';
import UserModel from '../../models/user';

export default async function sendPasswordResetEmail(req: Request, res: Response) {
  const { email } = req.body;

  try {
    // Generate the reset token
    const token = generateResetToken();

    // Update the user document with the reset token and its expiration time
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).send('User not found.');
    }

    foundUser.resetToken = token;
    foundUser.resetTokenExpiration = new Date(Date.now() + 3600000); // Token expiration in 1 hour
    await foundUser.save();

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'whiskedaway.contact@gmail.com',
        pass: process.env.EMAIL_PASSWORD!,
      },
    });

    // Define the password reset link
    const resetLink = `http://localhost:5173/reset-password?token=${token}`; // Replace with your actual domain

    // Define the email content
    const mailOptions = {
      from: 'whiskedaway.contact@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `You have requested to reset your password. Click on the link to reset it: ${resetLink}`,
      html: `<p>You have requested to reset your password. Click <a href="${resetLink}">here</a> to reset it.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send a success response
    res.status(200).send('Password reset email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).send('An error occurred while sending the password reset email.');
  }
}

export function generateResetToken(): string {
  // Generate a random 32-character token
  const token = crypto.randomBytes(32).toString('hex');

  // Print the token to the console
  console.log('Generated Token:', token);

  return token;
}
