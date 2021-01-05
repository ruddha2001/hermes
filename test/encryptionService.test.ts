require("dotenv").config();
import chai from "chai";
import { decrypt, encrypt } from "../src/api/User/encryptionService";
const expect = chai.expect;

function reverseString(str: string): string {
  if (str === "") return "";
  else return reverseString(str.substr(1)) + str.charAt(0);
}
reverseString("hello");

let encryptedResult = {
  iv: "random",
  encryptedData: "random",
};

describe("Encryption Service Test", function () {
  it("Encrypt a random text", () => {
    encryptedResult = encrypt("My Name is Aniruddha Chatterjee");
    expect(encryptedResult.iv).to.be.not.equal("random");
    expect(encryptedResult.iv.length).to.be.equal(16);
    expect(encryptedResult.encryptedData).to.be.not.equal("random");
  });

  it("Decrypt an encrypted text correctly", () => {
    let decryptedResult = decrypt(
      encryptedResult.encryptedData,
      encryptedResult.iv
    );
    expect(decryptedResult).to.be.equal("My Name is Aniruddha Chatterjee");
  });

  it("Decrypt an encrypted text incorrectly", () => {
    let decryptedResult = decrypt(
      encryptedResult.encryptedData,
      reverseString(encryptedResult.iv)
    );
    expect(decryptedResult).to.not.be.equal("My Name is Aniruddha Chatterjee");
  });
});
