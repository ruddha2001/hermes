require("dotenv").config();
import chai from "chai";
import { encrypt } from "../src/api/User/encryptionService";
const expect = chai.expect;

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
});
