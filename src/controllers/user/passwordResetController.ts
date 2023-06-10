// controllers/user/passwordResetController.ts
import { Request, Response } from 'express';
import User from '../../models/user';

export async function resetPassword(req: Request, res: Response) {
  // Extract the reset token and new password from the request body
  const { resetToken, newPassword } = req.body;

  try {
    // Find the user with the matching reset token
    const user = await User.findOne({ resetToken });

    if (!user) {
      return res.status(404).send('Invalid or expired reset token.');
    }

    // Check if the reset token has expired
    if (user.resetTokenExpiration && user.resetTokenExpiration < new Date()) {
      return res.status(400).send('Reset token has expired. Please request a new one.');
    }

    // Update the user's password
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    // Send a success response
    return res.status(200).send('Password reset successful.');
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).send('An error occurred while resetting the password.');
  }
}
