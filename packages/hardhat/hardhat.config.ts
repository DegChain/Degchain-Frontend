import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import "hardhat-deploy"; //namedAccounts comes from here
import "@nomicfoundation/hardhat-toolbox";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
import "solidity-coverage";
import { HardhatUserConfig } from "hardhat/config";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const SEPOLIA_RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/x8Tk3UigEvQ6pEq8C3PC8SKZawl3TrU6";
const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";
//const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
export const ETHERSCAN_API_KEY = "IS5NBWY5V47IGVCJ54MGZ7IUVBU2XG93II";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.17" }, { version: "0.6.6" }],
  },
  defaultNetwork: "localhost",
  namedAccounts: {
    deployer: {
      default: 0,
      31337: 1,
    },
    user: {
      default: 1,
    },
  },
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      //accounts: hardhat placed, thanks hardhat :)
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    arbitrum: {
      url: `https://arb-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
    },
    arbitrumGoerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
    },
    optimism: {
      url: `https://opt-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
    },
    optimismGoerli: {
      url: `https://opt-goerli.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
    },
    zkSyncTestnet: {
      url: "https://testnet.era.zksync.dev",
      zksync: true,
      accounts: [PRIVATE_KEY],
      verifyURL: "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
    },
    zkSync: {
      url: "https://mainnet.era.zksync.io",
      zksync: true,
      accounts: [PRIVATE_KEY],
      verifyURL: "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  verify: {
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  },
};

export default config;
