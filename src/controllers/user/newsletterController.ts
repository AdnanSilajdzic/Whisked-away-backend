import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
interface Request {
  body: {
    email: string;
  };
}

export default async function newsletterController(req: Request, res: any) {
  const {email } = req.body;

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
      to: "ismaraganovic3@gmail.com",
      subject: `Subscription message`,
      text: 'You are now subscribed',
    };
    const userMailResponse = {
        from: "ismaraganovic3@gmail.com",
        to: email,
        subject: `Thanks message`,
        text: 'Thank you for your subscription',
      };
    transporter.sendMail(mailOptions, () => {
      res.status(200).send("success");
    });
    transporter.sendMail(userMailResponse, () => {
        res.status(200).send("success");
      });
  } catch (error) {
    res.status(500).send(error);
  }
}
