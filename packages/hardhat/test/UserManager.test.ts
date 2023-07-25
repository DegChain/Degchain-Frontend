import { expect } from "chai";
import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { UserManager } from "../typechain-types";
import { developmentChains } from "../helper-hardhat-config";

if (developmentChains.includes(network.name)) {
  describe("UserManager", () => {
    let userManager: UserManager;
    let deployer: string;
    let userAddress: string;
    let expectedRollNumber: string;
    let expectedDOB: string;
    let expectedPassword: string;

    beforeEach(async () => {
      deployer = (await getNamedAccounts()).deployer!;
      await deployments.fixture(["all", "user"]);

      userManager = await ethers.getContract("UserManager", deployer);
      userAddress = ethers.Wallet.createRandom().address;
      expectedRollNumber = "123456";
      expectedDOB = "1990-01-01";
      expectedPassword = "password";
    });

    it("should store the password correctly", async () => {
      const password = await userManager.getPassword();
      expect(password).to.equal(expectedPassword, "Password not stored correctly");
    });

    it("should register a new user", async () => {
      await userManager.addRecord(expectedRollNumber, expectedDOB);
      await userManager.connect(ethers.provider.getSigner(userAddress)).registerUser(expectedDOB, expectedRollNumber);

      const user = await userManager.getUser(userAddress);
      expect(user.rollNumber).to.equal(expectedRollNumber);
      expect(user.dateOfBirth).to.equal(expectedDOB);
    });

    it("should login a user", async () => {
      await userManager.addRecord(expectedRollNumber, expectedDOB);
      await userManager.connect(ethers.provider.getSigner(userAddress)).registerUser(expectedDOB, expectedRollNumber);

      const result = await userManager.connect(ethers.provider.getSigner(userAddress)).loginUser();
      expect(result).to.be.true;
    });

    it("should register a new admin", async () => {
      const adminAddress = ethers.Wallet.createRandom().address;
      const expectedEmail = "admin@example.com";

      await userManager.registerAdmin(expectedEmail, expectedPassword);
      const admin = await userManager.getAdmin(adminAddress);

      expect(admin.emailId).to.equal(expectedEmail);
      expect(admin.account).to.equal(adminAddress);
    });

    it("should login an admin", async () => {
      const adminAddress = ethers.Wallet.createRandom().address;
      const expectedEmail = "admin@example.com";

      await userManager.registerAdmin(expectedEmail, expectedPassword);
      const result = await userManager.connect(ethers.provider.getSigner(adminAddress)).loginAdmin();

      expect(result).to.be.true;
    });

    it("should set and get the date of birth for a given roll number", async () => {
      await userManager.setRollNumberToDOB(expectedRollNumber, expectedDOB);
      const dob = await userManager.getRollNumberToDOB(expectedRollNumber);

      expect(dob).to.equal(expectedDOB);
    });

    it("should find the account address by roll number", async () => {
      await userManager.addRecord(expectedRollNumber, expectedDOB);
      const accountAddress = await userManager.findAccountAddressByRollNumber(expectedRollNumber);

      expect(accountAddress).to.equal(userAddress);
    });
  });
}
