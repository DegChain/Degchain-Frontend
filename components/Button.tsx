import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";
const Button = () => {
    const { isWeb3Enabled, chainId, user } = useMoralis();
    return <ConnectButton moralisAuth={false} />;

}
export default Button;