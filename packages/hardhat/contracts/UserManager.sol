// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

//errors
error UserManager__InvalidDOB(string rollNumber, string DOB);
error UserManager__InvalidPrivateKey(address accountAddress);
error UserManager__InvalidPassword(string emailId, string password);
error UserManager__RollNumberNotFound(string rollNumber);

/**
 * @title UserManager
 * @notice A contract to register and login users
 */
contract UserManager {
	//events
	event UserRegistered(string indexed rollNumber, string DOB);
	event UserLoggedIn(address accountAddress);
	event AdminRegistered(string indexed emailId, address adminAddress);
	event AdminLoggedIn(address accountAddress);

	//structs for User and Admin
	struct User {
		string rollNumber;
		string dateOfBirth;
		address accountAddress;
	}
	struct Admin {
		string emailId;
		address accountAddress;
	}

	//variables
	string private constant PASSWORD = "password";
	mapping(string => string) private rollNumberToDOB; //sign-up
	mapping(address => User) private users; //for login
	// Declare an array to store user addresses
	address[] private userAddresses; //for finding address from roll_number
	mapping(address => Admin) private admins; //login of Admins (O(logn) time complexity)

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
	 */
	function registerUser(
		string memory DOB,
		string memory rollNumber
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
			accountAddress: msg.sender
		});
		users[msg.sender] = newUser;
		userAddresses.push(msg.sender);
		emit UserRegistered(rollNumber, DOB);
	}

	/**
	 * @notice Logs in a user by verifying their private key
	 * @return result True if the login is successful, false otherwise
	 */
	function loginUser() external returns (bool result) {
		if (bytes(users[msg.sender].rollNumber).length == 0) {
			return false;
		}
		emit UserLoggedIn(msg.sender);
		return true;
	}

	function getPassword() public pure returns (string memory Password) {
		return PASSWORD;
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

	function getAdmin(
		address adminAddress
	) external view returns (Admin memory) {
		if (admins[adminAddress].accountAddress != address(0)) {
			revert UserManager__InvalidPrivateKey(adminAddress);
		}
		return admins[adminAddress];
	}

	//Admin Functionalities
	/**
	 * @notice Registers a new admin
	 * @param emailId The email ID of the admin
	 * @param password The password of the admin
	 */
	function registerAdmin(
		string memory emailId,
		string memory password
	) public {
		if (keccak256(bytes(password)) != keccak256(bytes(PASSWORD))) {
			revert UserManager__InvalidPassword(emailId, password);
		}
		Admin memory newAdmin = Admin({
			emailId: emailId,
			accountAddress: msg.sender
		});
		admins[msg.sender] = newAdmin;
		emit AdminRegistered(emailId, msg.sender);
	}

	/**
	 * @notice Logs in an admin
	 * @return result True if the login is successful, false otherwise
	 */
	function loginAdmin() external returns (bool result) {
		if (admins[msg.sender].accountAddress == address(0)) {
			revert UserManager__InvalidPrivateKey(msg.sender);
		}
		emit AdminLoggedIn(msg.sender);
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
	 * @notice Gets the date of birth for a given roll number
	 * @param rollNumber The roll number of the user
	 * @return dateOfBirth The date of birth of the user
	 */
	function getRollNumberToDOB(
		string memory rollNumber
	) external view returns (string memory) {
		return rollNumberToDOB[rollNumber];
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
}
