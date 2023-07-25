//typescript interface
interface networkConfigItem {
    name?: string;
    ethUsdPriceFeed?: string;
    vrfCoordinatorV2?: string;
    gasLane?: string;
    callbackGasLimit?: string;
    mintFee?: string;
    subscriptionId?: string;
}
interface networkConfigInfo {
    [key: number]: networkConfigItem;
}
export const networkConfig: networkConfigInfo = {
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
        vrfCoordinatorV2: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625", //taken from chainlink itself
        gasLane:
            "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        callbackGasLimit: "500000", // 500,000 gas
        mintFee: "10000000000000000", // 0.01 ETH
        subscriptionId: "2678", // add your ID here!
    },
};

export const developmentChains = ["hardhat", "localhost"];

export const DECIMALS = 8;
export const INTIAL_ANSWER = 200000000000;
