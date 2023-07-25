// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./UserManager.sol";

contract DocumentManager {
	//modifiers
	modifier onlyRegisteredUser() {
		require(
			userManager.getUser(msg.sender).accountAddress == msg.sender,
			"User is not registered"
		);
		_;
	}
	modifier onlyAdmin() {
		require(
			userManager.getAdmin(msg.sender).accountAddress == msg.sender,
			"Admin is not registered"
		);
		_;
	}

	//structure to represent a Document
	struct Document {
		uint256 documentId;
		string documentName;
		address ownerAddress;
		string ipfsHash;
	}

	//mapping to store documents by user
	mapping(address => Document[]) private userToDocuments;

	UserManager private userManager;
	uint256 private documentIdCounter; //unique to each document
	Document[] private documents;

	//constructor
	constructor(address _userManagerAddress) {
		userManager = UserManager(_userManagerAddress);
		documentIdCounter = 0;
	}

	/**
	 * @dev Uploads a new document for a user.
	 * @param documentName The name of the document.
	 * @param ipfsHash The IPFS hash of the document.
	 * @param rollNumber The rollNumber of the user.
	 */
	function uploadDocument(
		string memory documentName,
		string memory ipfsHash,
		string memory rollNumber
	) external onlyAdmin {
		require(bytes(ipfsHash).length > 0, "IPFS Hash cannot be empty.");
		address ownerAddress = userManager.findAccountAddressByRollNumber(
			rollNumber
		);
		Document memory newDocument = Document({
			documentId: documentIdCounter,
			documentName: documentName,
			ipfsHash: ipfsHash,
			ownerAddress: ownerAddress
		});
		//add the new document to the mapping
		userToDocuments[ownerAddress].push(newDocument);
		documents.push(newDocument);
		documentIdCounter++;
	}

	/**
	 * @dev Retrieves all documents for a user.
	 * @param rollNumber The address of the user.
	 * @return An array of Document structs representing the user's documents.
	 */
	function getOwnerDocuments(
		string memory rollNumber
	) external view onlyAdmin returns (Document[] memory) {
		address userAddress = userManager.findAccountAddressByRollNumber(
			rollNumber
		);
		return userToDocuments[userAddress];
	}

	/**
	 * @dev retrieves all the documents of msg.sender
	 * @notice user msg.sender so that it only shows his documents only
	 */
	function getDocuments()
		public
		view
		onlyRegisteredUser
		returns (Document[] memory)
	{
		return userToDocuments[msg.sender];
	}

	/**
	 * @dev Retrieves a document by its ID.
	 * @param documentId The ID of the document.
	 * @return The Document struct representing the document.
	 */
	function getDocument(
		uint256 documentId
	) public view onlyRegisteredUser returns (Document memory) {
		require(documentId < documents.length, "Invalid document ID");
		return documents[documentId];
	}

	/**
	 * @dev Checks if a document exists.
	 * @param documentId The ID of the document.
	 * @return A boolean indicating whether the document exists or not.
	 */
	function documentExists(
		uint256 documentId
	) public view onlyRegisteredUser returns (bool) {
		return documentId < documents.length;
	}

	/**
	 * @dev Retrieves the owner address of a document.
	 * @param documentId The ID of the document.
	 * @return The address of the document owner.
	 */
	function getDocumentOwner(
		uint256 documentId
	) public view onlyRegisteredUser returns (address) {
		require(documentExists(documentId), "Document does not exist");
		return documents[documentId].ownerAddress;
	}
}
