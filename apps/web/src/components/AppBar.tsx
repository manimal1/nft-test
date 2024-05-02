import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SiEthereum } from "react-icons/si";

export function AppBar() {
  return (
    <nav className="appbar">
      <div className="flex items-center justify-start">
        <SiEthereum className="mr-2" size={24} />
        <span className="title">NFT App</span>
      </div>
      <div className="">
        <ConnectButton />
      </div>
    </nav>
  );
}
