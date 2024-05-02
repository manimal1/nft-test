import { HiTag } from "react-icons/hi";

interface NFTsMinterProps {
  mintNFT: () => void;
  isLoading: boolean;
  isMintingDisabled: boolean;
}

export function NFTsMinter({ mintNFT, isLoading, isMintingDisabled }: NFTsMinterProps) {
  return (
    <div>
      <div className="card-primary-sm flex flex-col items-center justify-center h-full">
        <h2 className="header">Mint New NFT</h2>
        <button disabled={isMintingDisabled} onClick={mintNFT} className="button w-full">
          <span>{isLoading ? "Confirming..." : "Mint NFT"}</span>
          <HiTag className="ml-2" />
        </button>
      </div>
    </div>
  );
}
