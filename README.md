# Certchain Contracts

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Hardhat](https://hardhat.org/buidler-plugin-badge.svg)](https://hardhat.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.8-orange.svg)](https://soliditylang.org/)

## Description

Certchain Contracts is a collection of smart contracts designed for managing user registration and document storage in a decentralized manner. It provides functionality for registering users, uploading and retrieving documents, and verifying document ownership.

## Features

-   User registration and management
-   Document uploading and retrieval
-   Ownership verification
-   Secure

## Prerequisites

-   Node.js (v12 or higher)
-   Yarn package manager
-   Hardhat (v2 or higher)

## Installation

1. Clone the repository:

    ```shell
    git clone https://github.com/your-username/certchain-contracts.git
    ```

2. Navigate to the project directory:

    ```shell
    cd certchain-contracts
    ```

3. Install the dependencies:
    ```shell
    yarn
    ```

## Usage

Configure the network settings and other parameters in hardhat.config.js file.

1. Compile the smart contracts:

    ```shell
    yarn hardhat compile
    ```

2. Deploy the contracts:

    ```
    yarn hardhat deploy
    ```

3. Run the unit tests:
    ```
        yarn hardhat test
    ```

## Contract Details

The project consists of the following contracts:

    UserManager.sol: Manages user registration and information.
    DocumentManager.sol: Handles document uploading, retrieval, and ownership verification.

## Contributing

Contributions to the Certchain Contracts project are welcome! If you find any issues or have suggestions for improvement, please create a new issue or submit a pull request.
License

### This project is licensed under the MIT License.
