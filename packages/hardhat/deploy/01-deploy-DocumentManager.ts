import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { ETHERSCAN_API_KEY } from "../hardhat.config";
import verify from "../utils/verify";

const deployDocumentManager: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId!;

    let ethUsdPriceFeedAddress: string;

    // Deploy UserManager contract first
    const userManager = await deployments.deploy("UserManager", {
        from: deployer,
        args: [], // Add any constructor arguments if required
        log: true,
        waitConfirmations: 1,
    });
    // Get the address of the deployed UserManager contract
    const userManagerAddress = userManager.address;

    const documentManager = await deploy("DocumentManager", {
        from: deployer,
        args: [userManagerAddress], // Pass the address of UserManager as a constructor argument
        log: true,
        waitConfirmations: 1,
    });
    console.log("---------------------------------");
    if (!developmentChains.includes(network.name) && ETHERSCAN_API_KEY) {
        // Verify the deployment of the contract
        await verify(documentManager.address, [userManagerAddress]); // Address of the deployed contract
    }
    console.log("--------------------------------------");
    log(`DocumentManager deployed at: ${documentManager.address}`);
};

deployDocumentManager.tags = ["all", "documentManager"];

export default deployDocumentManager;
