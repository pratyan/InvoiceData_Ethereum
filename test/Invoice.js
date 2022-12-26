const { expect } = require("chai")
const { ethers } = require("hardhat")


describe("Invoice contract", function () {
    it("Deployment should assign the counter to zero", async function () {
      const [owner] = await ethers.getSigners();
      const Invoice = await ethers.getContractFactory("Invoice");
      const invoice = await Invoice.deploy();
      const counter = await invoice.current_no();
      expect(counter).to.equal(0);
      
    });
  });