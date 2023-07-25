import { expect } from "chai";
import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { DocumentManager, UserManager } from "../typechain-types";

describe("DocumentManager", () => {
  let documentManager: DocumentManager;
  let userManager: UserManager;
  let userAddress: string;
  let documentName: string;
  let ipfsHash: string;

  beforeEach(async () => {
    await deployments.fixture();
    const { deployer, user } = await getNamedAccounts();
    documentManager = await ethers.getContract("DocumentManager", deployer);
    userManager = await ethers.getContract("UserManager", deployer);
    userAddress = user;
    documentName = "Test Document";
    ipfsHash = "QmXyZ123";

    await userManager.registerUser("", "");
  });

  it("should upload a new document for a user", async () => {
    await documentManager.uploadDocument(documentName, ipfsHash, userAddress);

    const userDocuments = await documentManager.getUserDocuments(userAddress);
    expect(userDocuments.length).to.equal(1);
    expect(userDocuments[0].documentName).to.equal(documentName);
    expect(userDocuments[0].ipfsHash).to.equal(ipfsHash);
    expect(userDocuments[0].ownerAddress).to.equal(userAddress);
  });

  it("should retrieve the owner of a document", async () => {
    await documentManager.uploadDocument(documentName, ipfsHash, userAddress);

    const userDocuments = await documentManager.getUserDocuments(userAddress);
    const documentId = userDocuments[0].documentId;

    const ownerAddress = await documentManager.getDocumentOwner(documentId);
    expect(ownerAddress).to.equal(userAddress);
  });

  it("should check if a document exists", async () => {
    await documentManager.uploadDocument(documentName, ipfsHash, userAddress);

    const userDocuments = await documentManager.getUserDocuments(userAddress);
    const documentId = userDocuments[0].documentId;

    const exists = await documentManager.documentExists(documentId);
    expect(exists).to.be.true;
  });
});
