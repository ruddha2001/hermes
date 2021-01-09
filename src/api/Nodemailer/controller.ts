import { createTransport } from "nodemailer";
import { logger } from "../../config";
import { getParsedString } from "../shared/services/dotJsService";

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

  let receiverArray: { email: string; data?: any }[] = [];

  if (csv !== undefined) {
    // To be later converted to JSON
    receiverArray = [
      { email: "ruddha.mine@gmail.com" },
      { email: "ac8451@srmist.edu.in" },
    ];
  } else receiverArray.push({ email: to! });

  for (let i = 0; i < receiverArray.length; i++) {
    try {
      let receiverObject = receiverArray[i];
      // Get parsed strings from dotJs
      let htmlString = getParsedString("<h1>Hello</h1>", receiverObject.data);
      let subjectString = getParsedString("Some subject", receiverObject.data);
      await transporter.sendMail({
        from: from,
        to: receiverObject.email,
        subject: subjectString,
        text: "Please use a mail client supporting HTML to view the content",
        html: htmlString,
      });
      logger.info("Sent mail to " + receiverObject.email);
    } catch (error) {
      logger.error(error);
      if (error.message === "Invalid login: 535 Authentication failed")
        throw Error("Invalid login creds");
      logger.error("Failed to send email to " + receiverArray[i].email);
    }
  }
};
