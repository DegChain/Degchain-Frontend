// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
// Errors
error UserManager__InvalidDOB(string rollNumber, string DOB);
error UserManager__InvalidPrivateKey(address accountAddress);
error UserManager__InvalidPassword(string emailId, string password);
error UserManager__RollNumberNotFound(string rollNumber);
error DocumentManager__InvalidDocumentId(uint256 documentId);

/**
 * @title UserManager
 * @notice A contract to manage and login users
 */
contract YourContract {
	// Events
	//events
	event UserRegistered(string indexed rollNumber, string DOB, string name);
	event UserLoggedIn(address accountAddress);
	event AdminRegistered(string indexed emailId, address adminAddress);
	event AdminLoggedIn(address accountAddress);
	event CertificateGenerated(
		string indexed rollNumber,
		uint256 indexed semester,
		string certificateHash
	);
	event CertificateVerified(
		string indexed rollNumber,
		uint256 indexed semester,
		bool verified
	);

	event DocumentUploaded(
		uint256 indexed documentId,
		string documentName,
		string ipfsHash,
		address indexed ownerAddress
	);
	event MarksheetGenerated(
		string indexed rollNumber,
		uint256 indexed semester,
		string marksheetHash
	);
	event DegreeGenerated(string indexed rollNumber, string degreeHash);
	// Structures
	struct User {
		string name;
		string rollNumber;
		address accountAddress;
		string dateOfBirth;
	}

	struct Admin {
		string emailId;
		address accountAddress;
	}

	struct Document {
		uint256 documentId;
		string documentName;
		address ownerAddress;
		string ipfsHash;
	}
	struct MarkRecord {
		string courseCode;
		string courseName;
		uint256 credits;
		string grade;
	}
	struct Marksheet {
		string universityName;
		string documentType;
		string programmeName;
		uint256 semesterNumber;
		uint256 academicYear;
		string studentName;
		string rollNumber;
		MarkRecord[] markRecords;
		uint256 totalCreditsCompleted;
		string sgpa;
		string cgpa;
		uint256 cumulativeCredits;
		string verifierSignature;
	}
	struct Degree {
		string universityName;
		string documentType;
		string programmeName;
		string studentName;
		string rollNumber;
		string degreeName;
		string degreeDate;
		string verifierSignature;
	}
	// Constants
	string private constant PASSWORD = "password";

	// Mappings
	mapping(string => string) private rollNumberToDOB; // Sign-up
	mapping(address => User) private users; // For login
	mapping(address => Admin) private admins; // Login of Admins (O(logn) time complexity)
	mapping(address => Document[]) private userToDocuments;

	// Arrays
	address[] private userAddresses; // For finding address from roll_number
	address[] private adminAddresses; // For finding address from emailId
	Document[] private documents;

	// Variables
	uint256 private documentIdCounter; // Unique to each document

	// Constructor
	constructor() {
		documentIdCounter = 0; // Initialize documentIdCounter
	}

	// Modifiers
	modifier onlyRegisteredUser() {
		require(
			bytes(users[msg.sender].rollNumber).length != 0,
			"User is not registered"
		);
		_;
	}

	modifier onlyAdmin() {
		require(
			bytes(admins[msg.sender].emailId).length != 0,
			"Admin is not registered"
		);
		_;
	}

	/**
	 * @notice can only be accessed by admins
	 * @param rollNumber rollNUmber of student
	 * @param DOB Date of Birth
	 */
	function addRecord(string memory rollNumber, string memory DOB) public {
		rollNumberToDOB[rollNumber] = DOB;
	}

	/**
	 * @notice Registers a new user
	 * @param DOB The date of birth of the user
	 * @param rollNumber The roll number of the user
	 * @param name The name of the user
	 */
	function registerUser(
		string memory DOB,
		string memory rollNumber,
		string memory name,
		address accountAddress
	) external {
		if (
			keccak256(bytes(rollNumberToDOB[rollNumber])) !=
			keccak256(bytes(DOB))
		) {
			revert UserManager__InvalidDOB(rollNumber, DOB);
		}
		User memory newUser = User({
			rollNumber: rollNumber,
			dateOfBirth: DOB,
			accountAddress: msg.sender,
			name: name
		});
		users[msg.sender] = newUser;
		userAddresses.push(accountAddress);
		emit UserRegistered(rollNumber, DOB, name);
	}

	/**
	 * @notice Logs in a user by verifying their private key
	 * @return result True if the login is successful, false otherwise
	 */
	function loginUser(address accountAddress) external returns (bool result) {
		if (bytes(users[accountAddress].rollNumber).length == 0) {
			return false;
		}
		emit UserLoggedIn(accountAddress);
		return true;
	}

	/**
	 * @notice Gets the details of a particular user
	 * @param userAddress The address of the user
	 * @return user The user details
	 */
	function getUser(address userAddress) external view returns (User memory) {
		if (bytes(users[userAddress].rollNumber).length == 0) {
			revert UserManager__InvalidPrivateKey(userAddress);
		}
		return users[userAddress];
	}

	/**
	 * @notice Gets the details of a particular admin
	 * @param adminAddress The address of the admin
	 * @return admin The admin details
	 */
	function getAdmin(
		address adminAddress
	) external view returns (Admin memory) {
		if (admins[adminAddress].accountAddress != address(0)) {
			revert UserManager__InvalidPrivateKey(adminAddress);
		}
		return admins[adminAddress];
	}

	// Admin Functionalities
	/**
	 * @notice Registers a new admin
	 * @param emailId The email ID of the admin
	 * @param password The password of the admin
	 */
	function registerAdmin(
		string memory emailId,
		string memory password,
		address accountAddress
	) public {
		if (keccak256(bytes(password)) != keccak256(bytes(PASSWORD))) {
			revert UserManager__InvalidPassword(emailId, password);
		}
		Admin memory newAdmin = Admin({
			emailId: emailId,
			accountAddress: accountAddress
		});
		admins[accountAddress] = newAdmin;
		adminAddresses.push(accountAddress);
		emit AdminRegistered(emailId, accountAddress);
	}

	/**
	 * @notice Logs in an admin
	 * @return result True if the login is successful, false otherwise
	 */
	function loginAdmin(address accountAddress) external returns (bool result) {
		if (admins[accountAddress].accountAddress == address(0)) {
			revert UserManager__InvalidPrivateKey(accountAddress);
		}
		emit AdminLoggedIn(accountAddress);
		return true;
	}

	/**
	 * @notice Sets the date of birth for a given roll number
	 * @param rollNumber The roll number of the user
	 * @param dateOfBirth The date of birth of the user
	 */
	function setRollNumberToDOB(
		string memory rollNumber,
		string memory dateOfBirth
	) external {
		rollNumberToDOB[rollNumber] = dateOfBirth;
	}

	/**
	 * @notice Finds the account address by roll number
	 * @param rollNumber The roll number of the user
	 * @return accountAddress The account address of the user
	 */
	function findAccountAddressByRollNumber(
		string memory rollNumber
	) public view returns (address) {
		for (uint256 i = 0; i < userAddresses.length; i++) {
			address userAddress = userAddresses[i];
			if (
				keccak256(bytes(users[userAddress].rollNumber)) ==
				keccak256(bytes(rollNumber))
			) {
				return userAddress;
			}
		}
		revert UserManager__RollNumberNotFound(rollNumber);
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
		address ownerAddress = findAccountAddressByRollNumber(rollNumber);
		Document memory newDocument = Document({
			documentId: documentIdCounter,
			documentName: documentName,
			ipfsHash: ipfsHash,
			ownerAddress: ownerAddress
		});
		// Add the new document to the mapping
		userToDocuments[ownerAddress].push(newDocument);
		documents.push(newDocument);
		documentIdCounter++;
		emit DocumentUploaded(
			documentIdCounter - 1,
			documentName,
			ipfsHash,
			ownerAddress
		);
	}

	/**
	 * @dev Retrieves all documents for a user.
	 * @param rollNumber The rollNumber of the user.
	 * @return An array of Document structs representing the user's documents.
	 */
	function getOwnerDocuments(
		string memory rollNumber
	) external view onlyAdmin returns (Document[] memory) {
		address userAddress = findAccountAddressByRollNumber(rollNumber);
		return userToDocuments[userAddress];
	}

	/**
	 * @dev Retrieves all the documents of msg.sender
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
		if (documentId >= documents.length) {
			revert DocumentManager__InvalidDocumentId(documentId);
		}
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
		if (documentId >= documents.length) {
			revert DocumentManager__InvalidDocumentId(documentId);
		}
		return documents[documentId].ownerAddress;
	}

	// Marksheet and Degree functions
	function generateMarksheet(
		string memory rollNumber,
		uint256 semester,
		string[] memory courseCodes,
		string[] memory courseNames,
		uint256[] memory credits,
		string[] memory grades,
		uint256 totalCreditsCompleted,
		string memory sgpa,
		string memory cgpa,
		string memory verifierSignature
	) external onlyAdmin {
		address ownerAddress = findAccountAddressByRollNumber(rollNumber);

		require(
			courseCodes.length == courseNames.length &&
				courseCodes.length == credits.length &&
				courseCodes.length == grades.length,
			"Invalid input arrays"
		);

		MarkRecord[] memory markRecords = new MarkRecord[](courseCodes.length);
		for (uint256 i = 0; i < courseCodes.length; i++) {
			markRecords[i] = MarkRecord({
				courseCode: courseCodes[i],
				courseName: courseNames[i],
				credits: credits[i],
				grade: grades[i]
			});
		}

		Marksheet memory newMarksheet = Marksheet({
			universityName: "Your University",
			documentType: "Marksheet",
			programmeName: "Your Programme",
			semesterNumber: semester,
			academicYear: 2023, // Change to the appropriate academic year
			studentName: users[ownerAddress].name,
			rollNumber: rollNumber,
			markRecords: markRecords,
			totalCreditsCompleted: totalCreditsCompleted,
			sgpa: sgpa,
			cgpa: cgpa,
			cumulativeCredits: totalCreditsCompleted,
			verifierSignature: verifierSignature
		});

		emit MarksheetGenerated(
			rollNumber,
			semester,
			"hash_of_generated_marksheet"
		);
	}

	function generateDegree(
		string memory rollNumber,
		string memory degreeName,
		string memory degreeDate,
		string memory verifierSignature
	) external onlyAdmin {
		address ownerAddress = findAccountAddressByRollNumber(rollNumber);

		Degree memory newDegree = Degree({
			universityName: "Your University",
			documentType: "Degree",
			programmeName: "Your Programme",
			studentName: users[ownerAddress].name,
			rollNumber: rollNumber,
			degreeName: degreeName,
			degreeDate: degreeDate,
			verifierSignature: verifierSignature
		});

		emit DegreeGenerated(rollNumber, "hash_of_generated_degree");
	}

	// Certificate functions
	function generateCertificate(
		string memory rollNumber,
		uint256 semester,
		string memory certificateHash
	) external onlyAdmin {
		address ownerAddress = findAccountAddressByRollNumber(rollNumber);

		emit CertificateGenerated(rollNumber, semester, certificateHash);
	}

	function verifyCertificate(
		string memory rollNumber,
		uint256 semester,
		bool verified
	) external onlyAdmin {
		emit CertificateVerified(rollNumber, semester, verified);
	}
}
