require("dotenv").config();
import chai from "chai";
import { createTestAccount } from "nodemailer";
import { sendMailSmtp } from "../src/api/Nodemailer/controller";
const expect = chai.expect;

const expectThrowsAsync = async (
  method: Function,
  params: any[],
  message?: string
) => {
  let err = null;
  try {
    await method(...params);
  } catch (error) {
    err = error;
  }
  if (message) {
    expect(err.message).to.be.equal(message);
  } else {
    expect(err).to.be.an("Error");
  }
};

describe("Nodeamailer Controller Test", function () {
  it("Send a test mail", async () => {
    let testAccount = await createTestAccount();
    await sendMailSmtp(
      "smtp.ethereal.email",
      587,
      false,
      testAccount.user,
      testAccount.pass,
      "random@example.com",
      "Test Mail from Hermes",
      undefined,
      "ruddha.mine@gmail.com"
    );
  }).timeout(10000);
  it("Login using invalid credentials", async () => {
    let testAccount = await createTestAccount();
    await expectThrowsAsync(
      sendMailSmtp,
      [
        "smtp.ethereal.email",
        587,
        false,
        "random",
        "random",
        "random@example.com",
        "Test Mail from Hermes",
        undefined,
        "ruddha.mine@gmail.com",
      ],
      "Failed to send email to ruddha.mine@gmail.com"
    );
  }).timeout(5000);
});
