import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { ETHERSCAN_API_KEY } from "../hardhat.config";
import verify from "../utils/verify";

const deployUserManager: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId!;
    const userManager = await deploy("UserManager", {
        from: deployer,
        args: [], // Add any constructor arguments if required
        log: true,
        waitConfirmations: 1,
    });
    console.log("---------------------------------");
    if (!developmentChains.includes(network.name) && ETHERSCAN_API_KEY) {
        //verifu the deployment of contract
        await verify(userManager.address, []); //address of the deployed contract
    }
    console.log("--------------------------------------");
    log(`UserManager deployed at: ${userManager.address}`);
};

deployUserManager.tags = ["all", "userManager"];

export default deployUserManager;
