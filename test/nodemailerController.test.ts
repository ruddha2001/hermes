require("dotenv").config();
import chai from "chai";
import { createTestAccount } from "nodemailer";
import { sendMailSmtp, verifySmtp } from "../src/api/Nodemailer/controller";
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

describe("Nodemailer Controller Test", function () {
  it("Verify SMTP credentials", async () => {
    let testAccount = await createTestAccount();
    await verifySmtp(
      "smtp.ethereal.email",
      587,
      false,
      testAccount.user,
      testAccount.pass
    );
  }).timeout(10000);
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
  it("Send mass test mails", async () => {
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
      "",
      Buffer.from("random")
    );
  }).timeout(15000);
  it("Login using invalid credentials for single mail", async () => {
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
      "Invalid login creds"
    );
  }).timeout(5000);
  it("Login using invalid credentials for mass mails", async () => {
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
        "",
        Buffer.from("random"),
      ],
      "Invalid login creds"
    );
  }).timeout(5000);
});
