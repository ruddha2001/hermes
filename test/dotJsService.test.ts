import chai from "chai";
import { getParsedString } from "../src/api/shared/services/dotJsService";

const expect = chai.expect;

describe("dotJs Service Test", function () {
  it("Get a proper parsed string", () => {
    const parsedString = getParsedString(`Welcome to {{=it.name}}`, {
      name: "Mocha Test",
    });
    expect(parsedString).to.be.equal("Welcome to Mocha Test");
  });
  it("Get an improper parsed string", () => {
    const parsedString = getParsedString(`Welcome to {{=it.name}}`, {
      value: "Mocha Test",
    });
    expect(parsedString).to.be.equal("Welcome to undefined");
  });
  it("Get an error on invalid data", () => {
    expect(getParsedString(`Welcome to {{=it.name}}`, undefined)).to.throw(
      "TypeError: Cannot read property 'name' of undefined"
    );
  });
});
