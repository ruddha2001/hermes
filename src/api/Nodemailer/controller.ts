import { createTransport } from "nodemailer";
import { logger } from "../../config";

export const verifySmtp = async (
  host: string,
  port: number,
  secure: boolean,
  user: string,
  pass: string
) => {
  const transporter = createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: user,
      pass: pass,
    },
  });

  try {
    await transporter.verify();
  } catch (error) {
    throw Error("Invalid login creds");
  }
};

export const sendMailSmtp = async (
  host: string,
  port: number,
  secure: boolean,
  user: string,
  pass: string,
  from: string,
  subject: string,
  htmlFile?: Buffer,
  to?: string,
  csv?: Buffer
) => {
  const transporter = createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: user,
      pass: pass,
    },
  });

  let htmlString = "<h1>Hello</h1>"; // To be later parsed by dot.js
  let receiverArray: string[] = [];

  if (csv !== undefined) {
    // To be later converted to JSON
    receiverArray = ["ruddha.mine@gmail.com", "ac8451@srmist.edu.in"];
  } else receiverArray.push(to!);

  for (let i = 0; i < receiverArray.length; i++) {
    try {
      await transporter.sendMail({
        from: from,
        to: receiverArray[i],
        subject: subject,
        text: "Please use a mail client supporting HTML to view the content",
        html: htmlString,
      });
      logger.info("Sent mail to " + receiverArray[i]);
    } catch (error) {
      logger.error(error);
      if (error.message === "Invalid login: 535 Authentication failed")
        throw Error("Invalid login creds");
      logger.error("Failed to send email to " + receiverArray[i]);
    }
  }
};
