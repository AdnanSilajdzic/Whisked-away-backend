import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
interface Request {
  body: {
    name: string;
    email: string;
    message: string;
  };
}

export default async function sendMailController(req: Request, res: any) {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "whiskedaway.contact@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: email,
      to: "adiemir1@gmail.com",
      subject: `Message from ${name}`,
      text: message,
    };
    transporter.sendMail(mailOptions, () => {
      res.status(200).send("success");
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
